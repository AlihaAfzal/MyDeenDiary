import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './config';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { soundHapticService } from '../services/soundHapticsService';

export default function MonthlyScreen({ navigation }: any) {
    const { colors, isDark } = useTheme();
    const { t, isUrdu, fonts } = useLanguage();

    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [loading, setLoading] = useState(false);

    const MONTHS_EN = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];

    const MONTHS_UR = [
        'جنوری', 'فروری', 'مارچ', 'اپریل', 'مئی', 'جون',
        'جولائی', 'اگست', 'ستمبر', 'اکتوبر', 'نومبر', 'دسمبر',
    ];

    const months = isUrdu ? MONTHS_UR : MONTHS_EN;
    const year = 2026;
    const daysCount = new Date(year, selectedMonth + 1, 0).getDate();
    const daysInMonth = Array.from({ length: daysCount }, (_, i) => i + 1);

    const defaultHabits = [
        { id: 'fajr', key: 'fajr' },
        { id: 'dhuhr', key: 'dhuhr' },
        { id: 'asr', key: 'asr' },
        { id: 'maghrib', key: 'maghrib' },
        { id: 'isha', key: 'isha' },
        { id: 'morning_azkar', key: 'morningAzkar' },
        { id: 'evening_azkar', key: 'eveningAzkar' },
    ];

    const [habits, setHabits] = useState(defaultHabits);
    const [matrixData, setMatrixData] = useState<Record<string, boolean>>({});

    const fetchMatrixAndHabits = async () => {
        const userEmail = await AsyncStorage.getItem('userEmail');
        if (!userEmail) return;

        const savedCustom = await AsyncStorage.getItem('userCustomHabits');
        if (savedCustom) {
            try {
                const parsed = JSON.parse(savedCustom);
                const customMapped = parsed.map((h: any) => ({ id: h.id, key: h.name }));
                setHabits([...defaultHabits, ...customMapped]);
            } catch {
                // Ignore parse error
            }
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/monthly-matrix/${userEmail}`);
            const data = await response.json();
            if (response.ok && data.matrix) {
                setMatrixData(data.matrix);
            }
        } catch {
            // Non-blocking fallback
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMatrixAndHabits();
    }, [selectedMonth]);

    const toggleMatrixCell = async (habitId: string, day: number) => {
        soundHapticService.triggerFeedback();
        const key = `${habitId}_${day}`;
        const currentVal = !!matrixData[key];
        const nextVal = !currentVal;

        setMatrixData((prev) => ({ ...prev, [key]: nextVal }));

        const userEmail = await AsyncStorage.getItem('userEmail');
        if (!userEmail) return;

        const dateStr = `${year}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        try {
            await fetch(`${API_BASE_URL}/save-progress`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: userEmail,
                    date_str: dateStr,
                    [habitId]: nextVal,
                }),
            });
        } catch {
            // Silently ignore or rollback if needed
        }
    };

    const getRowStats = (habitId: string) => {
        let count = 0;
        daysInMonth.forEach((d) => {
            if (matrixData[`${habitId}_${d}`]) {
                count++;
            }
        });
        return {
            total: daysCount,
            prayed: count,
            missed: Math.max(0, daysCount - count),
        };
    };

    const prayerIds = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
    const totalExpectedPrayers = daysCount * 5;
    let totalPrayedCount = 0;
    prayerIds.forEach((id) => {
        totalPrayedCount += getRowStats(id).prayed;
    });
    const totalMissedCount = Math.max(0, totalExpectedPrayers - totalPrayedCount);
    const prayerCompletionPercentage = totalExpectedPrayers > 0 ? (totalPrayedCount / totalExpectedPrayers) * 100 : 0;

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
                        {isUrdu ? 'ماہانہ ریکارڈ' : 'Monthly Record'}
                    </Text>

                    <View style={styles.rightSpacer} />
                </View>
            </SafeAreaView>

            <View style={[styles.bodyContainer, { backgroundColor: colors.background }]}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mainScrollContent}>
                    <View style={styles.headerBlock}>
                        <Text style={[styles.subText, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                            {t('monthlyMatrixSub')}
                        </Text>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthPillScroll}>
                            {months.map((m, idx) => (
                                <TouchableOpacity
                                    key={m}
                                    style={[
                                        styles.monthPill,
                                        { backgroundColor: colors.border },
                                        selectedMonth === idx && { backgroundColor: colors.primary },
                                    ]}
                                    onPress={() => {
                                        soundHapticService.triggerFeedback();
                                        setSelectedMonth(idx);
                                    }}
                                    activeOpacity={0.75}
                                >
                                    <Text
                                        style={[
                                            styles.monthPillText,
                                            { color: selectedMonth === idx ? '#FFFFFF' : colors.text, fontFamily: fonts.semiBold },
                                        ]}
                                    >
                                        {m}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    {loading ? (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="large" color={colors.primary} />
                        </View>
                    ) : (
                        <View style={[styles.spreadsheetContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={styles.horizontalScroll}>
                                <View>
                                    <View style={[styles.tableHeaderRow, { backgroundColor: colors.primary }]}>
                                        <View style={styles.habitNameHeaderCell}>
                                            <Text style={[styles.headerCellText, { fontFamily: fonts.bold }]}>
                                                {isUrdu ? 'نماز / معمول' : 'HABIT / SALAH'}
                                            </Text>
                                        </View>
                                        {daysInMonth.map((day) => (
                                            <View key={day} style={styles.dayHeaderCell}>
                                                <Text style={[styles.dayCellText, { color: colors.gold, fontFamily: fonts.bold }]}>{day}</Text>
                                            </View>
                                        ))}
                                        <View style={[styles.metricHeaderCell, { backgroundColor: colors.primaryDark }]}>
                                            <Text style={[styles.metricHeaderText, { fontFamily: fonts.bold }]}>TOTAL</Text>
                                        </View>
                                        <View style={[styles.metricHeaderCell, { backgroundColor: colors.primaryDark }]}>
                                            <Text style={[styles.metricHeaderText, { fontFamily: fonts.bold }]}>DONE</Text>
                                        </View>
                                        <View style={[styles.metricHeaderCell, { backgroundColor: colors.primaryDark }]}>
                                            <Text style={[styles.metricHeaderText, { fontFamily: fonts.bold }]}>MISSED</Text>
                                        </View>
                                    </View>

                                    {habits.map((habit) => {
                                        const stats = getRowStats(habit.id);
                                        const labelText = t(habit.key, habit.key);
                                        return (
                                            <View key={habit.id} style={[styles.tableBodyRow, { borderBottomColor: colors.border }]}>
                                                <View style={[styles.habitNameBodyCell, { borderRightColor: colors.border, backgroundColor: colors.surface }]}>
                                                    <Text style={[styles.habitLabelText, { color: colors.text, fontFamily: fonts.semiBold }]} numberOfLines={1}>
                                                        {labelText}
                                                    </Text>
                                                </View>
                                                {daysInMonth.map((day) => {
                                                    const key = `${habit.id}_${day}`;
                                                    const isChecked = !!matrixData[key];
                                                    return (
                                                        <TouchableOpacity
                                                            key={day}
                                                            style={[styles.matrixDataCell, { borderRightColor: colors.border, backgroundColor: colors.surface }]}
                                                            onPress={() => toggleMatrixCell(habit.id, day)}
                                                            activeOpacity={0.7}
                                                        >
                                                            {isChecked && <Ionicons name="checkmark" size={14} color={colors.primary} />}
                                                        </TouchableOpacity>
                                                    );
                                                })}
                                                <View style={[styles.metricBodyCell, { borderRightColor: colors.border, backgroundColor: colors.background }]}>
                                                    <Text style={[styles.metricTotalText, { color: colors.text, fontFamily: fonts.medium }]}>{stats.total}</Text>
                                                </View>
                                                <View style={[styles.metricBodyCell, { borderRightColor: colors.border, backgroundColor: colors.background }]}>
                                                    <Text style={[styles.metricPrayedText, { color: colors.primary, fontFamily: fonts.bold }]}>{stats.prayed}</Text>
                                                </View>
                                                <View style={[styles.metricBodyCell, { borderRightColor: colors.border, backgroundColor: colors.background }]}>
                                                    <Text style={[styles.metricMissedText, { color: colors.danger, fontFamily: fonts.bold }]}>{stats.missed}</Text>
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                    )}

                    <Text style={[styles.summaryTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 18, lineHeight: 25 }]}>
                        {months[selectedMonth]} {isUrdu ? 'مجموعی نماز کارکردگی' : 'Overall Salah Analytics'}
                    </Text>
                    <View style={[styles.summaryCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={styles.summaryRow}>
                            <Text style={[styles.summaryLabel, { color: colors.text, fontFamily: fonts.medium, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                                {isUrdu ? 'کل واجب نمازیں:' : 'Total Required Prescribed Prayers:'}
                            </Text>
                            <Text style={[styles.summaryValueText, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }]}>
                                {totalExpectedPrayers}
                            </Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={[styles.summaryLabel, { color: colors.text, fontFamily: fonts.medium, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                                {isUrdu ? 'ادا شدہ نمازیں:' : 'Prayed On-Time:'}
                            </Text>
                            <Text style={[styles.prayedValueText, { color: colors.primary, fontFamily: fonts.bold, includeFontPadding: false }]}>
                                {totalPrayedCount}
                            </Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={[styles.summaryLabel, { color: colors.text, fontFamily: fonts.medium, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                                {isUrdu ? 'چھوٹی ہوئی نمازیں:' : 'Missed Total:'}
                            </Text>
                            <Text style={[styles.missedValueText, { color: colors.danger, fontFamily: fonts.bold, includeFontPadding: false }]}>
                                {totalMissedCount}
                            </Text>
                        </View>

                        <View style={[styles.progressContainerBlock, { borderTopColor: colors.border }]}>
                            <View style={styles.progressTextRow}>
                                <Text style={[styles.progressLabel, { color: colors.primary, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                                    {isUrdu ? 'ماہانہ تسلسل کا تناسب:' : 'Monthly Consistency Rate:'}
                                </Text>
                                <Text style={[styles.progressPercentText, { color: colors.primary, fontFamily: fonts.bold }]}>
                                    {prayerCompletionPercentage.toFixed(0)}%
                                </Text>
                            </View>
                            <View style={[styles.progressBarBackground, { backgroundColor: colors.border }]}>
                                <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: `${prayerCompletionPercentage}%` }]} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fullBackground: { flex: 1 },
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
        width: 24,
    },
    bodyContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    mainScrollContent: { paddingBottom: 25 },
    headerBlock: { marginBottom: 8 },
    subText: { fontSize: 12, marginTop: 2 },
    monthPillScroll: { marginTop: 10 },
    monthPill: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 14, marginRight: 6 },
    monthPillText: { fontSize: 12 },
    loaderContainer: { height: 240, justifyContent: 'center', alignItems: 'center' },
    spreadsheetContainer: { borderRadius: 12, borderWidth: 1, overflow: 'hidden', marginVertical: 12 },
    horizontalScroll: { paddingRight: 20 },
    tableHeaderRow: { flexDirection: 'row', height: 42, alignItems: 'center' },
    habitNameHeaderCell: { width: 140, paddingLeft: 10, justifyContent: 'center' },
    headerCellText: { color: '#FFFFFF', fontSize: 10, letterSpacing: 0.5 },
    dayHeaderCell: { width: 36, alignItems: 'center', justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: 'rgba(229,226,217,0.3)' },
    dayCellText: { fontSize: 12 },
    metricHeaderCell: { width: 48, alignItems: 'center', justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: 'rgba(255,255,255,0.2)' },
    metricHeaderText: { color: '#FFFFFF', fontSize: 9, letterSpacing: 0.5 },
    tableBodyRow: { flexDirection: 'row', height: 40, alignItems: 'center', borderBottomWidth: 1 },
    habitNameBodyCell: { width: 140, paddingLeft: 10, justifyContent: 'center', height: '100%', borderRightWidth: 1 },
    habitLabelText: { fontSize: 11 },
    matrixDataCell: { width: 36, height: '100%', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1 },
    metricBodyCell: { width: 48, height: '100%', alignItems: 'center', justifyContent: 'center', borderRightWidth: 1 },
    metricTotalText: { fontSize: 11 },
    metricPrayedText: { fontSize: 11 },
    metricMissedText: { fontSize: 11 },
    summaryTitle: { fontSize: 14, marginVertical: 10, letterSpacing: 0.3 },
    summaryCard: { borderRadius: 14, padding: 16, borderWidth: 1 },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
    summaryLabel: { fontSize: 13 },
    summaryValueText: { fontSize: 13 },
    prayedValueText: { fontSize: 13 },
    missedValueText: { fontSize: 13 },
    progressContainerBlock: { marginTop: 12, borderTopWidth: 1, paddingTop: 12 },
    progressTextRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
    progressLabel: { fontSize: 13 },
    progressPercentText: { fontSize: 13 },
    progressBarBackground: { height: 8, borderRadius: 4, overflow: 'hidden' },
    progressBarFill: { height: '100%', borderRadius: 4 },
});
