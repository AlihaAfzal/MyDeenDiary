import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { soundHapticService } from '../services/soundHapticsService';

interface GoalOption {
    id: string;
    titleEn: string;
    titleUr: string;
    descEn: string;
    descUr: string;
    icon: string;
}

const GOAL_OPTIONS: GoalOption[] = [
    {
        id: 'daily_prayers',
        titleEn: 'Daily Prayers',
        titleUr: 'روزانہ کی نمازیں',
        descEn: 'Track 5 obligatory Farz prayers, Sunnahs, and timely reminders',
        descUr: '۵ فرض نمازوں، سنتوں، اور بروقت اوقات کی مستقل پابندی',
        icon: 'checkmark-circle-outline',
    },
    {
        id: 'qaza_recovery',
        titleEn: 'Qaza Recovery',
        titleUr: 'قضا نمازوں کا حساب',
        descEn: 'Systematically calculate and fulfill missed backlog prayers',
        descUr: 'ماضی کی چھٹی ہوئی قضا نمازوں کا حساب اور تدریجی ادائیگی',
        icon: 'time-outline',
    },
    {
        id: 'azkar',
        titleEn: 'Morning / Evening Azkar',
        titleUr: 'صبح و شام کے اذکار',
        descEn: 'Recite authentic Sunnah daily adhkar with interactive counters',
        descUr: 'صبح، شام اور مسنون دعائیں انٹرایکٹو تسبیح کاؤنٹر کے ساتھ',
        icon: 'sunny-outline',
    },
    {
        id: 'quran_surahs',
        titleEn: 'Daily Quran Surahs',
        titleUr: 'روزانہ کی قرآنی سورتیں',
        descEn: 'Surah Al-Mulk, Ya-Sin, Al-Waqiah, and blessed Friday Al-Kahf',
        descUr: 'سورۃ الملک، یٰس، الواقعہ، اور جمعۃ المبارک پر سورۃ الکہف',
        icon: 'book-outline',
    },
    {
        id: 'reflection_journal',
        titleEn: 'Reflection Journal',
        titleUr: 'فکر و روحانی ڈائری',
        descEn: 'Document your spiritual milestones, daily lessons, and gratitude',
        descUr: 'اپنے روحانی احساسات، روزانہ کی آیات پر تدبر، اور شکر گزاری',
        icon: 'journal-outline',
    },
];

