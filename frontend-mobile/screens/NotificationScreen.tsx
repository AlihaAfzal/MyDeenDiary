import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Switch,
    Modal,
    TextInput,
    Alert,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    NotificationItem,
    ReminderSetting,
    loadNotifications,
    saveNotifications,
    loadReminderSettings,
    saveReminderSettings,
    syncScheduledNotifications,
    markAllNotificationsAsRead,
    cancelReminderNotification,
    registerNotificationReceivedListener,
} from '../services/notificationService';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { soundHapticService } from '../services/soundHapticsService';

export default function NotificationScreen({ navigation }: any) {
    const { colors, isDark } = useTheme();
    const { t, isUrdu, fonts } = useLanguage();

    const [activeTab, setActiveTab] = useState<'alerts' | 'reminders'>('alerts');
    const [userEmail, setUserEmail] = useState<string>('');
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [reminders, setReminders] = useState<ReminderSetting[]>([]);

    // Reminder modal (Add or Edit)
    const [modalVisible, setModalVisible] = useState(false);
    const [editingReminderId, setEditingReminderId] = useState<string | null>(null);
    const [reminderTitle, setReminderTitle] = useState('');
    const [hour12, setHour12] = useState('07');
    const [minuteStr, setMinuteStr] = useState('00');
    const [period, setPeriod] = useState<'AM' | 'PM'>('AM');

    // Native Date/Time picker state
    const [showPicker, setShowPicker] = useState(false);
    const [pickerDate, setPickerDate] = useState(new Date());

    useEffect(() => {
        initData();
        const sub = registerNotificationReceivedListener(() => {
            AsyncStorage.getItem('userEmail').then((email) => {
                loadNotifications(email || undefined).then(setNotifications);
            });
        });
        return () => {
            sub.remove();
        };
    }, []);

    const initData = async () => {
        const email = (await AsyncStorage.getItem('userEmail')) || '';
        setUserEmail(email);
        // Automatically mark all as read upon opening Notification Center to clear the badge
        const readNotifs = await markAllNotificationsAsRead(email);
        const rems = await loadReminderSettings();
        setNotifications(readNotifs);
        setReminders(rems);
    };

    const handleClearAll = () => {
        soundHapticService.triggerFeedback();
        Alert.alert(
            isUrdu ? 'الرٹس صاف کریں' : 'Clear Notifications',
            isUrdu
                ? 'کیا آپ واقعی تمام نوٹیفکیشن ہسٹری صاف کرنا چاہتے ہیں؟'
                : 'Are you sure you want to clear all notification history?',
            [
                { text: isUrdu ? 'منسوخ' : 'Cancel', style: 'cancel' },
                {
                    text: isUrdu ? 'صاف کریں' : 'Clear All',
                    style: 'destructive',
                    onPress: async () => {
                        setNotifications([]);
                        await saveNotifications([], userEmail);
                    },
                },
            ]
        );
    };

    const handleMarkAllRead = async () => {
        soundHapticService.triggerFeedback();
        const updated = await markAllNotificationsAsRead(userEmail);
        setNotifications(updated);
    };

    const handleDeleteNotification = async (id: string) => {
        soundHapticService.triggerFeedback();
        const updated = notifications.filter((n) => n.id !== id);
        setNotifications(updated);
        await saveNotifications(updated, userEmail);
    };

    const handleToggleReminder = async (id: string) => {
        soundHapticService.triggerFeedback();
        const updated = reminders.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r));
        setReminders(updated);
        const synced = await syncScheduledNotifications(updated);
        setReminders(synced);
    };

    const openAddModal = () => {
        soundHapticService.triggerFeedback();
        setEditingReminderId(null);
        setReminderTitle('');
        setHour12('09');
        setMinuteStr('00');
        setPeriod('PM');
        setModalVisible(true);
    };

    const openEditModal = (r: ReminderSetting) => {
        soundHapticService.triggerFeedback();
        setEditingReminderId(r.id);
        setReminderTitle(r.title);

        const h24 = r.hour;
        const isPM = h24 >= 12;
        let h12 = h24 % 12;
        if (h12 === 0) h12 = 12;

        setHour12(h12.toString().padStart(2, '0'));
        setMinuteStr(r.minute.toString().padStart(2, '0'));
        setPeriod(isPM ? 'PM' : 'AM');
        setModalVisible(true);
    };

    const handlePickerChange = (event: DateTimePickerEvent, selected?: Date) => {
        if (Platform.OS === 'android') {
            setShowPicker(false);
        }
        if (event.type === 'dismissed' || !selected) {
            return;
        }

        setPickerDate(selected);
        const hours = selected.getHours();
        const minutes = selected.getMinutes();

        const isPM = hours >= 12;
        let h12 = hours % 12;
        if (h12 === 0) h12 = 12;

        setHour12(h12.toString().padStart(2, '0'));
        setMinuteStr(minutes.toString().padStart(2, '0'));
        setPeriod(isPM ? 'PM' : 'AM');
    };

    const handleOpenTimePicker = () => {
        soundHapticService.triggerFeedback();
        let h = parseInt(hour12, 10) || 12;
        if (period === 'PM' && h < 12) h += 12;
        if (period === 'AM' && h === 12) h = 0;
        const m = parseInt(minuteStr, 10) || 0;

        const d = new Date();
        d.setHours(h);
        d.setMinutes(m);
        setPickerDate(d);
        setShowPicker(true);
    };

    const handleSaveReminder = async () => {
        soundHapticService.triggerFeedback();
        if (!reminderTitle.trim()) {
            Alert.alert(
                isUrdu ? 'ضروری' : 'Required',
                isUrdu ? 'برائے مہربانی یاد دہانی کا عنوان درج کریں۔' : 'Please enter a title for the reminder.'
            );
            return;
        }

        let h = parseInt(hour12.trim(), 10) || 12;
        h = Math.min(12, Math.max(1, h));
        const m = Math.min(59, Math.max(0, parseInt(minuteStr.trim(), 10) || 0));

        let h24 = h % 12;
        if (period === 'PM') h24 += 12;

        const displayTime = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${period}`;

        let updated: ReminderSetting[];

        if (editingReminderId) {
            const existing = reminders.find((r) => r.id === editingReminderId);
            if (existing?.notificationId) {
                await cancelReminderNotification(existing.notificationId);
            }
            updated = reminders.map((r) =>
                r.id === editingReminderId
                    ? {
                          ...r,
                          title: reminderTitle.trim(),
                          subtitle: `Daily at ${displayTime}`,
                          hour: h24,
                          minute: m,
                          notificationId: undefined,
                      }
                    : r
            );
        } else {
            const newReminder: ReminderSetting = {
                id: `custom_${Date.now()}`,
                title: reminderTitle.trim(),
                subtitle: `Daily at ${displayTime}`,
                hour: h24,
                minute: m,
                enabled: true,
                type: 'custom',
            };
            updated = [...reminders, newReminder];
        }

        setReminders(updated);
        const synced = await syncScheduledNotifications(updated);
        setReminders(synced);

        setModalVisible(false);
    };

    const handleDeleteReminder = (reminder: ReminderSetting) => {
        soundHapticService.triggerFeedback();
        Alert.alert(
            isUrdu ? 'یاد دہانی حذف کریں' : 'Delete Reminder',
            isUrdu
                ? `کیا آپ واقعی "${reminder.title}" کو حذف کرنا چاہتے ہیں؟`
                : `Are you sure you want to delete "${reminder.title}"?`,
            [
                { text: isUrdu ? 'منسوخ' : 'Cancel', style: 'cancel' },
                {
                    text: isUrdu ? 'حذف کریں' : 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        if (reminder.notificationId) {
                            await cancelReminderNotification(reminder.notificationId);
                        }
                        const updated = reminders.filter((r) => r.id !== reminder.id);
                        setReminders(updated);
                        const synced = await syncScheduledNotifications(updated);
                        setReminders(synced);
                    },
                },
            ]
        );
    };

    const getIconForType = (type: string) => {
        switch (type) {
            case 'prayer':
                return 'time-outline';
            case 'azkar':
                return 'book-outline';
            case 'reminder':
                return 'alarm-outline';
            default:
                return 'notifications-outline';
        }
    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <View style={[styles.fullBackground, { backgroundColor: colors.background }]}>
            <StatusBar style="light" />
            <SafeAreaView style={{ backgroundColor: colors.primary }} edges={['top']}>
                {/* Standardized Header Container */}
                <View style={[styles.headerContainer, { backgroundColor: colors.primary }]}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Tracker'))}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>

                    <Text
                        style={[
                            styles.headerTitle,
                            { fontFamily: fonts.bold, includeFontPadding: false },
                            isUrdu && { fontSize: 21, lineHeight: 28 },
                        ]}
                        numberOfLines={1}
                    >
                        {isUrdu ? 'اطلاعات' : 'Notification Center'}
                    </Text>

                    <View style={styles.rightSpacer}>
                        {activeTab === 'alerts' && notifications.length > 0 && (
                            <TouchableOpacity onPress={handleClearAll} activeOpacity={0.7}>
                                <Text style={[styles.clearAllText, { fontFamily: fonts.semiBold }]}>
                                    {t('clearAllAlerts')}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </SafeAreaView>

            <View style={[styles.bodyContainer, { backgroundColor: colors.background }]}>
                {/* Segmented Control */}
                <View style={[styles.tabSegmentContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <TouchableOpacity
                        style={[
                            styles.segmentBtn,
                            activeTab === 'alerts' && [styles.segmentBtnActive, { backgroundColor: colors.primaryLight }],
                        ]}
                        onPress={() => {
                            soundHapticService.triggerFeedback();
                            setActiveTab('alerts');
                        }}
                        activeOpacity={0.8}
                    >
                        <Text
                            style={[
                                styles.segmentBtnText,
                                { color: activeTab === 'alerts' ? colors.primary : colors.secondaryText, fontFamily: fonts.semiBold, includeFontPadding: false },
                                isUrdu && { fontSize: 14 },
                            ]}
                        >
                            {t('alertsHistoryTab')} {unreadCount > 0 && `(${unreadCount})`}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.segmentBtn,
                            activeTab === 'reminders' && [styles.segmentBtnActive, { backgroundColor: colors.primaryLight }],
                        ]}
                        onPress={() => {
                            soundHapticService.triggerFeedback();
                            setActiveTab('reminders');
                        }}
                        activeOpacity={0.8}
                    >
                        <Text
                            style={[
                                styles.segmentBtnText,
                                { color: activeTab === 'reminders' ? colors.primary : colors.secondaryText, fontFamily: fonts.semiBold, includeFontPadding: false },
                                isUrdu && { fontSize: 14 },
                            ]}
                        >
                            {t('reminderScheduleTab')}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Tab 1: Alerts & History */}
                {activeTab === 'alerts' ? (
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        {unreadCount > 0 && (
                            <View style={styles.subActionRow}>
                                <Text style={[styles.unreadNoticeText, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                    {unreadCount} {isUrdu ? 'نئے غیر پڑھے ہوئے الرٹس' : 'unread notifications'}
                                </Text>
                                <TouchableOpacity onPress={handleMarkAllRead}>
                                    <Text style={[styles.markAllReadText, { color: colors.primary, fontFamily: fonts.semiBold }]}>
                                        {isUrdu ? 'سب پڑھا ہوا نشان زد کریں' : 'Mark all as read'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {notifications.length === 0 ? (
                            <View style={styles.emptyContainer}>
                                <Ionicons name="notifications-off-outline" size={48} color={colors.textPlaceholder} />
                                <Text style={[styles.emptyTitle, { color: colors.text, fontFamily: fonts.bold }]}>
                                    {t('noAlertsYet')}
                                </Text>
                                <Text style={[styles.emptySub, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                    {isUrdu ? 'آپ کے تمام سابقہ نوٹیفکیشن محفوظ اور صاف ہیں۔' : 'You have cleared all alerts and history.'}
                                </Text>
                            </View>
                        ) : (
                            notifications.map((item) => (
                                <View
                                    key={item.id}
                                    style={[
                                        styles.notifCard,
                                        { backgroundColor: colors.surface, borderColor: colors.border },
                                        !item.read && { borderColor: colors.primary, backgroundColor: colors.primaryLight },
                                    ]}
                                >
                                    <View style={[styles.notifIconCircle, { backgroundColor: colors.background, borderColor: colors.border }]}>
                                        <Ionicons name={getIconForType(item.type) as any} size={20} color={colors.primary} />
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <View style={styles.notifCardHeader}>
                                            <Text style={[styles.notifTitle, { color: colors.text, fontFamily: fonts.bold }]}>
                                                {item.title}
                                            </Text>
                                            <TouchableOpacity onPress={() => handleDeleteNotification(item.id)} style={{ padding: 4 }}>
                                                <Ionicons name="close" size={16} color={colors.textPlaceholder} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={[styles.notifMessage, { color: colors.text, fontFamily: fonts.regular }]}>
                                            {item.message}
                                        </Text>
                                        <Text style={[styles.notifTimestamp, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                            {item.timestamp}
                                        </Text>
                                    </View>
                                </View>
                            ))
                        )}
                    </ScrollView>
                ) : (
                    /* Tab 2: Reminder Schedule */
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        <View style={styles.reminderSectionHeader}>
                            <Text style={[styles.sectionHeaderTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 18, lineHeight: 25 }]}>
                                {isUrdu ? 'شیڈول شدہ یاد دہانیاں' : 'Daily Timed Reminders'}
                            </Text>
                            <TouchableOpacity
                                style={[styles.addCustomBtn, { backgroundColor: colors.primary }]}
                                onPress={openAddModal}
                                activeOpacity={0.8}
                            >
                                <Ionicons name="add" size={16} color="#FFFFFF" />
                                <Text style={[styles.addCustomBtnText, { fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 15 }]}>
                                    {isUrdu ? 'نیا شامل کریں' : 'Add Custom'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {reminders.map((r) => (
                            <View
                                key={r.id}
                                style={[styles.reminderCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                            >
                                <View style={styles.reminderLeft}>
                                    <View style={[styles.reminderIconCircle, { backgroundColor: colors.primaryLight }]}>
                                        <Ionicons
                                            name={r.id.includes('azkar') ? 'book-outline' : 'alarm-outline'}
                                            size={20}
                                            color={colors.primary}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.reminderTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                                            {r.title}
                                        </Text>
                                        <Text style={[styles.reminderSubtitle, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                            {r.subtitle}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.reminderRight}>
                                    {/* Edit Timing Button */}
                                    <TouchableOpacity
                                        style={[styles.editTimingBtn, { borderColor: colors.border }]}
                                        onPress={() => openEditModal(r)}
                                        activeOpacity={0.7}
                                    >
                                        <Ionicons name="create-outline" size={16} color={colors.primary} />
                                    </TouchableOpacity>

                                    <Switch
                                        value={r.enabled}
                                        onValueChange={() => handleToggleReminder(r.id)}
                                        trackColor={{ false: colors.border, true: colors.primaryLight }}
                                        thumbColor={r.enabled ? colors.primary : '#FFFFFF'}
                                    />

                                    {/* Delete button on EVERY reminder card (both preset & custom) */}
                                    <TouchableOpacity
                                        style={styles.deleteReminderBtn}
                                        onPress={() => handleDeleteReminder(r)}
                                        activeOpacity={0.7}
                                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                    >
                                        <Ionicons name="trash-outline" size={18} color="#D32F2F" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                )}

                {/* Reminder Timing & Setup Modal */}
                <Modal visible={modalVisible} transparent={true} animationType="fade">
                    <View style={styles.modalOverlay}>
                        <View style={[styles.modalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <View style={[styles.modalHeaderRow, { borderBottomColor: colors.borderLight }]}>
                                <Text style={[styles.modalTitle, { color: colors.primary, fontFamily: fonts.bold }]}>
                                    {editingReminderId
                                        ? isUrdu
                                            ? 'یاد دہانی کا وقت تبدیل کریں'
                                            : 'Edit Reminder Timing'
                                        : isUrdu
                                        ? 'نئی یاد دہانی بنائیں'
                                        : 'Add Timed Reminder'}
                                </Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                                    <Ionicons name="close" size={22} color={colors.secondaryText} />
                                </TouchableOpacity>
                            </View>

                            <Text style={[styles.fieldLabel, { color: colors.text, fontFamily: fonts.semiBold }]}>
                                {isUrdu ? 'یاد دہانی کا عنوان' : 'Reminder Title'}
                            </Text>
                            <TextInput
                                style={[
                                    styles.textInput,
                                    {
                                        backgroundColor: colors.background,
                                        borderColor: colors.border,
                                        color: colors.text,
                                        fontFamily: fonts.medium,
                                    },
                                ]}
                                placeholder={isUrdu ? 'مثلاً تہجد، سورہ کہف' : 'e.g. Morning Azkar, Tahajjud'}
                                placeholderTextColor={colors.textPlaceholder}
                                value={reminderTitle}
                                onChangeText={setReminderTitle}
                            />

                            <Text style={[styles.fieldLabel, { color: colors.text, fontFamily: fonts.semiBold }]}>
                                {isUrdu ? 'وقت (گھنٹہ : منٹ) اور AM / PM' : 'Time (12-Hour Format)'}
                            </Text>

                            <View style={styles.timeEditorRow}>
                                {/* Hour Input */}
                                <TextInput
                                    style={[
                                        styles.timeDigitInput,
                                        {
                                            backgroundColor: colors.background,
                                            borderColor: colors.border,
                                            color: colors.text,
                                            fontFamily: fonts.bold,
                                        },
                                    ]}
                                    keyboardType="numeric"
                                    placeholder="07"
                                    placeholderTextColor={colors.textPlaceholder}
                                    maxLength={2}
                                    value={hour12}
                                    onChangeText={(val) => setHour12(val.replace(/[^0-9]/g, '').slice(0, 2))}
                                />

                                <Text style={[styles.timeSeparator, { color: colors.primary, fontFamily: fonts.bold }]}>:</Text>

                                {/* Minute Input */}
                                <TextInput
                                    style={[
                                        styles.timeDigitInput,
                                        {
                                            backgroundColor: colors.background,
                                            borderColor: colors.border,
                                            color: colors.text,
                                            fontFamily: fonts.bold,
                                        },
                                    ]}
                                    keyboardType="numeric"
                                    placeholder="00"
                                    placeholderTextColor={colors.textPlaceholder}
                                    maxLength={2}
                                    value={minuteStr}
                                    onChangeText={(val) => setMinuteStr(val.replace(/[^0-9]/g, '').slice(0, 2))}
                                />

                                {/* AM / PM Segment Selector */}
                                <View style={[styles.ampmContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
                                    <TouchableOpacity
                                        style={[
                                            styles.ampmBtn,
                                            period === 'AM' && [styles.ampmBtnActive, { backgroundColor: colors.primary }],
                                        ]}
                                        onPress={() => {
                                            soundHapticService.triggerFeedback();
                                            setPeriod('AM');
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.ampmBtnText,
                                                { color: period === 'AM' ? '#FFFFFF' : colors.secondaryText, fontFamily: fonts.bold },
                                            ]}
                                        >
                                            AM
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.ampmBtn,
                                            period === 'PM' && [styles.ampmBtnActive, { backgroundColor: colors.primary }],
                                        ]}
                                        onPress={() => {
                                            soundHapticService.triggerFeedback();
                                            setPeriod('PM');
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.ampmBtnText,
                                                { color: period === 'PM' ? '#FFFFFF' : colors.secondaryText, fontFamily: fonts.bold },
                                            ]}
                                        >
                                            PM
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {/* Native Clock Time Picker Button */}
                                <TouchableOpacity
                                    style={[styles.clockPickerBtn, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}
                                    onPress={handleOpenTimePicker}
                                    activeOpacity={0.8}
                                >
                                    <Ionicons name="time-outline" size={24} color={colors.primary} />
                                </TouchableOpacity>
                            </View>

                            {/* Render Native DateTimePicker if requested */}
                            {showPicker && (
                                <DateTimePicker
                                    value={pickerDate}
                                    mode="time"
                                    is24Hour={false}
                                    display="default"
                                    onChange={handlePickerChange}
                                />
                            )}

                            {/* Actions Row */}
                            <View style={styles.modalActionRow}>
                                <TouchableOpacity
                                    style={[styles.cancelBtn, { backgroundColor: colors.background }]}
                                    onPress={() => setModalVisible(false)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[styles.cancelBtnText, { color: colors.secondaryText, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 15 }]}>
                                        {t('cancel')}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.saveReminderBtn, { backgroundColor: colors.primary }]}
                                    onPress={handleSaveReminder}
                                    activeOpacity={0.85}
                                >
                                    <Ionicons name="checkmark-circle-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                                    <Text style={[styles.saveReminderBtnText, { fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 16 }]}>
                                        {isUrdu ? 'محفوظ کریں' : 'Save Reminder'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fullBackground: {
        flex: 1,
    },
    headerContainer: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    backButton: {
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
        flex: 1,
        paddingHorizontal: 8,
    },
    rightSpacer: {
        minWidth: 24,
        alignItems: 'flex-end',
    },
    bodyContainer: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 14,
    },
    clearAllText: {
        fontSize: 12,
        color: '#FF6B6B',
    },
    tabSegmentContainer: {
        flexDirection: 'row',
        borderRadius: 12,
        padding: 4,
        marginBottom: 16,
        borderWidth: 1,
    },
    segmentBtn: {
        flex: 1,
        paddingVertical: 9,
        alignItems: 'center',
        borderRadius: 8,
    },
    segmentBtnActive: {},
    segmentBtnText: {
        fontSize: 12.5,
    },
    scrollContent: {
        paddingBottom: 28,
    },
    subActionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    unreadNoticeText: {
        fontSize: 12,
    },
    markAllReadText: {
        fontSize: 12,
    },
    emptyContainer: {
        paddingTop: 60,
        alignItems: 'center',
    },
    emptyTitle: {
        fontSize: 16,
        marginTop: 12,
    },
    emptySub: {
        fontSize: 12,
        marginTop: 4,
        textAlign: 'center',
    },
    notifCard: {
        flexDirection: 'row',
        borderRadius: 14,
        padding: 14,
        borderWidth: 1,
        marginBottom: 10,
        gap: 12,
    },
    notifIconCircle: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    notifCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    notifTitle: {
        fontSize: 14,
    },
    notifMessage: {
        fontSize: 12.5,
        lineHeight: 18,
        marginTop: 2,
    },
    notifTimestamp: {
        fontSize: 10.5,
        marginTop: 6,
    },
    reminderSectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 2,
    },
    sectionHeaderTitle: {
        fontSize: 14,
        letterSpacing: 0.2,
    },
    addCustomBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
        paddingHorizontal: 12,
        borderRadius: 8,
        gap: 4,
    },
    addCustomBtnText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    reminderCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 14,
        borderRadius: 14,
        borderWidth: 1,
        marginBottom: 10,
    },
    reminderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12,
        marginRight: 8,
    },
    reminderIconCircle: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reminderTitle: {
        fontSize: 14,
    },
    reminderSubtitle: {
        fontSize: 11.5,
        marginTop: 2,
    },
    reminderRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    editTimingBtn: {
        padding: 6,
        borderRadius: 6,
        borderWidth: 1,
    },
    deleteReminderBtn: {
        padding: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 2,
    },
    deleteCustomBtn: {
        padding: 6,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalCard: {
        width: '100%',
        borderRadius: 18,
        padding: 20,
        borderWidth: 1,
    },
    modalHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 12,
        borderBottomWidth: 1,
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 16,
    },
    closeBtn: {
        padding: 4,
    },
    fieldLabel: {
        fontSize: 12,
        marginBottom: 6,
        marginTop: 6,
    },
    textInput: {
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 13,
        borderWidth: 1,
        marginBottom: 12,
    },
    timeEditorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 20,
    },
    timeDigitInput: {
        width: 54,
        height: 48,
        borderRadius: 10,
        borderWidth: 1,
        textAlign: 'center',
        fontSize: 18,
    },
    timeSeparator: {
        fontSize: 20,
    },
    ampmContainer: {
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        padding: 2,
    },
    ampmBtn: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    ampmBtnActive: {},
    ampmBtnText: {
        fontSize: 12,
    },
    clockPickerBtn: {
        width: 48,
        height: 48,
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
    },
    modalActionRow: {
        flexDirection: 'row',
        gap: 12,
    },
    cancelBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelBtnText: {
        fontSize: 13,
    },
    saveReminderBtn: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 10,
    },
    saveReminderBtnText: {
        color: '#FFFFFF',
        fontSize: 13,
    },
});
