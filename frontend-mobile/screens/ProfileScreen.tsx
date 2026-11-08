import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    ActivityIndicator,
    Share,
    Alert,
    Modal,
    Image,
    Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as ImagePicker from 'expo-image-picker';
import { API_BASE_URL } from './config';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useArabic } from '../context/ArabicContext';
import { soundHapticService, SoundPreset } from '../services/soundHapticsService';
import { loadReminderSettings, syncScheduledNotifications } from '../services/notificationService';
import WalkthroughModal from '../components/WalkthroughModal';

export default function ProfileScreen({ navigation }: any) {
    const { theme, setTheme, colors, isDark } = useTheme();
    const { language, setLanguage, t, isUrdu, fonts } = useLanguage();
    const { arabicScript, setArabicScript, arabicSize, setArabicSize, urduSize, setUrduSize, getArabicStyle, urduFontSize, getUrduStyle } = useArabic();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [tempSelectedImage, setTempSelectedImage] = useState<string | null>(null);
    const [photoActionModalVisible, setPhotoActionModalVisible] = useState(false);
    const [imagePreviewModal, setImagePreviewModal] = useState(false);
    const [walkthroughModalVisible, setWalkthroughModalVisible] = useState(false);
    const [profileMessage, setProfileMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    // Preferences states
    const [hapticsEnabled, setHapticsEnabled] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [soundPreset, setSoundPresetState] = useState<SoundPreset>('wood');
    const [reminderSoundEnabled, setReminderSoundEnabled] = useState(true);

    // Monthly History Modal States
    const [historyModalVisible, setHistoryModalVisible] = useState(false);
    const [selectedYear, setSelectedYear] = useState(2026);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [historyMatrix, setHistoryMatrix] = useState<Record<string, boolean>>({});
    const [historyHabits, setHistoryHabits] = useState<Array<{ id: string; name: string }>>([]);
    const [fetchingHistory, setFetchingHistory] = useState(false);
    const [generatingReport, setGeneratingReport] = useState(false);

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const years = [2024, 2025, 2026, 2027];

    const daysCount = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    const daysInMonth = Array.from({ length: daysCount }, (_, i) => i + 1);

    const defaultHabits = [
        { id: 'fajr', name: 'Fajr' },
        { id: 'dhuhr', name: 'Dhuhr' },
        { id: 'asr', name: 'Asr' },
        { id: 'maghrib', name: 'Maghrib' },
        { id: 'isha', name: 'Isha' },
        { id: 'morning_azkar', name: 'Morning Azkar' },
        { id: 'evening_azkar', name: 'Evening Azkar' },
    ];

    useEffect(() => {
        const loadProfileAndPreferences = async () => {
            const savedEmail = await AsyncStorage.getItem('userEmail');
            const savedName = await AsyncStorage.getItem('userName');

            if (savedName) setName(savedName);

            const haptics = await soundHapticService.getHapticsEnabled();
            const sound = await soundHapticService.getSoundEnabled();
            const preset = await soundHapticService.getSoundPreset();
            const remSound = await soundHapticService.getReminderSoundEnabled();
            setHapticsEnabled(haptics);
            setSoundEnabled(sound);
            setSoundPresetState(preset);
            setReminderSoundEnabled(remSound);

            if (savedEmail) {
                setEmail(savedEmail);

                // Fetch image specific to the logged-in email
                const userSpecificPic = await AsyncStorage.getItem(`userProfilePic_${savedEmail}`);
                setProfileImage(userSpecificPic || null);

                try {
                    const res = await fetch(`${API_BASE_URL}/profile/${savedEmail}`);
                    const data = await res.json();
                    if (res.ok && data.data?.name) {
                        setName(data.data.name);
                        await AsyncStorage.setItem('userName', data.data.name);
                    }
                } catch {
                    // Non-blocking fallback
                }
            } else {
                setProfileImage(null);
            }
        };
        loadProfileAndPreferences();
    }, []);

    const getInitials = (userName: string) => {
        if (!userName) return '';
        const parts = userName.trim().split(/\s+/).filter(Boolean);
        if (parts.length >= 2) {
            const init = (parts[0][0] + parts[1][0]).toUpperCase();
            if (/^[A-Z0-9]{1,3}$/.test(init)) return init;
        } else if (parts.length === 1) {
            const init = parts[0].slice(0, 2).toUpperCase();
            if (/^[A-Z0-9]{1,2}$/.test(init)) return init;
        }
        return '';
    };

    const handlePickImage = async () => {
        soundHapticService.triggerFeedback();
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert(
                isUrdu ? 'اجازت درکار ہے' : 'Permission Denied',
                isUrdu ? 'پروفائل تصویر منتخب کرنے کے لیے گیلری کی اجازت ضروری ہے۔' : 'Gallery access is required to choose a profile photo.'
            );
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets[0].uri) {
            setTempSelectedImage(result.assets[0].uri);
            setImagePreviewModal(true);
        }
    };

    const handleSelectNewPhoto = () => {
        soundHapticService.triggerFeedback();
        setPhotoActionModalVisible(false);
        setTimeout(() => {
            handlePickImage();
        }, 200);
    };

    const handleRemovePhoto = async () => {
        soundHapticService.triggerFeedback();
        setProfileImage(null);
        if (email) {
            await AsyncStorage.removeItem(`userProfilePic_${email}`).catch(() => {});
        }
        await AsyncStorage.removeItem('userProfilePic').catch(() => {});
        setPhotoActionModalVisible(false);
        setProfileMessage(isUrdu ? 'پروفائل تصویر ہٹا دی گئی۔' : 'Profile photo removed.');
        setTimeout(() => setProfileMessage(''), 3000);
    };

    const handleApplyPhoto = async () => {
        soundHapticService.triggerFeedback();
        if (!tempSelectedImage) return;
        setProfileImage(tempSelectedImage);

        // Store photo under email-specific key and generic key
        if (email) {
            await AsyncStorage.setItem(`userProfilePic_${email}`, tempSelectedImage).catch(() => {});
        }
        await AsyncStorage.setItem('userProfilePic', tempSelectedImage).catch(() => {});
        setImagePreviewModal(false);
        setTempSelectedImage(null);
        setProfileMessage(isUrdu ? 'پروفائل تصویر کامیابی سے اپ ڈیٹ ہو گئی۔' : 'Profile picture updated successfully.');
        setTimeout(() => setProfileMessage(''), 3000);
    };

    const fetchHistoryData = async () => {
        if (!email) return;
        setFetchingHistory(true);

        const savedCustom = await AsyncStorage.getItem('userCustomHabits');
        let combinedHabits = [...defaultHabits];
        if (savedCustom) {
            try {
                const parsed = JSON.parse(savedCustom);
                combinedHabits = [...defaultHabits, ...parsed.map((h: any) => ({ id: h.id, name: h.name }))];
            } catch {
                // Ignore parse error
            }
        }
        setHistoryHabits(combinedHabits);

        try {
            const res = await fetch(`${API_BASE_URL}/monthly-matrix/${email}`);
            const data = await res.json();
            if (res.ok && data.matrix) {
                setHistoryMatrix(data.matrix);
            }
        } catch {
            // Non-blocking error
        } finally {
            setFetchingHistory(false);
        }
    };

    const handleOpenHistoryModal = () => {
        soundHapticService.triggerFeedback();
        setHistoryModalVisible(true);
        fetchHistoryData();
    };

    const handleUpdateProfile = async () => {
        soundHapticService.triggerFeedback();
        setLoading(true);
        setProfileMessage('');

        try {
            const response = await fetch(`${API_BASE_URL}/profile/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), email: email.trim() }),
            });

            const data = await response.json();

            if (response.ok) {
                await AsyncStorage.setItem('userEmail', email.trim());
                await AsyncStorage.setItem('userName', name.trim());
                setProfileMessage(isUrdu ? 'پروفائل تفصیلات محفوظ کر لی گئیں۔' : 'Profile settings updated successfully.');
                setIsEditing(false);
            } else {
                setProfileMessage(data.detail || 'Could not update profile.');
            }
        } catch {
            setProfileMessage('Error connecting to backend server.');
        } finally {
            setLoading(false);
            setTimeout(() => setProfileMessage(''), 3000);
        }
    };

    const handleToggleTheme = (selected: 'light' | 'dark') => {
        soundHapticService.triggerFeedback();
        setTheme(selected);
    };

    const handleToggleHaptics = async (value: boolean) => {
        setHapticsEnabled(value);
        await soundHapticService.setHapticsEnabled(value);
        if (value) soundHapticService.triggerHaptic(40);
    };

    const handleToggleSound = async (value: boolean) => {
        setSoundEnabled(value);
        await soundHapticService.setSoundEnabled(value);
        if (value) soundHapticService.playClick();
    };

    const handleSelectSoundPreset = async (preset: SoundPreset) => {
        setSoundPresetState(preset);
        await soundHapticService.setSoundPreset(preset);
        await soundHapticService.playTasbeehFeedback();
    };

    const handleToggleReminderSound = async (value: boolean) => {
        setReminderSoundEnabled(value);
        await soundHapticService.setReminderSoundEnabled(value);
        soundHapticService.triggerFeedback();
        try {
            const rems = await loadReminderSettings();
            await syncScheduledNotifications(rems);
        } catch {
            // Notification resync fallback
        }
    };

    const handleToggleLanguage = (lang: 'en' | 'ur') => {
        soundHapticService.triggerFeedback();
        setLanguage(lang);
    };

    const handleExportMonthlyPDF = async () => {
        if (!email) return;
        soundHapticService.triggerFeedback();
        setGeneratingReport(true);

        try {
            let rowsHtml = '';
            daysInMonth.forEach((d) => {
                rowsHtml += `
                    <tr>
                        <td style="border: 1px solid #E5E2D9; padding: 5px; font-weight: bold; text-align: center; background: #F9F8F4;">Day ${d}</td>
                        ${historyHabits
                            .map(
                                (h) => `
                            <td style="border: 1px solid #E5E2D9; padding: 5px; text-align: center;">
                                ${
                                    historyMatrix[`${h.id}_${d}`]
                                        ? '<span style="color: #0D5C3A; font-weight: bold; font-size: 15px;">&#10003;</span>'
                                        : '<span style="color: #DDD;">-</span>'
                                }
                            </td>
                        `
                            )
                            .join('')}
                    </tr>
                `;
            });

            const htmlContent = `
                <html>
                <head>
                    <style>
                        body { font-family: -apple-system, Roboto, Helvetica, Arial, sans-serif; padding: 20px; color: #2C3E35; }
                        h1 { color: #0D5C3A; margin-bottom: 2px; }
                        p { color: #777; font-size: 13px; margin-top: 2px; margin-bottom: 12px; }
                        table { width: 100%; border-collapse: collapse; font-size: 11px; }
                        th { background-color: #0D5C3A; color: white; border: 1px solid #0D5C3A; padding: 6px; text-align: center; }
                    </style>
                </head>
                <body>
                    <h1>My Deen Diary | ${months[selectedMonth]} ${selectedYear}</h1>
                    <p>User: <strong>${name || 'Servant of Allah'}</strong> (${email}) | Generated on ${new Date().toLocaleDateString()}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Day</th>
                                ${historyHabits.map((h) => `<th>${h.name}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${rowsHtml}
                        </tbody>
                    </table>
                </body>
                </html>
            `;

            const { uri } = await Print.printToFileAsync({ html: htmlContent });
            await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
        } catch {
            Alert.alert(isUrdu ? 'رپورٹ کی خرابی' : 'Export Error', isUrdu ? 'دستاویز بنانے میں رکاوٹ پیش آئی۔' : 'Could not generate document at this time.');
        } finally {
            setGeneratingReport(false);
        }
    };

    const handleInviteFriends = async () => {
        soundHapticService.triggerFeedback();
        try {
            await Share.share({
                message: isUrdu
                    ? 'السلام علیکم! میرے ساتھ مائی دین ڈائری پر روزانہ نمازوں اور اذکار کا حساب رکھیں۔'
                    : 'Assalamu Alaikum! Join me in tracking daily prayers and reflections on My Deen Diary.',
            });
        } catch {
            // Share dismissed
        }
    };

    const handleSignOut = async () => {
        soundHapticService.triggerFeedback();
        await AsyncStorage.removeItem('userEmail');
        await AsyncStorage.removeItem('userName');
        setProfileImage(null);
        navigation.replace('Login');
    };

    const handleDeleteAccount = () => {
        soundHapticService.triggerFeedback();
        Alert.alert(
            isUrdu ? 'اکاؤنٹ مستقل طور پر حذف کریں' : 'Delete Account Permanently',
            isUrdu
                ? 'کیا آپ واقعی اپنا اکاؤنٹ حذف کرنا چاہتے ہیں؟ آپ کی تمام نمازیں، معمولات اور ہسٹری مکمل ختم ہو جائیں گی۔'
                : 'Are you sure you want to permanently delete your account? All your prayers, habits, and history will be wiped.',
            [
                { text: isUrdu ? 'منسوخ' : 'Cancel', style: 'cancel' },
                {
                    text: isUrdu ? 'مستقل حذف کریں' : 'Delete Permanently',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            soundHapticService.triggerFeedback();
                            if (email) {
                                try {
                                    await fetch(`${API_BASE_URL}/auth/delete-account/${email}`, {
                                        method: 'DELETE',
                                    });
                                } catch {
                                    try {
                                        await fetch(`${API_BASE_URL}/delete-account/${email}`, {
                                            method: 'DELETE',
                                        });
                                    } catch {
                                        // Non-blocking
                                    }
                                }

                                await AsyncStorage.removeItem(`userAuthToken_${email}`);
                                await AsyncStorage.removeItem(`userProfilePic_${email}`);
                                await AsyncStorage.removeItem(`userStreak_${email}`);
                                await AsyncStorage.removeItem(`userBestStreak_${email}`);
                                await AsyncStorage.removeItem(`userQazaCounts_${email}`);
                                await AsyncStorage.removeItem(`userQazaHistory_${email}`);
                                await AsyncStorage.removeItem(`userQazaResolvedDates_${email}`);
                                await AsyncStorage.removeItem(`userNotifications_${email}`);
                            }

                            await AsyncStorage.removeItem('userEmail');
                            await AsyncStorage.removeItem('userName');
                            await AsyncStorage.removeItem('userCustomHabits');
                            await AsyncStorage.removeItem('user_notifications_list');

                            setEmail('');
                            setName('');
                            setProfileImage(null);

                            Alert.alert(
                                isUrdu ? 'اکاؤنٹ حذف کر دیا گیا' : 'Account Deleted',
                                isUrdu ? 'آپ کا اکاؤنٹ اور تمام متعلقہ ڈیٹا صاف کر دیا گیا ہے۔' : 'Your account and personal data have been completely erased.'
                            );

                            navigation.replace('Login');
                        } catch {
                            navigation.replace('Login');
                        }
                    },
                },
            ]
        );
    };

    return (
        <View style={[styles.fullBackground, { backgroundColor: colors.background }]}>
            <StatusBar style="light" />
            <SafeAreaView style={{ backgroundColor: colors.primary }} edges={['top']}>
                {/* Standardized Header Container */}
                <View style={[styles.headerContainer, { backgroundColor: colors.primary }]}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => (navigation?.canGoBack?.() ? navigation.goBack() : navigation.navigate('Tracker'))}
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
                        {isUrdu ? 'اکاؤنٹ اور سیٹنگز' : 'Account & Settings'}
                    </Text>

                    <View style={styles.rightSpacer} />
                </View>
            </SafeAreaView>

            <View style={[styles.bodyContainer, { backgroundColor: colors.background }]}>
                {profileMessage !== '' && (
                    <View style={[styles.infoBanner, { backgroundColor: colors.primaryLight }]}>
                        <Text style={[styles.infoBannerText, { color: colors.primary, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 14 }]}>
                            {profileMessage}
                        </Text>
                    </View>
                )}

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
                    {/* User Identity Profile Card */}
                    <View style={[styles.profileHeaderCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <TouchableOpacity
                            style={styles.avatarWrapper}
                            onPress={() => {
                                soundHapticService.triggerFeedback();
                                setPhotoActionModalVisible(true);
                            }}
                            activeOpacity={0.8}
                        >
                            {profileImage ? (
                                <Image source={{ uri: profileImage }} style={[styles.avatarImage, { borderColor: colors.primary }]} />
                            ) : (
                                <View style={[styles.avatarCircle, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}>
                                    {getInitials(name) ? (
                                        <Text style={[styles.avatarInitials, { color: colors.primary, fontFamily: fonts.bold, includeFontPadding: false }]}>
                                            {getInitials(name)}
                                        </Text>
                                    ) : (
                                        <Ionicons name="person-outline" size={30} color={colors.primary} />
                                    )}
                                </View>
                            )}
                            <View style={[styles.pencilBadge, { backgroundColor: colors.primary }]}>
                                <Ionicons name="camera-outline" size={14} color="#FFFFFF" />
                            </View>
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.displayName, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 19, lineHeight: 26 }]}>
                                {name || (isUrdu ? 'محترم صارف' : 'Profile User')}
                            </Text>
                            <Text style={[styles.displayEmail, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 14 }]}>
                                {email || (isUrdu ? 'ای میل درج نہیں' : 'No email set')}
                            </Text>
                        </View>
                    </View>

                    {/* Edit Profile Toggle Button */}
                    <TouchableOpacity
                        style={[styles.editToggleBtn, { backgroundColor: colors.surface, borderColor: colors.border }]}
                        onPress={() => {
                            soundHapticService.triggerFeedback();
                            setIsEditing(!isEditing);
                        }}
                        activeOpacity={0.75}
                    >
                        <View style={styles.rowLeft}>
                            <Ionicons
                                name={isEditing ? 'close-circle-outline' : 'create-outline'}
                                size={20}
                                color={colors.primary}
                            />
                            <Text style={[styles.editToggleText, { color: colors.primary, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 16 }]}>
                                {isEditing ? t('cancelEditing') : t('editProfileDetails')}
                            </Text>
                        </View>
                        <Ionicons
                            name={isEditing ? 'chevron-up' : 'chevron-down'}
                            size={18}
                            color={colors.textPlaceholder}
                        />
                    </TouchableOpacity>

                    {isEditing && (
                        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <Text style={[styles.inputLabel, { color: colors.text, fontFamily: fonts.bold }]}>
                                {t('fullName')}
                            </Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text, fontFamily: fonts.medium }]}
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter name"
                                placeholderTextColor={colors.textPlaceholder}
                            />

                            <Text style={[styles.inputLabel, { color: colors.text, fontFamily: fonts.bold }]}>
                                {t('emailAddress')}
                            </Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text, fontFamily: fonts.medium }]}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholder="Enter email"
                                placeholderTextColor={colors.textPlaceholder}
                            />

                            <TouchableOpacity
                                style={[styles.updateBtn, { backgroundColor: colors.primary }]}
                                onPress={handleUpdateProfile}
                                disabled={loading}
                                activeOpacity={0.85}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#FFFFFF" />
                                ) : (
                                    <Text style={[styles.updateBtnText, { fontFamily: fonts.bold }]}>
                                        {t('saveChanges')}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Preferences & App Settings Section */}
                    <Text style={[styles.sectionHeader, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                        {t('preferencesHeader')}
                    </Text>
                    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        {/* Appearance / Theme Selector */}
                        <View style={styles.prefRow}>
                            <View style={styles.prefTextCol}>
                                <View style={styles.prefLabelRow}>
                                    <Ionicons name="color-palette-outline" size={18} color={colors.primary} />
                                    <Text style={[styles.prefLabel, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                                        {t('appearanceTheme')}
                                    </Text>
                                </View>
                                <Text style={[styles.prefSubtext, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                                    {isDark
                                        ? (isUrdu ? 'تاریک تھیم فعال ہے' : 'Dark OLED contrast theme enabled')
                                        : (isUrdu ? 'روشن پرسکون تھیم فعال ہے' : 'Clean serene light theme enabled')}
                                </Text>
                            </View>

                            <View style={[styles.segmentedThemeContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
                                <TouchableOpacity
                                    style={[styles.themeSegment, theme === 'light' && [styles.themeSegmentActive, { backgroundColor: colors.surface }]]}
                                    onPress={() => handleToggleTheme('light')}
                                    activeOpacity={0.8}
                                >
                                    <Ionicons
                                        name="sunny"
                                        size={14}
                                        color={theme === 'light' ? colors.primary : colors.textPlaceholder}
                                        style={{ marginRight: 4 }}
                                    />
                                    <Text
                                        style={[
                                            styles.themeSegmentText,
                                            { color: theme === 'light' ? colors.primary : colors.textPlaceholder, fontFamily: fonts.semiBold },
                                        ]}
                                    >
                                        {t('themeLight')}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.themeSegment, theme === 'dark' && [styles.themeSegmentActive, { backgroundColor: colors.surface }]]}
                                    onPress={() => handleToggleTheme('dark')}
                                    activeOpacity={0.8}
                                >
                                    <Ionicons
                                        name="moon"
                                        size={14}
                                        color={theme === 'dark' ? colors.primary : colors.textPlaceholder}
                                        style={{ marginRight: 4 }}
                                    />
                                    <Text
                                        style={[
                                            styles.themeSegmentText,
                                            { color: theme === 'dark' ? colors.primary : colors.textPlaceholder, fontFamily: fonts.semiBold },
                                        ]}
                                    >
                                        {t('themeDark')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

                        {/* Haptic Vibration Toggle Switch */}
                        <View style={styles.prefRow}>
                            <View style={styles.prefTextCol}>
                                <View style={styles.prefLabelRow}>
                                    <Ionicons name="hardware-chip-outline" size={18} color={colors.primary} />
                                    <Text style={[styles.prefLabel, { color: colors.text, fontFamily: fonts.semiBold }]}>
                                        {t('hapticVibration')}
                                    </Text>
                                </View>
                                <Text style={[styles.prefSubtext, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                    {t('hapticSubtext')}
                                </Text>
                            </View>

                            <Switch
                                value={hapticsEnabled}
                                onValueChange={handleToggleHaptics}
                                trackColor={{ false: colors.border, true: colors.primaryLight }}
                                thumbColor={hapticsEnabled ? colors.primary : '#FFFFFF'}
                            />
                        </View>

                        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

                        {/* Audio Clicks / Sounds Toggle Switch */}
                        <View style={styles.prefRow}>
                            <View style={styles.prefTextCol}>
                                <View style={styles.prefLabelRow}>
                                    <Ionicons name="volume-medium-outline" size={18} color={colors.primary} />
                                    <Text style={[styles.prefLabel, { color: colors.text, fontFamily: fonts.semiBold }]}>
                                        {t('soundEffects')}
                                    </Text>
                                </View>
                                <Text style={[styles.prefSubtext, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                    {t('soundSubtext')}
                                </Text>
                            </View>

                            <Switch
                                value={soundEnabled}
                                onValueChange={handleToggleSound}
                                trackColor={{ false: colors.border, true: colors.primaryLight }}
                                thumbColor={soundEnabled ? colors.primary : '#FFFFFF'}
                            />
                        </View>

                        {/* Sound & Feedback Preset Chips */}
                        <View style={styles.soundPresetWrap}>
                            <Text style={[styles.soundPresetHeading, { color: colors.secondaryText, fontFamily: fonts.medium }, isUrdu && { fontSize: 13.5 }]}>
                                {isUrdu ? 'تسبیح اور کاؤنٹر کا تاثر (پرسیٹ):' : 'Tasbeeh & Counter Feedback Preset:'}
                            </Text>
                            <View style={styles.soundPresetRow}>
                                {[
                                    { key: 'wood' as SoundPreset, label: 'Wood Bead', labelUr: 'لکڑی دانہ', icon: 'disc-outline' },
                                    { key: 'soft' as SoundPreset, label: 'Soft Tap', labelUr: 'نرم کلک', icon: 'finger-print-outline' },
                                    { key: 'haptic' as SoundPreset, label: 'Haptic Only', labelUr: 'صرف ارتعاش', icon: 'phone-portrait-outline' },
                                ].map((p) => {
                                    const isSelected = soundPreset === p.key;
                                    return (
                                        <TouchableOpacity
                                            key={p.key}
                                            style={[
                                                styles.soundPresetChip,
                                                {
                                                    backgroundColor: isSelected ? colors.primary : colors.surface,
                                                    borderColor: isSelected ? colors.primary : colors.border,
                                                },
                                            ]}
                                            onPress={() => handleSelectSoundPreset(p.key)}
                                            activeOpacity={0.8}
                                        >
                                            <Ionicons
                                                name={p.icon as any}
                                                size={14}
                                                color={isSelected ? '#FFFFFF' : colors.text}
                                                style={{ marginRight: 4 }}
                                            />
                                            <Text
                                                style={[
                                                    styles.soundPresetText,
                                                    {
                                                        color: isSelected ? '#FFFFFF' : colors.text,
                                                        fontFamily: isSelected ? fonts.bold : fonts.regular,
                                                        includeFontPadding: false,
                                                    },
                                                    isUrdu && { fontSize: 13 },
                                                ]}
                                            >
                                                {isUrdu ? p.labelUr : p.label}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>

                        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

                        {/* Reminder Alert Sound Toggle Switch */}
                        <View style={styles.prefRow}>
                            <View style={styles.prefTextCol}>
                                <View style={styles.prefLabelRow}>
                                    <Ionicons name="notifications-outline" size={18} color={colors.primary} />
                                    <Text style={[styles.prefLabel, { color: colors.text, fontFamily: fonts.semiBold }]}>
                                        {isUrdu ? 'نوٹیفکیشن الرٹ ساؤنڈ' : 'Reminder Alert Sound'}
                                    </Text>
                                </View>
                                <Text style={[styles.prefSubtext, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                    {isUrdu
                                        ? 'نماز اور اذکار کے طے شدہ نوٹیفکیشن پر آواز چلائیں'
                                        : 'Play audio tone when scheduled prayer and azkar reminders trigger'}
                                </Text>
                            </View>

                            <Switch
                                value={reminderSoundEnabled}
                                onValueChange={handleToggleReminderSound}
                                trackColor={{ false: colors.border, true: colors.primaryLight }}
                                thumbColor={reminderSoundEnabled ? colors.primary : '#FFFFFF'}
                            />
                        </View>

                        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

                        {/* Language Selection Toggle */}
                        <View style={styles.prefRow}>
                            <View style={styles.prefTextCol}>
                                <View style={styles.prefLabelRow}>
                                    <Ionicons name="language-outline" size={18} color={colors.primary} />
                                    <Text style={[styles.prefLabel, { color: colors.text, fontFamily: fonts.semiBold }]}>
                                        {t('primaryLanguage')}
                                    </Text>
                                </View>
                                <Text style={[styles.prefSubtext, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                    {isUrdu ? 'اردو' : 'English'}
                                </Text>
                            </View>

                            <View style={[styles.segmentedThemeContainer, { backgroundColor: colors.background, borderColor: colors.border }]}>
                                <TouchableOpacity
                                    style={[
                                        styles.themeSegment,
                                        language === 'en' && [styles.themeSegmentActive, { backgroundColor: colors.surface }],
                                    ]}
                                    onPress={() => handleToggleLanguage('en')}
                                    activeOpacity={0.8}
                                >
                                    <Text
                                        style={[
                                            styles.themeSegmentText,
                                            { color: language === 'en' ? colors.primary : colors.textPlaceholder, fontFamily: fonts.semiBold },
                                        ]}
                                    >
                                        English
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.themeSegment,
                                        language === 'ur' && [styles.themeSegmentActive, { backgroundColor: colors.surface }],
                                    ]}
                                    onPress={() => handleToggleLanguage('ur')}
                                    activeOpacity={0.8}
                                >
                                    <Text
                                        style={[
                                            styles.themeSegmentText,
                                            { color: language === 'ur' ? colors.primary : colors.textPlaceholder, fontFamily: fonts.bold },
                                        ]}
                                    >
                                        اردو
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={[styles.divider, { backgroundColor: colors.borderLight }]} />

                        {/* Prayer Reminders Shortcut */}
                        <TouchableOpacity
                            style={styles.prefActionRow}
                            onPress={() => {
                                soundHapticService.triggerFeedback();
                                navigation.navigate('Notification');
                            }}
                            activeOpacity={0.7}
                        >
                            <View style={styles.rowLeft}>
                                <Ionicons name="notifications-outline" size={18} color={colors.primary} />
                                <View>
                                    <Text style={[styles.prefActionLabel, { color: colors.text, fontFamily: fonts.semiBold }]}>
                                        {t('prayerReminders')}
                                    </Text>
                                    <Text style={[styles.prefSubtext, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                        {t('prayerRemindersSub')}
                                    </Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color={colors.textPlaceholder} />
                        </TouchableOpacity>
                    </View>

                    {/* Arabic Typography Settings Section */}
                    <Text style={[styles.sectionHeader, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                        {isUrdu ? 'عربی رسم الخط و سائز' : 'Arabic Typography'}
                    </Text>

                    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        {/* Script Selection Header */}
                        <View style={styles.prefRow}>
                            <View style={styles.prefTextCol}>
                                <View style={styles.prefLabelRow}>
                                    <Ionicons name="text-outline" size={18} color={colors.primary} />
                                    <Text style={[styles.prefLabel, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                                        {isUrdu ? 'رسم الخط کا انداز' : 'Arabic Script Style'}
                                    </Text>
                                </View>
                                <Text style={[styles.prefSubtext, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                                    {arabicScript === 'indopak'
                                        ? (isUrdu ? 'انڈو-پاک نسخ (پی ڈی ایم ایس سلیم)' : 'Indo-Pak Script (PDMS Saleem Quran)')
                                        : (isUrdu ? 'سعودی مدنی نسخ (مصحف عثمان طہٰ)' : 'Saudi Madani Script (KFGQPC Uthman Taha)')}
                                </Text>
                            </View>
                        </View>

                        {/* Segmented Control for Script */}
                        <View style={[styles.segmentedArabicControl, { backgroundColor: colors.background, borderColor: colors.border }]}>
                            <TouchableOpacity
                                style={[
                                    styles.arabicSegmentBtn,
                                    arabicScript === 'indopak' && [styles.arabicSegmentBtnActive, { backgroundColor: colors.surface, borderColor: colors.primary }],
                                ]}
                                onPress={() => {
                                    soundHapticService.triggerFeedback();
                                    setArabicScript('indopak');
                                }}
                                activeOpacity={0.8}
                            >
                                <Text
                                    style={[
                                        styles.arabicSegmentBtnText,
                                        { color: arabicScript === 'indopak' ? colors.primary : colors.secondaryText, fontFamily: fonts.bold, includeFontPadding: false },
                                        isUrdu && { fontSize: 14 },
                                    ]}
                                >
                                    {isUrdu ? 'انڈو-پاک نسخ' : 'Indo-Pak Script'}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.arabicSegmentBtn,
                                    arabicScript === 'madani' && [styles.arabicSegmentBtnActive, { backgroundColor: colors.surface, borderColor: colors.primary }],
                                ]}
                                onPress={() => {
                                    soundHapticService.triggerFeedback();
                                    setArabicScript('madani');
                                }}
                                activeOpacity={0.8}
                            >
                                <Text
                                    style={[
                                        styles.arabicSegmentBtnText,
                                        { color: arabicScript === 'madani' ? colors.primary : colors.secondaryText, fontFamily: fonts.bold, includeFontPadding: false },
                                        isUrdu && { fontSize: 14 },
                                    ]}
                                >
                                    {isUrdu ? 'سعودی مدنی نسخ' : 'Saudi / Madani'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.divider, { backgroundColor: colors.borderLight, marginVertical: 14 }]} />

                        {/* Font Size Selection Header */}
                        <View style={styles.prefRow}>
                            <View style={styles.prefTextCol}>
                                <View style={styles.prefLabelRow}>
                                    <Ionicons name="resize-outline" size={18} color={colors.primary} />
                                    <Text style={[styles.prefLabel, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                                        {isUrdu ? 'عربی فونٹ سائز' : 'Arabic Font Size'}
                                    </Text>
                                </View>
                                <Text style={[styles.prefSubtext, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                                    {arabicSize === 'small' ? (isUrdu ? 'چھوٹا (۲۴px)' : 'Small (24px)') : arabicSize === 'medium' ? (isUrdu ? 'درمیانہ (۳۰px)' : 'Medium (30px Default)') : (isUrdu ? 'بڑا (۳۸px)' : 'Large (38px)')}
                                </Text>
                            </View>
                        </View>

                        {/* 3-way Segmented Control for Size */}
                        <View style={[styles.segmentedArabicControl, { backgroundColor: colors.background, borderColor: colors.border }]}>
                            {(['small', 'medium', 'large'] as const).map((sz) => {
                                const isSelected = arabicSize === sz;
                                const labels = {
                                    small: isUrdu ? 'چھوٹا' : 'Small',
                                    medium: isUrdu ? 'درمیانہ' : 'Medium (Default)',
                                    large: isUrdu ? 'بڑا' : 'Large',
                                };
                                return (
                                    <TouchableOpacity
                                        key={sz}
                                        style={[
                                            styles.arabicSegmentBtn,
                                            isSelected && [styles.arabicSegmentBtnActive, { backgroundColor: colors.surface, borderColor: colors.primary }],
                                        ]}
                                        onPress={() => {
                                            soundHapticService.triggerFeedback();
                                            setArabicSize(sz);
                                        }}
                                        activeOpacity={0.8}
                                    >
                                        <Text
                                            style={[
                                                styles.arabicSegmentBtnText,
                                                { color: isSelected ? colors.primary : colors.secondaryText, fontFamily: fonts.bold, includeFontPadding: false },
                                                isUrdu && { fontSize: 14 },
                                            ]}
                                        >
                                            {labels[sz]}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        {/* Sub-item 3: Urdu Text Size */}
                        <View style={[styles.prefRow, { marginTop: 14 }]}>
                            <View style={styles.prefTextCol}>
                                <View style={styles.prefLabelRow}>
                                    <Ionicons name="text-outline" size={18} color={colors.primary} />
                                    <Text style={[styles.prefLabel, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                                        {isUrdu ? 'اردو فونٹ سائز' : 'Urdu Text Size'}
                                    </Text>
                                </View>
                                <Text style={[styles.prefSubtext, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                                    {urduSize === 'small' ? (isUrdu ? 'چھوٹا (۱۶pt)' : 'Small (16pt)') : urduSize === 'medium' ? (isUrdu ? 'درمیانہ (۲۰pt)' : 'Medium (20pt Default)') : (isUrdu ? 'بڑا (۲۶pt)' : 'Large (26pt)')}
                                </Text>
                            </View>
                        </View>

                        {/* 3-way Segmented Control for Urdu Size */}
                        <View style={[styles.segmentedArabicControl, { backgroundColor: colors.background, borderColor: colors.border }]}>
                            {(['small', 'medium', 'large'] as const).map((sz) => {
                                const isSelected = urduSize === sz;
                                const labels = {
                                    small: isUrdu ? 'چھوٹا (۱۶)' : 'Small (16pt)',
                                    medium: isUrdu ? 'درمیانہ (۲۰)' : 'Medium (20pt)',
                                    large: isUrdu ? 'بڑا (۲۶)' : 'Large (26pt)',
                                };
                                return (
                                    <TouchableOpacity
                                        key={sz}
                                        style={[
                                            styles.arabicSegmentBtn,
                                            isSelected && [styles.arabicSegmentBtnActive, { backgroundColor: colors.surface, borderColor: colors.primary }],
                                        ]}
                                        onPress={() => {
                                            soundHapticService.triggerFeedback();
                                            setUrduSize(sz);
                                        }}
                                        activeOpacity={0.8}
                                    >
                                        <Text
                                            style={[
                                                styles.arabicSegmentBtnText,
                                                { color: isSelected ? colors.primary : colors.secondaryText, fontFamily: fonts.bold, includeFontPadding: false },
                                                isUrdu && { fontSize: 14 },
                                            ]}
                                        >
                                            {labels[sz]}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>

                        <View style={[styles.divider, { backgroundColor: colors.borderLight, marginVertical: 14 }]} />

                        {/* Real-time Dynamic Live Preview Box */}
                        <Text style={[styles.previewSectionTitle, { color: colors.secondaryText, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 14 }]}>
                            {isUrdu ? 'براہ راست پیش منظر' : 'Live Preview'}
                        </Text>
                        <View style={[styles.arabicLivePreviewBox, { backgroundColor: isDark ? '#16221D' : '#F4F9F5', borderColor: colors.primary }]}>
                            <Text
                                style={[
                                    styles.arabicLivePreviewText,
                                    getArabicStyle(),
                                    { color: colors.primary, textAlign: 'center' },
                                ]}
                            >
                                رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ
                            </Text>
                            <Text
                                style={[
                                    styles.previewTranslationText,
                                    { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false },
                                    isUrdu && getUrduStyle({ isMultiLine: true, tightPadding: true }),
                                    isUrdu && { color: colors.secondaryText, textAlign: 'center' },
                                ]}
                            >
                                {isUrdu
                                    ? 'اے ہمارے رب! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی عطا فرما اور ہمیں آگ کے عذاب سے بچا۔'
                                    : '"Our Lord, give us in this world that which is good and in the Hereafter that which is good and protect us from the punishment of the Fire."'}
                            </Text>
                        </View>
                    </View>

                    {/* Features & Management Section */}
                    <Text style={[styles.sectionHeader, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                        {isUrdu ? 'سرگرمیاں و تاریخی ریکارڈ' : 'Activity & Records'}
                    </Text>

                    <TouchableOpacity
                        style={[styles.archiveCard, { backgroundColor: colors.primaryLight, borderColor: colors.primary }]}
                        onPress={handleOpenHistoryModal}
                        activeOpacity={0.8}
                    >
                        <View style={styles.rowLeft}>
                            <Ionicons name="calendar-outline" size={24} color={colors.primary} />
                            <View>
                                <Text style={[styles.archiveTitle, { color: colors.primary, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                                    {t('historyReport')}
                                </Text>
                                <Text style={[styles.archiveSub, { color: colors.text, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                                    {isUrdu ? 'ماہ/سال منتخب کریں، میٹرکس دیکھیں اور پی ڈی ایف برآمد کریں' : 'Select month/year, preview matrix & export PDF'}
                                </Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={colors.primary} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.interactiveRow, { backgroundColor: colors.surface, borderColor: colors.border }]}
                        onPress={() => {
                            soundHapticService.triggerFeedback();
                            navigation.navigate('Qaza');
                        }}
                        activeOpacity={0.8}
                    >
                        <View style={styles.rowLeft}>
                            <Ionicons name="time-outline" size={22} color={colors.primary} />
                            <Text style={[styles.rowText, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                                {t('qazaBannerTitle')}
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={colors.textPlaceholder} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.interactiveRow, { backgroundColor: colors.surface, borderColor: colors.border }]}
                        onPress={handleInviteFriends}
                        activeOpacity={0.8}
                    >
                        <View style={styles.rowLeft}>
                            <Ionicons name="share-social-outline" size={22} color={colors.primary} />
                            <Text style={[styles.rowText, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                                {t('inviteFamily')}
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={colors.textPlaceholder} />
                    </TouchableOpacity>

                    {/* App Walkthrough Tour Button */}
                    <TouchableOpacity
                        style={[styles.interactiveRow, { backgroundColor: colors.surface, borderColor: colors.border }]}
                        onPress={() => {
                            soundHapticService.triggerFeedback();
                            setWalkthroughModalVisible(true);
                        }}
                        activeOpacity={0.8}
                    >
                        <View style={styles.rowLeft}>
                            <Ionicons name="sparkles-outline" size={22} color={colors.primary} />
                            <Text style={[styles.rowText, { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                                {isUrdu ? 'ایپ کا تعارف اور رہنمائی' : 'App Walkthrough & Tour'}
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color={colors.textPlaceholder} />
                    </TouchableOpacity>

                    {/* Account Sync Card */}
                    <View style={[styles.qrCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <Ionicons name="qr-code-outline" size={50} color={colors.primary} />
                        <Text style={[styles.qrTitle, { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 17, lineHeight: 24 }]}>
                            {t('syncCode')}
                        </Text>
                        <Text style={[styles.qrText, { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false }, isUrdu && { fontSize: 15, lineHeight: 21 }]}>
                            {isUrdu
                                ? 'اپنے تمام دینی ریکارڈز اور اذکار کو مختلف آلات پر محفوظ اور ہم آہنگ کریں'
                                : 'Synchronize and secure your personal records across devices'}
                        </Text>
                    </View>

                    {/* Logout Button */}
                    <TouchableOpacity style={[styles.logoutButton, { borderColor: colors.danger }]} onPress={handleSignOut} activeOpacity={0.8}>
                        <Ionicons name="log-out-outline" size={18} color={colors.danger} style={{ marginRight: 6 }} />
                        <Text style={[styles.logoutText, { color: colors.danger, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 16 }]}>
                            {t('signOut')}
                        </Text>
                    </TouchableOpacity>

                    {/* Permanent Account Deletion Button */}
                    <TouchableOpacity
                        style={[
                            styles.deleteAccountBtn,
                            {
                                borderColor: isDark ? 'rgba(239, 68, 68, 0.35)' : '#FCA5A5',
                                backgroundColor: isDark ? 'rgba(239, 68, 68, 0.08)' : '#FEF2F2',
                            },
                        ]}
                        onPress={handleDeleteAccount}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="trash-outline" size={17} color={colors.danger} style={{ marginRight: 6 }} />
                        <Text style={[styles.deleteAccountText, { color: colors.danger, fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 15 }]}>
                            {isUrdu ? 'اکاؤنٹ مستقل طور پر حذف کریں' : 'Delete Account Permanently'}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>

                {/* Photo Options Modal */}
                <Modal
                    visible={photoActionModalVisible}
                    animationType="fade"
                    transparent={true}
                    onRequestClose={() => setPhotoActionModalVisible(false)}
                >
                    <TouchableOpacity
                        style={styles.actionSheetOverlay}
                        activeOpacity={1}
                        onPress={() => setPhotoActionModalVisible(false)}
                    >
                        <TouchableOpacity
                            activeOpacity={1}
                            style={[styles.actionSheetContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}
                        >
                            <View style={styles.actionSheetIndicator} />
                            <Text
                                style={[
                                    styles.actionSheetTitle,
                                    { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false },
                                    isUrdu && { fontSize: 18, lineHeight: 26 },
                                ]}
                            >
                                {isUrdu ? 'پروفائل تصویر' : 'Profile Photo'}
                            </Text>

                            <TouchableOpacity
                                style={[styles.actionSheetOption, { borderBottomColor: colors.borderLight }]}
                                onPress={handleSelectNewPhoto}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.actionSheetIconWrapper, { backgroundColor: colors.primaryLight }]}>
                                    <Ionicons name="image-outline" size={20} color={colors.primary} />
                                </View>
                                <Text
                                    style={[
                                        styles.actionSheetOptionText,
                                        { color: colors.text, fontFamily: fonts.semiBold, includeFontPadding: false },
                                        isUrdu && { fontSize: 16 },
                                    ]}
                                >
                                    {isUrdu ? 'نئی تصویر منتخب کریں' : 'Choose New Photo'}
                                </Text>
                            </TouchableOpacity>

                            {Boolean(profileImage) && (
                                <TouchableOpacity
                                    style={[styles.actionSheetOption, { borderBottomColor: colors.borderLight }]}
                                    onPress={handleRemovePhoto}
                                    activeOpacity={0.7}
                                >
                                    <View
                                        style={[
                                            styles.actionSheetIconWrapper,
                                            { backgroundColor: isDark ? 'rgba(220, 38, 38, 0.15)' : '#FEE2E2' },
                                        ]}
                                    >
                                        <Ionicons name="trash-outline" size={20} color="#DC2626" />
                                    </View>
                                    <Text
                                        style={[
                                            styles.actionSheetOptionText,
                                            { color: '#DC2626', fontFamily: fonts.semiBold, includeFontPadding: false },
                                            isUrdu && { fontSize: 16 },
                                        ]}
                                    >
                                        {isUrdu ? 'تصویر ہٹائیں' : 'Remove Photo'}
                                    </Text>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                style={[styles.actionSheetCancelBtn, { backgroundColor: colors.background }]}
                                onPress={() => setPhotoActionModalVisible(false)}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.actionSheetCancelText,
                                        { color: colors.secondaryText, fontFamily: fonts.semiBold, includeFontPadding: false },
                                        isUrdu && { fontSize: 15 },
                                    ]}
                                >
                                    {isUrdu ? 'منسوخ کریں' : 'Cancel'}
                                </Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>

                {/* Photo Preview Modal */}
                <Modal visible={imagePreviewModal} animationType="fade" transparent={true}>
                    <View style={styles.photoModalOverlay}>
                        <View style={[styles.photoModalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <Text style={[styles.photoModalTitle, { color: colors.primary, fontFamily: fonts.bold }]}>
                                {isUrdu ? 'پروفائل تصویر پیش منظر' : 'Profile Picture Preview'}
                            </Text>
                            <Text style={[styles.photoModalSub, { color: colors.secondaryText, fontFamily: fonts.regular }]}>
                                {isUrdu ? 'تصویر کا حتمی پیش منظر دیکھ کر محفوظ کریں' : 'Confirm how your selected picture will look'}
                            </Text>

                            {tempSelectedImage && (
                                <Image source={{ uri: tempSelectedImage }} style={[styles.previewImageRound, { borderColor: colors.primary }]} />
                            )}

                            <View style={styles.photoModalActionRow}>
                                <TouchableOpacity
                                    style={[styles.cancelPhotoBtn, { backgroundColor: colors.background }]}
                                    onPress={() => {
                                        setImagePreviewModal(false);
                                        setTempSelectedImage(null);
                                    }}
                                >
                                    <Text style={[styles.cancelPhotoBtnText, { color: colors.text, fontFamily: fonts.semiBold }]}>
                                        {t('cancel')}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.applyPhotoBtn, { backgroundColor: colors.primary }]} onPress={handleApplyPhoto}>
                                    <Ionicons
                                        name="checkmark-circle-outline"
                                        size={18}
                                        color="#FFFFFF"
                                        style={{ marginRight: 6 }}
                                    />
                                    <Text style={[styles.applyPhotoBtnText, { fontFamily: fonts.bold }]}>
                                        {isUrdu ? 'تصویر محفوظ کریں' : 'Apply & Save'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* Monthly History Modal */}
                <Modal visible={historyModalVisible} animationType="slide" transparent={false}>
                    <SafeAreaView style={[styles.modalContainer, { backgroundColor: colors.background }]}>
                        <View style={styles.modalHeader}>
                            <Text style={[styles.modalTitle, { color: colors.primary, fontFamily: fonts.bold }]}>
                                {t('monthlyMatrixTitle')}
                            </Text>
                            <TouchableOpacity onPress={() => setHistoryModalVisible(false)}>
                                <Ionicons name="close-circle" size={28} color={colors.textPlaceholder} />
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.pickerSection, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <Text style={[styles.pickerLabel, { color: colors.text, fontFamily: fonts.bold }]}>
                                {isUrdu ? 'سال منتخب کریں:' : 'Select Year:'}
                            </Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillRow}>
                                {years.map((y) => (
                                    <TouchableOpacity
                                        key={y}
                                        style={[
                                            styles.yearPill,
                                            { backgroundColor: colors.background, borderColor: colors.border },
                                            selectedYear === y && { backgroundColor: colors.primary, borderColor: colors.primary },
                                        ]}
                                        onPress={() => setSelectedYear(y)}
                                    >
                                        <Text
                                            style={[
                                                styles.pillText,
                                                { color: selectedYear === y ? '#FFFFFF' : colors.text, fontFamily: fonts.semiBold },
                                            ]}
                                        >
                                            {y}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            <Text style={[styles.pickerLabel, { color: colors.text, fontFamily: fonts.bold, marginTop: 8 }]}>
                                {isUrdu ? 'مہینہ منتخب کریں:' : 'Select Month:'}
                            </Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pillRow}>
                                {months.map((m, idx) => (
                                    <TouchableOpacity
                                        key={m}
                                        style={[
                                            styles.monthPill,
                                            { backgroundColor: colors.background, borderColor: colors.border },
                                            selectedMonth === idx && { backgroundColor: colors.primary, borderColor: colors.primary },
                                        ]}
                                        onPress={() => setSelectedMonth(idx)}
                                    >
                                        <Text
                                            style={[
                                                styles.pillText,
                                                { color: selectedMonth === idx ? '#FFFFFF' : colors.text, fontFamily: fonts.semiBold },
                                            ]}
                                        >
                                            {m}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>

                        <Text style={[styles.previewTitle, { color: colors.text, fontFamily: fonts.bold }]}>
                            {months[selectedMonth]} {selectedYear} ({daysCount} {isUrdu ? 'ایام' : 'Days'})
                        </Text>

                        {fetchingHistory ? (
                            <View style={styles.loaderArea}>
                                <ActivityIndicator size="large" color={colors.primary} />
                            </View>
                        ) : (
                            <View style={[styles.gridContainer, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={true}>
                                    <View>
                                        <View style={[styles.tableHeaderRow, { backgroundColor: colors.primary }]}>
                                            <View style={styles.habitHeaderCell}>
                                                <Text style={[styles.headerCellText, { fontFamily: fonts.bold }]}>
                                                    {isUrdu ? 'نماز / معمول' : 'HABIT / SALAH'}
                                                </Text>
                                            </View>
                                            {daysInMonth.map((d) => (
                                                <View key={d} style={styles.dayHeaderCell}>
                                                    <Text style={[styles.dayText, { color: colors.gold, fontFamily: fonts.bold }]}>{d}</Text>
                                                </View>
                                            ))}
                                        </View>

                                        <ScrollView showsVerticalScrollIndicator={false}>
                                            {historyHabits.map((habit) => (
                                                <View key={habit.id} style={[styles.tableBodyRow, { borderBottomColor: colors.border }]}>
                                                    <View style={[styles.habitBodyCell, { borderRightColor: colors.border, backgroundColor: colors.surface }]}>
                                                        <Text style={[styles.habitNameText, { color: colors.text, fontFamily: fonts.bold }]} numberOfLines={1}>
                                                            {habit.name}
                                                        </Text>
                                                    </View>
                                                    {daysInMonth.map((d) => (
                                                        <View key={d} style={[styles.matrixCell, { borderRightColor: colors.border, backgroundColor: colors.surface }]}>
                                                            {historyMatrix[`${habit.id}_${d}`] && (
                                                                <Ionicons
                                                                    name="checkmark"
                                                                    size={14}
                                                                    color={colors.primary}
                                                                />
                                                            )}
                                                        </View>
                                                    ))}
                                                </View>
                                            ))}
                                        </ScrollView>
                                    </View>
                                </ScrollView>
                            </View>
                        )}

                        <View style={styles.modalActionRow}>
                            <TouchableOpacity
                                style={[styles.exportBtn, { backgroundColor: colors.primary }]}
                                onPress={handleExportMonthlyPDF}
                                disabled={generatingReport}
                            >
                                {generatingReport ? (
                                    <ActivityIndicator color="#FFFFFF" />
                                ) : (
                                    <>
                                        <Ionicons
                                            name="share-social-outline"
                                            size={20}
                                            color="#FFFFFF"
                                            style={{ marginRight: 8 }}
                                        />
                                        <Text style={[styles.exportBtnText, { fontFamily: fonts.bold }]}>
                                            {t('exportPdfReport')}
                                        </Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </Modal>

                {/* Introductory App Walkthrough Modal */}
                <WalkthroughModal
                    visible={walkthroughModalVisible}
                    onClose={() => setWalkthroughModalVisible(false)}
                />
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
    infoBanner: {
        padding: 12,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    infoBannerText: {
        textAlign: 'center',
        fontSize: 13,
    },
    scroll: { paddingBottom: 25 },
    profileHeaderCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 12,
        gap: 14,
    },
    avatarWrapper: { position: 'relative' },
    avatarCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    avatarImage: { width: 60, height: 60, borderRadius: 30, borderWidth: 1 },
    pencilBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: '#FFFFFF',
    },
    displayName: { fontSize: 17 },
    displayEmail: { fontSize: 13, marginTop: 2 },
    editToggleBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        marginBottom: 14,
    },
    editToggleText: { fontSize: 14 },
    sectionHeader: {
        fontSize: 13,
        letterSpacing: 0.5,
        marginTop: 6,
        marginBottom: 8,
    },
    card: {
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        marginBottom: 15,
    },
    inputLabel: { fontSize: 12, marginBottom: 6 },
    input: {
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 8,
        fontSize: 14,
        marginBottom: 16,
        borderWidth: 1,
    },
    updateBtn: {
        height: 50,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    updateBtnText: { color: '#FFFFFF', fontSize: 15 },
    prefRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
    },
    prefTextCol: {
        flex: 1,
        marginRight: 10,
    },
    prefLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    prefLabel: {
        fontSize: 14,
    },
    prefSubtext: {
        fontSize: 11,
        marginTop: 2,
    },
    segmentedThemeContainer: {
        flexDirection: 'row',
        borderRadius: 8,
        padding: 3,
        borderWidth: 1,
    },
    themeSegment: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    themeSegmentActive: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 1,
    },
    themeSegmentText: {
        fontSize: 12,
    },
    prefActionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
    },
    prefActionLabel: {
        fontSize: 14,
    },
    divider: {
        height: 1,
        marginVertical: 12,
    },
    archiveCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 12,
    },
    archiveTitle: { fontSize: 14 },
    archiveSub: { fontSize: 11, marginTop: 2 },
    interactiveRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 12,
    },
    rowLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
    rowText: { fontSize: 14 },
    qrCard: {
        borderRadius: 12,
        padding: 18,
        alignItems: 'center',
        borderWidth: 1,
        marginBottom: 20,
    },
    qrTitle: { fontSize: 14, marginTop: 6 },
    qrText: {
        fontSize: 11,
        marginTop: 2,
        textAlign: 'center',
    },
    logoutButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        paddingVertical: 14,
        borderRadius: 10,
    },
    logoutText: { fontSize: 15 },

    photoModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
    },
    photoModalCard: {
        width: '100%',
        borderRadius: 16,
        padding: 22,
        alignItems: 'center',
        borderWidth: 1,
    },
    photoModalTitle: { fontSize: 18 },
    photoModalSub: { fontSize: 12, marginTop: 4, marginBottom: 16 },
    previewImageRound: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 3,
        marginBottom: 20,
    },
    photoModalActionRow: { flexDirection: 'row', gap: 12, width: '100%' },
    cancelPhotoBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelPhotoBtnText: { fontSize: 14 },
    applyPhotoBtn: {
        flex: 1.5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 10,
    },
    applyPhotoBtnText: { color: '#FFFFFF', fontSize: 14 },

    modalContainer: { flex: 1, paddingHorizontal: 15, paddingTop: 10 },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    modalTitle: { fontSize: 20 },
    pickerSection: {
        padding: 12,
        borderRadius: 12,
        borderWidth: 1,
        marginBottom: 12,
    },
    pickerLabel: { fontSize: 12, marginBottom: 6 },
    pillRow: { flexDirection: 'row' },
    yearPill: {
        paddingVertical: 5,
        paddingHorizontal: 14,
        borderRadius: 14,
        marginRight: 8,
        borderWidth: 1,
    },
    monthPill: {
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 14,
        marginRight: 6,
        borderWidth: 1,
    },
    pillText: { fontSize: 12 },
    previewTitle: { fontSize: 14, marginBottom: 6 },
    loaderArea: { height: 260, justifyContent: 'center', alignItems: 'center' },
    gridContainer: {
        flex: 1,
        borderRadius: 12,
        borderWidth: 1,
        overflow: 'hidden',
        marginBottom: 15,
    },
    tableHeaderRow: { flexDirection: 'row', height: 40, alignItems: 'center' },
    habitHeaderCell: { width: 130, paddingLeft: 10, justifyContent: 'center' },
    headerCellText: { color: '#FFFFFF', fontSize: 11 },
    dayHeaderCell: {
        width: 34,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: 'rgba(229,226,217,0.3)',
    },
    dayText: { fontSize: 12 },
    tableBodyRow: {
        flexDirection: 'row',
        height: 38,
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    habitBodyCell: {
        width: 130,
        paddingLeft: 10,
        justifyContent: 'center',
        height: '100%',
        borderRightWidth: 1,
    },
    habitNameText: { fontSize: 11 },
    matrixCell: {
        width: 34,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
    },
    modalActionRow: { paddingBottom: 15 },
    exportBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 14,
        borderRadius: 10,
    },
    exportBtnText: { color: '#FFFFFF', fontSize: 16 },
    segmentedArabicControl: {
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        padding: 4,
        marginTop: 10,
        gap: 6,
    },
    arabicSegmentBtn: {
        flex: 1,
        paddingVertical: 9,
        paddingHorizontal: 8,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    arabicSegmentBtnActive: {
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 1,
    },
    arabicSegmentBtnText: {
        fontSize: 12,
    },
    previewSectionTitle: {
        fontSize: 11,
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    arabicLivePreviewBox: {
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 16,
        paddingVertical: 14,
        alignItems: 'center',
    },
    arabicLivePreviewText: {
        marginBottom: 8,
    },
    previewTranslationText: {
        fontSize: 12,
        lineHeight: 18,
        textAlign: 'center',
    },
    deleteAccountBtn: {
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        marginBottom: 20,
    },
    deleteAccountText: {
        fontSize: 14,
    },
    actionSheetOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    actionSheetContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 36,
        borderWidth: 1,
        borderBottomWidth: 0,
    },
    actionSheetIndicator: {
        width: 38,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#9CA3AF',
        alignSelf: 'center',
        marginBottom: 16,
    },
    actionSheetTitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 16,
    },
    actionSheetOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        gap: 14,
    },
    actionSheetIconWrapper: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionSheetOptionText: {
        fontSize: 15,
    },
    actionSheetCancelBtn: {
        marginTop: 14,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionSheetCancelText: {
        fontSize: 15,
    },
    avatarInitials: {
        fontSize: 22,
    },
    soundPresetWrap: {
        marginTop: 10,
        marginBottom: 6,
    },
    soundPresetHeading: {
        fontSize: 12.5,
        marginBottom: 8,
    },
    soundPresetRow: {
        flexDirection: 'row',
        gap: 8,
    },
    soundPresetChip: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 8,
        borderWidth: 1,
    },
    soundPresetText: {
        fontSize: 12,
    },
});