export default function OnboardingScreen({ navigation }: any) {
    const { colors, isDark } = useTheme();
    const { isUrdu, fonts } = useLanguage();
    const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

    const toggleGoal = (id: string) => {
        soundHapticService.triggerFeedback();
        setSelectedGoals((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleSkip = async () => {
        soundHapticService.triggerFeedback();
        try {
            await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
        } catch {
            // Non-blocking fallback
        }
        navigation.replace('Login');
    };

    const handleGetStarted = async () => {
        if (selectedGoals.length === 0) return;
        soundHapticService.triggerFeedback();
        try {
            await AsyncStorage.setItem('userOnboardingGoals', JSON.stringify(selectedGoals));
            await AsyncStorage.setItem('hasCompletedOnboarding', 'true');
        } catch {
            // Non-blocking fallback
        }
        navigation.replace('Login');
    };

    const isButtonEnabled = selectedGoals.length > 0;

    return (
        <View style={[styles.fullBackground, { backgroundColor: colors.background }]}>
            <StatusBar style={isDark ? 'light' : 'dark'} />
            <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right', 'bottom']}>
                {/* Header with Skip Button */}
                <View style={styles.headerRow}>
                    <View style={styles.brandRow}>
                        <Ionicons name="sparkles" size={20} color={colors.primary} style={{ marginRight: 6 }} />
                        <Text style={[styles.brandText, { color: colors.primary, fontFamily: fonts.bold }]}>
                            My Deen Diary
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.skipButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#F3F4F6' }]}
                        onPress={handleSkip}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.skipText, { color: colors.secondaryText, fontFamily: fonts.medium }, isUrdu && { fontSize: 14 }]}>
                            {isUrdu ? 'چھوڑیں' : 'Skip'}
                        </Text>
                        <Ionicons name="chevron-forward" size={14} color={colors.secondaryText} style={{ marginLeft: 2 }} />
                    </TouchableOpacity>
                </View>

                {/* Question & Intro */}
                <View style={styles.introContainer}>
                    <Text
                        style={[
                            styles.mainTitle,
                            { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false },
                            isUrdu && { fontSize: 24, lineHeight: 34, textAlign: 'right' },
                        ]}
                    >
                        {isUrdu ? 'آپ مائی دین ڈائری کیوں استعمال کر رہے ہیں؟' : 'Why are you using My Deen Diary?'}
                    </Text>
                    <Text
                        style={[
                            styles.subTitle,
                            { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false },
                            isUrdu && { fontSize: 15, lineHeight: 22, textAlign: 'right' },
                        ]}
                    >
                        {isUrdu
                            ? 'اپنی ترجیحات منتخب کریں تاکہ ہم آپ کے دینی سفر کو با مقصد اور آسان بنا سکیں۔'
                            : 'Select all areas you want to focus on and strengthen in your daily spiritual journey.'}
                    </Text>
                </View>

                {/* Multi-Select Options List */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.optionsList}
                >
                    {GOAL_OPTIONS.map((goal) => {
                        const isSelected = selectedGoals.includes(goal.id);
                        return (
                            <TouchableOpacity
                                key={goal.id}
                                style={[
                                    styles.optionCard,
                                    {
                                        backgroundColor: isSelected
                                            ? (isDark ? 'rgba(13, 92, 58, 0.22)' : '#EAF5EF')
                                            : colors.surface,
                                        borderColor: isSelected ? colors.primary : colors.border,
                                    },
                                ]}
                                onPress={() => toggleGoal(goal.id)}
                                activeOpacity={0.8}
                            >
                                <View
                                    style={[
                                        styles.iconCircle,
                                        {
                                            backgroundColor: isSelected ? colors.primary : (isDark ? '#23302B' : '#F3F4F6'),
                                        },
                                    ]}
                                >
                                    <Ionicons
                                        name={goal.icon as any}
                                        size={22}
                                        color={isSelected ? '#FFFFFF' : colors.primary}
                                    />
                                </View>

                                <View style={styles.cardTextCol}>
                                    <Text
                                        style={[
                                            styles.cardTitle,
                                            { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false },
                                            isUrdu && { fontSize: 16, lineHeight: 22 },
                                        ]}
                                    >
                                        {isUrdu ? goal.titleUr : goal.titleEn}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.cardDesc,
                                            { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false },
                                            isUrdu && { fontSize: 13.5, lineHeight: 19 },
                                        ]}
                                    >
                                        {isUrdu ? goal.descUr : goal.descEn}
                                    </Text>
                                </View>

                                <View
                                    style={[
                                        styles.checkRing,
                                        {
                                            borderColor: isSelected ? colors.primary : colors.border,
                                            backgroundColor: isSelected ? colors.primary : 'transparent',
                                        },
                                    ]}
                                >
                                    {isSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                {/* Bottom Action Footer */}
                <View style={[styles.bottomBar, { borderTopColor: colors.borderLight }]}>
                    <TouchableOpacity
                        style={[
                            styles.getStartedButton,
                            {
                                backgroundColor: isButtonEnabled ? colors.primary : (isDark ? '#2C3A35' : '#D1D5DB'),
                            },
                        ]}
                        onPress={handleGetStarted}
                        disabled={!isButtonEnabled}
                        activeOpacity={0.85}
                    >
                        <Text
                            style={[
                                styles.getStartedText,
                                {
                                    color: isButtonEnabled ? '#FFFFFF' : (isDark ? '#8A9993' : '#6B7280'),
                                    fontFamily: fonts.bold,
                                    includeFontPadding: false,
                                },
                                isUrdu && { fontSize: 16 },
                            ]}
                        >
                            {isUrdu ? 'شروعات کریں' : 'Get Started'}
                        </Text>
                        <Ionicons
                            name="arrow-forward"
                            size={18}
                            color={isButtonEnabled ? '#FFFFFF' : (isDark ? '#8A9993' : '#6B7280')}
                            style={{ marginLeft: 6 }}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    fullBackground: {
        flex: 1,
    },
    safeContainer: {
        flex: 1,
        paddingHorizontal: 20,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
    },
    brandRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    brandText: {
        fontSize: 16,
        letterSpacing: 0.3,
    },
    skipButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
    },
    skipText: {
        fontSize: 13,
    },
    introContainer: {
        marginTop: 8,
        marginBottom: 16,
    },
    mainTitle: {
        fontSize: 22,
        lineHeight: 30,
        marginBottom: 8,
    },
    subTitle: {
        fontSize: 14,
        lineHeight: 20,
    },
    optionsList: {
        paddingBottom: 24,
        gap: 12,
    },
    optionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 14,
        borderWidth: 1.5,
    },
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    cardTextCol: {
        flex: 1,
        marginRight: 10,
    },
    cardTitle: {
        fontSize: 15,
        marginBottom: 3,
    },
    cardDesc: {
        fontSize: 12.5,
    },
    checkRing: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomBar: {
        paddingVertical: 14,
        borderTopWidth: 1,
    },
    getStartedButton: {
        height: 50,
        borderRadius: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    getStartedText: {
        fontSize: 15.5,
    },
});
