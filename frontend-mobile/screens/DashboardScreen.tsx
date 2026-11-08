import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './config';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useArabic } from '../context/ArabicContext';
import { soundHapticService } from '../services/soundHapticsService';
import { getDailyAyah } from '../data/dailyAyahs';
import { getUnreadNotificationCount, registerNotificationReceivedListener } from '../services/notificationService';
import SideDrawer from '../components/SideDrawer';

const PRAYERS_KEYS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];

export default function DashboardScreen({ navigation }: any) {
    const { colors, isDark } = useTheme();
    const { t, isUrdu, fonts } = useLanguage();
    const { getArabicStyle, getUrduStyle } = useArabic();

    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [streak, setStreak] = useState(7);
    const [bestStreak, setBestStreak] = useState(14);
    const [drawerVisible, setDrawerVisible] = useState(false);

    const [prayers, setPrayers] = useState<Record<string, boolean>>({
        fajr: false,
        dhuhr: false,
        asr: false,
        maghrib: false,
        isha: false,
    });
    const [azkar, setAzkar] = useState<Record<string, boolean>>({ morning: false, evening: false });
    const [counter, setCounter] = useState(0);
    const [reflection, setReflection] = useState('');
    const [uiMessage, setUiMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const [customHabits, setCustomHabits] = useState<Array<{ id: string; name: string; checked: boolean }>>([
        { id: 'quran', name: 'Quran Reading', checked: false },
        { id: 'water', name: '8 Glasses Water', checked: false },
    ]);
    const [newHabitText, setNewHabitText] = useState('');

    const today = new Date();
    const currentDay = today.getDate();
    const daysInCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    const formattedDate = today.toLocaleDateString(isUrdu ? 'ur-PK' : 'en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    });

    const todayAyah = getDailyAyah(today);

    const getInitials = (nameStr: string) => {
        if (!nameStr) return '';
        const parts = nameStr.trim().split(/\s+/).filter(Boolean);
        if (parts.length >= 2) {
            const init = (parts[0][0] + parts[1][0]).toUpperCase();
            if (/^[A-Z0-9]{1,3}$/.test(init)) return init;
        } else if (parts.length === 1) {
            const init = parts[0].slice(0, 2).toUpperCase();
            if (/^[A-Z0-9]{1,2}$/.test(init)) return init;
        }
        return '';
    };

    // Load user data, profile photo, and streaks
    useFocusEffect(
        useCallback(() => {
            const loadUserData = async () => {
                const email = await AsyncStorage.getItem('userEmail');
                const cachedName = await AsyncStorage.getItem('userName');

                if (cachedName) setUserName(cachedName);

                if (email) {
                    setUserEmail(email);

                    const userSpecificPic = await AsyncStorage.getItem(`userProfilePic_${email}`);
                    setProfileImage(userSpecificPic || null);

                    const savedStreak = await AsyncStorage.getItem(`userStreak_${email}`);
                    const savedBest = await AsyncStorage.getItem(`userBestStreak_${email}`);
                    if (savedStreak) setStreak(parseInt(savedStreak, 10));
                    if (savedBest) setBestStreak(parseInt(savedBest, 10));

                    try {
                        const res = await fetch(`${API_BASE_URL}/profile/${email}`);
                        const data = await res.json();
                        if (res.ok && data.data?.name) {
                            setUserName(data.data.name);
                            await AsyncStorage.setItem('userName', data.data.name);
                        }
                    } catch {
                        // Non-blocking fallback
                    }
                } else {
                    setProfileImage(null);
                }

                const savedHabits = await AsyncStorage.getItem('userCustomHabits');
                if (savedHabits) {
                    try {
                        setCustomHabits(JSON.parse(savedHabits));
                    } catch {
                        // Ignore parse error
                    }
                }

                // Dynamically fetch unread notification count
                const unread = await getUnreadNotificationCount(email || undefined);
                setUnreadCount(unread);
            };
            loadUserData();
        }, [])
    );

    useEffect(() => {
        const sub = registerNotificationReceivedListener(async () => {
            const email = await AsyncStorage.getItem('userEmail');
            const unread = await getUnreadNotificationCount(email || undefined);
            setUnreadCount(unread);
        });
        return () => {
            sub.remove();
        };
    }, []);

    const togglePrayer = (name: string) => {
        soundHapticService.triggerFeedback();
        setPrayers((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    const toggleAzkar = (name: string) => {
        soundHapticService.triggerFeedback();
        setAzkar((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    const toggleCustomHabit = (id: string) => {
        soundHapticService.triggerFeedback();
        setCustomHabits((prev) => {
            const updated = prev.map((h) => (h.id === id ? { ...h, checked: !h.checked } : h));
            AsyncStorage.setItem('userCustomHabits', JSON.stringify(updated)).catch(() => { });
            return updated;
        });
    };

    const handleAddHabit = async () => {
        if (!newHabitText.trim()) return;
        soundHapticService.triggerFeedback();
        const cleanName = newHabitText.trim();
        const cleanId = cleanName.toLowerCase().replace(/\s+/g, '_');
        if (!customHabits.some((h) => h.id === cleanId)) {
            const updated = [...customHabits, { id: cleanId, name: cleanName, checked: false }];
            setCustomHabits(updated);
            await AsyncStorage.setItem('userCustomHabits', JSON.stringify(updated)).catch(() => { });
        }
        setNewHabitText('');
    };

    const handleDeleteHabit = async (id: string) => {
        soundHapticService.triggerFeedback();
        const updated = customHabits.filter((h) => h.id !== id);
        setCustomHabits(updated);
        await AsyncStorage.setItem('userCustomHabits', JSON.stringify(updated)).catch(() => { });
    };

    const handleSaveChanges = async () => {
        if (!userEmail) return;
        soundHapticService.triggerFeedback();
        setLoading(true);
        setUiMessage('');

        const todayDateStr = new Date().toISOString().split('T')[0];

        const customPayload: Record<string, boolean> = {};
        customHabits.forEach((h) => {
            customPayload[h.id] = h.checked;
        });

        const payload = {
            email: userEmail,
            date_str: todayDateStr,
            fajr: prayers.fajr,
            dhuhr: prayers.dhuhr,
            asr: prayers.asr,
            maghrib: prayers.maghrib,
            isha: prayers.isha,
            morning_azkar: azkar.morning,
            evening_azkar: azkar.evening,
            quran_connect: customHabits.find((h) => h.id === 'quran')?.checked || false,
            tasbehat_count: counter,
            reflection_text: reflection,
            ...customPayload,
        };

        try {
            const response = await fetch(`${API_BASE_URL}/save-progress`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                setUiMessage(t('progressUpdated'));

                // If all 5 prayers checked, update streak
                const allPrayersDone = prayers.fajr && prayers.dhuhr && prayers.asr && prayers.maghrib && prayers.isha;
                if (allPrayersDone) {
                    const newStreak = streak + 1;
                    const newBest = Math.max(bestStreak, newStreak);
                    setStreak(newStreak);
                    setBestStreak(newBest);
                    await AsyncStorage.setItem(`userStreak_${userEmail}`, newStreak.toString());
                    await AsyncStorage.setItem(`userBestStreak_${userEmail}`, newBest.toString());
                }
            } else {
                setUiMessage(data.detail || 'Failed to save progress.');
            }
        } catch {
            setUiMessage('Network error. Unable to connect to server.');
        } finally {
            setLoading(false);
            setTimeout(() => setUiMessage(''), 3500);
        }
    };

    return (
        <View style={[styles.fullBackground, { backgroundColor: colors.background }]}>
            <StatusBar style="light" />
            <SafeAreaView style={[styles.topSafeArea, { backgroundColor: colors.primary }]} edges={['top']}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, { backgroundColor: colors.background }]}>
                    {/* Dark Emerald Hero Banner */}
                    <View style={[styles.heroBanner, { backgroundColor: colors.primary }]}>
                        {/* Top Navigation Bar */}
                        <View style={styles.topNavBar}>
                            <TouchableOpacity
                                style={styles.menuButton}
                                onPress={() => {
                                    soundHapticService.triggerFeedback();
                                    setDrawerVisible(true);
                                }}
                                activeOpacity={0.75}
                            >
                                <Ionicons name="menu-outline" size={26} color="#FFFFFF" />
                            </TouchableOpacity>

                            <View style={styles.topNavRight}>
                                <TouchableOpacity
                                    style={styles.bellButton}
                                    onPress={() => {
                                        soundHapticService.triggerFeedback();
                                        navigation.navigate('Notification');
                                    }}
                                    activeOpacity={0.75}
                                >
                                    <Ionicons name="notifications-outline" size={24} color="#FFFFFF" />
                                    {unreadCount > 0 && (
                                        <View style={[styles.unreadBadge, { borderColor: colors.primary }]}>
                                            <Text style={[styles.unreadBadgeText, { fontFamily: fonts.bold }]}>
                                                {unreadCount > 99 ? '99+' : unreadCount}
                                            </Text>
                                        </View>
                                    )}
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.profileBtn}
                                    onPress={() => {
                                        soundHapticService.triggerFeedback();
                                        navigation.navigate('Profile');
                                    }}
                                    activeOpacity={0.8}
                                >
                                    {profileImage ? (
                                        <Image source={{ uri: profileImage }} style={styles.topAvatarImage} />
                                    ) : (
                                        <View style={styles.topAvatarFallback}>
                                            {getInitials(userName) ? (
                                                <Text style={{ color: '#FFFFFF', fontSize: 13, fontFamily: fonts.bold, includeFontPadding: false }}>
                                                    {getInitials(userName)}
                                                </Text>
                                            ) : (
                                                <Ionicons name="person-outline" size={17} color="#FFFFFF" />
                                            )}
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Greeting & Streak Badge */}
                        <View style={styles.heroMiddleRow}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <Text style={[styles.heroGreeting, { fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                                    {t('assalamuAlaikum')}
                                </Text>
                                <Text style={[styles.heroUserName, { fontFamily: fonts.bold, includeFontPadding: false }]} numberOfLines={1}>
                                    {userName || t('believer')}
                                </Text>
                                <Text style={[styles.heroDateText, { color: colors.goldLight, fontFamily: fonts.medium, includeFontPadding: false }, isUrdu && { fontSize: 13 }]}>
                                    {isUrdu
                                        ? `دن ${currentDay}/${daysInCurrentMonth} • ${formattedDate}`
                                        : `Day ${currentDay}/${daysInCurrentMonth} • ${formattedDate}`}
                                </Text>
                            </View>

                            <View style={styles.streakBadge}>
                                <Ionicons name="flame" size={13} color="#FF7A00" style={{ marginRight: 4 }} />
                                <Text style={[styles.streakBadgeText, { fontFamily: fonts.bold, includeFontPadding: false }]}>
                                    {streak} {t('dayStreak')} | {t('best')}: {bestStreak}
                                </Text>
                            </View>
                        </View>

                        {/* Ayah of the Day Card */}
                        <View style={styles.ayahCard}>
                            <View style={styles.ayahHeaderRow}>
                                <View style={styles.ayahTagPill}>
                                    <Text style={[styles.ayahTagText, { color: colors.goldLight, fontFamily: fonts.bold }]}>
                                        {t('ayahOfTheDay')}
                                    </Text>
                                </View>
                                <Text style={[styles.ayahSurah, { fontFamily: fonts.semiBold }]}>
                                    {isUrdu ? todayAyah.surahUr : todayAyah.surahEn}
                                </Text>
                            </View>
                            <Text style={[styles.ayahArabic, getArabicStyle(0.85), { color: '#FFFFFF', textAlign: 'center' }]}>
                                {todayAyah.arabic}
                            </Text>
                            <Text
                                style={[
                                    styles.ayahTranslation,
                                    { fontFamily: fonts.regular, includeFontPadding: false },
                                    isUrdu && getUrduStyle({ isMultiLine: true, tightPadding: true }),
                                    isUrdu && { color: 'rgba(255, 255, 255, 0.95)', textAlign: 'center' },
                                ]}
                            >
                                "{isUrdu ? todayAyah.translationUr : todayAyah.translationEn}"
                            </Text>
                        </View>
                    </View>

                    {/* Content Section below Hero Banner */}
                    <View style={[styles.bodyContent, { backgroundColor: colors.background }]}>
                        {uiMessage !== '' && (
                            <View style={[styles.messageBanner, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
                                <Ionicons
                                    name="checkmark-circle-outline"
                                    size={18}
                                    color={colors.primary}
                                    style={{ marginRight: 6 }}
                                />
                                <Text style={[styles.messageBannerText, { color: colors.primary, fontFamily: fonts.medium }]}>
                                    {uiMessage}
                                </Text>
                            </View>
                        )}

                        {/* Qaza Tracker Entry Banner */}
                        <TouchableOpacity
                            style={[styles.qazaBannerCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                            onPress={() => {
                                soundHapticService.triggerFeedback();
                                navigation.navigate('Qaza');
                            }}
                            activeOpacity={0.85}
                        >
                            <View style={styles.qazaBannerLeft}>
                                <View style={[styles.qazaBannerIconCircle, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
                                    <Ionicons name="calendar-clear" size={20} color={colors.primary} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.qazaBannerTitle, { color: colors.primary, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 18, lineHeight: 25 }]}>
                                        {t('qazaBannerTitle')}
                                    </Text>
                                    <Text style={[styles.qazaBannerSubtitle, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                                        {t('qazaBannerSubtitle')}
                                    </Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color={colors.primary} />
                        </TouchableOpacity>

                        {/* Progress & Analytics Quick Entry Banner */}
                        <TouchableOpacity
                            style={[styles.qazaBannerCard, { backgroundColor: colors.surface, borderColor: colors.border }]}
                            onPress={() => {
                                soundHapticService.triggerFeedback();
                                navigation.navigate('Progress');
                            }}
                            activeOpacity={0.85}
                        >
                            <View style={styles.qazaBannerLeft}>
                                <View style={[styles.qazaBannerIconCircle, { backgroundColor: colors.surface, borderColor: isDark ? '#2A3833' : '#E5E7EB' }]}>
                                    <Ionicons name="stats-chart" size={19} color="#B45309" />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={[styles.qazaBannerTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 18, lineHeight: 25 }]}>
                                        {isUrdu ? 'پیش رفت اور تجزیہ' : 'Progress & Analytics'}
                                    </Text>
                                    <Text style={[styles.qazaBannerSubtitle, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                                        {isUrdu ? 'قضا کا لائف ٹائم گراف، ہفتہ وار اور ۳۰ روزہ تفصیلی جائزہ' : 'Lifetime Qaza, 30 day activity matrix & completion'}
                                    </Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color={colors.primary} />
                        </TouchableOpacity>

                        {/* Farz Prayers */}
                        <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 18, lineHeight: 25 }]}>
                            {t('farzPrayers')}
                        </Text>
                        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            {PRAYERS_KEYS.map((key) => (
                                <TouchableOpacity
                                    key={key}
                                    style={styles.checkboxRow}
                                    onPress={() => togglePrayer(key)}
                                    activeOpacity={0.7}
                                >
                                    <View
                                        style={[
                                            styles.checkbox,
                                            { borderColor: colors.primary, backgroundColor: colors.surface },
                                            prayers[key] && { backgroundColor: colors.primary },
                                        ]}
                                    >
                                        {prayers[key] && <Ionicons name="checkmark" size={15} color="#FFFFFF" />}
                                    </View>
                                    <Text
                                        style={[
                                            styles.checkboxLabel,
                                            { color: colors.text, fontFamily: fonts.medium, includeFontPadding: false },
                                            isUrdu && { fontSize: 16 },
                                            prayers[key] && { color: colors.primary, fontFamily: fonts.bold },
                                        ]}
                                    >
                                        {t(key)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Daily Azkar */}
                        <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 18, lineHeight: 25 }]}>
                            {t('dailyAzkar')}
                        </Text>
                        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <TouchableOpacity
                                style={styles.checkboxRow}
                                onPress={() => toggleAzkar('morning')}
                                activeOpacity={0.7}
                            >
                                <View
                                    style={[
                                        styles.checkbox,
                                        { borderColor: colors.primary, backgroundColor: colors.surface },
                                        azkar.morning && { backgroundColor: colors.primary },
                                    ]}
                                >
                                    {azkar.morning && <Ionicons name="checkmark" size={15} color="#FFFFFF" />}
                                </View>
                                <Text
                                    style={[
                                        styles.checkboxLabel,
                                        { color: colors.text, fontFamily: fonts.medium, includeFontPadding: false },
                                        isUrdu && { fontSize: 16 },
                                        azkar.morning && { color: colors.primary, fontFamily: fonts.bold },
                                    ]}
                                >
                                    {t('morningAzkar')}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.checkboxRow}
                                onPress={() => toggleAzkar('evening')}
                                activeOpacity={0.7}
                            >
                                <View
                                    style={[
                                        styles.checkbox,
                                        { borderColor: colors.primary, backgroundColor: colors.surface },
                                        azkar.evening && { backgroundColor: colors.primary },
                                    ]}
                                >
                                    {azkar.evening && <Ionicons name="checkmark" size={15} color="#FFFFFF" />}
                                </View>
                                <Text
                                    style={[
                                        styles.checkboxLabel,
                                        { color: colors.text, fontFamily: fonts.medium, includeFontPadding: false },
                                        isUrdu && { fontSize: 16 },
                                        azkar.evening && { color: colors.primary, fontFamily: fonts.bold },
                                    ]}
                                >
                                    {t('eveningAzkar')}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Custom Routine & Good Deeds */}
                        <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 18, lineHeight: 25 }]}>
                            {t('customRoutine')}
                        </Text>
                        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            {customHabits.map((h) => (
                                <View key={h.id} style={styles.customRowContainer}>
                                    <TouchableOpacity
                                        style={styles.customCheckboxArea}
                                        onPress={() => toggleCustomHabit(h.id)}
                                        activeOpacity={0.7}
                                    >
                                        <View
                                            style={[
                                                styles.checkbox,
                                                { borderColor: colors.primary, backgroundColor: colors.surface },
                                                h.checked && { backgroundColor: colors.primary },
                                            ]}
                                        >
                                            {h.checked && <Ionicons name="checkmark" size={15} color="#FFFFFF" />}
                                        </View>
                                        <Text
                                            style={[
                                                styles.checkboxLabel,
                                                { color: colors.text, fontFamily: fonts.medium, includeFontPadding: false },
                                                isUrdu && { fontSize: 16 },
                                                h.checked && { color: colors.primary, fontFamily: fonts.bold },
                                            ]}
                                        >
                                            {h.name}
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleDeleteHabit(h.id)} style={styles.trashBtn}>
                                        <Ionicons name="trash-outline" size={17} color={colors.textPlaceholder} />
                                    </TouchableOpacity>
                                </View>
                            ))}

                            <View style={[styles.inlineAddRow, { borderTopColor: colors.borderLight }]}>
                                <TextInput
                                    style={[
                                        styles.inlineInput,
                                        {
                                            backgroundColor: colors.background,
                                            borderColor: colors.border,
                                            color: colors.text,
                                            fontFamily: fonts.regular,
                                        },
                                    ]}
                                    placeholder={t('addHabitPlaceholder')}
                                    placeholderTextColor={colors.textPlaceholder}
                                    value={newHabitText}
                                    onChangeText={setNewHabitText}
                                />
                                <TouchableOpacity
                                    style={[styles.inlineAddBtn, { backgroundColor: colors.primary }]}
                                    onPress={handleAddHabit}
                                >
                                    <Ionicons name="add" size={16} color="#FFFFFF" />
                                    <Text style={[styles.inlineAddBtnText, { fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 15 }]}>
                                        {t('add')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Quick Tasbih Counter */}
                        <View style={styles.tasbeehSectionRow}>
                            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 18, lineHeight: 25 }]}>
                                {t('dailyTasbih')}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    soundHapticService.triggerFeedback();
                                    navigation.navigate('Tasbeeh');
                                }}
                            >
                                <Text style={[styles.viewCounterLink, { color: colors.primary, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 14 }]}>
                                    {t('openFullScreen')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.counterCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <Text style={[styles.counterNumber, { color: colors.primary, fontFamily: fonts.bold }]}>
                                {counter}
                            </Text>
                            <View style={styles.counterButtonRow}>
                                <TouchableOpacity
                                    style={[styles.countBtn, { backgroundColor: colors.primary }]}
                                    onPress={() => {
                                        soundHapticService.triggerFeedback();
                                        setCounter(counter + 1);
                                    }}
                                >
                                    <Text style={[styles.btnText, { fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 16 }]}>{t('countBtn')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.resetBtn, { borderColor: colors.border }]}
                                    onPress={() => {
                                        soundHapticService.triggerFeedback();
                                        setCounter(0);
                                    }}
                                >
                                    <Text style={[styles.resetBtnText, { color: colors.secondaryText, fontFamily: fonts.medium, includeFontPadding: false }, isUrdu && { fontSize: 15 }]}>
                                        {t('reset')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Daily Reflection */}
                        <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 18, lineHeight: 25 }]}>
                            {t('dailyReflection')}
                        </Text>
                        <TextInput
                            style={[
                                styles.journalInput,
                                {
                                    backgroundColor: colors.surface,
                                    borderColor: colors.border,
                                    color: colors.text,
                                    fontFamily: fonts.regular,
                                },
                            ]}
                            placeholder={t('reflectionPlaceholder')}
                            placeholderTextColor={colors.textPlaceholder}
                            multiline
                            value={reflection}
                            onChangeText={setReflection}
                        />

                        {/* Save Progress Button */}
                        <TouchableOpacity
                            style={[styles.saveButton, { backgroundColor: colors.primary }]}
                            onPress={handleSaveChanges}
                            disabled={loading}
                            activeOpacity={0.85}
                        >
                            {loading ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text style={[styles.saveButtonText, { fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 16 }]}>
                                    {t('saveProgress')}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>

            {/* Slide-Out Side Navigation Drawer (65% Screen Width) */}
            <SideDrawer
                visible={drawerVisible}
                onClose={() => setDrawerVisible(false)}
                navigation={navigation}
                streak={streak}
                bestStreak={bestStreak}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    fullBackground: {
        flex: 1,
    },
    topSafeArea: {
        flex: 1,
    },
    scrollContent: {},
    heroBanner: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 22,
        borderBottomLeftRadius: 26,
        borderBottomRightRadius: 26,
    },
    topNavBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    menuButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.14)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topNavRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    bellButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.14)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    unreadBadge: {
        position: 'absolute',
        top: 6,
        right: 6,
        backgroundColor: '#FF4D4D',
        borderRadius: 8,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
    },
    unreadBadgeText: {
        fontSize: 9,
        color: '#FFFFFF',
    },
    profileBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    topAvatarImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
    },
    topAvatarFallback: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
    },
    heroMiddleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
    },
    heroGreeting: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.85)',
        letterSpacing: 0.2,
    },
    heroUserName: {
        fontSize: 22,
        color: '#FFFFFF',
        letterSpacing: 0.3,
        marginTop: 1,
    },
    heroDateText: {
        fontSize: 11,
        marginTop: 3,
    },
    streakBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.18)',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.25)',
        flexDirection: 'row',
        alignItems: 'center',
    },
    streakBadgeText: {
        fontSize: 11.5,
        color: '#FFFFFF',
        letterSpacing: 0.2,
    },
    ayahCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.12)',
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.22)',
    },
    ayahHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    ayahTagPill: {
        backgroundColor: 'rgba(223, 177, 91, 0.2)',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    ayahTagText: {
        fontSize: 9.5,
        letterSpacing: 0.5,
    },
    ayahSurah: {
        fontSize: 11,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    ayahArabic: {
        fontFamily: 'Amiri_400Regular',
        fontSize: 20,
        lineHeight: 36,
        color: '#FFFFFF',
        textAlign: 'center',
        marginVertical: 6,
    },
    ayahTranslation: {
        fontSize: 12,
        lineHeight: 18,
        color: 'rgba(255, 255, 255, 0.9)',
        marginTop: 4,
    },
    bodyContent: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 30,
    },
    messageBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 12,
    },
    messageBannerText: {
        fontSize: 13,
        flex: 1,
    },
    qazaBannerCard: {
        borderRadius: 14,
        padding: 14,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    qazaBannerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    qazaBannerIconCircle: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        borderWidth: 1,
    },
    qazaBadgeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    qazaBannerTitle: {
        fontSize: 14,
    },
    qazaPillBadge: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 6,
        paddingVertical: 1,
    },
    qazaPillText: {
        fontSize: 9,
        letterSpacing: 0.5,
    },
    qazaBannerSubtitle: {
        fontSize: 12,
        marginTop: 2,
    },
    sectionTitle: {
        fontSize: 13,
        letterSpacing: 0.5,
        marginTop: 10,
        marginBottom: 8,
    },
    tasbeehSectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 8,
    },
    viewCounterLink: {
        fontSize: 12,
        textDecorationLine: 'underline',
    },
    card: {
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        marginBottom: 8,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 1.5,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxLabel: {
        fontSize: 14,
    },
    customRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 6,
    },
    customCheckboxArea: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    trashBtn: {
        padding: 6,
    },
    inlineAddRow: {
        flexDirection: 'row',
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        gap: 8,
    },
    inlineInput: {
        flex: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 13,
        borderWidth: 1,
    },
    inlineAddBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        borderRadius: 8,
    },
    inlineAddBtnText: {
        color: '#FFFFFF',
        fontSize: 12,
        marginLeft: 2,
    },
    counterCard: {
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        marginBottom: 8,
    },
    counterNumber: {
        fontSize: 42,
        marginBottom: 10,
    },
    counterButtonRow: {
        flexDirection: 'row',
        gap: 12,
    },
    countBtn: {
        paddingVertical: 9,
        paddingHorizontal: 22,
        borderRadius: 8,
    },
    resetBtn: {
        backgroundColor: 'transparent',
        paddingVertical: 9,
        paddingHorizontal: 18,
        borderRadius: 8,
        borderWidth: 1,
    },
    btnText: {
        color: '#FFFFFF',
        fontSize: 13,
    },
    resetBtnText: {
        fontSize: 13,
    },
    journalInput: {
        borderRadius: 12,
        padding: 14,
        fontSize: 13,
        borderWidth: 1,
        textAlignVertical: 'top',
        height: 85,
        marginBottom: 16,
    },
    saveButton: {
        height: 50,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        letterSpacing: 0.3,
    },
});
