import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { soundHapticService } from './soundHapticsService';

export const REMINDER_CHANNEL_ID = 'deen_diary_reminders_channel';

// Set up notification display behavior when app is in foreground
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
        priority: Notifications.AndroidNotificationPriority.MAX,
    }),
});

export interface NotificationItem {
    id: string;
    title: string;
    message: string;
    body?: string;
    timestamp: string;
    type: 'prayer' | 'azkar' | 'reminder' | 'system';
    read: boolean;
    isRead?: boolean;
}

export interface ReminderSetting {
    id: string;
    title: string;
    subtitle: string;
    hour: number;
    minute: number;
    enabled: boolean;
    type: 'preset' | 'custom';
    notificationId?: string;
}

// Exactly 2 default presets: Morning Azkar (05:30 AM) & Evening Azkar (05:30 PM)
export const DEFAULT_REMINDERS: ReminderSetting[] = [
    {
        id: 'morning_azkar',
        title: 'Morning Azkar',
        subtitle: 'Daily at 05:30 AM',
        hour: 5,
        minute: 30,
        enabled: true,
        type: 'preset',
    },
    {
        id: 'evening_azkar',
        title: 'Evening Azkar',
        subtitle: 'Daily at 05:30 PM',
        hour: 17,
        minute: 30,
        enabled: true,
        type: 'preset',
    },
];

// Clean empty notifications for fresh accounts (no mock/pre-seeded alerts)
const INITIAL_NOTIFICATIONS: NotificationItem[] = [];

export async function setupNotificationChannel(): Promise<void> {
    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync(REMINDER_CHANNEL_ID, {
            name: 'Prayer & Azkar Reminders',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#0D5C3A',
            sound: undefined,
            enableVibrate: true,
            showBadge: true,
        });
    }
}

export async function requestNotificationPermissions(): Promise<boolean> {
    try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        await setupNotificationChannel();
        return finalStatus === 'granted';
    } catch {
        return false;
    }
}

const getNotificationsStorageKey = (email?: string) => `userNotifications_${email || 'guest'}`;

export async function loadNotifications(email?: string): Promise<NotificationItem[]> {
    try {
        const key = getNotificationsStorageKey(email);
        const raw = await AsyncStorage.getItem(key);
        if (raw) {
            return JSON.parse(raw);
        }
        return [];
    } catch {
        return [];
    }
}

export async function saveNotifications(items: NotificationItem[], email?: string): Promise<void> {
    const key = getNotificationsStorageKey(email);
    await AsyncStorage.setItem(key, JSON.stringify(items)).catch(() => {});
    await AsyncStorage.setItem('user_notifications_list', JSON.stringify(items)).catch(() => {});
}

export async function getUnreadNotificationCount(email?: string): Promise<number> {
    try {
        const items = await loadNotifications(email);
        return items.filter((n) => !n.read && !n.isRead).length;
    } catch {
        return 0;
    }
}

export async function markAllNotificationsAsRead(email?: string): Promise<NotificationItem[]> {
    try {
        const items = await loadNotifications(email);
        const updated = items.map((n) => ({ ...n, read: true, isRead: true }));
        await saveNotifications(updated, email);
        return updated;
    } catch {
        return [];
    }
}

export async function loadReminderSettings(): Promise<ReminderSetting[]> {
    try {
        const raw = await AsyncStorage.getItem('user_reminder_settings');
        if (raw) {
            const parsed: ReminderSetting[] = JSON.parse(raw);
            // Strictly purge deprecated Fajr and Maghrib reminders if present from legacy caches
            const filtered = parsed.filter(
                (r) => r.id !== 'fajr_prayer' && r.id !== 'maghrib_prayer'
            );
            if (filtered.length !== parsed.length) {
                await AsyncStorage.setItem('user_reminder_settings', JSON.stringify(filtered)).catch(() => {});
            }
            return filtered;
        }
        await AsyncStorage.setItem('user_reminder_settings', JSON.stringify(DEFAULT_REMINDERS));
        return DEFAULT_REMINDERS;
    } catch {
        return DEFAULT_REMINDERS;
    }
}

export async function saveReminderSettings(settings: ReminderSetting[]): Promise<void> {
    await AsyncStorage.setItem('user_reminder_settings', JSON.stringify(settings)).catch(() => {});
}

export async function cancelReminderNotification(notificationId?: string): Promise<void> {
    if (notificationId) {
        try {
            await Notifications.cancelScheduledNotificationAsync(notificationId);
        } catch {
            // Cancel notification fallback
        }
    }
}

