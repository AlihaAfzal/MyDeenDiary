import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { azkarCollections } from '../data/azkarData';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useArabic } from '../context/ArabicContext';
import { soundHapticService } from '../services/soundHapticsService';

export default function AzkarLibraryScreen({ navigation }: any) {
    const { colors } = useTheme();
    const { t, isUrdu, fonts } = useLanguage();
    const { getArabicStyle, urduFontSize, getUrduStyle } = useArabic();

    const [selectedCategoryKey, setSelectedCategoryKey] = useState<string | null>(null);
    const [counterState, setCounterState] = useState<Record<string, number>>({});

    const handleBackPress = () => {
        soundHapticService.triggerFeedback();
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

    // Handle Android Hardware Back Button
    useFocusEffect(
        useCallback(() => {
            const subscription = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
            return () => subscription.remove();
        }, [selectedCategoryKey])
    );

    const handleIncrement = (id: string, targetRepeat: number) => {
        soundHapticService.triggerFeedback();
        setCounterState((prev) => {
            const cur = prev[id] || 0;
            const next = cur >= targetRepeat ? 0 : cur + 1;
            return { ...prev, [id]: next };
        });
    };

    const categoryKeys = Object.keys(azkarCollections);

    return (
        <View style={[styles.fullBackground, { backgroundColor: colors.background }]}>
            <StatusBar style="light" />
            <SafeAreaView style={{ backgroundColor: colors.primary }} edges={['top']}>
                {/* Standardized Header Container */}
                <View style={[styles.headerContainer, { backgroundColor: colors.primary }]}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleBackPress}
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
                        {selectedCategoryKey
                            ? (isUrdu
                                ? ((azkarCollections as any)[selectedCategoryKey]?.titleUr || (azkarCollections as any)[selectedCategoryKey]?.title)
                                : (azkarCollections as any)[selectedCategoryKey]?.title)
                            : (isUrdu ? 'دعائیں اور اذکار' : 'Duas & Azkar')}
                    </Text>

                    <View style={styles.rightSpacer} />
                </View>
            </SafeAreaView>

            <View style={[styles.bodyContainer, { backgroundColor: colors.background }]}>
                {/* 1. Category Hub View */}
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
                                        <Text style={[styles.categoryCardSub, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                                            {isUrdu ? (cat.subtitleUr || cat.subtitle) : cat.subtitle}
                                        </Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={18} color={colors.secondaryText} />
                                </TouchableOpacity>
                            );
                        })}
                    </ScrollView>
                ) : (
                    /* 2. Azkar List Detail View */
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
                                <Text style={[styles.categoryCardSub, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]} numberOfLines={1}>
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
                                                {current} / {item.repeat} {t('timesCount')}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                    </ScrollView>
                )}
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
        paddingHorizontal: 20,
    },
    scrollContent: {
        paddingTop: 14,
        paddingBottom: 25,
    },
    ayahBanner: {
        borderRadius: 14,
        padding: 14,
        borderWidth: 1,
        marginBottom: 16,
        alignItems: 'center',
    },
    ayahArabic: {
        fontFamily: 'Amiri_700Bold',
        fontSize: 21,
        color: '#DFB15B',
        textAlign: 'center',
        lineHeight: 38,
        marginBottom: 6,
    },
    ayahTranslation: {
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
        marginBottom: 6,
    },
    ayahReference: {
        fontSize: 11,
        letterSpacing: 0.3,
    },
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
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
    categoryCardTitle: { fontSize: 15 },
    categoryCardSub: { fontSize: 11, marginTop: 2, lineHeight: 15 },
    categorySubHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
        gap: 12,
    },
    subBackBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 16,
        gap: 4,
    },
    subBackBtnText: {
        fontSize: 12,
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
});
