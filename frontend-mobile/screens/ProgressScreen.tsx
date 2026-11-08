import React, { useState, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, { Circle, G } from 'react-native-svg';
import { API_BASE_URL } from './config';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { soundHapticService } from '../services/soundHapticsService';
import { QazaState, QazaHistoryRecord } from './QazaScreen';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Circular Dial Metrics
const DIAL_SIZE = 160;
const DIAL_STROKE = 14;
const DIAL_RADIUS = (DIAL_SIZE - DIAL_STROKE) / 2;
const DIAL_CIRCUMFERENCE = 2 * Math.PI * DIAL_RADIUS;

interface PrayerItemMeta {
    key: keyof QazaState;
    nameEn: string;
    nameUr: string;
    rakatsEn: string;
    rakatsUr: string;
    icon: keyof typeof Ionicons.glyphMap;
}

const PRAYERS_LIST: PrayerItemMeta[] = [
    { key: 'fajr', nameEn: 'Fajr', nameUr: 'فجر', rakatsEn: '2 Farz', rakatsUr: '۲ رکعت فرض', icon: 'partly-sunny-outline' },
    { key: 'dhuhr', nameEn: 'Dhuhr', nameUr: 'ظہر', rakatsEn: '4 Farz', rakatsUr: '۴ رکعت فرض', icon: 'sunny-outline' },
    { key: 'asr', nameEn: 'Asr', nameUr: 'عصر', rakatsEn: '4 Farz', rakatsUr: '۴ رکعت فرض', icon: 'cloud-outline' },
    { key: 'maghrib', nameEn: 'Maghrib', nameUr: 'مغرب', rakatsEn: '3 Farz', rakatsUr: '۳ رکعت فرض', icon: 'moon-outline' },
    { key: 'isha', nameEn: 'Isha', nameUr: 'عشاء', rakatsEn: '4 Farz', rakatsUr: '۴ رکعت فرض', icon: 'moon' },
    { key: 'witr', nameEn: 'Witr', nameUr: 'وتر', rakatsEn: '3 Wajib', rakatsUr: '۳ رکعت واجب', icon: 'sparkles-outline' },
];

const DEFAULT_QAZA: QazaState = {
    fajr: { remaining: 0, completed: 0 },
    dhuhr: { remaining: 0, completed: 0 },
    asr: { remaining: 0, completed: 0 },
    maghrib: { remaining: 0, completed: 0 },
    isha: { remaining: 0, completed: 0 },
    witr: { remaining: 0, completed: 0 },
};

export default function ProgressScreen({ navigation }: any) {
    const { colors, isDark } = useTheme();
    const { t, isUrdu, fonts } = useLanguage();

    const [loading, setLoading] = useState<boolean>(true);
    const [counts, setCounts] = useState<QazaState>(DEFAULT_QAZA);
    const [history, setHistory] = useState<QazaHistoryRecord[]>([]);
    const [streak, setStreak] = useState<number>(7);
    const [bestStreak, setBestStreak] = useState<number>(14);
    const [matrixLogs, setMatrixLogs] = useState<Record<string, boolean>>({});
    const [selectedBarDay, setSelectedBarDay] = useState<{ dateStr: string; count: number; label: string } | null>(null);

    useFocusEffect(
        useCallback(() => {
            loadAnalyticsData();
        }, [])
    );

    const loadAnalyticsData = async () => {
        try {
            setLoading(true);
            const email = (await AsyncStorage.getItem('userEmail')) || '';

            // 1. Load Qaza Counts
            const countsKey = `userQazaCounts_${email || 'guest'}`;
            const rawCounts = await AsyncStorage.getItem(countsKey);
            if (rawCounts) {
                try {
                    const parsed = JSON.parse(rawCounts);
                    setCounts({
                        fajr: typeof parsed.fajr === 'object' ? parsed.fajr : { remaining: Number(parsed.fajr) || 0, completed: 0 },
                        dhuhr: typeof parsed.dhuhr === 'object' ? parsed.dhuhr : { remaining: Number(parsed.dhuhr) || 0, completed: 0 },
                        asr: typeof parsed.asr === 'object' ? parsed.asr : { remaining: Number(parsed.asr) || 0, completed: 0 },
                        maghrib: typeof parsed.maghrib === 'object' ? parsed.maghrib : { remaining: Number(parsed.maghrib) || 0, completed: 0 },
                        isha: typeof parsed.isha === 'object' ? parsed.isha : { remaining: Number(parsed.isha) || 0, completed: 0 },
                        witr: typeof parsed.witr === 'object' ? parsed.witr : { remaining: Number(parsed.witr) || 0, completed: 0 },
                    });
                } catch {
                    // Fallback
                }
            }

            // 2. Load History
            const histKey = `userQazaHistory_${email || 'guest'}`;
            const rawHist = await AsyncStorage.getItem(histKey);
            if (rawHist) {
                try {
                    setHistory(JSON.parse(rawHist));
                } catch {
                    setHistory([]);
                }
            }

            // 3. Load Streaks
            if (email) {
                const savedStreak = await AsyncStorage.getItem(`userStreak_${email}`);
                const savedBest = await AsyncStorage.getItem(`userBestStreak_${email}`);
                if (savedStreak) setStreak(parseInt(savedStreak, 10));
                if (savedBest) setBestStreak(parseInt(savedBest, 10));

                // 4. Fetch Monthly Matrix
                try {
                    const res = await fetch(`${API_BASE_URL}/monthly-matrix/${email}`);
                    const data = await res.json();
                    if (res.ok && data.matrix) {
                        setMatrixLogs(data.matrix);
                    }
                } catch {
                    // Matrix fetch fallback
                }
            }
        } finally {
            setLoading(false);
        }
    };

    // Lifetime Qaza Metrics
    const totalRemaining = Object.values(counts).reduce((acc, p) => acc + p.remaining, 0);
    const totalCompleted = Object.values(counts).reduce((acc, p) => acc + p.completed, 0);
    const totalLifetime = totalRemaining + totalCompleted;
    const lifetimePercent = totalLifetime > 0 ? Math.round((totalCompleted / totalLifetime) * 100) : 0;

    // Stroke Dashoffset for SVG Circle
    const strokeDashoffset = DIAL_CIRCUMFERENCE - (lifetimePercent / 100) * DIAL_CIRCUMFERENCE;

    // 30 Days Activity Breakdown
    const thirtyDaysActivity = useMemo(() => {
        const days = [];
        let maxCount = 1;

        for (let i = 29; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            const dayNum = d.getDate();

            const dayCount = history
                .filter((r) => r.dateString === dateStr)
                .reduce((acc, r) => acc + (r.count || 1), 0);

            if (dayCount > maxCount) maxCount = dayCount;

            days.push({
                dateStr,
                dayNum,
                isToday: i === 0,
                count: dayCount,
            });
        }

        return { days, maxCount };
    }, [history]);

    // Daily Average (Calculated across past 30 days)
    const totalPast30DaysMadeUp = thirtyDaysActivity.days.reduce((acc, d) => acc + d.count, 0);
    const dailyAverage = (totalPast30DaysMadeUp / 30).toFixed(1);

    // Monthly Matrix Consistency
    const currentMonthDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const todayDate = new Date().getDate();
    const prayerKeys = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

    let totalMonthPrayersPrayed = 0;
    const habitStats = prayerKeys.map((pKey) => {
        let count = 0;
        for (let d = 1; d <= todayDate; d++) {
            if (matrixLogs[`${pKey}_${d}`]) {
                count++;
            }
        }
        totalMonthPrayersPrayed += count;
        return {
            key: pKey,
            count,
            totalPossible: todayDate,
            percent: todayDate > 0 ? Math.round((count / todayDate) * 100) : 0,
        };
    });

    const expectedTotalPrayers = todayDate * 5;
    const monthlyFarzPercent = expectedTotalPrayers > 0
        ? Math.round((totalMonthPrayersPrayed / expectedTotalPrayers) * 100)
        : 0;

    return (
        <View style={[styles.fullBackground, { backgroundColor: colors.background }]}>
            <StatusBar style="light" />

            {/* Standard 56px Top Bar */}
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
                        {isUrdu ? 'پیش رفت اور تجزیہ' : 'Progress & Analytics'}
                    </Text>

                    <TouchableOpacity
                        style={styles.headerIconButton}
                        onPress={() => {
                            soundHapticService.triggerFeedback();
                            loadAnalyticsData();
                        }}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="refresh-outline" size={22} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {loading ? (
                <View style={styles.loadingWrap}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Subtitle / Insight */}
                    <Text style={[styles.screenSubtitle, { color: colors.secondaryText, fontFamily: fonts.medium, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                        {isUrdu
                            ? 'آپ کے روحانی فرائض، قضا نمازوں اور روزانہ کے معمولات کا جامع تفصیلی جائزہ'
                            : 'Comprehensive insights into your spiritual obligations, Qaza debt relief, and daily consistency.'}
                    </Text>

                    {/* =========================================================================
                        SECTION 1: LIFETIME QAZA ANALYTICS
                       ========================================================================= */}
                    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={styles.cardHeaderRow}>
                            <View style={[styles.cardIconBox, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
                                <Ionicons name="pie-chart" size={18} color={colors.primary} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.cardTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 18, lineHeight: 25 }]}>
                                    {isUrdu ? 'قضا کا مجموعی لائف ٹائم گراف' : 'Lifetime Qaza Analytics'}
                                </Text>
                                <Text style={[styles.cardSublabel, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 14 }]}>
                                    {isUrdu ? 'کل فرائض و واجبات کی بحالی کا تناسب' : 'Overall fulfillment and backlog debt relief'}
                                </Text>
                            </View>
                        </View>

                        {/* Circular Progress Indicator */}
                        <View style={styles.dialCenterWrap}>
                            <Svg width={DIAL_SIZE} height={DIAL_SIZE}>
                                <G rotation="-90" origin={`${DIAL_SIZE / 2}, ${DIAL_SIZE / 2}`}>
                                    {/* Background Track */}
                                    <Circle
                                        cx={DIAL_SIZE / 2}
                                        cy={DIAL_SIZE / 2}
                                        r={DIAL_RADIUS}
                                        stroke={isDark ? '#26332E' : '#E8ECEF'}
                                        strokeWidth={DIAL_STROKE}
                                        fill="none"
                                    />
                                    {/* Active Progress Stroke */}
                                    <Circle
                                        cx={DIAL_SIZE / 2}
                                        cy={DIAL_SIZE / 2}
                                        r={DIAL_RADIUS}
                                        stroke={colors.primary}
                                        strokeWidth={DIAL_STROKE}
                                        strokeDasharray={DIAL_CIRCUMFERENCE}
                                        strokeDashoffset={strokeDashoffset}
                                        strokeLinecap="round"
                                        fill="none"
                                    />
                                </G>
                            </Svg>

                            {/* Centered Percentage Inside Dial */}
                            <View style={styles.dialInnerContent}>
                                <Text style={[styles.dialPercentText, { color: colors.primary, fontFamily: fonts.bold, includeFontPadding: false }]}>
                                    %{lifetimePercent}
                                </Text>
                                <Text style={[styles.dialSubLabel, { color: colors.secondaryText, fontFamily: fonts.medium }]}>
                                    {isUrdu ? 'مکمل' : 'Completed'}
                                </Text>
                            </View>
                        </View>

                        {/* 4 Key Metric Cards (Balanced 2x2 Grid) */}
                        <View style={styles.gridContainer2x2}>
                            {/* Row 1: Completed & Remaining */}
                            <View style={styles.gridRow2x2}>
                                {/* Card 1: Completed */}
                                <View style={[styles.statBox2x2, { backgroundColor: colors.surface, borderColor: isDark ? '#2A3833' : '#E5E7EB' }]}>
                                    <View style={[styles.statAccentStrip, { backgroundColor: '#0D5C3A' }]} />
                                    <View style={styles.statBoxTop}>
                                        <View style={[styles.statIconPill, { backgroundColor: isDark ? 'rgba(13, 92, 58, 0.2)' : '#EAF6EF' }]}>
                                            <Ionicons name="checkmark-circle" size={13} color="#0D5C3A" />
                                        </View>
                                        <Text style={[styles.statBoxLabel, { color: colors.secondaryText, fontFamily: fonts.semiBold, includeFontPadding: false }]}>
                                            {isUrdu ? 'مکمل' : 'Completed'}
                                        </Text>
                                    </View>
                                    <Text style={[styles.statBoxValue, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }]}>
                                        {totalCompleted}
                                    </Text>
                                    <Text style={[styles.statBoxFoot, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }]}>
                                        {isUrdu ? 'قضا نمازیں' : 'prayers fulfilled'}
                                    </Text>
                                </View>

                                {/* Card 2: Remaining */}
                                <View style={[styles.statBox2x2, { backgroundColor: colors.surface, borderColor: isDark ? '#2A3833' : '#E5E7EB' }]}>
                                    <View style={[styles.statAccentStrip, { backgroundColor: '#374151' }]} />
                                    <View style={styles.statBoxTop}>
                                        <View style={[styles.statIconPill, { backgroundColor: isDark ? 'rgba(55, 65, 81, 0.2)' : '#F3F4F6' }]}>
                                            <Ionicons name="hourglass-outline" size={13} color={isDark ? '#9CA3AF' : '#374151'} />
                                        </View>
                                        <Text style={[styles.statBoxLabel, { color: colors.secondaryText, fontFamily: fonts.semiBold, includeFontPadding: false }]}>
                                            {isUrdu ? 'باقی' : 'Remaining'}
                                        </Text>
                                    </View>
                                    <Text style={[styles.statBoxValue, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }]}>
                                        {totalRemaining}
                                    </Text>
                                    <Text style={[styles.statBoxFoot, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }]}>
                                        {isUrdu ? 'واجب نمازیں' : 'prayers backlog'}
                                    </Text>
                                </View>
                            </View>

                            {/* Row 2: Day Streak & Daily Average */}
                            <View style={styles.gridRow2x2}>
                                {/* Card 3: Day Streak */}
                                <View style={[styles.statBox2x2, { backgroundColor: colors.surface, borderColor: isDark ? '#2A3833' : '#E5E7EB' }]}>
                                    <View style={[styles.statAccentStrip, { backgroundColor: '#D97706' }]} />
                                    <View style={styles.statBoxTop}>
                                        <View style={[styles.statIconPill, { backgroundColor: isDark ? 'rgba(217, 119, 6, 0.18)' : '#FEF3C7' }]}>
                                            <Ionicons name="flame" size={13} color="#D97706" />
                                        </View>
                                        <Text style={[styles.statBoxLabel, { color: colors.secondaryText, fontFamily: fonts.semiBold, includeFontPadding: false }]}>
                                            {isUrdu ? 'روزانہ تسلسل' : 'Day Streak'}
                                        </Text>
                                    </View>
                                    <Text style={[styles.statBoxValue, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }]}>
                                        {streak} <Text style={{ fontSize: 13, fontFamily: fonts.medium, color: colors.secondaryText }}>{isUrdu ? 'دن' : 'Days'}</Text>
                                    </Text>
                                    <Text style={[styles.statBoxFoot, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }]}>
                                        {isUrdu ? `بہترین: ${bestStreak} دن` : `Best: ${bestStreak} days`}
                                    </Text>
                                </View>

                                {/* Card 4: Daily Average */}
                                <View style={[styles.statBox2x2, { backgroundColor: colors.surface, borderColor: isDark ? '#2A3833' : '#E5E7EB' }]}>
                                    <View style={[styles.statAccentStrip, { backgroundColor: '#059669' }]} />
                                    <View style={styles.statBoxTop}>
                                        <View style={[styles.statIconPill, { backgroundColor: isDark ? 'rgba(5, 150, 105, 0.18)' : '#ECFDF5' }]}>
                                            <Ionicons name="trending-up-outline" size={13} color="#059669" />
                                        </View>
                                        <Text style={[styles.statBoxLabel, { color: colors.secondaryText, fontFamily: fonts.semiBold, includeFontPadding: false }]}>
                                            {isUrdu ? 'روزانہ اوسط' : 'Daily Average'}
                                        </Text>
                                    </View>
                                    <Text style={[styles.statBoxValue, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }]}>
                                        {dailyAverage} <Text style={{ fontSize: 13, fontFamily: fonts.medium, color: colors.secondaryText }}>/d</Text>
                                    </Text>
                                    <Text style={[styles.statBoxFoot, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }]}>
                                        {isUrdu ? 'گزشتہ ۳۰ دن' : 'last 30 days'}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* =========================================================================
                        SECTION 2: LAST 30 DAYS ACTIVITY BAR CHART
                       ========================================================================= */}
                    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={styles.cardHeaderRow}>
                            <View style={[styles.cardIconBox, { backgroundColor: colors.surface, borderColor: isDark ? '#2A3833' : '#E5E7EB' }]}>
                                <Ionicons name="bar-chart" size={18} color="#B45309" />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.cardTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 18, lineHeight: 25 }]}>
                                    {isUrdu ? 'گزشتہ ۳۰ دنوں کی قضا کارکردگی' : 'Last 30 Days Activity Chart'}
                                </Text>
                                <Text style={[styles.cardSublabel, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 14 }]}>
                                    {isUrdu ? 'روزانہ ادا کی گئی قضا نمازوں کا عمودی گراف' : 'Daily Qaza fulfillment volume over 30 days'}
                                </Text>
                            </View>
                        </View>

                        {/* Selected Bar Tooltip */}
                        {selectedBarDay && (
                            <View style={[styles.chartTooltip, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
                                <Text style={[styles.chartTooltipText, { color: colors.primary, fontFamily: fonts.semiBold }]}>
                                    {selectedBarDay.dateStr}: <Text style={{ fontFamily: fonts.bold }}>{selectedBarDay.count} {isUrdu ? 'قضا ادا کی گئیں' : 'prayers made up'}</Text>
                                </Text>
                            </View>
                        )}

                        {/* Chart Area */}
                        <View style={styles.chartArea}>
                            <View style={styles.barsContainer}>
                                {thirtyDaysActivity.days.map((d) => {
                                    const maxHeight = 100;
                                    const height = d.count > 0
                                        ? Math.max(12, Math.round((d.count / thirtyDaysActivity.maxCount) * maxHeight))
                                        : 4;
                                    const isSelected = selectedBarDay?.dateStr === d.dateStr;

                                    return (
                                        <TouchableOpacity
                                            key={d.dateStr}
                                            style={styles.barColumn}
                                            activeOpacity={0.7}
                                            onPress={() => {
                                                soundHapticService.triggerFeedback(15);
                                                setSelectedBarDay({
                                                    dateStr: d.dateStr,
                                                    count: d.count,
                                                    label: `${d.dayNum}`,
                                                });
                                            }}
                                        >
                                            <View
                                                style={[
                                                    styles.chartBar,
                                                    {
                                                        height,
                                                        backgroundColor: isSelected
                                                            ? colors.goldDark
                                                            : d.count > 0
                                                            ? colors.primary
                                                            : isDark
                                                            ? '#26332E'
                                                            : '#E5E7EB',
                                                    },
                                                ]}
                                            />
                                            {/* Show label every 5 days or today */}
                                            {d.dayNum % 5 === 0 || d.isToday ? (
                                                <Text style={[styles.barLabel, { color: d.isToday ? colors.primary : colors.secondaryText, fontFamily: d.isToday ? fonts.bold : fonts.regular }]}>
                                                    {d.dayNum}
                                                </Text>
                                            ) : (
                                                <View style={{ height: 14 }} />
                                            )}
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                            <View style={[styles.chartBaseline, { backgroundColor: colors.border }]} />
                        </View>

                        {/* Chart Legend */}
                        <View style={styles.chartLegendRow}>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
                                <Text style={[styles.legendText, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                    {isUrdu ? 'ادا شدہ دن' : 'Active Day'}
                                </Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: colors.goldDark }]} />
                                <Text style={[styles.legendText, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                    {isUrdu ? 'منتخب شدہ' : 'Selected'}
                                </Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: isDark ? '#26332E' : '#E5E7EB' }]} />
                                <Text style={[styles.legendText, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                    {isUrdu ? 'بغیر ریکارڈ' : 'No Activity'}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* =========================================================================
                        SECTION 3: MONTHLY HABIT & PRAYER COMPLETION MATRIX
                       ========================================================================= */}
                    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={styles.cardHeaderRow}>
                            <View style={[styles.cardIconBox, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
                                <Ionicons name="calendar-outline" size={18} color={colors.primary} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.cardTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 18, lineHeight: 25 }]}>
                                    {isUrdu ? 'ماہانہ فرائض نماز تسلسل' : 'Monthly Prayer Consistency Matrix'}
                                </Text>
                                <Text style={[styles.cardSublabel, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 14 }]}>
                                    {isUrdu ? `رواں ماہ کے ${todayDate} دنوں میں ۵ نمازوں کی ادائیگی` : `Current month completion across ${todayDate} days`}
                                </Text>
                            </View>
                        </View>

                        {/* Overall Monthly Fill */}
                        <View style={styles.matrixOverviewWrap}>
                            <View style={styles.matrixHeaderRow}>
                                <Text style={[styles.matrixScoreLabel, { color: colors.text, fontFamily: fonts.semiBold }]}>
                                    {isUrdu ? 'ماہانہ فرائض کی ادائیگی:' : 'Farz Prayers Fulfilled:'}
                                </Text>
                                <Text style={[styles.matrixScoreValue, { color: colors.primary, fontFamily: fonts.bold }]}>
                                    {totalMonthPrayersPrayed} / {expectedTotalPrayers} ({monthlyFarzPercent}%)
                                </Text>
                            </View>
                            <View style={[styles.matrixBarTrack, { backgroundColor: isDark ? '#2A3833' : '#E8ECEF' }]}>
                                <View
                                    style={[
                                        styles.matrixBarFill,
                                        {
                                            width: `${Math.min(100, Math.max(0, monthlyFarzPercent))}%`,
                                            backgroundColor: colors.primary,
                                        },
                                    ]}
                                />
                            </View>
                        </View>

                        {/* Individual Prayer Badges */}
                        <View style={styles.habitChipsRow}>
                            {habitStats.map((h) => {
                                const pMeta = PRAYERS_LIST.find((p) => p.key === h.key);
                                return (
                                    <View
                                        key={h.key}
                                        style={[
                                            styles.habitChip,
                                            {
                                                backgroundColor: isDark ? '#1C2621' : '#F9FBF9',
                                                borderColor: h.percent >= 80 ? colors.primary : colors.border,
                                            },
                                        ]}
                                    >
                                        <Text style={[styles.habitChipName, { color: colors.text, fontFamily: fonts.bold }]}>
                                            {isUrdu ? pMeta?.nameUr : pMeta?.nameEn}
                                        </Text>
                                        <Text style={[styles.habitChipCount, { color: colors.primary, fontFamily: fonts.semiBold }]}>
                                            {h.count}/{h.totalPossible}
                                        </Text>
                                        <Text style={[styles.habitChipPercent, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                            {h.percent}%
                                        </Text>
                                    </View>
                                );
                            })}
                        </View>
                    </View>

                    {/* =========================================================================
                        SECTION 4: BY-PRAYER COMPLETION LIST
                       ========================================================================= */}
                    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={styles.cardHeaderRow}>
                            <View style={[styles.cardIconBox, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
                                <Ionicons name="list-outline" size={18} color={colors.primary} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.cardTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }]}>
                                    {isUrdu ? 'نماز کے لحاظ سے قضا کی تفصیلی پیش رفت' : 'By-Prayer Qaza Breakdown'}
                                </Text>
                                <Text style={[styles.cardSublabel, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                    {isUrdu ? 'ہر نماز کی ادا شدہ بمقابلہ باقی قضا تعداد' : 'Completed vs remaining backlog for each prayer'}
                                </Text>
                            </View>
                        </View>

                        {/* List of 6 Prayers */}
                        <View style={styles.prayerListContainer}>
                            {PRAYERS_LIST.map((prayer) => {
                                const pData = counts[prayer.key];
                                const comp = pData.completed;
                                const rem = pData.remaining;
                                const total = comp + rem;
                                const pct = total > 0 ? Math.round((comp / total) * 100) : 0;

                                return (
                                    <View
                                        key={prayer.key}
                                        style={[
                                            styles.prayerProgressRow,
                                            { borderBottomColor: colors.borderLight },
                                        ]}
                                    >
                                        {/* Top Row: Icon + Name + Counts */}
                                        <View style={styles.prayerRowTop}>
                                            <View style={styles.prayerRowLeft}>
                                                <View style={[styles.prayerMiniIconCircle, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
                                                    <Ionicons name={prayer.icon} size={16} color={colors.primary} />
                                                </View>
                                                <View>
                                                    <Text style={[styles.prayerRowName, { color: colors.text, fontFamily: fonts.bold }]}>
                                                        {isUrdu ? prayer.nameUr : prayer.nameEn}
                                                    </Text>
                                                    <Text style={[styles.prayerRowRakats, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                                        {isUrdu ? prayer.rakatsUr : prayer.rakatsEn}
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={styles.prayerRowRight}>
                                                <Text style={[styles.prayerCountNumbers, { color: colors.text, fontFamily: fonts.bold }]}>
                                                    {comp} <Text style={{ color: colors.secondaryText, fontFamily: fonts.regular }}>/ {total}</Text>
                                                </Text>
                                                <View style={[styles.prayerPercentBadge, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
                                                    <Text style={[styles.prayerPercentBadgeText, { color: colors.primary, fontFamily: fonts.bold }]}>
                                                        {pct}%
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>

                                        {/* Horizontal Progress Bar */}
                                        <View style={[styles.prayerProgressBarTrack, { backgroundColor: isDark ? '#26332E' : '#E8ECEF' }]}>
                                            <View
                                                style={[
                                                    styles.prayerProgressBarFill,
                                                    {
                                                        width: `${Math.min(100, Math.max(0, pct))}%`,
                                                        backgroundColor: colors.primary,
                                                    },
                                                ]}
                                            />
                                        </View>

                                        {/* Subtext info */}
                                        <View style={styles.prayerRemainingRow}>
                                            <Text style={[styles.prayerRemainingText, { color: rem > 0 ? (isDark ? '#FCA5A5' : '#DC2626') : colors.primary, fontFamily: fonts.medium }]}>
                                                {rem > 0
                                                    ? `${isUrdu ? 'باقی قضا:' : 'Remaining backlog:'} ${rem}`
                                                    : (isUrdu ? 'کوئی قضا باقی نہیں' : 'Backlog fulfilled')}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                </ScrollView>
            )}
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
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    loadingWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 40,
    },
    screenSubtitle: {
        fontSize: 13,
        lineHeight: 18,
        marginBottom: 14,
        textAlign: 'center',
        paddingHorizontal: 8,
    },
    card: {
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        marginBottom: 14,
    },
    cardHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 14,
    },
    cardIconBox: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    cardTitle: {
        fontSize: 15,
    },
    cardSublabel: {
        fontSize: 11,
        marginTop: 2,
    },
    dialCenterWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12,
        height: DIAL_SIZE,
    },
    dialInnerContent: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dialPercentText: {
        fontSize: 28,
        letterSpacing: -0.5,
    },
    dialSubLabel: {
        fontSize: 11,
        marginTop: 2,
    },
    gridContainer2x2: {
        marginTop: 14,
        gap: 10,
    },
    gridRow2x2: {
        flexDirection: 'row',
        gap: 10,
    },
    statBox2x2: {
        flex: 1,
        borderRadius: 14,
        padding: 13,
        borderWidth: 1,
        justifyContent: 'space-between',
        minHeight: 90,
        overflow: 'hidden',
        position: 'relative',
    },
    statAccentStrip: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
    },
    statIconPill: {
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statBoxTop: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    statBoxLabel: {
        fontSize: 11,
    },
    statBoxValue: {
        fontSize: 20,
        marginVertical: 2,
    },
    statBoxFoot: {
        fontSize: 10,
    },
    chartArea: {
        marginVertical: 10,
    },
    chartTooltip: {
        borderRadius: 8,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderWidth: 1,
        alignSelf: 'center',
        marginBottom: 8,
    },
    chartTooltipText: {
        fontSize: 12,
    },
    barsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 120,
        paddingHorizontal: 4,
    },
    barColumn: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
    },
    chartBar: {
        width: Math.max(4, Math.floor((SCREEN_WIDTH - 80) / 30) - 2),
        borderRadius: 3,
    },
    barLabel: {
        fontSize: 9,
        marginTop: 4,
    },
    chartBaseline: {
        height: 1,
        width: '100%',
        marginTop: 2,
    },
    chartLegendRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        marginTop: 12,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    legendText: {
        fontSize: 11,
    },
    matrixOverviewWrap: {
        marginVertical: 8,
    },
    matrixHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    matrixScoreLabel: {
        fontSize: 12,
    },
    matrixScoreValue: {
        fontSize: 12,
    },
    matrixBarTrack: {
        height: 8,
        borderRadius: 4,
        overflow: 'hidden',
    },
    matrixBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    habitChipsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginTop: 12,
    },
    habitChip: {
        flex: 1,
        minWidth: (SCREEN_WIDTH - 80) / 3,
        borderRadius: 10,
        borderWidth: 1,
        padding: 8,
        alignItems: 'center',
    },
    habitChipName: {
        fontSize: 12,
    },
    habitChipCount: {
        fontSize: 13,
        marginTop: 2,
    },
    habitChipPercent: {
        fontSize: 10,
        marginTop: 1,
    },
    prayerListContainer: {
        marginTop: 6,
    },
    prayerProgressRow: {
        paddingVertical: 10,
        borderBottomWidth: 1,
    },
    prayerRowTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    prayerRowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    prayerMiniIconCircle: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    prayerRowName: {
        fontSize: 14,
    },
    prayerRowRakats: {
        fontSize: 11,
    },
    prayerRowRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    prayerCountNumbers: {
        fontSize: 13,
    },
    prayerPercentBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        borderWidth: 1,
    },
    prayerPercentBadgeText: {
        fontSize: 11,
    },
    prayerProgressBarTrack: {
        height: 6,
        borderRadius: 3,
        overflow: 'hidden',
        marginVertical: 4,
    },
    prayerProgressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    prayerRemainingRow: {
        marginTop: 2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    prayerRemainingText: {
        fontSize: 11,
    },
});

