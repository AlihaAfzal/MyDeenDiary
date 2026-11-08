import React, { useState, useEffect, useMemo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Modal,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { soundHapticService } from '../services/soundHapticsService';
import { API_BASE_URL, fetchWithTimeout } from './config';

export interface ReflectionEntry {
    id: string;
    date: string; // YYYY-MM-DD
    text: string;
    updatedAt: string;
}

export default function ReflectionDiaryScreen({ navigation }: any) {
    const { colors, isDark } = useTheme();
    const { t, fonts, isUrdu } = useLanguage();

    const [entries, setEntries] = useState<ReflectionEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [userEmail, setUserEmail] = useState<string>('');

    // Modal state for Add/Edit
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [editingEntry, setEditingEntry] = useState<ReflectionEntry | null>(null);
    const [entryText, setEntryText] = useState<string>('');
    const [entryDate, setEntryDate] = useState<string>('');
    const [saving, setSaving] = useState<boolean>(false);

    // Search query
    const [searchQuery, setSearchQuery] = useState<string>('');

    const getStorageKey = (email: string) => `userReflections_${email || 'guest'}`;

    useEffect(() => {
        loadReflections();
    }, []);

    const loadReflections = async () => {
        setLoading(true);
        try {
            const email = (await AsyncStorage.getItem('userEmail')) || '';
            setUserEmail(email);

            // 1. Read local storage
            const key = getStorageKey(email);
            const raw = await AsyncStorage.getItem(key);
            let localList: ReflectionEntry[] = [];
            if (raw) {
                try {
                    localList = JSON.parse(raw);
                } catch {
                    localList = [];
                }
            }

            // 2. Fetch from cloud backend if available
            if (email) {
                try {
                    const res = await fetchWithTimeout(`${API_BASE_URL}/reflections/${email}`, {}, 5000);
                    if (res.ok) {
                        const data = await res.json();
                        if (data.status === 'success' && Array.isArray(data.reflections)) {
                            // Merge cloud entries with local
                            const cloudEntries: ReflectionEntry[] = data.reflections.map((r: any) => ({
                                id: r.id || `cloud_${r.date}`,
                                date: r.date,
                                text: r.text,
                                updatedAt: r.updated_at || r.date,
                            }));

                            // Create map by date to avoid duplicates
                            const mergedMap = new Map<string, ReflectionEntry>();
                            localList.forEach((e) => mergedMap.set(e.date, e));
                            cloudEntries.forEach((e) => {
                                if (!mergedMap.has(e.date)) {
                                    mergedMap.set(e.date, e);
                                }
                            });

                            const mergedList = Array.from(mergedMap.values());
                            localList = mergedList;
                            await AsyncStorage.setItem(key, JSON.stringify(mergedList)).catch(() => {});
                        }
                    }
                } catch {
                    // Non-blocking fallback to local list
                }
            }

            // Sort chronologically descending (newest date first)
            localList.sort((a, b) => (a.date < b.date ? 1 : -1));
            setEntries(localList);
        } catch {
            setEntries([]);
        } finally {
            setLoading(false);
        }
    };

    const persistEntries = async (updated: ReflectionEntry[]) => {
        updated.sort((a, b) => (a.date < b.date ? 1 : -1));
        setEntries(updated);
        const key = getStorageKey(userEmail);
        await AsyncStorage.setItem(key, JSON.stringify(updated)).catch(() => {});
    };

    const handleOpenAddModal = () => {
        soundHapticService.triggerFeedback();
        const todayStr = new Date().toISOString().split('T')[0];
        setEditingEntry(null);
        setEntryDate(todayStr);
        setEntryText('');
        setModalVisible(true);
    };

    const handleOpenEditModal = (entry: ReflectionEntry) => {
        soundHapticService.triggerFeedback();
        setEditingEntry(entry);
        setEntryDate(entry.date);
        setEntryText(entry.text);
        setModalVisible(true);
    };

    const handleSaveEntry = async () => {
        if (!entryText.trim()) {
            Alert.alert(
                isUrdu ? 'لازمی فیلڈ' : 'Required',
                isUrdu ? 'براہ کرم اپنی فکر یا احساس تحریر کریں۔' : 'Please write your reflection before saving.'
            );
            return;
        }

        setSaving(true);
        soundHapticService.triggerFeedback();

        try {
            const todayStr = entryDate || new Date().toISOString().split('T')[0];
            let updatedList: ReflectionEntry[] = [];

            if (editingEntry) {
                // Update existing
                updatedList = entries.map((item) =>
                    item.id === editingEntry.id
                        ? { ...item, text: entryText.trim(), updatedAt: new Date().toISOString() }
                        : item
                );
            } else {
                // Check if date already exists
                const existingIdx = entries.findIndex((e) => e.date === todayStr);
                if (existingIdx >= 0) {
                    updatedList = entries.map((item, idx) =>
                        idx === existingIdx
                            ? { ...item, text: entryText.trim(), updatedAt: new Date().toISOString() }
                            : item
                    );
                } else {
                    const newEntry: ReflectionEntry = {
                        id: `refl_${Date.now()}`,
                        date: todayStr,
                        text: entryText.trim(),
                        updatedAt: new Date().toISOString(),
                    };
                    updatedList = [newEntry, ...entries];
                }
            }

            await persistEntries(updatedList);

            // Sync with backend save-progress if email is available
            if (userEmail) {
                try {
                    await fetchWithTimeout(`${API_BASE_URL}/save-progress`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: userEmail,
                            date_str: todayStr,
                            reflection_text: entryText.trim(),
                        }),
                    }, 4000);
                } catch {
                    // Non-blocking sync
                }
            }

            setModalVisible(false);
            setEntryText('');
            setEditingEntry(null);
        } catch {
            Alert.alert(
                isUrdu ? 'خطا' : 'Error',
                isUrdu ? 'محفوظ کرنے میں مسئلہ پیش آیا۔' : 'Failed to save reflection entry.'
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteEntry = (entryId: string) => {
        soundHapticService.triggerFeedback();
        Alert.alert(
            isUrdu ? 'تحریر حذف کریں' : 'Delete Reflection',
            isUrdu ? 'کیا آپ واقعی اس فکر کو مستقل طور پر حذف کرنا چاہتے ہیں؟' : 'Are you sure you want to permanently delete this reflection?',
            [
                { text: isUrdu ? 'منسوخ' : 'Cancel', style: 'cancel' },
                {
                    text: isUrdu ? 'حذف کریں' : 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        const updated = entries.filter((e) => e.id !== entryId);
                        await persistEntries(updated);
                        soundHapticService.triggerFeedback();
                    },
                },
            ]
        );
    };

    // Filtered entries by search query
    const filteredEntries = useMemo(() => {
        if (!searchQuery.trim()) return entries;
        const q = searchQuery.toLowerCase();
        return entries.filter(
            (e) => e.text.toLowerCase().includes(q) || e.date.toLowerCase().includes(q)
        );
    }, [entries, searchQuery]);

    // Grouping: Today, Yesterday, This Month, Earlier
    const grouped = useMemo(() => {
        const todayStr = new Date().toISOString().split('T')[0];
        const yDate = new Date();
        yDate.setDate(yDate.getDate() - 1);
        const yStr = yDate.toISOString().split('T')[0];
        const thisMonthPrefix = todayStr.slice(0, 7);

        const groups: { [key: string]: ReflectionEntry[] } = {
            today: [],
            yesterday: [],
            thisMonth: [],
            earlier: [],
        };

        filteredEntries.forEach((entry) => {
            if (entry.date === todayStr) {
                groups.today.push(entry);
            } else if (entry.date === yStr) {
                groups.yesterday.push(entry);
            } else if (entry.date.startsWith(thisMonthPrefix)) {
                groups.thisMonth.push(entry);
            } else {
                groups.earlier.push(entry);
            }
        });

        return groups;
    }, [filteredEntries]);

    const formatDateHeading = (dateStr: string) => {
        try {
            const [y, m, d] = dateStr.split('-').map(Number);
            const dateObj = new Date(y, m - 1, d);
            return dateObj.toLocaleDateString(isUrdu ? 'ur-PK' : 'en-US', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            });
        } catch {
            return dateStr;
        }
    };

    const renderEntryCard = (entry: ReflectionEntry) => {
        return (
            <View
                key={entry.id}
                style={[
                    styles.entryCard,
                    {
                        backgroundColor: colors.surface,
                        borderColor: colors.border,
                    },
                ]}
            >
                <View style={styles.entryHeaderRow}>
                    <View style={styles.entryDateBadge}>
                        <Ionicons name="calendar-outline" size={13} color={colors.primary} style={{ marginRight: 4 }} />
                        <Text style={[styles.entryDateText, { color: colors.primary, fontFamily: fonts.bold }]}>
                            {formatDateHeading(entry.date)}
                        </Text>
                    </View>

                    <View style={styles.entryActionsRow}>
                        <TouchableOpacity
                            style={[styles.actionBtn, { backgroundColor: colors.background }]}
                            onPress={() => handleOpenEditModal(entry)}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="create-outline" size={15} color={colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actionBtn, { backgroundColor: isDark ? '#2D1B1B' : '#FEE2E2', marginLeft: 6 }]}
                            onPress={() => handleDeleteEntry(entry.id)}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="trash-outline" size={15} color={colors.danger} />
                        </TouchableOpacity>
                    </View>
                </View>

                <Text
                    style={[
                        styles.entryBodyText,
                        {
                            color: colors.text,
                            fontFamily: fonts.regular,
                            includeFontPadding: false,
                        },
                        isUrdu && { fontSize: 16, lineHeight: 26 },
                    ]}
                >
                    {entry.text}
                </Text>
            </View>
        );
    };

    return (
        <View style={[styles.fullContainer, { backgroundColor: colors.background }]}>
            <StatusBar style="light" />

            {/* Top Navigation Bar */}
            <SafeAreaView style={[styles.safeHeader, { backgroundColor: colors.primary }]} edges={['top']}>
                <View style={styles.headerBar}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => {
                            soundHapticService.triggerFeedback();
                            navigation.goBack();
                        }}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
                    </TouchableOpacity>

                    <Text
                        style={[
                            styles.headerTitle,
                            { fontFamily: fonts.bold, includeFontPadding: false },
                            isUrdu && { fontSize: 20 },
                        ]}
                    >
                        {isUrdu ? 'فکر و ڈائری' : 'Reflection Diary'}
                    </Text>

                    <TouchableOpacity
                        style={styles.addHeaderBtn}
                        onPress={handleOpenAddModal}
                        activeOpacity={0.8}
                    >
                        <Ionicons name="add" size={22} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Search Bar */}
                {entries.length > 0 && (
                    <View
                        style={[
                            styles.searchBox,
                            {
                                backgroundColor: colors.surface,
                                borderColor: colors.border,
                            },
                        ]}
                    >
                        <Ionicons name="search-outline" size={18} color={colors.secondaryText} style={{ marginRight: 8 }} />
                        <TextInput
                            style={[
                                styles.searchInput,
                                {
                                    color: colors.text,
                                    fontFamily: fonts.regular,
                                    includeFontPadding: false,
                                },
                                isUrdu && { textAlign: 'right' },
                            ]}
                            placeholder={isUrdu ? 'ڈائری میں تلاش کریں...' : 'Search reflections...'}
                            placeholderTextColor={colors.textPlaceholder}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Ionicons name="close-circle" size={16} color={colors.secondaryText} />
                            </TouchableOpacity>
                        )}
                    </View>
                )}

                {loading ? (
                    <View style={styles.centerContainer}>
                        <ActivityIndicator size="large" color={colors.primary} />
                    </View>
                ) : filteredEntries.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <View style={[styles.emptyIconCircle, { backgroundColor: isDark ? '#1F2C26' : '#EAF5EE' }]}>
                            <Ionicons name="journal-outline" size={44} color={colors.primary} />
                        </View>
                        <Text
                            style={[
                                styles.emptyTitle,
                                { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false },
                                isUrdu && { fontSize: 20 },
                            ]}
                        >
                            {isUrdu ? 'کوئی تحریر موجود نہیں' : 'No Reflections Yet'}
                        </Text>
                        <Text
                            style={[
                                styles.emptySubtitle,
                                { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false },
                                isUrdu && { fontSize: 15, lineHeight: 22 },
                            ]}
                        >
                            {isUrdu
                                ? 'اپنے روحانی احساسات، شکر گزاری اور روزانہ کی فکر کو محفوظ کرنے کے لیے "نئی تحریر" کا بٹن دبائیں۔'
                                : 'Record your spiritual reflections, daily thoughts, and moments of gratitude.'}
                        </Text>

                        <TouchableOpacity
                            style={[styles.primaryAddBtn, { backgroundColor: colors.primary }]}
                            onPress={handleOpenAddModal}
                            activeOpacity={0.85}
                        >
                            <Ionicons name="add-circle-outline" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                            <Text
                                style={[
                                    styles.primaryAddBtnText,
                                    { fontFamily: fonts.bold, includeFontPadding: false },
                                    isUrdu && { fontSize: 16 },
                                ]}
                            >
                                {isUrdu ? '+ نئی فکر درج کریں' : '+ Add New Reflection'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <>
                        {/* Group: Today */}
                        {grouped.today.length > 0 && (
                            <View style={styles.groupSection}>
                                <Text style={[styles.groupHeader, { color: colors.primary, fontFamily: fonts.bold }]}>
                                    {isUrdu ? 'آج کی فکر' : 'Today'}
                                </Text>
                                {grouped.today.map(renderEntryCard)}
                            </View>
                        )}

                        {/* Group: Yesterday */}
                        {grouped.yesterday.length > 0 && (
                            <View style={styles.groupSection}>
                                <Text style={[styles.groupHeader, { color: colors.primary, fontFamily: fonts.bold }]}>
                                    {isUrdu ? 'گزشتہ کل' : 'Yesterday'}
                                </Text>
                                {grouped.yesterday.map(renderEntryCard)}
                            </View>
                        )}

                        {/* Group: This Month */}
                        {grouped.thisMonth.length > 0 && (
                            <View style={styles.groupSection}>
                                <Text style={[styles.groupHeader, { color: colors.primary, fontFamily: fonts.bold }]}>
                                    {isUrdu ? 'اس ماہ کی تحاریر' : 'This Month'}
                                </Text>
                                {grouped.thisMonth.map(renderEntryCard)}
                            </View>
                        )}

                        {/* Group: Earlier */}
                        {grouped.earlier.length > 0 && (
                            <View style={styles.groupSection}>
                                <Text style={[styles.groupHeader, { color: colors.primary, fontFamily: fonts.bold }]}>
                                    {isUrdu ? 'پہلے کی یادداشتیں' : 'Earlier'}
                                </Text>
                                {grouped.earlier.map(renderEntryCard)}
                            </View>
                        )}
                    </>
                )}
            </ScrollView>

            {/* Add / Edit Reflection Modal */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View
                        style={[
                            styles.modalCard,
                            {
                                backgroundColor: colors.surface,
                                borderColor: colors.border,
                            },
                        ]}
                    >
                        {/* Modal Header */}
                        <View style={[styles.modalHeaderRow, { borderBottomColor: colors.borderLight }]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="journal" size={20} color={colors.primary} style={{ marginRight: 8 }} />
                                <Text
                                    style={[
                                        styles.modalTitle,
                                        { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false },
                                        isUrdu && { fontSize: 18 },
                                    ]}
                                >
                                    {editingEntry
                                        ? isUrdu
                                            ? 'فکر میں ترمیم کریں'
                                            : 'Edit Reflection'
                                        : isUrdu
                                        ? 'نئی فکر کا اندراج'
                                        : 'New Daily Reflection'}
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                activeOpacity={0.7}
                            >
                                <Ionicons name="close" size={22} color={colors.secondaryText} />
                            </TouchableOpacity>
                        </View>

                        {/* Date indicator */}
                        <Text style={[styles.modalDateHint, { color: colors.secondaryText, fontFamily: fonts.medium }]}>
                            {formatDateHeading(entryDate || new Date().toISOString().split('T')[0])}
                        </Text>

                        {/* Multiline Input */}
                        <TextInput
                            style={[
                                styles.modalTextInput,
                                {
                                    backgroundColor: colors.background,
                                    borderColor: colors.border,
                                    color: colors.text,
                                    fontFamily: fonts.regular,
                                },
                                isUrdu && { textAlign: 'right', fontSize: 16, lineHeight: 26 },
                            ]}
                            placeholder={
                                isUrdu
                                    ? 'آج آپ کے دل میں کیا فکر اور شکر گزاری پیدا ہوئی؟'
                                    : 'What thoughts, spiritual reflections, or moments of gratitude are on your mind today?'
                            }
                            placeholderTextColor={colors.textPlaceholder}
                            multiline
                            numberOfLines={6}
                            value={entryText}
                            onChangeText={setEntryText}
                            autoFocus
                        />

                        {/* Modal Action Buttons */}
                        <View style={styles.modalBtnRow}>
                            <TouchableOpacity
                                style={[styles.cancelBtn, { borderColor: colors.border }]}
                                onPress={() => setModalVisible(false)}
                                activeOpacity={0.7}
                            >
                                <Text style={[styles.cancelBtnText, { color: colors.secondaryText, fontFamily: fonts.semiBold }]}>
                                    {isUrdu ? 'منسوخ' : 'Cancel'}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.submitBtn, { backgroundColor: colors.primary }]}
                                onPress={handleSaveEntry}
                                disabled={saving}
                                activeOpacity={0.85}
                            >
                                {saving ? (
                                    <ActivityIndicator size="small" color="#FFFFFF" />
                                ) : (
                                    <Text style={[styles.submitBtnText, { fontFamily: fonts.bold }]}>
                                        {isUrdu ? 'محفوظ کریں' : 'Save Entry'}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    fullContainer: {
        flex: 1,
    },
    safeHeader: {
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    headerBar: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    backButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    addHeaderBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 40,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 16,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        paddingVertical: 0,
    },
    centerContainer: {
        paddingVertical: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 48,
        paddingHorizontal: 24,
    },
    emptyIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 18,
    },
    emptyTitle: {
        fontSize: 19,
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 24,
    },
    primaryAddBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        elevation: 2,
    },
    primaryAddBtnText: {
        color: '#FFFFFF',
        fontSize: 15,
    },
    groupSection: {
        marginBottom: 20,
    },
    groupHeader: {
        fontSize: 14,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        marginBottom: 10,
        marginLeft: 2,
    },
    entryCard: {
        borderWidth: 1,
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    entryHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    entryDateBadge: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    entryDateText: {
        fontSize: 13,
    },
    entryActionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    entryBodyText: {
        fontSize: 14.5,
        lineHeight: 22,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    modalCard: {
        borderWidth: 1,
        borderRadius: 18,
        padding: 20,
        maxHeight: '80%',
        elevation: 10,
    },
    modalHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 12,
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 17,
    },
    modalDateHint: {
        fontSize: 12,
        marginBottom: 12,
    },
    modalTextInput: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 14,
        fontSize: 15,
        minHeight: 140,
        textAlignVertical: 'top',
        marginBottom: 18,
    },
    modalBtnRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
    cancelBtn: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
    },
    cancelBtnText: {
        fontSize: 14,
    },
    submitBtn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
});