export async function syncScheduledNotifications(settings: ReminderSetting[]): Promise<ReminderSetting[]> {
    try {
        const hasPermission = await requestNotificationPermissions();
        if (!hasPermission) return settings;

        const reminderSoundEnabled = await soundHapticService.getReminderSoundEnabled();

        // Cancel existing and re-schedule active ones
        await Notifications.cancelAllScheduledNotificationsAsync().catch(() => {});

        const updatedSettings: ReminderSetting[] = [];

        for (const rem of settings) {
            if (rem.enabled) {
                const reminderTitle = rem.title.toLowerCase().endsWith('reminder')
                    ? rem.title
                    : `${rem.title} Reminder`;

                const scheduledId = await Notifications.scheduleNotificationAsync({
                    content: {
                        title: reminderTitle,
                        body: 'It is time for your daily Azkar. Take a moment to remember Allah.',
                        sound: reminderSoundEnabled ? true : false,
                        priority: Notifications.AndroidNotificationPriority.MAX,
                        data: {
                            reminderId: rem.id,
                            title: reminderTitle,
                            timestamp: Date.now(),
                            channelId: REMINDER_CHANNEL_ID,
                        },
                    },
                    trigger: {
                        type: Notifications.SchedulableTriggerInputTypes.DAILY,
                        hour: rem.hour,
                        minute: rem.minute,
                        channelId: REMINDER_CHANNEL_ID,
                    },
                });

                updatedSettings.push({
                    ...rem,
                    notificationId: scheduledId,
                });
            } else {
                updatedSettings.push({
                    ...rem,
                    notificationId: undefined,
                });
            }
        }

        // Scheduled Recurring Friday morning reminder for Surah Al-Kahf (Every Friday at 08:30 AM)
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Surah Al-Kahf Reminder • جمعۃ المبارک',
                body: 'Blessed Friday! Take a moment to recite Surah Al-Kahf for light between the two Fridays.',
                sound: reminderSoundEnabled ? true : false,
                priority: Notifications.AndroidNotificationPriority.MAX,
                data: {
                    reminderId: 'friday_surah_kahf',
                    title: 'Surah Al-Kahf Reminder',
                    timestamp: Date.now(),
                    channelId: REMINDER_CHANNEL_ID,
                },
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
                weekday: 6, // 6 = Friday in expo-notifications
                hour: 8,
                minute: 30,
                channelId: REMINDER_CHANNEL_ID,
            },
        }).catch(() => {});

        await saveReminderSettings(updatedSettings);
        return updatedSettings;
    } catch {
        return settings;
    }
}

export async function scheduleCustomDuaReminder(
    duaId: string,
    duaTitle: string,
    hour: number,
    minute: number
): Promise<string | undefined> {
    try {
        const hasPermission = await requestNotificationPermissions();
        if (!hasPermission) return undefined;

        const reminderSoundEnabled = await soundHapticService.getReminderSoundEnabled();

        const scheduledId = await Notifications.scheduleNotificationAsync({
            content: {
                title: `${duaTitle} Reminder`,
                body: `Time for your daily recitation of "${duaTitle}".`,
                sound: reminderSoundEnabled ? true : false,
                priority: Notifications.AndroidNotificationPriority.HIGH,
                data: {
                    reminderId: `custom_dua_${duaId}`,
                    title: `${duaTitle} Reminder`,
                    timestamp: Date.now(),
                    channelId: REMINDER_CHANNEL_ID,
                },
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.DAILY,
                hour,
                minute,
                channelId: REMINDER_CHANNEL_ID,
            },
        });
        return scheduledId;
    } catch {
        return undefined;
    }
}

export async function cancelCustomDuaReminder(notificationId?: string): Promise<void> {
    if (!notificationId) return;
    try {
        await Notifications.cancelScheduledNotificationAsync(notificationId);
    } catch {
        // Non-blocking fallback
    }
}

export async function scheduleTestNotification(
    title: string,
    body: string,
    secondsOffset: number = 5
): Promise<void> {
    try {
        const hasPermission = await requestNotificationPermissions();
        if (!hasPermission) return;

        const reminderSoundEnabled = await soundHapticService.getReminderSoundEnabled();

        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                sound: reminderSoundEnabled ? true : false,
                priority: Notifications.AndroidNotificationPriority.MAX,
                data: { channelId: REMINDER_CHANNEL_ID },
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds: Math.max(1, secondsOffset),
                repeats: false,
                channelId: REMINDER_CHANNEL_ID,
            },
        });
    } catch {
        // Test notification fallback
    }
}

/**
 * Global listener that catches incoming notifications (foreground or background trigger),
 * prepends them into persistent AsyncStorage history, and notifies listeners so the unread badge updates.
 */
export function registerNotificationReceivedListener(
    callback?: (notification: Notifications.Notification) => void
): Notifications.EventSubscription {
    return Notifications.addNotificationReceivedListener(async (notification) => {
        try {
            const email = (await AsyncStorage.getItem('userEmail')) || 'guest';
            const key = getNotificationsStorageKey(email);
            const content = notification.request.content;
            const title = (content.title as string) || 'Daily Azkar Reminder';
            const body =
                (content.body as string) ||
                'It is time for your daily Azkar. Take a moment to remember Allah.';
            const message = body;
            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            const newNotifItem: NotificationItem = {
                id: String(Date.now()),
                title,
                message,
                body,
                timestamp: `Today, ${timeStr}`,
                read: false,
                isRead: false,
                type: 'reminder',
            };

            const raw = await AsyncStorage.getItem(key);
            let list: NotificationItem[] = [];
            if (raw) {
                try {
                    list = JSON.parse(raw);
                } catch {
                    list = [];
                }
            }

            const updated = [newNotifItem, ...list];
            await AsyncStorage.setItem(key, JSON.stringify(updated)).catch(() => {});
            await AsyncStorage.setItem('user_notifications_list', JSON.stringify(updated)).catch(() => {});

            if (callback) {
                callback(notification);
            }
        } catch {
            // Notification received listener fallback
        }
    });
}
