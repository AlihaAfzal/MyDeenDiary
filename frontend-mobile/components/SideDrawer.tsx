import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Animated,
    Dimensions,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface SideDrawerProps {
    visible: boolean;
    onClose: () => void;
    navigation: any;
    streak: number;
    bestStreak: number;
    onOpenWalkthrough?: () => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = Math.round(SCREEN_WIDTH * 0.65);

export default function SideDrawer({
    visible,
    onClose,
    navigation,
    streak,
    bestStreak,
    onOpenWalkthrough,
}: SideDrawerProps) {
    const { colors, isDark } = useTheme();
    const { t, isUrdu, fonts } = useLanguage();

    const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 260,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 260,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -DRAWER_WIDTH,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible, slideAnim, fadeAnim]);

    const handleNavigate = (routeName: string) => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: -DRAWER_WIDTH,
                duration: 180,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 180,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onClose();
            if (routeName) {
                navigation.navigate(routeName);
            }
        });
    };

    if (!visible) return null;

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                {/* Backdrop overlay */}
                <TouchableWithoutFeedback onPress={onClose}>
                    <Animated.View
                        style={[
                            styles.backdrop,
                            { opacity: fadeAnim },
                        ]}
                    />
                </TouchableWithoutFeedback>

                {/* Animated 65% Drawer Panel */}
                <Animated.View
                    style={[
                        styles.drawer,
                        {
                            width: DRAWER_WIDTH,
                            backgroundColor: colors.surface,
                            borderRightColor: colors.border,
                            transform: [{ translateX: slideAnim }],
                        },
                    ]}
                >
                    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left']}>
                        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                            {/* Header with App Logo & Title */}
                            <View style={[styles.headerSection, { borderBottomColor: colors.border }]}>
                                <View style={styles.headerTopRow}>
                                    <View style={[styles.logoCircle, { backgroundColor: colors.primaryLight }]}>
                                        <Ionicons name="book" size={22} color={colors.primary} />
                                    </View>
                                    <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
                                        <Ionicons name="close" size={22} color={colors.secondaryText} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={[styles.appTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }]}>
                                    {t('appName')}
                                </Text>
                                <Text style={[styles.appSubtitle, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }]}>
                                    {isUrdu ? 'روحانی سفر اور روزمرہ محاسبہ' : 'Daily Islamic Spiritual Companion'}
                                </Text>
                            </View>

                            {/* Streaks Overview Card */}
                            <View style={[styles.streakCard, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
                                <View style={styles.streakHeaderRow}>
                                    <Ionicons name="flame" size={18} color="#FF7A00" />
                                    <Text style={[styles.streakTitle, { color: colors.primary, fontFamily: fonts.bold, includeFontPadding: false }]}>
                                        {t('dayStreak')}
                                    </Text>
                                </View>
                                <Text style={[styles.streakValue, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }]}>
                                    {streak} {isUrdu ? 'دن' : 'Days'}
                                </Text>
                                <Text style={[styles.streakBest, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }]}>
                                    {t('best')}: {bestStreak} {isUrdu ? 'دن' : 'Days'}
                                </Text>
                            </View>

                            {/* Menu Navigation Rows */}
                            <View style={styles.menuContainer}>
                                <TouchableOpacity
                                    style={[styles.navRow, { borderBottomColor: colors.borderLight }]}
                                    onPress={() => handleNavigate('')}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.iconBox, { backgroundColor: colors.background }]}>
                                        <Ionicons name="home-outline" size={18} color={colors.primary} />
                                    </View>
                                    <Text style={[styles.navRowText, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 16, lineHeight: 22 }]}>
                                        {t('homeTab')}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.navRow, { borderBottomColor: colors.borderLight }]}
                                    onPress={() => handleNavigate('Qaza')}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.iconBox, { backgroundColor: colors.background }]}>
                                        <Ionicons name="calendar-clear-outline" size={18} color={colors.primary} />
                                    </View>
                                    <Text style={[styles.navRowText, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 16, lineHeight: 22 }]}>
                                        {t('qazaTab')}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.navRow, { borderBottomColor: colors.borderLight }]}
                                    onPress={() => handleNavigate('Tasbeeh')}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.iconBox, { backgroundColor: colors.background }]}>
                                        <Ionicons name="finger-print-outline" size={18} color={colors.primary} />
                                    </View>
                                    <Text style={[styles.navRowText, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 16, lineHeight: 22 }]}>
                                        {t('tasbeehTab')}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.navRow, { borderBottomColor: colors.borderLight }]}
                                    onPress={() => handleNavigate('Azkar')}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.iconBox, { backgroundColor: colors.background }]}>
                                        <Ionicons name="book-outline" size={18} color={colors.primary} />
                                    </View>
                                    <Text style={[styles.navRowText, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 16, lineHeight: 22 }]}>
                                        {t('azkarTab')}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.navRow, { borderBottomColor: colors.borderLight }]}
                                    onPress={() => handleNavigate('Progress')}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.iconBox, { backgroundColor: colors.background }]}>
                                        <Ionicons name="analytics-outline" size={18} color={colors.primary} />
                                    </View>
                                    <Text style={[styles.navRowText, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 16, lineHeight: 22 }]}>
                                        {isUrdu ? 'پیش رفت اور تجزیہ' : 'Progress & Analytics'}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.navRow, { borderBottomColor: colors.borderLight }]}
                                    onPress={() => handleNavigate('ReflectionDiary')}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.iconBox, { backgroundColor: colors.background }]}>
                                        <Ionicons name="journal-outline" size={18} color={colors.primary} />
                                    </View>
                                    <Text style={[styles.navRowText, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 16, lineHeight: 22 }]}>
                                        {isUrdu ? 'فکر و ڈائری' : 'Reflection Diary'}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.navRow, { borderBottomColor: colors.borderLight }]}
                                    onPress={() => handleNavigate('Monthly')}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.iconBox, { backgroundColor: colors.background }]}>
                                        <Ionicons name="stats-chart-outline" size={18} color={colors.primary} />
                                    </View>
                                    <Text style={[styles.navRowText, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 16, lineHeight: 22 }]}>
                                        {isUrdu ? 'ماہانہ ریکارڈ' : 'Monthly Record'}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.navRow, { borderBottomColor: colors.borderLight }]}
                                    onPress={() => handleNavigate('Notification')}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.iconBox, { backgroundColor: colors.background }]}>
                                        <Ionicons name="notifications-outline" size={18} color={colors.primary} />
                                    </View>
                                    <Text style={[styles.navRowText, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 16, lineHeight: 22 }]}>
                                        {isUrdu ? 'اطلاعات' : 'Reminder Alarms'}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.navRow, { borderBottomColor: colors.borderLight }]}
                                    onPress={() => handleNavigate('Profile')}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.iconBox, { backgroundColor: colors.background }]}>
                                        <Ionicons name="settings-outline" size={18} color={colors.primary} />
                                    </View>
                                    <Text style={[styles.navRowText, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 16, lineHeight: 22 }]}>
                                        {t('profileTab')}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.navRow, { borderBottomColor: colors.borderLight }]}
                                    onPress={() => {
                                        onClose();
                                        if (onOpenWalkthrough) {
                                            onOpenWalkthrough();
                                        }
                                    }}
                                    activeOpacity={0.7}
                                >
                                    <View style={[styles.iconBox, { backgroundColor: colors.background }]}>
                                        <Ionicons name="sparkles-outline" size={18} color={colors.primary} />
                                    </View>
                                    <Text style={[styles.navRowText, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 16, lineHeight: 22 }]}>
                                        {isUrdu ? 'ایپ کا تعارف' : 'App Walkthrough'}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            {/* Footer Info */}
                            <View style={styles.footerSection}>
                                <Text style={[styles.versionText, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }]}>
                                    v2.0 • {isDark ? 'Dark Mode' : 'Light Mode'}
                                </Text>
                            </View>
                        </ScrollView>
                    </SafeAreaView>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    backdrop: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
    },
    drawer: {
        height: '100%',
        borderRightWidth: 1,
        elevation: 16,
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerSection: {
        paddingBottom: 14,
        borderBottomWidth: 1,
        marginBottom: 14,
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    logoCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeBtn: {
        padding: 4,
    },
    appTitle: {
        fontSize: 18,
        letterSpacing: 0.2,
    },
    appSubtitle: {
        fontSize: 11,
        marginTop: 2,
    },
    streakCard: {
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        marginBottom: 16,
    },
    streakHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    streakTitle: {
        fontSize: 12,
        letterSpacing: 0.3,
    },
    streakValue: {
        fontSize: 20,
        marginTop: 2,
    },
    streakBest: {
        fontSize: 11,
        marginTop: 2,
    },
    menuContainer: {
        flex: 1,
    },
    navRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        gap: 12,
    },
    iconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navRowText: {
        fontSize: 13.5,
    },
    footerSection: {
        paddingTop: 8,
        alignItems: 'center',
    },
    versionText: {
        fontSize: 11,
    },
});
