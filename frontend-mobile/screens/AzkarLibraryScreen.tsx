import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    BackHandler,
    Modal,
    TextInput,
    Alert,
    Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { azkarCollections } from '../data/azkarData';
import { DAILY_SURAHS, DailySurahItem, UrduTranslationEdition } from '../data/dailySurahsData';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useArabic } from '../context/ArabicContext';
import { soundHapticService } from '../services/soundHapticsService';
import { scheduleCustomDuaReminder, cancelCustomDuaReminder } from '../services/notificationService';

export interface CustomDuaItem {
    id: string;
    title: string;
    arabic?: string;
    meaning?: string;
    targetCount: number;
    currentCount: number;
    reminderEnabled: boolean;
    reminderHour?: number;
    reminderMinute?: number;
    notificationId?: string;
    createdAt: number;
}

export default function AzkarLibraryScreen({ navigation }: any) {
    const { colors, isDark } = useTheme();
    const { t, isUrdu, fonts } = useLanguage();
    const { getArabicStyle, getUrduStyle } = useArabic();

    // Primary Tab: 'azkar' | 'surahs' | 'custom'
    const [activeTab, setActiveTab] = useState<'azkar' | 'surahs' | 'custom'>('azkar');

    // Azkar Collection States
    const [selectedCategoryKey, setSelectedCategoryKey] = useState<string | null>(null);
    const [counterState, setCounterState] = useState<Record<string, number>>({});

    // Daily Surahs States
    const [selectedSurah, setSelectedSurah] = useState<DailySurahItem | null>(null);
    const [urduEdition, setUrduEdition] = useState<UrduTranslationEdition>('jalandhari');

    // Custom Duas States
    const [customDuas, setCustomDuas] = useState<CustomDuaItem[]>([]);
    const [customModalVisible, setCustomModalVisible] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newArabic, setNewArabic] = useState('');
    const [newMeaning, setNewMeaning] = useState('');
    const [newTarget, setNewTarget] = useState('33');
    const [newReminderEnabled, setNewReminderEnabled] = useState(false);
    const [newReminderTime, setNewReminderTime] = useState('09:00'); // HH:MM 24h
    const [userEmail, setUserEmail] = useState<string>('guest');

    const getCustomDuasKey = (email: string) => `userCustomDuas_${email || 'guest'}`;

    // Load custom duas on mount
    const loadCustomDuas = async () => {
        try {
            const email = (await AsyncStorage.getItem('userEmail')) || 'guest';
            setUserEmail(email);
            const raw = await AsyncStorage.getItem(getCustomDuasKey(email));
            if (raw) {
                setCustomDuas(JSON.parse(raw));
            } else {
                setCustomDuas([]);
            }
        } catch {
            setCustomDuas([]);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadCustomDuas();
        }, [])
    );

    const persistCustomDuas = async (duas: CustomDuaItem[]) => {
        setCustomDuas(duas);
        try {
            await AsyncStorage.setItem(getCustomDuasKey(userEmail), JSON.stringify(duas));
        } catch {
            // Non-blocking fallback
        }
    };

    // Hardware Back Button
    const handleBackPress = () => {
        soundHapticService.triggerFeedback();
        if (selectedSurah !== null) {
            setSelectedSurah(null);
            return true;
        }
        if (selectedCategoryKey !== null) {
            setSelectedCategoryKey(null);
            return true;
        }
        if (navigation?.canGoBack?.()) {
            navigation.goBack();
            return true;
        }
        if (navigation?.navigate) {
            navigation.navigate('Tracker');
            return true;
        }
        return false;
    };

    useFocusEffect(
        useCallback(() => {
            const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
            return () => subscription.remove();
        }, [selectedCategoryKey, selectedSurah])
    );

    // Azkar counter increment
    const handleIncrement = (id: string, targetRepeat: number) => {
        soundHapticService.playTasbeehFeedback();
        setCounterState((prev) => {
            const cur = prev[id] || 0;
            const next = cur >= targetRepeat ? 0 : cur + 1;
            return { ...prev, [id]: next };
        });
    };

    // Custom Dua Counter Increment
    const handleCustomIncrement = (dua: CustomDuaItem) => {
        soundHapticService.playTasbeehFeedback();
        const next = dua.currentCount + 1;
        const updated = customDuas.map((d) => {
            if (d.id === dua.id) {
                return { ...d, currentCount: next };
            }
            return d;
        });
        persistCustomDuas(updated);
    };

    const handleCustomReset = (id: string) => {
        soundHapticService.triggerFeedback();
        const updated = customDuas.map((d) => (d.id === id ? { ...d, currentCount: 0 } : d));
        persistCustomDuas(updated);
    };

    const handleCustomDelete = (dua: CustomDuaItem) => {
        Alert.alert(
            isUrdu ? 'دعا حذف کریں' : 'Delete Custom Dua',
            isUrdu ? 'کیا آپ اس دعا کو حذف کرنا چاہتے ہیں؟' : `Are you sure you want to delete "${dua.title}"?`,
            [
                { text: isUrdu ? 'منسوخ' : 'Cancel', style: 'cancel' },
                {
                    text: isUrdu ? 'حذف کریں' : 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        soundHapticService.triggerFeedback();
                        if (dua.notificationId) {
                            await cancelCustomDuaReminder(dua.notificationId);
                        }
                        const filtered = customDuas.filter((d) => d.id !== dua.id);
                        persistCustomDuas(filtered);
                    },
                },
            ]
        );
    };

    const handleSaveNewCustomDua = async () => {
        const titleTrimmed = newTitle.trim();
        if (!titleTrimmed) {
            Alert.alert(isUrdu ? 'عنوان درکار ہے' : 'Title Required', isUrdu ? 'براہ کرم دعا کا عنوان درج کریں۔' : 'Please provide a title for your custom dua.');
            return;
        }

        const targetParsed = parseInt(newTarget.trim(), 10) || 33;
        const [hStr, mStr] = newReminderTime.split(':');
        const hour = parseInt(hStr, 10) || 9;
        const minute = parseInt(mStr, 10) || 0;

        soundHapticService.triggerFeedback();

        const newId = `custom_dua_${Date.now()}`;
        let notifId: string | undefined = undefined;

        if (newReminderEnabled) {
            notifId = await scheduleCustomDuaReminder(newId, titleTrimmed, hour, minute);
        }

        const newItem: CustomDuaItem = {
            id: newId,
            title: titleTrimmed,
            arabic: newArabic.trim() || undefined,
            meaning: newMeaning.trim() || undefined,
            targetCount: Math.max(1, targetParsed),
            currentCount: 0,
            reminderEnabled: newReminderEnabled,
            reminderHour: newReminderEnabled ? hour : undefined,
            reminderMinute: newReminderEnabled ? minute : undefined,
            notificationId: notifId,
            createdAt: Date.now(),
        };

        const updated = [newItem, ...customDuas];
        await persistCustomDuas(updated);

        // Reset inputs
        setNewTitle('');
        setNewArabic('');
        setNewMeaning('');
        setNewTarget('33');
        setNewReminderEnabled(false);
        setCustomModalVisible(false);
    };

    const categoryKeys = Object.keys(azkarCollections);
    const isFriday = new Date().getDay() === 5; // 5 = Friday

    return (
        <View style={[styles.fullBackground, { backgroundColor: colors.background }]}>
            <StatusBar style="light" />
            <SafeAreaView style={{ backgroundColor: colors.primary }} edges={['top']}>
                {/* Standardized Header Container */}
                <View style={[styles.headerContainer, { backgroundColor: colors.primary }]}>
                    <TouchableOpacity style={styles.backButton} onPress={handleBackPress} activeOpacity={0.7}>
                        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>

                    <Text
                        style={[
                            styles.headerTitle,
                            { fontFamily: fonts.bold, includeFontPadding: false },
                            isUrdu && { fontSize: 20, lineHeight: 28 },
                        ]}
                        numberOfLines={1}
                    >
                        {selectedSurah
                            ? (isUrdu ? selectedSurah.nameUr : selectedSurah.nameEn)
                            : selectedCategoryKey
                            ? (isUrdu
                                ? ((azkarCollections as any)[selectedCategoryKey]?.titleUr || (azkarCollections as any)[selectedCategoryKey]?.title)
                                : (azkarCollections as any)[selectedCategoryKey]?.title)
                            : (isUrdu ? 'تلاوت، اذکار و دعائیں' : 'Recitations & Azkar')}
                    </Text>

                    {activeTab === 'custom' && !selectedCategoryKey && !selectedSurah ? (
                        <TouchableOpacity
                            style={styles.headerAddBtn}
                            onPress={() => setCustomModalVisible(true)}
                            activeOpacity={0.8}
                        >
                            <Ionicons name="add-circle" size={26} color="#FFFFFF" />
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.rightSpacer} />
                    )}
                </View>

                {/* Top Section Segmented Tabs (When in Top-Level Hub) */}
                {selectedCategoryKey === null && selectedSurah === null && (
                    <View style={[styles.segmentedTabBar, { backgroundColor: colors.primary }]}>
                        {[
                            { key: 'azkar' as const, labelEn: 'Azkar & Duas', labelUr: 'اذکار و دعائیں', icon: 'book-outline' },
                            { key: 'surahs' as const, labelEn: 'Daily Surahs', labelUr: 'روزانہ سورتیں', icon: 'bookmark-outline' },
                            { key: 'custom' as const, labelEn: 'Custom Duas', labelUr: 'ذاتی دعائیں', icon: 'heart-outline' },
                        ].map((tab) => {
                            const isSelected = activeTab === tab.key;
                            return (
                                <TouchableOpacity
                                    key={tab.key}
                                    style={[
                                        styles.tabBtn,
                                        isSelected && [styles.tabBtnActive, { borderBottomColor: '#F59E0B' }],
                                    ]}
                                    onPress={() => {
                                        soundHapticService.triggerFeedback();
                                        setActiveTab(tab.key);
                                    }}
                                    activeOpacity={0.8}
                                >
                                    <Ionicons
                                        name={tab.icon as any}
                                        size={15}
                                        color={isSelected ? '#F59E0B' : 'rgba(255, 255, 255, 0.7)'}
                                        style={{ marginRight: 5 }}
                                    />
                                    <Text
                                        style={[
                                            styles.tabBtnText,
                                            {
                                                color: isSelected ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                                                fontFamily: isSelected ? fonts.bold : fonts.medium,
                                                includeFontPadding: false,
                                            },
                                            isUrdu && { fontSize: 13.5 },
                                        ]}
                                    >
                                        {isUrdu ? tab.labelUr : tab.labelEn}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}
            </SafeAreaView>

            <View style={[styles.bodyContainer, { backgroundColor: colors.background }]}>
                {/* =========================================================================
                    TAB 1: AZKAR & AUTHENTIC DUAS
                   ========================================================================= */}
                {activeTab === 'azkar' && (
                    <>
                        {selectedCategoryKey === null ? (
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                                {/* Quranic Ayah Inspiration Banner */}
                                <View style={[styles.ayahBanner, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
                                    <Text style={[styles.ayahArabic, getArabicStyle(0.85), { color: colors.goldDark, textAlign: 'center' }]}>
                                        أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ
                                    </Text>
                                    <Text
                                        style={[
                                            styles.ayahTranslation,
                                            { color: colors.text, fontFamily: fonts.regular, includeFontPadding: false },
                                            isUrdu && getUrduStyle({ isMultiLine: true, tightPadding: true }),
                                        ]}
                                    >
                                        {isUrdu
                                            ? 'خبردار! اللہ کے ذکر سے ہی دلوں کو سکون و اطمینان ملتا ہے۔'
                                            : '"Unquestionably, by the remembrance of Allah hearts find rest."'}
                                    </Text>
                                    <Text style={[styles.ayahReference, { color: colors.goldDark, fontFamily: fonts.semiBold }]}>
                                        {isUrdu ? 'سورۃ الرعد (۱۳:۲۸)' : "Surah Ar-Ra'd (13:28)"}
                                    </Text>
                                </View>

                                {/* Category Cards */}
                                {categoryKeys.map((key) => {
                                    const cat = (azkarCollections as any)[key];
                                    return (
                                        <TouchableOpacity
                                            key={key}
                                            style={[styles.categoryCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                                            onPress={() => {
                                                soundHapticService.triggerFeedback();
                                                setSelectedCategoryKey(key);
                                            }}
                                            activeOpacity={0.8}
                                        >
                                            <View style={[styles.cardIconCircle, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
                                                <Ionicons name={cat.icon || 'book-outline'} size={22} color={colors.primary} />
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text style={[styles.categoryCardTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 18, lineHeight: 25 }]}>
                                                    {isUrdu ? (cat.titleUr || cat.title) : cat.title}
                                                </Text>
                                                <Text style={[styles.categoryCardSub, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 14, lineHeight: 20 }]}>
                                                    {isUrdu ? (cat.subtitleUr || cat.subtitle) : cat.subtitle}
                                                </Text>
                                            </View>
                                            <Ionicons name="chevron-forward" size={18} color={colors.secondaryText} />
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>
                        ) : (
                            /* Azkar List Detail View */
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                                <View style={styles.categorySubHeader}>
                                    <View style={[styles.cardIconCircle, { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
                                        <Ionicons
                                            name={(azkarCollections as any)[selectedCategoryKey]?.icon || 'book-outline'}
                                            size={16}
                                            color={colors.primary}
                                        />
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={[styles.categoryDetailTitle, { color: colors.primary, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 18, lineHeight: 25 }]} numberOfLines={1}>
                                            {isUrdu
                                                ? ((azkarCollections as any)[selectedCategoryKey]?.titleUr || (azkarCollections as any)[selectedCategoryKey]?.title)
                                                : (azkarCollections as any)[selectedCategoryKey]?.title}
                                        </Text>
                                        <Text style={[styles.categoryCardSub, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 14, lineHeight: 20 }]} numberOfLines={1}>
                                            {isUrdu
                                                ? ((azkarCollections as any)[selectedCategoryKey]?.subtitleUr || (azkarCollections as any)[selectedCategoryKey]?.subtitle)
                                                : (azkarCollections as any)[selectedCategoryKey]?.subtitle}
                                        </Text>
                                    </View>
                                </View>

                                {/* List of items */}
                                {((azkarCollections as any)[selectedCategoryKey]?.items || []).map((item: any) => {
                                    const current = counterState[item.id] || 0;
                                    const isDone = current >= item.repeat;

                                    return (
                                        <View
                                            key={item.id}
                                            style={[
                                                styles.dhikrCard,
                                                { backgroundColor: colors.surface, borderColor: colors.border },
                                                isUrdu && { paddingVertical: 10 },
                                                isDone && { borderColor: colors.primary, backgroundColor: colors.primaryLight },
                                            ]}
                                        >
                                            <Text style={[styles.arabicScript, getArabicStyle(), { color: colors.primary }]}>{item.arabic}</Text>
                                            <Text style={[styles.translitScript, { color: colors.goldDark, fontFamily: fonts.medium, includeFontPadding: false }]}>
                                                {item.transliteration}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.englishScript,
                                                    { color: colors.text, fontFamily: fonts.regular, includeFontPadding: false },
                                                    isUrdu && getUrduStyle({ isMultiLine: true, tightPadding: true }),
                                                ]}
                                            >
                                                {isUrdu ? item.urdu : `"${item.english}"`}
                                            </Text>

                                            <View style={[styles.footerRow, { borderTopColor: colors.borderLight }]}>
                                                <View style={[styles.refPill, { backgroundColor: colors.background }]}>
                                                    <Text style={[styles.refPillText, { color: colors.secondaryText, fontFamily: fonts.medium }]}>
                                                        {item.reference}
                                                    </Text>
                                                </View>

                                                <TouchableOpacity
                                                    style={[
                                                        styles.tapCounterBtn,
                                                        { backgroundColor: colors.primary },
                                                        isDone && { backgroundColor: colors.primaryLight, borderWidth: 1, borderColor: colors.primary },
                                                    ]}
                                                    onPress={() => handleIncrement(item.id, item.repeat)}
                                                    activeOpacity={0.75}
                                                >
                                                    <Text
                                                        style={[
                                                            styles.tapCounterText,
                                                            { color: '#FFFFFF', fontFamily: fonts.bold },
                                                            isDone && { color: colors.primary },
                                                        ]}
                                                    >
                                                        {current} / {item.repeat}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    );
                                })}
                            </ScrollView>
                        )}
                    </>
                )}

                {/* =========================================================================
                    TAB 2: DAILY SURAHS (Al-Mulk, As-Sajdah, Al-Waqiah, Yaseen, Al-Kahf)
                   ========================================================================= */}
                {activeTab === 'surahs' && (
                    <>
                        {selectedSurah === null ? (
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                                {/* Translation Switcher Pill */}
                                <View style={[styles.translationSwitchCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                                    <View style={styles.translationSwitchHeader}>
                                        <Ionicons name="language-outline" size={18} color={colors.primary} style={{ marginRight: 6 }} />
                                        <Text style={[styles.translationSwitchTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 15 }]}>
                                            {isUrdu ? 'اردو ترجمہ کا انتخاب:' : 'Urdu Translation Edition:'}
                                        </Text>
                                    </View>
                                    <View style={styles.translationSegment}>
                                        <TouchableOpacity
                                            style={[
                                                styles.editionBtn,
                                                urduEdition === 'jalandhari' && [styles.editionBtnActive, { backgroundColor: colors.primary }],
                                            ]}
                                            onPress={() => {
                                                soundHapticService.triggerFeedback();
                                                setUrduEdition('jalandhari');
                                            }}
                                            activeOpacity={0.8}
                                        >
                                            <Text
                                                style={[
                                                    styles.editionBtnText,
                                                    { color: urduEdition === 'jalandhari' ? '#FFFFFF' : colors.secondaryText, fontFamily: fonts.semiBold },
                                                    isUrdu && { fontSize: 13.5 },
                                                ]}
                                            >
                                                {isUrdu ? 'فتح محمد جالندھری' : 'F. M. Jalandhari'}
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[
                                                styles.editionBtn,
                                                urduEdition === 'kanzuliman' && [styles.editionBtnActive, { backgroundColor: colors.primary }],
                                            ]}
                                            onPress={() => {
                                                soundHapticService.triggerFeedback();
                                                setUrduEdition('kanzuliman');
                                            }}
                                            activeOpacity={0.8}
                                        >
                                            <Text
                                                style={[
                                                    styles.editionBtnText,
                                                    { color: urduEdition === 'kanzuliman' ? '#FFFFFF' : colors.secondaryText, fontFamily: fonts.semiBold },
                                                    isUrdu && { fontSize: 13.5 },
                                                ]}
                                            >
                                                {isUrdu ? 'کنز الایمان' : 'Kanzul Iman'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Surahs List Cards */}
                                {DAILY_SURAHS.map((surah) => {
                                    const isKahf = surah.surahNumber === 18;
                                    return (
                                        <TouchableOpacity
                                            key={surah.id}
                                            style={[
                                                styles.surahCard,
                                                { backgroundColor: colors.surface, borderColor: colors.border },
                                                isKahf && isFriday && { borderColor: '#F59E0B', borderWidth: 1.8 },
                                            ]}
                                            onPress={() => {
                                                soundHapticService.triggerFeedback();
                                                setSelectedSurah(surah);
                                            }}
                                            activeOpacity={0.8}
                                        >
                                            <View style={styles.surahCardTop}>
                                                <View style={[styles.surahNumberBadge, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
                                                    <Text style={[styles.surahNumberText, { color: colors.primary, fontFamily: fonts.bold }]}>
                                                        {surah.surahNumber}
                                                    </Text>
                                                </View>
                                                <View style={{ flex: 1, marginHorizontal: 12 }}>
                                                    <Text style={[styles.surahCardName, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 18, lineHeight: 25 }]}>
                                                        {isUrdu ? surah.nameUr : surah.nameEn}
                                                    </Text>
                                                    <Text style={[styles.surahCardTitleSub, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 14 }]}>
                                                        {isUrdu ? surah.titleUr : surah.titleEn} • {surah.totalAyahs} {isUrdu ? 'آیات' : 'Ayahs'}
                                                    </Text>
                                                </View>
                                                <Ionicons name="chevron-forward" size={18} color={colors.secondaryText} />
                                            </View>

                                            {/* Friday Badge for Surah Al-Kahf */}
                                            {isKahf && (
                                                <View style={[styles.fridayBadge, { backgroundColor: isFriday ? 'rgba(245, 158, 11, 0.15)' : (isDark ? 'rgba(255,255,255,0.06)' : '#F3F4F6') }]}>
                                                    <Ionicons name="sparkles" size={14} color={isFriday ? '#D97706' : colors.primary} style={{ marginRight: 6 }} />
                                                    <Text style={[styles.fridayBadgeText, { color: isFriday ? '#D97706' : colors.primary, fontFamily: fonts.semiBold }, isUrdu && { fontSize: 13 }]}>
                                                        {isUrdu ? 'جمعۃ المبارک کی مسنون تلاوت (نور کی بشارت)' : 'Blessed Friday Sunnah Recitation (Illuminating Light)'}
                                                    </Text>
                                                </View>
                                            )}

                                            <Text style={[styles.surahVirtueText, { color: colors.secondaryText, fontFamily: fonts.regular }, isUrdu && { fontSize: 13.5, lineHeight: 19 }]}>
                                                {isUrdu ? surah.virtueUr : surah.virtueEn}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </ScrollView>
                        ) : (
                            /* Surah Reader View */
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                                {/* Surah Reader Header Card */}
                                <View style={[styles.readerHeaderCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                                    <Text style={[styles.readerSurahName, { color: colors.primary, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 24, lineHeight: 32 }]}>
                                        {isUrdu ? selectedSurah.nameUr : selectedSurah.nameEn}
                                    </Text>
                                    <Text style={[styles.readerSurahSub, { color: colors.secondaryText, fontFamily: fonts.medium }]}>
                                        {selectedSurah.titleEn} • {selectedSurah.totalAyahs} {isUrdu ? 'آیات' : 'Ayahs'}
                                    </Text>

                                    {/* Bismillah Header (except Surah 9) */}
                                    <View style={[styles.bismillahBox, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
                                        <Text style={[styles.bismillahText, getArabicStyle(1.05), { color: colors.primary }]}>
                                            بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                                        </Text>
                                    </View>
                                </View>

                                {/* Ayahs List */}
                                {selectedSurah.ayahs.map((ayah) => {
                                    const urduText =
                                        urduEdition === 'kanzuliman'
                                            ? ayah.urduKanzulIman || ayah.urduJalandhari
                                            : ayah.urduJalandhari;

                                    return (
                                        <View
                                            key={ayah.numberInSurah}
                                            style={[styles.ayahReaderCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                                        >
                                            <View style={styles.ayahNumberRow}>
                                                <View style={[styles.ayahNumberCircle, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
                                                    <Text style={[styles.ayahNumberCircleText, { color: colors.primary, fontFamily: fonts.bold }]}>
                                                        {ayah.numberInSurah}
                                                    </Text>
                                                </View>
                                            </View>

                                            <Text style={[styles.surahArabicText, getArabicStyle(0.95), { color: colors.text }]}>
                                                {ayah.arabic}
                                            </Text>

                                            <Text style={[styles.surahEnglishText, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                                {ayah.english}
                                            </Text>

                                            <Text
                                                style={[
                                                    styles.surahUrduText,
                                                    getUrduStyle({ isMultiLine: true, tightPadding: true }),
                                                    { color: colors.primary },
                                                ]}
                                            >
                                                {urduText}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </ScrollView>
                        )}
                    </>
                )}

                {/* =========================================================================
                    TAB 3: CUSTOM DUAS & LOCAL DAILY REMINDERS
                   ========================================================================= */}
                {activeTab === 'custom' && (
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                        {/* Custom Duas Banner */}
                        <View style={[styles.customBanner, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <View style={styles.customBannerLeft}>
                                <Ionicons name="heart" size={24} color="#EF4444" style={{ marginRight: 10 }} />
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.customBannerTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 17 }]}>
                                        {isUrdu ? 'آپ کی ذاتی دعائیں اور ورد' : 'Your Personal Duas & Adhkar'}
                                    </Text>
                                    <Text style={[styles.customBannerSub, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 13.5 }]}>
                                        {isUrdu
                                            ? 'اپنی دعائیں شامل کریں، تکرار کی حد اور روزانہ کا مقامی الارم مقرر کریں'
                                            : 'Add personal supplications with custom target counts and daily reminder alerts'}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={[styles.addDuaBannerBtn, { backgroundColor: colors.primary }]}
                                onPress={() => setCustomModalVisible(true)}
                                activeOpacity={0.8}
                            >
                                <Ionicons name="add" size={16} color="#FFFFFF" style={{ marginRight: 4 }} />
                                <Text style={[styles.addDuaBannerBtnText, { fontFamily: fonts.bold }, isUrdu && { fontSize: 14 }]}>
                                    {isUrdu ? 'نئی دعا' : 'Add Dua'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* List of custom duas or empty state */}
                        {customDuas.length === 0 ? (
                            <View style={[styles.emptyCustomCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                                <Ionicons name="heart-outline" size={48} color={colors.secondaryText} style={{ marginBottom: 12 }} />
                                <Text style={[styles.emptyCustomTitle, { color: colors.text, fontFamily: fonts.bold }, isUrdu && { fontSize: 18 }]}>
                                    {isUrdu ? 'کوئی ذاتی دعا محفوظ نہیں' : 'No Custom Duas Saved Yet'}
                                </Text>
                                <Text style={[styles.emptyCustomSub, { color: colors.secondaryText, fontFamily: fonts.regular }, isUrdu && { fontSize: 14, textAlign: 'center' }]}>
                                    {isUrdu
                                        ? 'اوپر دائیں "+ نئی دعا" دبا کر اپنے پسندیدہ کلمات، درود یا دعائیں شامل کریں۔'
                                        : 'Tap "+ Add Dua" above to save your favorite personal supplications, salawat, or daily verses.'}
                                </Text>
                            </View>
                        ) : (
                            customDuas.map((dua) => {
                                const isDone = dua.currentCount >= dua.targetCount;
                                const percent = Math.min(100, Math.round((dua.currentCount / dua.targetCount) * 100));

                                return (
                                    <View
                                        key={dua.id}
                                        style={[
                                            styles.customDuaCard,
                                            { backgroundColor: colors.surface, borderColor: colors.border },
                                            isDone && { borderColor: colors.primary, backgroundColor: colors.primaryLight },
                                        ]}
                                    >
                                        <View style={styles.customDuaHeader}>
                                            <View style={{ flex: 1, marginRight: 8 }}>
                                                <Text style={[styles.customDuaTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 17 }]}>
                                                    {dua.title}
                                                </Text>
                                                {dua.reminderEnabled && (
                                                    <View style={styles.customReminderPill}>
                                                        <Ionicons name="alarm-outline" size={12} color="#F59E0B" style={{ marginRight: 4 }} />
                                                        <Text style={[styles.customReminderPillText, { fontFamily: fonts.medium }]}>
                                                            {isUrdu ? 'روزانہ یاددہانی:' : 'Daily:'} {String(dua.reminderHour || 9).padStart(2, '0')}:{String(dua.reminderMinute || 0).padStart(2, '0')}
                                                        </Text>
                                                    </View>
                                                )}
                                            </View>

                                            <TouchableOpacity
                                                onPress={() => handleCustomDelete(dua)}
                                                style={styles.customDeleteBtn}
                                                activeOpacity={0.7}
                                            >
                                                <Ionicons name="trash-outline" size={18} color={colors.danger} />
                                            </TouchableOpacity>
                                        </View>

                                        {dua.arabic ? (
                                            <Text style={[styles.customDuaArabic, getArabicStyle(0.95), { color: colors.primary }]}>
                                                {dua.arabic}
                                            </Text>
                                        ) : null}

                                        {dua.meaning ? (
                                            <Text style={[styles.customDuaMeaning, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                                {dua.meaning}
                                            </Text>
                                        ) : null}

                                        {/* Counter Progress Row */}
                                        <View style={styles.customProgressRow}>
                                            <View style={[styles.customProgressBarBg, { backgroundColor: isDark ? '#23302B' : '#E5E7EB' }]}>
                                                <View style={[styles.customProgressBarFill, { width: `${percent}%`, backgroundColor: colors.primary }]} />
                                            </View>
                                            <Text style={[styles.customProgressText, { color: colors.secondaryText, fontFamily: fonts.semiBold }]}>
                                                {dua.currentCount} / {dua.targetCount} ({percent}%)
                                            </Text>
                                        </View>

                                        {/* Actions Row */}
                                        <View style={styles.customActionsRow}>
                                            <TouchableOpacity
                                                style={[styles.customResetBtn, { borderColor: colors.border }]}
                                                onPress={() => handleCustomReset(dua.id)}
                                                activeOpacity={0.7}
                                            >
                                                <Ionicons name="refresh-outline" size={15} color={colors.secondaryText} style={{ marginRight: 4 }} />
                                                <Text style={[styles.customResetBtnText, { color: colors.secondaryText, fontFamily: fonts.medium }, isUrdu && { fontSize: 13 }]}>
                                                    {isUrdu ? 'دوبارہ شروع' : 'Reset'}
                                                </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={[
                                                    styles.customCountBtn,
                                                    { backgroundColor: colors.primary },
                                                    isDone && { backgroundColor: '#10B981' },
                                                ]}
                                                onPress={() => handleCustomIncrement(dua)}
                                                activeOpacity={0.8}
                                            >
                                                <Ionicons name={isDone ? 'checkmark-circle' : 'finger-print-outline'} size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                                                <Text style={[styles.customCountBtnText, { fontFamily: fonts.bold }, isUrdu && { fontSize: 15 }]}>
                                                    {isDone ? (isUrdu ? 'مکمل ہوا' : 'Completed!') : (isUrdu ? '+۱ تسبیح' : '+1 Count')}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            })
                        )}
                    </ScrollView>
                )}
            </View>

            {/* =========================================================================
                ADD CUSTOM DUA MODAL
               ========================================================================= */}
            <Modal visible={customModalVisible} transparent={true} animationType="slide" onRequestClose={() => setCustomModalVisible(false)}>
                <SafeAreaView style={styles.modalOverlay}>
                    <View style={[styles.modalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <View style={styles.modalHeader}>
                            <View style={{ flex: 1 }}>
                                <Text style={[styles.modalTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 19 }]}>
                                    {isUrdu ? 'نئی ذاتی دعا شامل کریں' : 'Add Custom Dua / Zikr'}
                                </Text>
                                <Text style={[styles.modalSub, { color: colors.secondaryText, fontFamily: fonts.regular }, isUrdu && { fontSize: 13 }]}>
                                    {isUrdu ? 'اپنے روزمرہ کے ورد اور یاددہانی کا تعین کریں' : 'Set custom target count and optional daily reminder'}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => setCustomModalVisible(false)} style={styles.modalCloseBtn}>
                                <Ionicons name="close" size={24} color={colors.secondaryText} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                            {/* Title Input */}
                            <Text style={[styles.inputLabel, { color: colors.text, fontFamily: fonts.semiBold }, isUrdu && { fontSize: 14 }]}>
                                {isUrdu ? 'دعا کا عنوان *' : 'Dua Title *'}
                            </Text>
                            <TextInput
                                style={[styles.textInput, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
                                placeholder={isUrdu ? 'مثلاً: درود شریف، استغفار، حفاظت کی دعا' : 'e.g., Salawat, Istighfar, Dua for Parents'}
                                placeholderTextColor={colors.textPlaceholder}
                                value={newTitle}
                                onChangeText={setNewTitle}
                            />

                            {/* Arabic Input */}
                            <Text style={[styles.inputLabel, { color: colors.text, fontFamily: fonts.semiBold }, isUrdu && { fontSize: 14 }]}>
                                {isUrdu ? 'عربی متن (اختیاری)' : 'Arabic Text (Optional)'}
                            </Text>
                            <TextInput
                                style={[styles.textInput, styles.multilineInput, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
                                placeholder={isUrdu ? 'عربی الفاظ یہاں درج کریں...' : 'Enter Arabic text...'}
                                placeholderTextColor={colors.textPlaceholder}
                                multiline
                                numberOfLines={3}
                                value={newArabic}
                                onChangeText={setNewArabic}
                            />

                            {/* Meaning / Transliteration Input */}
                            <Text style={[styles.inputLabel, { color: colors.text, fontFamily: fonts.semiBold }, isUrdu && { fontSize: 14 }]}>
                                {isUrdu ? 'ترجمہ یا مفہوم (اختیاری)' : 'Translation / Meaning (Optional)'}
                            </Text>
                            <TextInput
                                style={[styles.textInput, styles.multilineInput, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
                                placeholder={isUrdu ? 'دعا کا ترجمہ یا مقصد...' : 'Enter meaning or intent...'}
                                placeholderTextColor={colors.textPlaceholder}
                                multiline
                                numberOfLines={2}
                                value={newMeaning}
                                onChangeText={setNewMeaning}
                            />

                            {/* Target Count */}
                            <Text style={[styles.inputLabel, { color: colors.text, fontFamily: fonts.semiBold }, isUrdu && { fontSize: 14 }]}>
                                {isUrdu ? 'تکرار کا ہدف (Target Count)' : 'Daily Target Count'}
                            </Text>
                            <TextInput
                                style={[styles.textInput, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
                                placeholder="33"
                                placeholderTextColor={colors.textPlaceholder}
                                keyboardType="numeric"
                                value={newTarget}
                                onChangeText={setNewTarget}
                            />

                            {/* Reminder Switch */}
                            <View style={[styles.reminderToggleRow, { borderColor: colors.borderLight }]}>
                                <View style={{ flex: 1, marginRight: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Ionicons name="alarm-outline" size={18} color={colors.primary} style={{ marginRight: 6 }} />
                                        <Text style={[styles.reminderToggleTitle, { color: colors.text, fontFamily: fonts.semiBold }, isUrdu && { fontSize: 14.5 }]}>
                                            {isUrdu ? 'روزانہ کی یاددہانی (Reminder)' : 'Daily Local Reminder'}
                                        </Text>
                                    </View>
                                    <Text style={[styles.reminderToggleSub, { color: colors.secondaryText, fontFamily: fonts.regular }, isUrdu && { fontSize: 12.5 }]}>
                                        {isUrdu ? 'طے شدہ وقت پر فون پر نوٹیفکیشن الرٹ موصول کریں' : 'Receive a gentle push notification at your chosen time'}
                                    </Text>
                                </View>
                                <Switch
                                    value={newReminderEnabled}
                                    onValueChange={setNewReminderEnabled}
                                    trackColor={{ false: colors.border, true: colors.primaryLight }}
                                    thumbColor={newReminderEnabled ? colors.primary : '#FFFFFF'}
                                />
                            </View>

                            {/* Reminder Time Input if Enabled */}
                            {newReminderEnabled && (
                                <View style={{ marginTop: 10 }}>
                                    <Text style={[styles.inputLabel, { color: colors.text, fontFamily: fonts.semiBold }, isUrdu && { fontSize: 14 }]}>
                                        {isUrdu ? 'یاددہانی کا وقت (HH:MM 24-hour format)' : 'Reminder Time (24h format, e.g. 09:30 or 21:00)'}
                                    </Text>
                                    <TextInput
                                        style={[styles.textInput, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
                                        placeholder="09:00"
                                        placeholderTextColor={colors.textPlaceholder}
                                        value={newReminderTime}
                                        onChangeText={setNewReminderTime}
                                    />
                                </View>
                            )}

                            {/* Save Button */}
                            <TouchableOpacity
                                style={[styles.saveDuaBtn, { backgroundColor: colors.primary }]}
                                onPress={handleSaveNewCustomDua}
                                activeOpacity={0.85}
                            >
                                <Ionicons name="checkmark-done" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                                <Text style={[styles.saveDuaBtnText, { fontFamily: fonts.bold }, isUrdu && { fontSize: 16 }]}>
                                    {isUrdu ? 'دعا محفوظ کریں' : 'Save Custom Dua'}
                                </Text>
                            </TouchableOpacity>
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
    backButton: {
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
    rightSpacer: {
        width: 32,
    },
    headerAddBtn: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    segmentedTabBar: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingBottom: 2,
    },
    tabBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderBottomWidth: 3,
        borderBottomColor: 'transparent',
    },
    tabBtnActive: {
        borderBottomWidth: 3,
    },
    tabBtnText: {
        fontSize: 13,
    },
    bodyContainer: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 14,
        paddingBottom: 36,
    },
    ayahBanner: {
        padding: 16,
        borderRadius: 14,
        marginBottom: 16,
        borderWidth: 1,
    },
    ayahArabic: {
        fontSize: 18,
        marginBottom: 6,
    },
    ayahTranslation: {
        fontSize: 12.5,
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: 6,
    },
    ayahReference: {
        fontSize: 11,
        textAlign: 'center',
    },
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 10,
        gap: 12,
    },
    cardIconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    categoryCardTitle: {
        fontSize: 15,
    },
    categoryCardSub: {
        fontSize: 12,
        marginTop: 2,
        lineHeight: 16,
    },
    categorySubHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        gap: 12,
    },
    categoryDetailTitle: {
        fontSize: 15,
        flex: 1,
    },
    dhikrCard: {
        borderRadius: 14,
        padding: 16,
        borderWidth: 1,
        marginBottom: 12,
    },
    arabicScript: {
        fontFamily: 'Amiri_400Regular',
        fontSize: 22,
        textAlign: 'right',
        lineHeight: 40,
        marginBottom: 10,
    },
    translitScript: {
        fontSize: 12,
        marginBottom: 6,
        lineHeight: 17,
    },
    englishScript: {
        fontSize: 12,
        lineHeight: 18,
        marginBottom: 12,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        paddingTop: 10,
        gap: 8,
    },
    refPill: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        flex: 1,
    },
    refPillText: {
        fontSize: 10,
    },
    tapCounterBtn: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
    },
    tapCounterText: {
        fontSize: 11,
    },
    // Surah Tab Styles
    translationSwitchCard: {
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 14,
    },
    translationSwitchHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    translationSwitchTitle: {
        fontSize: 13,
    },
    translationSegment: {
        flexDirection: 'row',
        gap: 8,
    },
    editionBtn: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.08)',
    },
    editionBtnActive: {
        borderColor: 'transparent',
    },
    editionBtnText: {
        fontSize: 12.5,
    },
    surahCard: {
        padding: 14,
        borderRadius: 14,
        borderWidth: 1,
        marginBottom: 12,
    },
    surahCardTop: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    surahNumberBadge: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    surahNumberText: {
        fontSize: 13,
    },
    surahCardName: {
        fontSize: 15,
    },
    surahCardTitleSub: {
        fontSize: 11.5,
        marginTop: 2,
    },
    fridayBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 4,
    },
    fridayBadgeText: {
        fontSize: 11.5,
    },
    surahVirtueText: {
        fontSize: 11.5,
        lineHeight: 16,
        marginTop: 6,
    },
    readerHeaderCard: {
        padding: 16,
        borderRadius: 14,
        borderWidth: 1,
        alignItems: 'center',
        marginBottom: 14,
    },
    readerSurahName: {
        fontSize: 20,
        marginBottom: 4,
    },
    readerSurahSub: {
        fontSize: 12,
        marginBottom: 12,
    },
    bismillahBox: {
        width: '100%',
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
    },
    bismillahText: {
        fontSize: 22,
        textAlign: 'center',
    },
    ayahReaderCard: {
        padding: 16,
        borderRadius: 14,
        borderWidth: 1,
        marginBottom: 12,
    },
    ayahNumberRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    ayahNumberCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    ayahNumberCircleText: {
        fontSize: 11,
    },
    surahArabicText: {
        fontSize: 20,
        textAlign: 'right',
        lineHeight: 38,
        marginBottom: 10,
    },
    surahEnglishText: {
        fontSize: 12.5,
        lineHeight: 18,
        marginBottom: 10,
    },
    surahUrduText: {
        fontSize: 14,
        lineHeight: 22,
        textAlign: 'right',
    },
    // Custom Duas Styles
    customBanner: {
        padding: 14,
        borderRadius: 14,
        borderWidth: 1,
        marginBottom: 14,
        gap: 10,
    },
    customBannerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    customBannerTitle: {
        fontSize: 14.5,
    },
    customBannerSub: {
        fontSize: 11.5,
        marginTop: 2,
        lineHeight: 16,
    },
    addDuaBannerBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 9,
        paddingHorizontal: 14,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    addDuaBannerBtnText: {
        color: '#FFFFFF',
        fontSize: 13,
    },
    emptyCustomCard: {
        padding: 30,
        borderRadius: 14,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    emptyCustomTitle: {
        fontSize: 16,
        marginBottom: 6,
    },
    emptyCustomSub: {
        fontSize: 12.5,
        lineHeight: 18,
    },
    customDuaCard: {
        padding: 16,
        borderRadius: 14,
        borderWidth: 1,
        marginBottom: 12,
    },
    customDuaHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    customDuaTitle: {
        fontSize: 15,
    },
    customReminderPill: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    customReminderPillText: {
        fontSize: 11,
        color: '#F59E0B',
    },
    customDeleteBtn: {
        padding: 4,
    },
    customDuaArabic: {
        fontSize: 18,
        textAlign: 'right',
        lineHeight: 34,
        marginVertical: 6,
    },
    customDuaMeaning: {
        fontSize: 12,
        lineHeight: 17,
        marginBottom: 10,
    },
    customProgressRow: {
        marginVertical: 8,
    },
    customProgressBarBg: {
        height: 6,
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: 4,
    },
    customProgressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    customProgressText: {
        fontSize: 11,
    },
    customActionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    customResetBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
    },
    customResetBtnText: {
        fontSize: 12,
    },
    customCountBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    customCountBtnText: {
        color: '#FFFFFF',
        fontSize: 13,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    modalCard: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
        maxHeight: '90%',
        borderWidth: 1,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 17,
    },
    modalSub: {
        fontSize: 12,
        marginTop: 2,
    },
    modalCloseBtn: {
        padding: 4,
    },
    inputLabel: {
        fontSize: 12.5,
        marginTop: 10,
        marginBottom: 6,
    },
    textInput: {
        borderRadius: 10,
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
    },
    multilineInput: {
        minHeight: 60,
        textAlignVertical: 'top',
    },
    reminderToggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 14,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    reminderToggleTitle: {
        fontSize: 13.5,
    },
    reminderToggleSub: {
        fontSize: 11.5,
        marginTop: 2,
    },
    saveDuaBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 14,
        borderRadius: 12,
        marginTop: 18,
    },
    saveDuaBtnText: {
        color: '#FFFFFF',
        fontSize: 15,
    },
});
