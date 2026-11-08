import React, { useState, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Modal,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './config';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { soundHapticService } from '../services/soundHapticsService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface PrayerCount {
    remaining: number;
    completed: number;
}

export interface QazaState {
    fajr: PrayerCount;
    dhuhr: PrayerCount;
    asr: PrayerCount;
    maghrib: PrayerCount;
    isha: PrayerCount;
    witr: PrayerCount;
}

export interface QazaHistoryRecord {
    id: string;
    prayerKey?: keyof QazaState;
    prayerName: string;
    timestamp: number;
    dateString: string;
    count: number;
}

export interface MissedDateItem {
    dateStr: string;
    day: number;
    formatted: string;
}

interface PrayerDefinition {
    key: keyof QazaState;
    nameEn: string;
    nameUr: string;
    rakatsEn: string;
    rakatsUr: string;
    icon: keyof typeof Ionicons.glyphMap;
}

const PRAYERS: PrayerDefinition[] = [
    { key: 'fajr', nameEn: 'Fajr', nameUr: 'فجر', rakatsEn: '2 Farz', rakatsUr: '۲ رکعت فرض', icon: 'partly-sunny-outline' },
    { key: 'dhuhr', nameEn: 'Dhuhr', nameUr: 'ظہر', rakatsEn: '4 Farz', rakatsUr: '۴ رکعت فرض', icon: 'sunny-outline' },
    { key: 'asr', nameEn: 'Asr', nameUr: 'عصر', rakatsEn: '4 Farz', rakatsUr: '۴ رکعت فرض', icon: 'cloud-outline' },
    { key: 'maghrib', nameEn: 'Maghrib', nameUr: 'مغرب', rakatsEn: '3 Farz', rakatsUr: '۳ رکعت فرض', icon: 'moon-outline' },
    { key: 'isha', nameEn: 'Isha', nameUr: 'عشاء', rakatsEn: '4 Farz', rakatsUr: '۴ رکعت فرض', icon: 'moon' },
    { key: 'witr', nameEn: 'Witr', nameUr: 'وتر', rakatsEn: '3 Wajib', rakatsUr: '۳ رکعت واجب', icon: 'sparkles-outline' },
];

const DEFAULT_STATE: QazaState = {
    fajr: { remaining: 0, completed: 0 },
    dhuhr: { remaining: 0, completed: 0 },
    asr: { remaining: 0, completed: 0 },
    maghrib: { remaining: 0, completed: 0 },
    isha: { remaining: 0, completed: 0 },
    witr: { remaining: 0, completed: 0 },
};

