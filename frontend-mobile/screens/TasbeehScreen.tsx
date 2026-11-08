import React, { useState, useEffect, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert,
    Dimensions,
    Vibration,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Path, Rect, Line } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useArabic } from '../context/ArabicContext';
import { soundHapticService } from '../services/soundHapticsService';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DIAL_SIZE = Math.min(SCREEN_WIDTH * 0.72, 270);
const STROKE_WIDTH = 10;
const RADIUS = (DIAL_SIZE - STROKE_WIDTH - 2) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export interface ZikrItem {
    id: string;
    en: string;
    ur: string;
}

const DEFAULT_PRESET_ZIKR: ZikrItem[] = [
    { id: 'subhanallah', en: 'SubhanAllah', ur: 'سُبْحَانَ اللَّهِ' },
    { id: 'alhamdulillah', en: 'Alhamdulillah', ur: 'الْحَمْدُ لِلَّهِ' },
    { id: 'allahuakbar', en: 'Allahu Akbar', ur: 'اللَّهُ أَكْبَرُ' },
    { id: 'astaghfirullah', en: 'Astaghfirullah', ur: 'أَسْتَغْفِرُ اللَّهَ' },
    { id: 'lailahaillallah', en: 'La ilaha illallah', ur: 'لَا إِلَٰهَ إِلَّا اللَّهُ' },
    { id: 'durood', en: 'Durood Sharif', ur: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ' },
];

/**
 * Genuine Vibration Icon with Phone and Wave Ripples on Both Sides
 */
const VibrationIcon = ({ size = 22, color = '#0D5C3A', active = true }: { size?: number; color?: string; active?: boolean }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        {/* Left vibration ripple waves */}
        <Path
            d="M3 8.5C2.3 9.6 1.9 10.7 1.9 12C1.9 13.3 2.3 14.4 3 15.5"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity={active ? 1 : 0.25}
        />
        <Path
            d="M5.5 10C5.1 10.6 4.9 11.3 4.9 12C4.9 12.7 5.1 13.4 5.5 14"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity={active ? 1 : 0.25}
        />
        {/* Center smartphone body */}
        <Rect
            x="8"
            y="5"
            width="8"
            height="14"
            rx="2"
            stroke={color}
            strokeWidth="1.8"
        />
        {/* Top speaker slit */}
        <Line
            x1="10.5"
            y1="7.5"
            x2="13.5"
            y2="7.5"
            stroke={color}
            strokeWidth="1.4"
            strokeLinecap="round"
        />
        {/* Bottom home button dot */}
        <Circle
            cx="12"
            cy="16.5"
            r="0.8"
            fill={color}
        />
        {/* Right vibration ripple waves */}
        <Path
            d="M18.5 10C18.9 10.6 19.1 11.3 19.1 12C19.1 12.7 18.9 13.4 18.5 14"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity={active ? 1 : 0.25}
        />
        <Path
            d="M21 8.5C21.7 9.6 22.1 10.7 22.1 12C22.1 13.3 21.7 14.4 21 15.5"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity={active ? 1 : 0.25}
        />
        {/* Inactive strike-through slash if muted */}
        {!active && (
            <Line
                x1="4"
                y1="20"
                x2="20"
                y2="4"
                stroke={color}
                strokeWidth="1.8"
                strokeLinecap="round"
            />
        )}
    </Svg>
);

export default function TasbeehScreen({ navigation }: any) {
    const { colors, isDark } = useTheme();
    const { t, isUrdu, fonts } = useLanguage();
    const { getArabicStyle } = useArabic();

    const [userEmail, setUserEmail] = useState<string>('');
    const [count, setCount] = useState<number>(0);
    const [target, setTarget] = useState<number | null>(33); // null means Unlimited (ان گنت)
    const [completedRounds, setCompletedRounds] = useState<number>(0);

    // Current Recitation
    const [currentZikr, setCurrentZikr] = useState<ZikrItem>(DEFAULT_PRESET_ZIKR[0]);
    const [recentZikrs, setRecentZikrs] = useState<ZikrItem[]>(DEFAULT_PRESET_ZIKR.slice(0, 4));

    // Audio / Haptic toggles
    const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
    const [hapticsEnabled, setHapticsEnabled] = useState<boolean>(true);

    // Modals
    const [targetModalVisible, setTargetModalVisible] = useState<boolean>(false);
    const [zikrModalVisible, setZikrModalVisible] = useState<boolean>(false);
    const [celebrationVisible, setCelebrationVisible] = useState<boolean>(false);

    // Inputs inside modals
    const [customTargetInput, setCustomTargetInput] = useState<string>('');
    const [customZikrEnInput, setCustomZikrEnInput] = useState<string>('');
    const [customZikrUrInput, setCustomZikrUrInput] = useState<string>('');

    const getStateKey = (email: string) => `userTasbeehState_${email || 'guest'}`;
    const getRecentZikrKey = (email: string) => `userTasbeehRecentZikr_${email || 'guest'}`;

    useEffect(() => {
        loadPersistedState();
    }, []);

    const loadPersistedState = async () => {
        try {
            const email = (await AsyncStorage.getItem('userEmail')) || '';
            setUserEmail(email);

            // Load audio/haptics preferences
            const sound = await soundHapticService.getSoundEnabled();
            const haptic = await soundHapticService.getHapticsEnabled();
            setSoundEnabled(sound);
            setHapticsEnabled(haptic);

            // Load Tasbeeh state
            const stateRaw = await AsyncStorage.getItem(getStateKey(email));
            if (stateRaw) {
                try {
                    const parsed = JSON.parse(stateRaw);
                    if (typeof parsed.count === 'number') setCount(parsed.count);
                    if (parsed.target === null || typeof parsed.target === 'number') setTarget(parsed.target);
                    if (typeof parsed.completedRounds === 'number') setCompletedRounds(parsed.completedRounds);
                    if (parsed.currentZikr) setCurrentZikr(parsed.currentZikr);
                } catch {
                    // Fallback to defaults
                }
            } else {
                // Legacy check
                const legCount = await AsyncStorage.getItem('tasbeeh_count');
                const legTarget = await AsyncStorage.getItem('tasbeeh_target');
                const legRounds = await AsyncStorage.getItem('tasbeeh_rounds');
                if (legCount !== null) setCount(parseInt(legCount, 10) || 0);
                if (legTarget !== null) setTarget(parseInt(legTarget, 10) || 33);
                if (legRounds !== null) setCompletedRounds(parseInt(legRounds, 10) || 0);
            }

            // Load Recent Zikrs
            const recentRaw = await AsyncStorage.getItem(getRecentZikrKey(email));
            if (recentRaw) {
                try {
                    setRecentZikrs(JSON.parse(recentRaw));
                } catch {
                    // Fallback
                }
            }
        } catch {
            // Non-blocking fallback
        }
    };

    const persistTasbeehState = async (
        nextCount: number,
        nextTarget: number | null,
        nextZikr: ZikrItem,
        nextRounds: number
    ) => {
        setCount(nextCount);
        setTarget(nextTarget);
        setCurrentZikr(nextZikr);
        setCompletedRounds(nextRounds);

        const payload = {
            count: nextCount,
            target: nextTarget,
            currentZikr: nextZikr,
            completedRounds: nextRounds,
            updatedAt: Date.now(),
        };

        const key = getStateKey(userEmail);
        await AsyncStorage.setItem(key, JSON.stringify(payload)).catch(() => {});
        await AsyncStorage.setItem('tasbeeh_count', nextCount.toString()).catch(() => {});
        await AsyncStorage.setItem('tasbeeh_target', nextTarget === null ? '0' : nextTarget.toString()).catch(() => {});
    };

    // Toggle Sound Button
    const handleToggleSound = async () => {
        const next = !soundEnabled;
        setSoundEnabled(next);
        await soundHapticService.setSoundEnabled(next);
        if (next) {
            try {
                Vibration.vibrate(15);
            } catch {}
        }
    };

    // Toggle Vibration Button
    const handleToggleVibration = async () => {
        const next = !hapticsEnabled;
        setHapticsEnabled(next);
        await soundHapticService.setHapticsEnabled(next);
        if (next) {
            try {
                Vibration.vibrate(30);
            } catch {}
        }
    };

    // Reset Button
    const handleReset = () => {
        if (count === 0) return;
        if (hapticsEnabled) {
            try {
                Vibration.vibrate(20);
            } catch {}
        }

        Alert.alert(
            isUrdu ? 'شمار صفر کریں' : 'Reset Counter',
            isUrdu ? 'کیا آپ واقعی موجودہ شمار کو 0 کرنا چاہتے ہیں؟' : 'Are you sure you want to reset current count to 0?',
            [
                { text: isUrdu ? 'منسوخ' : 'Cancel', style: 'cancel' },
                {
                    text: isUrdu ? 'صفر کریں' : 'Reset',
                    style: 'destructive',
                    onPress: () => {
                        if (hapticsEnabled) {
                            try {
                                Vibration.vibrate(25);
                            } catch {}
                        }
                        persistTasbeehState(0, target, currentZikr, completedRounds);
                    },
                },
            ]
        );
    };

    // Tap Dial Increment
    const handleDialTap = () => {
        const next = count + 1;

        // Feedback triggers via configured preset (Wood bead sound / Soft tap / Haptic vibration)
        soundHapticService.playTasbeehFeedback();

        // Numeric target completion check
        if (target !== null && target > 0 && next >= target && count < target) {
            // Target completed celebration impulse
            if (hapticsEnabled) {
                try {
                    Vibration.vibrate([0, 50, 80, 50]);
                } catch {}
            }
            persistTasbeehState(next, target, currentZikr, completedRounds + 1);
            setCelebrationVisible(true);
            return;
        }

        persistTasbeehState(next, target, currentZikr, completedRounds);
    };

    // Next Round Action
    const handleStartNextRound = () => {
        if (hapticsEnabled) {
            try {
                Vibration.vibrate(30);
            } catch {}
        }
        persistTasbeehState(0, target, currentZikr, completedRounds);
        setCelebrationVisible(false);
    };

    // Select Recitation
    const handleSelectZikr = async (zikr: ZikrItem) => {
        if (hapticsEnabled) {
            try {
                Vibration.vibrate(20);
            } catch {}
        }

        // Automatically reset count = 0 and round = 1 if switching recitation
        const isSwitching = zikr.id !== currentZikr.id;
        const nextCount = isSwitching ? 0 : count;
        const nextRounds = isSwitching ? 0 : completedRounds;

        setCurrentZikr(zikr);
        persistTasbeehState(nextCount, target, zikr, nextRounds);

        // Update recents
        const updatedRecents = [zikr, ...recentZikrs.filter((z) => z.id !== zikr.id)].slice(0, 5);
        setRecentZikrs(updatedRecents);
        await AsyncStorage.setItem(getRecentZikrKey(userEmail), JSON.stringify(updatedRecents)).catch(() => {});

        setZikrModalVisible(false);
    };

    // Add Custom Recitation
    const handleAddCustomZikr = async () => {
        const enClean = customZikrEnInput.trim();
        const urClean = customZikrUrInput.trim() || enClean;

        if (!enClean) {
            Alert.alert(isUrdu ? 'نام درکار ہے' : 'Input Required', isUrdu ? 'براہ کرم ذکر کا نام درج کریں۔' : 'Please enter the recitation name.');
            return;
        }

        const newZikr: ZikrItem = {
            id: `custom_${Date.now()}`,
            en: enClean,
            ur: urClean,
        };

        setCustomZikrEnInput('');
        setCustomZikrUrInput('');
        await handleSelectZikr(newZikr);
    };

    // Target Selection Handling
    const handleApplyTargetValue = (newTarget: number | null) => {
        if (hapticsEnabled) {
            try {
                Vibration.vibrate(20);
            } catch {}
        }
        persistTasbeehState(count, newTarget, currentZikr, completedRounds);
        setTargetModalVisible(false);
    };

    const handleApplyCustomTarget = () => {
        const parsed = parseInt(customTargetInput.trim(), 10);
        if (isNaN(parsed) || parsed <= 0) {
            Alert.alert(isUrdu ? 'غلط ہدف' : 'Invalid Target', isUrdu ? 'براہ کرم درست مثبت عدد درج کریں۔' : 'Please enter a valid positive number.');
            return;
        }
        setCustomTargetInput('');
        handleApplyTargetValue(parsed);
    };

    // Dynamic Progress Calculations
    const isTargetReached = target !== null && target > 0 && count >= target;
    const progress = useMemo(() => {
        if (target === null || target <= 0) return 0;
        return Math.min(count / target, 1);
    }, [count, target]);

    const strokeDashoffset = useMemo(() => {
        if (target === null) return CIRCUMFERENCE;
        return CIRCUMFERENCE * (1 - progress);
    }, [progress, target]);

    return (
        <View style={[styles.fullBackground, { backgroundColor: colors.background }]}>
            <StatusBar style="light" />

            {/* Standard Top Bar (56px, theme primary) */}
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
                        {isUrdu ? 'تسبیح کاؤنٹر' : 'Tasbih Counter'}
                    </Text>

                    <View style={styles.headerSpacer} />
                </View>
            </SafeAreaView>

            <View style={[styles.bodyContainer, { backgroundColor: colors.background }]}>
                {/* =========================================================================
                    1. TOP ACTION CONTROLS (Row of 4 circular 52x52 outline buttons)
                   ========================================================================= */}
                <View style={styles.topControlsRow}>
                    {/* 1. Target Modal / Presets Toggle */}
                    <TouchableOpacity
                        style={[
                            styles.controlCircleBtn,
                            {
                                backgroundColor: colors.surface,
                                borderColor: colors.border,
                            },
                        ]}
                        onPress={() => {
                            if (hapticsEnabled) {
                                try {
                                    Vibration.vibrate(20);
                                } catch {}
                            }
                            setTargetModalVisible(true);
                        }}
                        activeOpacity={0.75}
                    >
                        <Ionicons name="options-outline" size={22} color={colors.primary} />
                    </TouchableOpacity>

                    {/* 2. Reset Count to 0 */}
                    <TouchableOpacity
                        style={[
                            styles.controlCircleBtn,
                            {
                                backgroundColor: colors.surface,
                                borderColor: colors.border,
                            },
                        ]}
                        onPress={handleReset}
                        activeOpacity={0.75}
                    >
                        <Ionicons name="reload-outline" size={22} color={colors.danger} />
                    </TouchableOpacity>

                    {/* 3. Direct Sound Toggle */}
                    <TouchableOpacity
                        style={[
                            styles.controlCircleBtn,
                            soundEnabled
                                ? {
                                      backgroundColor: isDark ? 'rgba(30, 126, 82, 0.22)' : '#EAF6EF',
                                      borderColor: colors.primary,
                                  }
                                : {
                                      backgroundColor: colors.surface,
                                      borderColor: colors.border,
                                  },
                        ]}
                        onPress={handleToggleSound}
                        activeOpacity={0.75}
                    >
                        <Ionicons
                            name={soundEnabled ? 'volume-high-outline' : 'volume-mute-outline'}
                            size={22}
                            color={soundEnabled ? colors.primary : colors.secondaryText}
                        />
                    </TouchableOpacity>

                    {/* 4. Direct Vibration Toggle */}
                    <TouchableOpacity
                        style={[
                            styles.controlCircleBtn,
                            hapticsEnabled
                                ? {
                                      backgroundColor: isDark ? 'rgba(30, 126, 82, 0.22)' : '#EAF6EF',
                                      borderColor: colors.primary,
                                  }
                                : {
                                      backgroundColor: colors.surface,
                                      borderColor: colors.border,
                                  },
                        ]}
                        onPress={handleToggleVibration}
                        activeOpacity={0.75}
                    >
                        <VibrationIcon
                            size={22}
                            color={hapticsEnabled ? colors.primary : colors.secondaryText}
                            active={hapticsEnabled}
                        />
                    </TouchableOpacity>
                </View>

                {/* =========================================================================
                    2. CURRENT RECITATION (ZIKR) PICKER PILL
                   ========================================================================= */}
                <TouchableOpacity
                    style={[
                        styles.zikrPill,
                        {
                            backgroundColor: colors.surface,
                            borderColor: colors.border,
                        },
                    ]}
                    onPress={() => {
                        if (hapticsEnabled) {
                            try {
                                Vibration.vibrate(20);
                            } catch {}
                        }
                        setZikrModalVisible(true);
                    }}
                    activeOpacity={0.8}
                >
                    <Ionicons name="book-outline" size={16} color={colors.primary} style={{ marginRight: 8 }} />
                    <Text style={[styles.zikrPillArabic, getArabicStyle(0.65), { color: colors.primary, textAlign: 'left', paddingVertical: 2 }]}>
                        {currentZikr.ur}
                    </Text>
                    <Text style={[styles.zikrPillDot, { color: colors.secondaryText }]}> • </Text>
                    <Text
                        style={[
                            styles.zikrPillEnglish,
                            { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false },
                        ]}
                        numberOfLines={1}
                    >
                        {currentZikr.en}
                    </Text>
                    <Ionicons name="pencil-outline" size={14} color={colors.primary} style={{ marginLeft: 8 }} />
                </TouchableOpacity>

                {/* =========================================================================
                    3. TARGET INDICATOR (Flag Icon + Value / Unlimited)
                   ========================================================================= */}
                <View style={styles.targetIndicatorWrap}>
                    <View style={styles.targetHeaderRow}>
                        <Ionicons name="flag-outline" size={15} color={colors.primary} style={{ marginRight: 6 }} />
                        <Text
                            style={[
                                styles.targetLabel,
                                { color: colors.secondaryText, fontFamily: fonts.bold, includeFontPadding: false },
                            ]}
                        >
                            {isUrdu ? 'ہدف:' : 'TARGET:'}
                        </Text>
                        <Text
                            style={[
                                styles.targetValueText,
                                {
                                    color: target === null ? colors.primary : isTargetReached ? colors.goldDark : colors.text,
                                    fontFamily: fonts.bold,
                                    includeFontPadding: false,
                                },
                            ]}
                        >
                            {target === null ? (isUrdu ? 'ان گنت (∞)' : 'Unlimited (∞)') : target}
                        </Text>
                    </View>

                    {target !== null && (
                        <View style={[styles.roundPillBadge, { backgroundColor: colors.primaryLight }]}>
                            <Text style={[styles.roundPillText, { color: colors.primary, fontFamily: fonts.semiBold, includeFontPadding: false }]}>
                                {isUrdu ? `چکر #${completedRounds + 1}` : `Round #${completedRounds + 1}`}
                            </Text>
                        </View>
                    )}
                </View>

                {/* =========================================================================
                    4. LARGE TAP DIAL WITH CIRCULAR PROGRESS RING (270x270)
                   ========================================================================= */}
                <View style={styles.dialCenterContainer}>
                    <TouchableOpacity
                        style={[styles.dialTouchArea, { width: DIAL_SIZE, height: DIAL_SIZE }]}
                        onPress={handleDialTap}
                        activeOpacity={0.82}
                    >
                        {/* SVG Progress Ring */}
                        <Svg width={DIAL_SIZE} height={DIAL_SIZE} style={styles.svgAbsolute}>
                            {/* Background Track Circle */}
                            <Circle
                                cx={DIAL_SIZE / 2}
                                cy={DIAL_SIZE / 2}
                                r={RADIUS}
                                stroke={isDark ? '#23302B' : '#E8ECEF'}
                                strokeWidth={STROKE_WIDTH}
                                fill={isDark ? '#18241F' : '#FFFFFF'}
                            />

                            {/* Dynamic Animated Progress Stroke */}
                            {target !== null && (
                                <Circle
                                    cx={DIAL_SIZE / 2}
                                    cy={DIAL_SIZE / 2}
                                    r={RADIUS}
                                    stroke={isTargetReached ? '#DFB15B' : colors.primary}
                                    strokeWidth={STROKE_WIDTH}
                                    strokeDasharray={`${CIRCUMFERENCE}`}
                                    strokeDashoffset={`${strokeDashoffset}`}
                                    strokeLinecap="round"
                                    fill="none"
                                    rotation="-90"
                                    origin={`${DIAL_SIZE / 2}, ${DIAL_SIZE / 2}`}
                                />
                            )}
                        </Svg>

                        {/* Dial Inner Content */}
                        <View style={styles.dialInnerContent}>
                            <Text
                                style={[
                                    styles.countMainNumber,
                                    {
                                        color: isTargetReached ? colors.goldDark : colors.text,
                                        fontFamily: fonts.bold,
                                        includeFontPadding: false,
                                    },
                                ]}
                            >
                                {count}
                            </Text>

                            <Text
                                style={[
                                    styles.tapHintLabel,
                                    {
                                        color: isTargetReached ? colors.goldDark : colors.secondaryText,
                                        fontFamily: fonts.bold,
                                        includeFontPadding: false,
                                    },
                                ]}
                            >
                                {isTargetReached
                                    ? isUrdu
                                        ? 'ماشاءاللہ! ہدف مکمل'
                                        : 'TARGET COMPLETED!'
                                    : isUrdu
                                    ? 'شمار کرنے کیلئے دبائیں'
                                    : 'TAP TO COUNT'}
                            </Text>

                            {target !== null && (
                                <Text
                                    style={[
                                        styles.fractionLabel,
                                        { color: colors.secondaryText, fontFamily: fonts.medium, includeFontPadding: false },
                                    ]}
                                >
                                    {count} / {target}
                                </Text>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Subtle Reset / Completion Notice when Target is Hit */}
                {isTargetReached && (
                    <TouchableOpacity
                        style={[styles.nextRoundPillBtn, { backgroundColor: colors.primary }]}
                        onPress={handleStartNextRound}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="refresh" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                        <Text style={[styles.nextRoundPillText, { fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 16 }]}>
                            {isUrdu ? 'اگلا چکر شروع کریں' : 'Start Next Round'}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>

            {/* =========================================================================
                TARGET SELECTION MODAL (Grid: 33, 100, 1000, Unlimited, Custom)
               ========================================================================= */}
            <Modal visible={targetModalVisible} transparent={true} animationType="fade" onRequestClose={() => setTargetModalVisible(false)}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalBackdrop}>
                    <View style={[styles.modalBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={[styles.modalHeader, { borderBottomColor: colors.borderLight }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="options-outline" size={20} color={colors.primary} style={{ marginRight: 8 }} />
                                <Text style={[styles.modalBoxTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 18, lineHeight: 25 }]}>
                                    {isUrdu ? 'ہدف کا انتخاب کریں' : 'Select Target Count'}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => setTargetModalVisible(false)} style={styles.modalCloseIconBtn}>
                                <Ionicons name="close" size={22} color={colors.secondaryText} />
                            </TouchableOpacity>
                        </View>

                        <Text style={[styles.modalInstructionText, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                            {isUrdu ? 'مطلوبہ ہدف منتخب کریں یا لامحدود شمار کریں:' : 'Choose a standard counter goal or switch to unlimited mode:'}
                        </Text>

                        {/* Presets Grid */}
                        <View style={styles.presetTargetGrid}>
                            {[33, 100, 1000].map((val) => {
                                const isSelected = target === val;
                                return (
                                    <TouchableOpacity
                                        key={val}
                                        style={[
                                            styles.presetTargetItem,
                                            {
                                                backgroundColor: isSelected ? colors.primary : colors.background,
                                                borderColor: isSelected ? colors.primary : colors.border,
                                            },
                                        ]}
                                        onPress={() => handleApplyTargetValue(val)}
                                        activeOpacity={0.8}
                                    >
                                        <Text
                                            style={[
                                                styles.presetTargetItemText,
                                                {
                                                    color: isSelected ? '#FFFFFF' : colors.text,
                                                    fontFamily: fonts.bold,
                                                    includeFontPadding: false,
                                                },
                                            ]}
                                        >
                                            {val}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Unlimited Mode Option */}
                        <TouchableOpacity
                            style={[
                                styles.unlimitedModeBtn,
                                {
                                    backgroundColor: target === null ? (isDark ? 'rgba(30,126,82,0.2)' : '#EAF6EF') : colors.background,
                                    borderColor: target === null ? colors.primary : colors.border,
                                },
                            ]}
                            onPress={() => handleApplyTargetValue(null)}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="infinite" size={20} color={target === null ? colors.primary : colors.secondaryText} style={{ marginRight: 8 }} />
                            <Text
                                style={[
                                    styles.unlimitedModeText,
                                    {
                                        color: target === null ? colors.primary : colors.text,
                                        fontFamily: fonts.bold,
                                        includeFontPadding: false,
                                    },
                                ]}
                            >
                                {isUrdu ? 'ان گنت / لامحدود (Unlimited ∞)' : 'Unlimited (ان گنت / ∞)'}
                            </Text>
                        </TouchableOpacity>

                        {/* Custom Input */}
                        <Text style={[styles.customInputHeaderLabel, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }]}>
                            {isUrdu ? 'یا مخصوص ہدف درج کریں:' : 'Or enter custom amount:'}
                        </Text>
                        <View style={styles.customInputRow}>
                            <TextInput
                                style={[
                                    styles.customTargetInputField,
                                    {
                                        backgroundColor: colors.background,
                                        borderColor: colors.border,
                                        color: colors.text,
                                        fontFamily: fonts.semiBold,
                                    },
                                ]}
                                placeholder="e.g. 500, 5000"
                                placeholderTextColor={colors.textPlaceholder}
                                keyboardType="numeric"
                                value={customTargetInput}
                                onChangeText={setCustomTargetInput}
                            />
                            <TouchableOpacity
                                style={[styles.customApplyBtn, { backgroundColor: colors.primary }]}
                                onPress={handleApplyCustomTarget}
                                activeOpacity={0.8}
                            >
                                <Text style={[styles.customApplyBtnText, { fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 16 }]}>
                                    {isUrdu ? 'لاگو کریں' : 'Apply'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            {/* =========================================================================
                ZIKR PICKER & CUSTOM EDIT MODAL
               ========================================================================= */}
            <Modal visible={zikrModalVisible} transparent={true} animationType="slide" onRequestClose={() => setZikrModalVisible(false)}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalBackdrop}>
                    <View style={[styles.modalBoxLarge, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={[styles.modalHeader, { borderBottomColor: colors.borderLight }]}>
                            <Text style={[styles.modalBoxTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 18, lineHeight: 25 }]}>
                                {isUrdu ? 'ذکر منتخب کریں' : 'Select Recitation (Zikr)'}
                            </Text>
                            <TouchableOpacity onPress={() => setZikrModalVisible(false)} style={styles.modalCloseIconBtn}>
                                <Ionicons name="close" size={22} color={colors.secondaryText} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                            {/* Recent Zikrs Chips */}
                            {recentZikrs.length > 0 && (
                                <View style={styles.recentZikrsWrap}>
                                    <Text style={[styles.sectionMiniTitle, { color: colors.secondaryText, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                                        {isUrdu ? 'حالیہ تسبیحات:' : 'Recent Recitations:'}
                                    </Text>
                                    <View style={styles.recentChipsRow}>
                                        {recentZikrs.map((item) => (
                                            <TouchableOpacity
                                                key={item.id}
                                                style={[
                                                    styles.recentChipItem,
                                                    {
                                                        backgroundColor: currentZikr.id === item.id ? colors.primary : colors.background,
                                                        borderColor: currentZikr.id === item.id ? colors.primary : colors.border,
                                                    },
                                                ]}
                                                onPress={() => handleSelectZikr(item)}
                                                activeOpacity={0.75}
                                            >
                                                <Text
                                                    style={[
                                                        styles.recentChipText,
                                                        {
                                                            color: currentZikr.id === item.id ? '#FFFFFF' : colors.text,
                                                            fontFamily: fonts.medium,
                                                            includeFontPadding: false,
                                                        },
                                                    ]}
                                                >
                                                    {item.en}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            )}

                            {/* Pre-defined Zikr List */}
                            <Text style={[styles.sectionMiniTitle, { color: colors.secondaryText, fontFamily: fonts.semiBold, includeFontPadding: false }]}>
                                {isUrdu ? 'مستند اذکار کی فہرست:' : 'Pre-defined Recitations:'}
                            </Text>
                            <View style={styles.presetZikrList}>
                                {DEFAULT_PRESET_ZIKR.map((item) => {
                                    const isSelected = currentZikr.id === item.id;
                                    return (
                                        <TouchableOpacity
                                            key={item.id}
                                            style={[
                                                styles.zikrListItem,
                                                {
                                                    backgroundColor: isSelected ? (isDark ? 'rgba(30,126,82,0.22)' : '#EAF6EF') : colors.background,
                                                    borderColor: isSelected ? colors.primary : colors.borderLight,
                                                },
                                            ]}
                                            onPress={() => handleSelectZikr(item)}
                                            activeOpacity={0.8}
                                        >
                                            <View style={{ flex: 1 }}>
                                                <Text style={[styles.zikrListItemArabic, getArabicStyle(0.72), { color: colors.primary, textAlign: 'right', paddingVertical: 4 }]}>
                                                    {item.ur}
                                                </Text>
                                                <Text style={[styles.zikrListItemEn, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }]}>
                                                    {item.en}
                                                </Text>
                                            </View>
                                            {isSelected && <Ionicons name="checkmark-circle" size={20} color={colors.primary} />}
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>

                            {/* Custom Recitation Section */}
                            <View style={[styles.customZikrBox, { backgroundColor: colors.background, borderColor: colors.borderLight }]}>
                                <Text style={[styles.sectionMiniTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }]}>
                                    {isUrdu ? 'نیا وظیفہ یا ذکر درج کریں:' : 'Custom Recitation:'}
                                </Text>
                                <TextInput
                                    style={[
                                        styles.customZikrInputField,
                                        {
                                            backgroundColor: colors.surface,
                                            borderColor: colors.border,
                                            color: colors.text,
                                            fontFamily: fonts.medium,
                                        },
                                    ]}
                                    placeholder={isUrdu ? 'ذکر کا نام (انگریزی / اردو)' : 'Recitation Name (e.g. Ya Hayyu Ya Qayyum)'}
                                    placeholderTextColor={colors.textPlaceholder}
                                    value={customZikrEnInput}
                                    onChangeText={setCustomZikrEnInput}
                                />
                                <TextInput
                                    style={[
                                        styles.customZikrInputField,
                                        {
                                            backgroundColor: colors.surface,
                                            borderColor: colors.border,
                                            color: colors.text,
                                            fontFamily: 'Amiri_700Bold',
                                            textAlign: 'right',
                                        },
                                    ]}
                                    placeholder={isUrdu ? 'عربی یا اردو تحریر (اختیاری)' : 'Arabic / Urdu Script (Optional)'}
                                    placeholderTextColor={colors.textPlaceholder}
                                    value={customZikrUrInput}
                                    onChangeText={setCustomZikrUrInput}
                                />
                                <TouchableOpacity
                                    style={[styles.saveCustomZikrBtn, { backgroundColor: colors.primary }]}
                                    onPress={handleAddCustomZikr}
                                    activeOpacity={0.8}
                                >
                                    <Ionicons name="add" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                                    <Text style={[styles.saveCustomZikrBtnText, { fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 16 }]}>
                                        {isUrdu ? 'محفوظ کریں اور شروع کریں' : 'Save & Select'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

            {/* =========================================================================
                TARGET COMPLETED CELEBRATION MODAL
               ========================================================================= */}
            <Modal visible={celebrationVisible} transparent={true} animationType="fade" onRequestClose={() => setCelebrationVisible(false)}>
                <View style={styles.modalBackdrop}>
                    <View style={[styles.celebrationCard, { backgroundColor: colors.surface, borderColor: colors.primary }]}>
                        <View style={[styles.celebrationIconWrap, { backgroundColor: colors.primaryLight }]}>
                            <Ionicons name="checkmark-done" size={44} color={colors.primary} />
                        </View>

                        <Text style={[styles.celebrationMainTitle, { color: colors.primary, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 22, lineHeight: 30 }]}>
                            {t('completedCelebration')}
                        </Text>

                        <Text style={[styles.celebrationMessage, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 22 }]}>
                            {t('celebrationSub')}
                        </Text>

                        <View style={[styles.celebrationCountPill, { backgroundColor: colors.background, borderColor: colors.border }]}>
                            <Text style={[styles.celebrationCountText, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 15 }]}>
                                {count} / {target} {isUrdu ? 'تسبیحات مکمل' : 'Recitations Completed'}
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={[styles.nextRoundBtn, { backgroundColor: colors.primary }]}
                            onPress={handleStartNextRound}
                            activeOpacity={0.85}
                        >
                            <Ionicons name="refresh" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                            <Text style={[styles.nextRoundBtnText, { fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 16 }]}>
                                {t('startNextRound')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    headerSpacer: {
        width: 32,
    },
    bodyContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 12,
        justifyContent: 'space-between',
        paddingBottom: 24,
    },
    topControlsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 8,
    },
    controlCircleBtn: {
        width: 52,
        height: 52,
        borderRadius: 26,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    zikrPill: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: 9,
        paddingHorizontal: 18,
        borderRadius: 24,
        borderWidth: 1,
        marginTop: 6,
        maxWidth: '92%',
    },
    zikrPillArabic: {
        fontSize: 18,
        lineHeight: 28,
    },
    zikrPillDot: {
        fontSize: 14,
        marginHorizontal: 4,
    },
    zikrPillEnglish: {
        fontSize: 13,
    },
    targetIndicatorWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
    },
    targetHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    targetLabel: {
        fontSize: 11,
        letterSpacing: 0.8,
        marginRight: 6,
    },
    targetValueText: {
        fontSize: 15,
    },
    roundPillBadge: {
        marginTop: 4,
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 12,
    },
    roundPillText: {
        fontSize: 11,
    },
    dialCenterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    dialTouchArea: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    svgAbsolute: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    dialInnerContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    countMainNumber: {
        fontSize: 62,
        lineHeight: 70,
    },
    tapHintLabel: {
        fontSize: 11,
        letterSpacing: 1,
        marginTop: 2,
    },
    fractionLabel: {
        fontSize: 12,
        marginTop: 6,
    },
    nextRoundPillBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 8,
    },
    nextRoundPillText: {
        color: '#FFFFFF',
        fontSize: 13,
    },
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    modalBox: {
        width: '100%',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
    },
    modalBoxLarge: {
        width: '100%',
        maxHeight: '85%',
        borderRadius: 20,
        padding: 20,
        borderWidth: 1,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 12,
        borderBottomWidth: 1,
        marginBottom: 12,
    },
    modalBoxTitle: {
        fontSize: 16,
    },
    modalCloseIconBtn: {
        padding: 4,
    },
    modalInstructionText: {
        fontSize: 12.5,
        marginBottom: 14,
        lineHeight: 18,
    },
    presetTargetGrid: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 12,
    },
    presetTargetItem: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    presetTargetItemText: {
        fontSize: 16,
    },
    unlimitedModeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 16,
    },
    unlimitedModeText: {
        fontSize: 13.5,
    },
    customInputHeaderLabel: {
        fontSize: 12,
        marginBottom: 8,
    },
    customInputRow: {
        flexDirection: 'row',
        gap: 10,
    },
    customTargetInputField: {
        flex: 1,
        height: 48,
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 12,
        fontSize: 15,
    },
    customApplyBtn: {
        height: 48,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    customApplyBtnText: {
        color: '#FFFFFF',
        fontSize: 13.5,
    },
    recentZikrsWrap: {
        marginBottom: 14,
    },
    sectionMiniTitle: {
        fontSize: 12,
        letterSpacing: 0.3,
        marginBottom: 8,
    },
    recentChipsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    recentChipItem: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
    },
    recentChipText: {
        fontSize: 12,
    },
    presetZikrList: {
        gap: 8,
        marginBottom: 16,
    },
    zikrListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
    },
    zikrListItemArabic: {
        fontSize: 18,
        marginBottom: 2,
    },
    zikrListItemEn: {
        fontSize: 13,
    },
    customZikrBox: {
        borderRadius: 14,
        padding: 14,
        borderWidth: 1,
    },
    customZikrInputField: {
        height: 46,
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 12,
        fontSize: 14,
        marginBottom: 10,
    },
    saveCustomZikrBtn: {
        height: 48,
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveCustomZikrBtnText: {
        color: '#FFFFFF',
        fontSize: 13.5,
    },
    celebrationCard: {
        width: '100%',
        borderRadius: 22,
        padding: 24,
        alignItems: 'center',
        borderWidth: 1.5,
    },
    celebrationIconWrap: {
        width: 72,
        height: 72,
        borderRadius: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    celebrationMainTitle: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 8,
    },
    celebrationMessage: {
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: 16,
    },
    celebrationCountPill: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 20,
    },
    celebrationCountText: {
        fontSize: 13,
    },
    nextRoundBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderRadius: 12,
    },
    nextRoundBtnText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
});