export default function QazaScreen({ navigation }: any) {
    const { colors, isDark } = useTheme();
    const { t, isUrdu, fonts, urduFontSize } = useLanguage();

    const [userEmail, setUserEmail] = useState<string>('');
    const [counts, setCounts] = useState<QazaState>(DEFAULT_STATE);
    const [history, setHistory] = useState<QazaHistoryRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [syncing, setSyncing] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>('');
    const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(true);

    // Monthly matrix cache to detect missed dates
    const [matrixLogs, setMatrixLogs] = useState<Record<string, boolean>>({});
    const [resolvedMissedDates, setResolvedMissedDates] = useState<string[]>([]);

    // Detailed Prayer Modal State
    const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
    const [activePrayer, setActivePrayer] = useState<PrayerDefinition | null>(null);
    const [addHistoricInput, setAddHistoricInput] = useState<string>('');

    // History Modal State
    const [historyModalVisible, setHistoryModalVisible] = useState<boolean>(false);

    // Temporary Undo Action State
    const [undoAction, setUndoAction] = useState<{
        prayerKey: keyof QazaState;
        prayerName: string;
        historyId: string;
        message?: string;
    } | null>(null);
    const [undoTimer, setUndoTimer] = useState<any>(null);

    const showNotice = (msg: string, success: boolean = true) => {
        setStatusMessage(msg);
        setIsSuccessMessage(success);
        setTimeout(() => setStatusMessage(''), 3500);
    };

    const getCountsKey = (email: string) => `userQazaCounts_${email || 'guest'}`;
    const getHistoryKey = (email: string) => `userQazaHistory_${email || 'guest'}`;
    const getResolvedDatesKey = (email: string) => `userQazaResolvedDates_${email || 'guest'}`;

    // Load data when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadQazaData();
        }, [])
    );

    const loadQazaData = async () => {
        try {
            setLoading(true);
            const savedEmail = (await AsyncStorage.getItem('userEmail')) || '';
            setUserEmail(savedEmail);

            // 1. Load counts
            const countsKey = getCountsKey(savedEmail);
            const rawCounts = await AsyncStorage.getItem(countsKey);
            let state: QazaState = DEFAULT_STATE;

            if (rawCounts) {
                try {
                    const parsed = JSON.parse(rawCounts);
                    state = {
                        fajr: typeof parsed.fajr === 'object' ? parsed.fajr : { remaining: Number(parsed.fajr) || 0, completed: 0 },
                        dhuhr: typeof parsed.dhuhr === 'object' ? parsed.dhuhr : { remaining: Number(parsed.dhuhr) || 0, completed: 0 },
                        asr: typeof parsed.asr === 'object' ? parsed.asr : { remaining: Number(parsed.asr) || 0, completed: 0 },
                        maghrib: typeof parsed.maghrib === 'object' ? parsed.maghrib : { remaining: Number(parsed.maghrib) || 0, completed: 0 },
                        isha: typeof parsed.isha === 'object' ? parsed.isha : { remaining: Number(parsed.isha) || 0, completed: 0 },
                        witr: typeof parsed.witr === 'object' ? parsed.witr : { remaining: Number(parsed.witr) || 0, completed: 0 },
                    };
                } catch {
                    // Fallback
                }
            } else if (savedEmail) {
                // Fetch cloud counts fallback
                try {
                    const res = await fetch(`${API_BASE_URL}/qaza/${savedEmail}`);
                    const cloudRes = await res.json();
                    if (res.ok && cloudRes.data) {
                        state = {
                            fajr: { remaining: cloudRes.data.fajr || 0, completed: 0 },
                            dhuhr: { remaining: cloudRes.data.dhuhr || 0, completed: 0 },
                            asr: { remaining: cloudRes.data.asr || 0, completed: 0 },
                            maghrib: { remaining: cloudRes.data.maghrib || 0, completed: 0 },
                            isha: { remaining: cloudRes.data.isha || 0, completed: 0 },
                            witr: { remaining: cloudRes.data.witr || 0, completed: 0 },
                        };
                        await AsyncStorage.setItem(countsKey, JSON.stringify(state));
                    }
                } catch {
                    // Non-blocking
                }
            }
            setCounts(state);

            // 2. Load History
            const histKey = getHistoryKey(savedEmail);
            const rawHist = await AsyncStorage.getItem(histKey);
            if (rawHist) {
                try {
                    setHistory(JSON.parse(rawHist));
                } catch {
                    setHistory([]);
                }
            }

            // 3. Load locally resolved missed dates
            const resolvedKey = getResolvedDatesKey(savedEmail);
            const rawResolved = await AsyncStorage.getItem(resolvedKey);
            if (rawResolved) {
                try {
                    setResolvedMissedDates(JSON.parse(rawResolved));
                } catch {
                    setResolvedMissedDates([]);
                }
            }

            // 4. Fetch Monthly Matrix to auto-detect missed dates
            if (savedEmail) {
                try {
                    const mRes = await fetch(`${API_BASE_URL}/monthly-matrix/${savedEmail}`);
                    const mData = await mRes.json();
                    if (mRes.ok && mData.matrix) {
                        setMatrixLogs(mData.matrix);
                    }
                } catch {
                    // Non-blocking
                }
            }
        } catch {
            // Non-blocking error handling
        } finally {
            setLoading(false);
        }
    };

    const persistCounts = async (nextState: QazaState) => {
        setCounts(nextState);
        const key = getCountsKey(userEmail);
        await AsyncStorage.setItem(key, JSON.stringify(nextState)).catch(() => { });
    };

    const appendHistoryRecord = async (prayerKey: keyof QazaState) => {
        const prayerDef = PRAYERS.find((p) => p.key === prayerKey);
        const name = prayerDef ? (isUrdu ? prayerDef.nameUr : prayerDef.nameEn) : prayerKey;
        const now = new Date();
        const newRecord: QazaHistoryRecord = {
            id: `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
            prayerKey,
            prayerName: name,
            timestamp: Date.now(),
            dateString: now.toISOString().split('T')[0],
            count: 1,
        };

        const updatedHistory = [newRecord, ...history];
        setHistory(updatedHistory);
        const histKey = getHistoryKey(userEmail);
        await AsyncStorage.setItem(histKey, JSON.stringify(updatedHistory)).catch(() => { });
        return newRecord;
    };

    // Quick Action Button: "+1 Made Up" / "-1"
    const handleQuickMadeUp = async (prayerKey: keyof QazaState) => {
        const cur = counts[prayerKey];
        if (cur.remaining <= 0) {
            showNotice(isUrdu ? 'اس نماز کی قضا تعداد پہلے ہی صفر ہے۔' : 'No remaining backlog for this prayer.', false);
            return;
        }

        soundHapticService.triggerFeedback();

        const updated: QazaState = {
            ...counts,
            [prayerKey]: {
                remaining: Math.max(0, cur.remaining - 1),
                completed: cur.completed + 1,
            },
        };

        await persistCounts(updated);
        const newRecord = await appendHistoryRecord(prayerKey);

        const prayerDef = PRAYERS.find((p) => p.key === prayerKey);
        const prayerName = prayerDef ? (isUrdu ? prayerDef.nameUr : prayerDef.nameEn) : prayerKey;
        showNotice(isUrdu ? `${prayerName} ادا کی گئی۔ باقی: ${updated[prayerKey].remaining}` : `${prayerName} fulfilled! Remaining: ${updated[prayerKey].remaining}`);

        // Set temporary Undo snackbar
        if (undoTimer) clearTimeout(undoTimer);
        setUndoAction({
            prayerKey,
            prayerName,
            historyId: newRecord.id,
            message: isUrdu ? `${prayerName} ادا کی گئی۔` : `${prayerName} marked as prayed.`,
        });
        const timer = setTimeout(() => {
            setUndoAction(null);
        }, 6000);
        setUndoTimer(timer);
    };

    // Undo last fulfilled prayer action
    const handleUndoLastAction = async () => {
        if (!undoAction) return;
        soundHapticService.triggerFeedback();
        if (undoTimer) clearTimeout(undoTimer);

        const { prayerKey, prayerName, historyId } = undoAction;
        const cur = counts[prayerKey];
        const updated: QazaState = {
            ...counts,
            [prayerKey]: {
                remaining: cur.remaining + 1,
                completed: Math.max(0, cur.completed - 1),
            },
        };

        await persistCounts(updated);

        // Remove from history
        const histKey = getHistoryKey(userEmail);
        const updatedHist = history.filter((h) => h.id !== historyId);
        setHistory(updatedHist);
        await AsyncStorage.setItem(histKey, JSON.stringify(updatedHist)).catch(() => { });

        setUndoAction(null);
        showNotice(
            isUrdu
                ? `${prayerName} کا اندراج واپس لے لیا گیا`
                : `${prayerName} fulfillment undone! Restored to backlog.`
        );
    };

    // Revert a historical record from History view
    const handleRevertHistoryRecord = (item: QazaHistoryRecord) => {
        soundHapticService.triggerFeedback();
        // Resolve prayerKey
        let targetKey = item.prayerKey;
        if (!targetKey) {
            const found = PRAYERS.find(
                (p) =>
                    p.nameEn.toLowerCase() === item.prayerName.toLowerCase() ||
                    p.nameUr === item.prayerName ||
                    item.prayerName.toLowerCase().includes(p.nameEn.toLowerCase())
            );
            targetKey = found?.key;
        }

        Alert.alert(
            isUrdu ? 'قضا اندراج واپس لیں' : 'Revert Qaza Entry',
            isUrdu
                ? `کیا آپ ${item.prayerName} کا اندراج واپس لینا چاہتے ہیں؟ یہ ۱ نماز قضا میں دوبارہ شامل ہو جائے گی۔`
                : `Revert this fulfillment of ${item.prayerName}? This will restore 1 prayer back into your backlog.`,
            [
                { text: isUrdu ? 'منسوخ' : 'Cancel', style: 'cancel' },
                {
                    text: isUrdu ? 'واپس لیں' : 'Revert',
                    style: 'destructive',
                    onPress: async () => {
                        if (targetKey && counts[targetKey]) {
                            const cur = counts[targetKey];
                            const updatedCounts: QazaState = {
                                ...counts,
                                [targetKey]: {
                                    remaining: cur.remaining + 1,
                                    completed: Math.max(0, cur.completed - 1),
                                },
                            };
                            await persistCounts(updatedCounts);
                        }

                        // Remove from history
                        const histKey = getHistoryKey(userEmail);
                        const updatedHist = history.filter((h) => h.id !== item.id);
                        setHistory(updatedHist);
                        await AsyncStorage.setItem(histKey, JSON.stringify(updatedHist)).catch(() => { });

                        soundHapticService.triggerFeedback();
                        showNotice(
                            isUrdu
                                ? `${item.prayerName} کا اندراج کامیابی سے واپس کر دیا گیا`
                                : `Reverted ${item.prayerName} entry successfully.`
                        );
                    },
                },
            ]
        );
    };

    // Open Detailed Prayer Modal
    const openDetailedModal = (prayer: PrayerDefinition) => {
        soundHapticService.triggerFeedback();
        setActivePrayer(prayer);
        setAddHistoricInput('');
        setDetailModalVisible(true);
    };

    // Modal Section B: Prayed One Historic
    const handleModalPrayedOne = async () => {
        if (!activePrayer) return;
        await handleQuickMadeUp(activePrayer.key);
    };

    // Modal Section C: Add Historic Backlog
    const handleAddHistoricQaza = async () => {
        if (!activePrayer) return;
        const amount = parseInt(addHistoricInput.trim(), 10);
        if (isNaN(amount) || amount <= 0) {
            Alert.alert(isUrdu ? 'غلط تعداد' : 'Invalid Amount', isUrdu ? 'براہ کرم درست مثبت عدد درج کریں۔' : 'Please enter a valid positive number.');
            return;
        }

        soundHapticService.triggerFeedback();
        const cur = counts[activePrayer.key];
        const updated: QazaState = {
            ...counts,
            [activePrayer.key]: {
                ...cur,
                remaining: cur.remaining + amount,
            },
        };

        await persistCounts(updated);
        setAddHistoricInput('');
        showNotice(isUrdu ? `+${amount} قضا نمازیں شامل کر دی گئیں۔` : `Added +${amount} to ${activePrayer.nameEn} backlog.`);
    };

    // Detect missed dates for active prayer in Section A
    const activeMissedDates = useMemo<MissedDateItem[]>(() => {
        if (!activePrayer) return [];

        const list: MissedDateItem[] = [];
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();
        const currentDay = today.getDate();

        // Check past days of the current month
        for (let d = 1; d < currentDay; d++) {
            const matrixKey = `${activePrayer.key}_${d}`;
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

            // If not logged as prayed and not marked as resolved in Qaza
            const isLoggedPrayed = !!matrixLogs[matrixKey];
            const isResolvedLocally = resolvedMissedDates.includes(`${activePrayer.key}_${dateStr}`);

            if (!isLoggedPrayed && !isResolvedLocally) {
                const dateObj = new Date(currentYear, currentMonth, d);
                const formatted = dateObj.toLocaleDateString(isUrdu ? 'ur-PK' : 'en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                });

                list.push({
                    dateStr,
                    day: d,
                    formatted,
                });
            }
        }

        return list;
    }, [activePrayer, matrixLogs, resolvedMissedDates, isUrdu]);

    // Modal Section A: Mark specific missed date as prayed
    const handlePraySpecificDate = async (item: MissedDateItem) => {
        if (!activePrayer) return;

        soundHapticService.triggerFeedback();

        // Mark date as resolved locally
        const resolveKey = `${activePrayer.key}_${item.dateStr}`;
        const nextResolved = [...resolvedMissedDates, resolveKey];
        setResolvedMissedDates(nextResolved);
        await AsyncStorage.setItem(getResolvedDatesKey(userEmail), JSON.stringify(nextResolved)).catch(() => { });

        // Decrement remaining (if > 0) and increment completed
        const cur = counts[activePrayer.key];
        const updated: QazaState = {
            ...counts,
            [activePrayer.key]: {
                remaining: Math.max(0, cur.remaining - 1),
                completed: cur.completed + 1,
            },
        };
        await persistCounts(updated);

        // Append to history record with date note
        const now = new Date();
        const newRecord: QazaHistoryRecord = {
            id: `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
            prayerName: `${isUrdu ? activePrayer.nameUr : activePrayer.nameEn} (${item.formatted})`,
            timestamp: Date.now(),
            dateString: now.toISOString().split('T')[0],
            count: 1,
        };
        const updatedHistory = [newRecord, ...history];
        setHistory(updatedHistory);
        await AsyncStorage.setItem(getHistoryKey(userEmail), JSON.stringify(updatedHistory)).catch(() => { });

        // Optional non-blocking cloud update for monthly progress
        if (userEmail) {
            fetch(`${API_BASE_URL}/save-progress`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userEmail,
                    date_str: item.dateStr,
                    [activePrayer.key]: true,
                }),
            }).catch(() => { });
        }

        showNotice(isUrdu ? `${item.formatted} کی نماز ادا ہو گئی۔` : `Marked ${item.formatted} as prayed!`);
    };

    // Cloud Sync
    const handleSaveChanges = async () => {
        if (!userEmail) {
            showNotice(isUrdu ? 'محفوظ کرنے کیلئے لاگ ان کریں' : 'Please log in with your email to save records.', false);
            return;
        }

        soundHapticService.triggerFeedback();
        setSyncing(true);
        try {
            const payload = {
                email: userEmail,
                fajr: counts.fajr.remaining,
                dhuhr: counts.dhuhr.remaining,
                asr: counts.asr.remaining,
                maghrib: counts.maghrib.remaining,
                isha: counts.isha.remaining,
                witr: counts.witr.remaining,
            };

            const response = await fetch(`${API_BASE_URL}/qaza/save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                showNotice(isUrdu ? 'تمام تبدیلیاں محفوظ ہو گئیں۔' : 'Changes saved successfully.');
            } else {
                showNotice(isUrdu ? 'ریکارڈ محفوظ نہیں ہو سکا۔' : 'Could not save records at this time.', false);
            }
        } catch {
            showNotice(isUrdu ? 'سرور سے رابطہ نہ ہو سکا۔' : 'Network error: Unable to connect to server.', false);
        } finally {
            setSyncing(false);
        }
    };

    // Clear history with confirmation
    const handleClearHistory = () => {
        Alert.alert(
            isUrdu ? 'ہسٹری صاف کریں' : 'Clear History Log',
            isUrdu ? 'کیا آپ تمام قضا ہسٹری ریکارڈز حذف کرنا چاہتے ہیں؟' : 'Are you sure you want to clear your Qaza fulfillment log?',
            [
                { text: isUrdu ? 'منسوخ' : 'Cancel', style: 'cancel' },
                {
                    text: isUrdu ? 'حذف کریں' : 'Clear All',
                    style: 'destructive',
                    onPress: async () => {
                        soundHapticService.triggerFeedback();
                        setHistory([]);
                        await AsyncStorage.removeItem(getHistoryKey(userEmail));
                        showNotice(isUrdu ? 'ہسٹری صاف کر دی گئی۔' : 'Qaza history cleared.');
                    },
                },
            ]
        );
    };

    // Hero Progress Metrics Calculations
    const totalMissed = Object.values(counts).reduce((acc, p) => acc + p.remaining, 0);
    const totalCovered = Object.values(counts).reduce((acc, p) => acc + p.completed, 0);
    const totalPrayers = totalMissed + totalCovered;
    const overallPercent = totalPrayers > 0 ? Math.round((totalCovered / totalPrayers) * 100) : 0;

    // Weekly Made Up (Records logged in last 7 days)
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const weeklyMadeUp = history
        .filter((r) => r.timestamp >= oneWeekAgo)
        .reduce((acc, r) => acc + (r.count || 1), 0);

    // Group history records chronologically: Today, Yesterday, Earlier
    const groupedHistory = useMemo(() => {
        const todayStr = new Date().toISOString().split('T')[0];
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

        const todayItems: QazaHistoryRecord[] = [];
        const yesterdayItems: QazaHistoryRecord[] = [];
        const earlierItems: QazaHistoryRecord[] = [];

        history.forEach((record) => {
            if (record.dateString === todayStr) {
                todayItems.push(record);
            } else if (record.dateString === yesterdayStr) {
                yesterdayItems.push(record);
            } else {
                earlierItems.push(record);
            }
        });

        return {
            today: todayItems,
            yesterday: yesterdayItems,
            earlier: earlierItems,
        };
    }, [history]);

    // Last 7 Days Activity Glance
    const weekGlanceDays = useMemo(() => {
        const days = [];
        const dayNamesEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayNamesUr = ['اتوار', 'پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ'];

        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const dayOfWeek = d.getDay();
            const label = isUrdu ? dayNamesUr[dayOfWeek] : dayNamesEn[dayOfWeek];
            const dayNum = d.getDate();

            const countForDay = history
                .filter((r) => r.dateString === dateStr)
                .reduce((acc, r) => acc + (r.count || 1), 0);

            days.push({
                dateStr,
                label,
                dayNum,
                isToday: i === 0,
                hasActivity: countForDay > 0,
                count: countForDay,
            });
        }
        return days;
    }, [history, isUrdu]);

    return (
        <View style={[styles.fullBackground, { backgroundColor: colors.background }]}>
            <StatusBar style="light" />

            {/* Standard Top Header (56px, theme primary background) */}
            <SafeAreaView style={{ backgroundColor: colors.primary }} edges={['top']}>
                <View style={[styles.headerContainer, { backgroundColor: colors.primary }]}>
                    <TouchableOpacity
                        style={styles.headerIconButton}
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
                        {isUrdu ? 'قضا ٹریکر' : 'Qaza Tracker'}
                    </Text>

                    <TouchableOpacity
                        style={styles.headerIconButton}
                        onPress={() => {
                            soundHapticService.triggerFeedback();
                            setHistoryModalVisible(true);
                        }}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="time-outline" size={22} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <View style={[styles.bodyContainer, { backgroundColor: colors.background }]}>
                {/* Status Notice Banner */}
                {statusMessage !== '' && (
                    <View
                        style={[
                            styles.noticeBanner,
                            {
                                backgroundColor: isSuccessMessage ? (isDark ? 'rgba(13, 92, 58, 0.25)' : '#EAF6EF') : (isDark ? 'rgba(239, 68, 68, 0.25)' : '#FEF2F2'),
                                borderColor: isSuccessMessage ? colors.primary : colors.danger,
                            },
                        ]}
                    >
                        <Ionicons
                            name={isSuccessMessage ? 'checkmark-circle-outline' : 'alert-circle-outline'}
                            size={18}
                            color={isSuccessMessage ? colors.primary : colors.danger}
                            style={{ marginRight: 8 }}
                        />
                        <Text
                            style={[
                                styles.noticeText,
                                { color: isSuccessMessage ? colors.primary : colors.danger, fontFamily: fonts.medium },
                            ]}
                        >
                            {statusMessage}
                        </Text>
                    </View>
                )}

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Subtitle / Motivational Quote */}
                    <Text style={[styles.motivationalQuote, { fontFamily: fonts.medium, color: isDark ? colors.secondaryText : '#6B7280', includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                        {isUrdu
                            ? 'ہر ادا کی گئی نماز آپ کو قرب الٰہی دیتی ہے۔ ایک ایک قدم آگے بڑھائیے۔'
                            : 'Every prayer fulfilled brings you closer. Take it one step at a time.'}
                    </Text>

                    {/* Hero Progress Card (Curved card with ring and metrics) */}
                    <View style={[styles.heroCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={styles.heroTopRow}>
                            {/* Left Side: Circular Progress Indicator */}
                            <View style={styles.ringWrapper}>
                                <View style={[styles.ringOuter, { borderColor: isDark ? '#2A3833' : '#E8ECEF' }]}>
                                    <View style={[styles.ringInner, { borderColor: colors.primary, backgroundColor: colors.surface }]}>
                                        <Text style={[styles.ringPercentText, { color: colors.primary, fontFamily: fonts.bold }]}>
                                            %{overallPercent}
                                        </Text>
                                        <Text style={[styles.ringLabelText, { color: colors.secondaryText, fontFamily: fonts.medium, includeFontPadding: false }, isUrdu && { fontSize: 14 }]}>
                                            {isUrdu ? 'مجموعی' : 'Overall'}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            {/* Right Side: Metric Badges (Clean High-Contrast System) */}
                            <View style={styles.metricsColumn}>
                                <View style={[styles.metricBadge, { backgroundColor: colors.surface, borderColor: isDark ? '#2A3833' : '#E5E7EB' }]}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                        <View style={[styles.badgeLeftIndicator, { backgroundColor: '#374151' }]} />
                                        <Text style={[styles.metricBadgeLabel, { color: colors.secondaryText, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 14 }]}>
                                            {isUrdu ? 'قضا شدہ:' : 'Missed:'}
                                        </Text>
                                    </View>
                                    <Text style={[styles.metricBadgeValue, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }]}>
                                        {loading ? '...' : totalMissed}
                                    </Text>
                                </View>

                                <View style={[styles.metricBadge, { backgroundColor: colors.surface, borderColor: isDark ? '#2A3833' : '#E5E7EB' }]}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                        <View style={[styles.badgeLeftIndicator, { backgroundColor: '#0D5C3A' }]} />
                                        <Text style={[styles.metricBadgeLabel, { color: colors.secondaryText, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 14 }]}>
                                            {isUrdu ? 'ادا شدہ:' : 'Covered:'}
                                        </Text>
                                    </View>
                                    <Text style={[styles.metricBadgeValue, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }]}>
                                        {loading ? '...' : totalCovered}
                                    </Text>
                                </View>

                                <View style={[styles.metricBadge, { backgroundColor: colors.surface, borderColor: isDark ? '#2A3833' : '#E5E7EB' }]}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                        <View style={[styles.badgeLeftIndicator, { backgroundColor: '#059669' }]} />
                                        <Text style={[styles.metricBadgeLabel, { color: colors.secondaryText, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 14 }]}>
                                            {isUrdu ? 'اس ہفتے:' : 'Weekly:'}
                                        </Text>
                                    </View>
                                    <Text style={[styles.metricBadgeValue, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }]}>
                                        +{weeklyMadeUp} {isUrdu ? 'ادا' : 'made up'}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Bottom Horizontal Progress Bar */}
                        <View style={styles.horizontalBarWrap}>
                            <View style={styles.horizontalBarHeader}>
                                <Text style={[styles.horizontalBarText, { color: colors.secondaryText, fontFamily: fonts.medium, includeFontPadding: false }, isUrdu && { fontSize: 14, lineHeight: 20 }]}>
                                    {totalCovered} {isUrdu ? 'از' : 'of'} {totalPrayers} {isUrdu ? 'مکمل' : 'completed'}
                                </Text>
                                <Text style={[styles.horizontalBarPercent, { color: colors.primary, fontFamily: fonts.bold }]}>
                                    {overallPercent}%
                                </Text>
                            </View>
                            <View style={[styles.progressBarTrack, { backgroundColor: isDark ? '#2A3833' : '#E8ECEF' }]}>
                                <View
                                    style={[
                                        styles.progressBarFill,
                                        {
                                            width: `${Math.min(100, Math.max(0, overallPercent))}%`,
                                            backgroundColor: colors.primary,
                                        },
                                    ]}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Week Glance Card (Last 7 Days Activity Dots) */}
                    <View style={[styles.weekGlanceCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={styles.weekGlanceHeaderRow}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                                <Ionicons name="calendar-outline" size={16} color={colors.primary} />
                                <Text style={[styles.weekGlanceTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                                    {isUrdu ? 'گزشتہ ۷ دنوں کی کارکردگی' : 'Last 7 Days Activity'}
                                </Text>
                            </View>
                            <Text style={[styles.weekGlanceSub, { color: colors.primary, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 14 }]}>
                                +{weeklyMadeUp} {isUrdu ? 'ادا' : 'Fulfilled'}
                            </Text>
                        </View>

                        <View style={styles.weekDotsRow}>
                            {weekGlanceDays.map((item) => (
                                <View key={item.dateStr} style={styles.weekDotCol}>
                                    <Text style={[styles.weekDayLabel, { color: item.isToday ? colors.primary : colors.secondaryText, fontFamily: item.isToday ? fonts.bold : fonts.medium }]}>
                                        {item.label}
                                    </Text>
                                    <View
                                        style={[
                                            styles.weekDotCircle,
                                            item.hasActivity
                                                ? { backgroundColor: colors.primary, borderColor: colors.primary }
                                                : { backgroundColor: isDark ? '#1C2621' : '#F3F4F6', borderColor: colors.border },
                                            item.isToday && { borderWidth: 2, borderColor: colors.goldDark },
                                        ]}
                                    >
                                        {item.hasActivity ? (
                                            <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                                        ) : (
                                            <View style={[styles.weekDotEmpty, { backgroundColor: isDark ? '#2D3D35' : '#D1D5DB' }]} />
                                        )}
                                    </View>
                                    <Text style={[styles.weekDayNum, { color: item.hasActivity ? colors.primary : colors.secondaryText, fontFamily: fonts.semiBold }]}>
                                        {item.hasActivity ? `+${item.count}` : item.dayNum}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* View Full Progress Button */}
                    <TouchableOpacity
                        style={[styles.fullProgressBtn, { backgroundColor: isDark ? '#16231E' : '#F0FDF4', borderColor: colors.primary }]}
                        onPress={() => {
                            soundHapticService.triggerFeedback();
                            navigation.navigate('Progress');
                        }}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="analytics" size={18} color={colors.primary} style={{ marginRight: 8 }} />
                        <Text style={[styles.fullProgressBtnText, { color: colors.primary, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 15 }]}>
                            {isUrdu ? 'مکمل پیش رفت اور تفصیلی تجزیہ دیکھیں' : 'View Full Progress & Analytics'}
                        </Text>
                        <Ionicons name="chevron-forward" size={16} color={colors.primary} style={{ marginLeft: 6 }} />
                    </TouchableOpacity>

                    {/* 2-Column Prayer Grid Section Header */}
                    <Text style={[styles.gridSectionHeader, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 18, lineHeight: 25 }]}>
                        {isUrdu ? 'آپ کی قضا نمازیں' : 'Your Qaza List'}
                    </Text>

                    {/* Responsive 2-Column Grid */}
                    <View style={styles.gridContainer}>
                        {PRAYERS.map((prayer) => {
                            const item = counts[prayer.key];
                            const isZero = item.remaining <= 0;

                            return (
                                <TouchableOpacity
                                    key={prayer.key}
                                    style={[
                                        styles.gridCard,
                                        { backgroundColor: colors.surface, borderColor: colors.border },
                                    ]}
                                    activeOpacity={0.85}
                                    onPress={() => openDetailedModal(prayer)}
                                >
                                    <View style={styles.gridCardHeader}>
                                        <View style={[styles.gridIconCircle, { backgroundColor: isDark ? '#1F2C26' : '#EAF5EE', borderColor: isDark ? '#2B4037' : '#D1E7DD' }]}>
                                            <Ionicons name={prayer.icon} size={18} color={colors.primary} />
                                        </View>
                                        <View style={styles.gridTitleArea}>
                                            <Text
                                                style={[
                                                    styles.gridPrayerName,
                                                    { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false },
                                                    isUrdu && { fontSize: 17, lineHeight: 24 },
                                                ]}
                                                numberOfLines={1}
                                            >
                                                {isUrdu ? prayer.nameUr : prayer.nameEn}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.gridRakatsText,
                                                    { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false },
                                                    isUrdu && { fontSize: 13, lineHeight: 18 },
                                                ]}
                                            >
                                                {isUrdu ? prayer.rakatsUr : prayer.rakatsEn}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.gridStatusArea}>
                                        <Text style={[styles.gridStatusText, { color: isZero ? colors.primary : '#8E9AA0', fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 15 }]}>
                                            {item.remaining} {isUrdu ? 'باقی' : 'remaining'}
                                        </Text>
                                        <Text style={[styles.gridCoveredSub, { color: colors.secondaryText, fontFamily: fonts.medium, includeFontPadding: false }, isUrdu && { fontSize: 13 }]}>
                                            {item.completed} {isUrdu ? 'ادا شدہ' : 'covered'}
                                        </Text>
                                    </View>

                                    {/* Quick Action Button: Inactive/Unfilled by default to indicate completion is needed */}
                                    <TouchableOpacity
                                        style={[
                                            styles.quickActionBtn,
                                            {
                                                backgroundColor: isZero
                                                    ? (isDark ? '#232E2A' : '#F3F4F6')
                                                    : 'transparent',
                                                borderColor: isZero ? colors.border : colors.primary,
                                                borderWidth: 1.5,
                                            },
                                        ]}
                                        disabled={isZero}
                                        onPress={() => handleQuickMadeUp(prayer.key)}
                                        activeOpacity={0.7}
                                    >
                                        <Ionicons
                                            name={isZero ? "checkmark-done-circle" : "ellipse-outline"}
                                            size={15}
                                            color={isZero ? colors.secondaryText : colors.primary}
                                            style={{ marginRight: 5 }}
                                        />
                                        <Text
                                            style={[
                                                styles.quickActionBtnText,
                                                {
                                                    color: isZero ? colors.secondaryText : colors.primary,
                                                    fontFamily: fonts.bold,
                                                    includeFontPadding: false,
                                                },
                                                isUrdu && { fontSize: 14 },
                                            ]}
                                        >
                                            {isZero
                                                ? (isUrdu ? 'مکمل' : 'All Clear')
                                                : (isUrdu ? '+1 قضا ادا کی' : '+1 Mark Prayed')}
                                        </Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    {/* Bottom Save Action */}
                    <TouchableOpacity
                        style={[styles.saveAllButton, { backgroundColor: colors.primary }]}
                        onPress={handleSaveChanges}
                        disabled={syncing}
                        activeOpacity={0.85}
                    >
                        {syncing ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <>
                                <Ionicons name="checkmark-done" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
                                <Text style={[styles.saveAllButtonText, { fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 16 }]}>
                                    {isUrdu ? 'محفوظ کریں' : 'Save Changes'}
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                </ScrollView>

                {/* Floating Undo Snackbar for quick accidental taps */}
                {undoAction && (
                    <View style={[styles.undoSnackbar, { backgroundColor: isDark ? '#1F2937' : '#111827' }]}>
                        <View style={styles.undoSnackbarLeft}>
                            <Ionicons name="checkmark-circle" size={18} color="#10B981" style={{ marginRight: 8 }} />
                            <Text style={[styles.undoSnackbarText, { color: '#FFFFFF', fontFamily: fonts.medium, includeFontPadding: false }, isUrdu && { fontSize: 14 }]} numberOfLines={1}>
                                {undoAction.message}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.undoButton} onPress={handleUndoLastAction} activeOpacity={0.8}>
                            <Ionicons name="arrow-undo" size={14} color="#FBBF24" style={{ marginRight: 4 }} />
                            <Text style={[styles.undoButtonText, { fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 14 }]}>
                                {isUrdu ? 'واپس لیں' : 'Undo'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* =========================================================================
                DETAILED PRAYER MODAL (Sections A, B, and C)
               ========================================================================= */}
            <Modal visible={detailModalVisible} transparent={true} animationType="fade" onRequestClose={() => setDetailModalVisible(false)}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalOverlay}>
                    <View style={[styles.detailModalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        {/* Header */}
                        <View style={[styles.detailModalHeader, { borderBottomColor: colors.borderLight }]}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.detailModalTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 21, lineHeight: 28 }]}>
                                    {activePrayer ? (isUrdu ? `${activePrayer.nameUr} قضا` : `${activePrayer.nameEn} Qaza`) : 'Prayer Qaza'}
                                </Text>
                                <Text style={[styles.detailModalSublabel, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 14, lineHeight: 20 }]}>
                                    {isUrdu ? 'قضا نمازوں کا تفصیلی جائزہ' : 'Detailed view of missed prayers'}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.detailModalCloseBtn}
                                onPress={() => setDetailModalVisible(false)}
                                activeOpacity={0.7}
                            >
                                <Ionicons name="close" size={24} color={colors.secondaryText} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} style={styles.detailModalScroll}>
                            {activePrayer && (
                                <>
                                    {/* SECTION A: Specific Dates Missed */}
                                    <View style={[styles.modalSectionCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
                                        <View style={styles.modalSectionTitleRow}>
                                            <Ionicons name="calendar-outline" size={18} color={colors.primary} style={{ marginRight: 6 }} />
                                            <Text style={[styles.modalSectionTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                                                {isUrdu ? 'سیکشن A: چھٹی ہوئی مخصوص تاریخیں' : 'Section A - Specific Dates Missed'}
                                            </Text>
                                        </View>
                                        <Text style={[styles.modalSectionDesc, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                                            {isUrdu
                                                ? 'ماہانہ میٹرکس سے خودکار طریقے سے معلوم کی گئی غیر ادا شدہ نمازیں:'
                                                : 'Auto-detected missed prayers from monthly consistency matrix logs:'}
                                        </Text>

                                        {activeMissedDates.length === 0 ? (
                                            <View style={[styles.emptyDatesBanner, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
                                                <Ionicons name="checkmark-done-circle-outline" size={22} color={colors.primary} style={{ marginRight: 8 }} />
                                                <Text style={[styles.emptyDatesText, { color: colors.secondaryText, fontFamily: fonts.medium, includeFontPadding: false }, isUrdu && { fontSize: 14 }]}>
                                                    {isUrdu ? 'اس مہینے کے لاگ میں کوئی غیر ادا شدہ تاریخ نہیں ملی۔' : 'No unfulfilled prayer logs detected for this month.'}
                                                </Text>
                                            </View>
                                        ) : (
                                            <View style={styles.missedDatesList}>
                                                {activeMissedDates.slice(0, 5).map((dItem) => (
                                                    <View
                                                        key={dItem.dateStr}
                                                        style={[styles.missedDateRow, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
                                                    >
                                                        <View style={{ flex: 1 }}>
                                                            <Text style={[styles.missedDateLabel, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 15 }]}>
                                                                {dItem.formatted}
                                                            </Text>
                                                            <Text style={[styles.missedDateSub, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 13 }]}>
                                                                {isUrdu ? activePrayer.rakatsUr : activePrayer.rakatsEn}
                                                            </Text>
                                                        </View>
                                                        <TouchableOpacity
                                                            style={[styles.prayedDateBtn, { backgroundColor: colors.primary }]}
                                                            onPress={() => handlePraySpecificDate(dItem)}
                                                            activeOpacity={0.8}
                                                        >
                                                            <Ionicons name="checkmark" size={14} color="#FFFFFF" style={{ marginRight: 4 }} />
                                                            <Text style={[styles.prayedDateBtnText, { fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 15 }]}>
                                                                {isUrdu ? 'ادا کی' : 'Prayed'}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                ))}
                                                {activeMissedDates.length > 5 && (
                                                    <Text style={[styles.moreDatesNotice, { color: colors.secondaryText, fontFamily: fonts.medium, includeFontPadding: false }, isUrdu && { fontSize: 14 }]}>
                                                        +{activeMissedDates.length - 5} {isUrdu ? 'مزید تاریخیں موجود ہیں' : 'more unfulfilled dates detected'}
                                                    </Text>
                                                )}
                                            </View>
                                        )}
                                    </View>

                                    {/* SECTION B: Historic Backlog */}
                                    <View style={[styles.modalSectionCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
                                        <View style={styles.modalSectionTitleRow}>
                                            <Ionicons name="time-outline" size={18} color={colors.primary} style={{ marginRight: 6 }} />
                                            <Text style={[styles.modalSectionTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                                                {isUrdu ? 'سیکشن B: گزشتہ قضا کا مجموعی حساب' : 'Section B - Historic Backlog'}
                                            </Text>
                                        </View>
                                        <Text style={[styles.modalSectionDesc, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                                            {isUrdu
                                                ? 'گزشتہ سالوں یا مہینوں کی مجموعی قضا نمازیں اور فوری ادائیگی:'
                                                : 'Displays bulk remaining count with a quick fulfillment action:'}
                                        </Text>

                                        <View style={[styles.historicBacklogRow, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
                                            <View>
                                                <Text style={[styles.historicBacklogNumber, { color: counts[activePrayer.key].remaining > 0 ? colors.danger : colors.primary, fontFamily: fonts.bold }]}>
                                                    {counts[activePrayer.key].remaining}
                                                </Text>
                                                <Text style={[styles.historicBacklogSub, { color: colors.secondaryText, fontFamily: fonts.medium, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                                                    {isUrdu ? 'کل قضا باقی' : 'Bulk Remaining'}
                                                </Text>
                                            </View>

                                            <TouchableOpacity
                                                style={[
                                                    styles.prayedOneBtn,
                                                    {
                                                        backgroundColor: counts[activePrayer.key].remaining <= 0 ? (isDark ? '#2A3833' : '#E8ECEF') : colors.primary,
                                                    },
                                                ]}
                                                onPress={handleModalPrayedOne}
                                                disabled={counts[activePrayer.key].remaining <= 0}
                                                activeOpacity={0.8}
                                            >
                                                <Ionicons
                                                    name="checkmark-done"
                                                    size={16}
                                                    color={counts[activePrayer.key].remaining <= 0 ? colors.secondaryText : '#FFFFFF'}
                                                    style={{ marginRight: 6 }}
                                                />
                                                <Text
                                                    style={[
                                                        styles.prayedOneBtnText,
                                                        {
                                                            color: counts[activePrayer.key].remaining <= 0 ? colors.secondaryText : '#FFFFFF',
                                                            fontFamily: fonts.bold,
                                                            includeFontPadding: false,
                                                        },
                                                        isUrdu && { fontSize: 15 },
                                                    ]}
                                                >
                                                    {isUrdu ? 'ایک ادا کی' : 'Prayed One'}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    {/* SECTION C: Add Historic Qaza */}
                                    <View style={[styles.modalSectionCard, { backgroundColor: colors.background, borderColor: colors.border }]}>
                                        <View style={styles.modalSectionTitleRow}>
                                            <Ionicons name="add-circle-outline" size={18} color={colors.primary} style={{ marginRight: 6 }} />
                                            <Text style={[styles.modalSectionTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                                                {isUrdu ? 'سیکشن C: اضافی قضا شامل کریں' : 'Section C - Add Historic Qaza'}
                                            </Text>
                                        </View>
                                        <Text style={[styles.modalSectionDesc, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                                            {isUrdu
                                                ? 'اگر ماضی کی قضا نمازوں کی تعداد شامل کرنی ہو تو یہاں درج کریں:'
                                                : 'Increase your backlog count by entering past unprayed prayers:'}
                                        </Text>

                                        <View style={styles.addQazaInputRow}>
                                            <TextInput
                                                style={[
                                                    styles.addQazaInput,
                                                    {
                                                        backgroundColor: colors.surface,
                                                        borderColor: colors.border,
                                                        color: colors.text,
                                                        fontFamily: fonts.semiBold,
                                                    },
                                                ]}
                                                placeholder={isUrdu ? 'تعداد (مثلاً 10)' : 'Amount (e.g. 10)'}
                                                placeholderTextColor={colors.textPlaceholder}
                                                keyboardType="numeric"
                                                value={addHistoricInput}
                                                onChangeText={setAddHistoricInput}
                                            />
                                            <TouchableOpacity
                                                style={[styles.addQazaBtn, { backgroundColor: colors.primary }]}
                                                onPress={handleAddHistoricQaza}
                                                activeOpacity={0.8}
                                            >
                                                <Ionicons name="add" size={18} color="#FFFFFF" style={{ marginRight: 4 }} />
                                                <Text style={[styles.addQazaBtnText, { fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 15 }]}>
                                                    {isUrdu ? 'شامل کریں' : 'Add'}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </>
                            )}
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            {/* =========================================================================
                HISTORY LOG MODAL (Chronological: Today, Yesterday, Earlier)
               ========================================================================= */}
            <Modal visible={historyModalVisible} transparent={true} animationType="slide" onRequestClose={() => setHistoryModalVisible(false)}>
                <SafeAreaView style={styles.historyModalOverlay}>
                    <View style={[styles.historyModalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        {/* Header */}
                        <View style={[styles.historyModalHeader, { borderBottomColor: colors.borderLight }]}>
                            <View style={styles.historyHeaderLeft}>
                                <Ionicons name="time-outline" size={22} color={colors.primary} style={{ marginRight: 8 }} />
                                <Text style={[styles.historyModalTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 21, lineHeight: 28 }]}>
                                    {isUrdu ? 'قضا ہسٹری لاگ' : 'Qaza History Log'}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.historyCloseBtn}
                                onPress={() => setHistoryModalVisible(false)}
                                activeOpacity={0.7}
                            >
                                <Ionicons name="close" size={24} color={colors.secondaryText} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.historyScrollContent}>
                            {history.length === 0 ? (
                                <View style={styles.emptyHistoryWrap}>
                                    <Ionicons name="calendar-clear-outline" size={48} color={colors.secondaryText} style={{ marginBottom: 12 }} />
                                    <Text style={[styles.emptyHistoryTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 18, lineHeight: 25 }]}>
                                        {isUrdu ? 'کوئی ہسٹری ریکارڈ موجود نہیں' : 'No History Recorded'}
                                    </Text>
                                    <Text style={[styles.emptyHistorySub, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                                        {isUrdu
                                            ? 'ابھی تک کوئی قضا نماز درج نہیں ہوئی۔ کسی بھی نماز پر "+1 ادا کی" دبا کر شروعات کریں۔'
                                            : "No Qaza prayers logged yet. Tap '+1 Made Up' on any prayer to start tracking."}
                                    </Text>
                                </View>
                            ) : (
                                <>
                                    {/* Today Group */}
                                    {groupedHistory.today.length > 0 && (
                                        <View style={styles.historyGroupSection}>
                                            <Text style={[styles.historyGroupTitle, { color: colors.primary, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                                                {isUrdu ? 'آج' : 'Today'} ({groupedHistory.today.length})
                                            </Text>
                                            {groupedHistory.today.map((item) => (
                                                <View
                                                    key={item.id}
                                                    style={[styles.historyItemRow, { backgroundColor: colors.background, borderColor: colors.borderLight }]}
                                                >
                                                    <View style={[styles.historyCheckCircle, { backgroundColor: colors.primaryLight }]}>
                                                        <Ionicons name="checkmark" size={14} color={colors.primary} />
                                                    </View>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={[styles.historyItemText, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 16, lineHeight: 22 }]}>
                                                            {item.prayerName} • 1 {isUrdu ? 'ادا کی' : 'made up'}
                                                        </Text>
                                                        <Text style={[styles.historyItemTime, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                                            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </Text>
                                                    </View>
                                                    <TouchableOpacity
                                                        style={[styles.historyRevertBtn, { borderColor: colors.borderLight }]}
                                                        onPress={() => handleRevertHistoryRecord(item)}
                                                        activeOpacity={0.7}
                                                    >
                                                        <Ionicons name="arrow-undo-outline" size={13} color={colors.secondaryText} style={{ marginRight: 3 }} />
                                                        <Text style={[styles.historyRevertBtnText, { color: colors.secondaryText, fontFamily: fonts.medium, includeFontPadding: false }, isUrdu && { fontSize: 13 }]}>
                                                            {isUrdu ? 'واپس لیں' : 'Revert'}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                        </View>
                                    )}

                                    {/* Yesterday Group */}
                                    {groupedHistory.yesterday.length > 0 && (
                                        <View style={styles.historyGroupSection}>
                                            <Text style={[styles.historyGroupTitle, { color: colors.primary, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                                                {isUrdu ? 'گزشتہ کل' : 'Yesterday'} ({groupedHistory.yesterday.length})
                                            </Text>
                                            {groupedHistory.yesterday.map((item) => (
                                                <View
                                                    key={item.id}
                                                    style={[styles.historyItemRow, { backgroundColor: colors.background, borderColor: colors.borderLight }]}
                                                >
                                                    <View style={[styles.historyCheckCircle, { backgroundColor: colors.primaryLight }]}>
                                                        <Ionicons name="checkmark" size={14} color={colors.primary} />
                                                    </View>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={[styles.historyItemText, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 16, lineHeight: 22 }]}>
                                                            {item.prayerName} • 1 {isUrdu ? 'ادا کی' : 'made up'}
                                                        </Text>
                                                        <Text style={[styles.historyItemTime, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                                            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </Text>
                                                    </View>
                                                    <TouchableOpacity
                                                        style={[styles.historyRevertBtn, { borderColor: colors.borderLight }]}
                                                        onPress={() => handleRevertHistoryRecord(item)}
                                                        activeOpacity={0.7}
                                                    >
                                                        <Ionicons name="arrow-undo-outline" size={13} color={colors.secondaryText} style={{ marginRight: 3 }} />
                                                        <Text style={[styles.historyRevertBtnText, { color: colors.secondaryText, fontFamily: fonts.medium, includeFontPadding: false }, isUrdu && { fontSize: 13 }]}>
                                                            {isUrdu ? 'واپس لیں' : 'Revert'}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                        </View>
                                    )}

                                    {/* Earlier Group */}
                                    {groupedHistory.earlier.length > 0 && (
                                        <View style={styles.historyGroupSection}>
                                            <Text style={[styles.historyGroupTitle, { color: colors.primary, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                                                {isUrdu ? 'پہلے کی تواریخ' : 'Earlier'} ({groupedHistory.earlier.length})
                                            </Text>
                                            {groupedHistory.earlier.map((item) => (
                                                <View
                                                    key={item.id}
                                                    style={[styles.historyItemRow, { backgroundColor: colors.background, borderColor: colors.borderLight }]}
                                                >
                                                    <View style={[styles.historyCheckCircle, { backgroundColor: colors.primaryLight }]}>
                                                        <Ionicons name="checkmark" size={14} color={colors.primary} />
                                                    </View>
                                                    <View style={{ flex: 1 }}>
                                                        <Text style={[styles.historyItemText, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 16, lineHeight: 22 }]}>
                                                            {item.prayerName} • 1 {isUrdu ? 'ادا کی' : 'made up'}
                                                        </Text>
                                                        <Text style={[styles.historyItemTime, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                                            {item.dateString} - {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </Text>
                                                    </View>
                                                    <TouchableOpacity
                                                        style={[styles.historyRevertBtn, { borderColor: colors.borderLight }]}
                                                        onPress={() => handleRevertHistoryRecord(item)}
                                                        activeOpacity={0.7}
                                                    >
                                                        <Ionicons name="arrow-undo-outline" size={13} color={colors.secondaryText} style={{ marginRight: 3 }} />
                                                        <Text style={[styles.historyRevertBtnText, { color: colors.secondaryText, fontFamily: fonts.medium, includeFontPadding: false }, isUrdu && { fontSize: 13 }]}>
                                                            {isUrdu ? 'واپس لیں' : 'Revert'}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            ))}
                                        </View>
                                    )}

                                    {/* Clear History Button */}
                                    <TouchableOpacity
                                        style={[styles.clearHistoryBtn, { borderColor: colors.border }]}
                                        onPress={handleClearHistory}
                                        activeOpacity={0.7}
                                    >
                                        <Ionicons name="trash-outline" size={16} color={colors.danger} style={{ marginRight: 6 }} />
                                        <Text style={[styles.clearHistoryBtnText, { color: colors.danger, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 15 }]}>
                                            {isUrdu ? 'ہسٹری ریکارڈ صاف کریں' : 'Clear History Log'}
                                        </Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </Modal>
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
    headerIconButton: {
        width: 32,
        height: 32,
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
    bodyContainer: {
        flex: 1,
    },
    noticeBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    noticeText: {
        fontSize: 12.5,
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 32,
    },
    motivationalQuote: {
        fontSize: 13,
        textAlign: 'center',
        marginVertical: 12,
        paddingHorizontal: 20,
        lineHeight: 18,
    },
    heroCard: {
        marginHorizontal: 16,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        marginBottom: 8,
    },
    heroTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    ringWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    ringOuter: {
        width: 96,
        height: 96,
        borderRadius: 48,
        borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    ringInner: {
        width: '100%',
        height: '100%',
        borderRadius: 42,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ringPercentText: {
        fontSize: 20,
        lineHeight: 24,
    },
    ringLabelText: {
        fontSize: 9.5,
        letterSpacing: 0.3,
        marginTop: -1,
    },
    metricsColumn: {
        flex: 1,
        gap: 8,
    },
    metricBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 8,
        borderWidth: 1,
    },
    badgeLeftIndicator: {
        width: 3.5,
        height: 12,
        borderRadius: 2,
    },
    metricBadgeLabel: {
        fontSize: 12,
    },
    metricBadgeValue: {
        fontSize: 13,
    },
    horizontalBarWrap: {
        marginTop: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(128, 128, 128, 0.15)',
    },
    horizontalBarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    horizontalBarText: {
        fontSize: 12,
    },
    horizontalBarPercent: {
        fontSize: 12,
    },
    progressBarTrack: {
        height: 8,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    gridSectionHeader: {
        fontSize: 16,
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 10,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    gridCard: {
        width: (SCREEN_WIDTH - 32 - 12) / 2,
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
        marginBottom: 12,
        justifyContent: 'space-between',
    },
    weekGlanceCard: {
        marginHorizontal: 16,
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        marginBottom: 10,
    },
    weekGlanceHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    weekGlanceTitle: {
        fontSize: 13,
    },
    weekGlanceSub: {
        fontSize: 12,
    },
    weekDotsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    weekDotCol: {
        alignItems: 'center',
        gap: 5,
    },
    weekDayLabel: {
        fontSize: 10,
        textTransform: 'uppercase',
    },
    weekDotCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    weekDotEmpty: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    weekDayNum: {
        fontSize: 11,
    },
    fullProgressBtn: {
        marginHorizontal: 16,
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    fullProgressBtnText: {
        fontSize: 13,
    },
    gridCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 10,
    },
    gridIconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    gridTitleArea: {
        flex: 1,
    },
    gridPrayerName: {
        fontSize: 15,
        lineHeight: 19,
        includeFontPadding: false,
    },
    gridRakatsText: {
        fontSize: 10.5,
        marginTop: 1,
        includeFontPadding: false,
    },
    gridStatusArea: {
        marginBottom: 12,
    },
    gridStatusText: {
        fontSize: 13,
        marginVertical: 2,
    },
    gridCoveredSub: {
        fontSize: 10.5,
    },
    quickActionBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
    },
    quickActionBtnText: {
        fontSize: 12,
    },
    saveAllButton: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16,
        borderRadius: 12,
        marginTop: 8,
    },
    saveAllButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        letterSpacing: 0.3,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 32,
    },
    detailModalCard: {
        width: '100%',
        maxHeight: '88%',
        borderRadius: 18,
        padding: 18,
        borderWidth: 1,
    },
    detailModalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingBottom: 12,
        borderBottomWidth: 1,
        marginBottom: 12,
    },
    detailModalTitle: {
        fontSize: 18,
    },
    detailModalSublabel: {
        fontSize: 12,
        marginTop: 2,
    },
    detailModalCloseBtn: {
        padding: 4,
    },
    detailModalScroll: {
        flexGrow: 0,
    },
    modalSectionCard: {
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        marginBottom: 14,
    },
    modalSectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    modalSectionTitle: {
        fontSize: 13.5,
    },
    modalSectionDesc: {
        fontSize: 11.5,
        marginBottom: 10,
        lineHeight: 16,
    },
    emptyDatesBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
    },
    emptyDatesText: {
        fontSize: 12,
        flex: 1,
    },
    missedDatesList: {
        gap: 8,
    },
    missedDateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
    },
    missedDateLabel: {
        fontSize: 12.5,
    },
    missedDateSub: {
        fontSize: 10.5,
        marginTop: 2,
    },
    prayedDateBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    prayedDateBtnText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    moreDatesNotice: {
        fontSize: 11,
        textAlign: 'center',
        marginTop: 4,
    },
    historicBacklogRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
    },
    historicBacklogNumber: {
        fontSize: 22,
    },
    historicBacklogSub: {
        fontSize: 11,
        marginTop: 2,
    },
    prayedOneBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 8,
    },
    prayedOneBtnText: {
        fontSize: 12.5,
    },
    addQazaInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    addQazaInput: {
        flex: 1,
        height: 44,
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 12,
        fontSize: 14,
    },
    addQazaBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 44,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    addQazaBtnText: {
        color: '#FFFFFF',
        fontSize: 13,
    },
    historyModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        justifyContent: 'flex-end',
    },
    historyModalCard: {
        width: '100%',
        maxHeight: '85%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 18,
        paddingTop: 16,
        paddingBottom: 24,
    },
    historyModalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 12,
        borderBottomWidth: 1,
        marginBottom: 12,
    },
    historyHeaderLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    historyModalTitle: {
        fontSize: 17,
    },
    historyCloseBtn: {
        padding: 4,
    },
    historyScrollContent: {
        paddingBottom: 20,
    },
    emptyHistoryWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
    },
    emptyHistoryTitle: {
        fontSize: 16,
        marginBottom: 6,
    },
    emptyHistorySub: {
        fontSize: 12.5,
        textAlign: 'center',
        lineHeight: 18,
    },
    historyGroupSection: {
        marginBottom: 16,
    },
    historyGroupTitle: {
        fontSize: 13,
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    historyItemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        marginBottom: 6,
    },
    historyCheckCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    historyItemText: {
        fontSize: 13,
    },
    historyItemTime: {
        fontSize: 11,
        marginTop: 2,
    },
    clearHistoryBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 8,
        borderWidth: 1,
        marginTop: 12,
    },
    clearHistoryBtnText: {
        fontSize: 13,
    },
    historyRevertBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        marginLeft: 8,
    },
    historyRevertBtnText: {
        fontSize: 11.5,
    },
    undoSnackbar: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
        zIndex: 99,
    },
    undoSnackbarLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 8,
    },
    undoSnackbarText: {
        fontSize: 13,
        flex: 1,
    },
    undoButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(251, 191, 36, 0.15)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6,
    },
    undoButtonText: {
        fontSize: 12.5,
        color: '#FBBF24',
    },
});
