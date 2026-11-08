import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { soundHapticService } from '../services/soundHapticsService';

const { width } = Dimensions.get('window');

interface WalkthroughModalProps {
    visible: boolean;
    onClose: () => void;
}

export const STORAGE_KEY_WALKTHROUGH = 'hasSeenWalkthrough';

export default function WalkthroughModal({ visible, onClose }: WalkthroughModalProps) {
    const { colors, isDark } = useTheme();
    const { isUrdu, fonts } = useLanguage();
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            icon: 'checkmark-circle-outline',
            iconColor: '#10B981',
            titleEn: 'Daily Prayers & Habits',
            titleUr: 'روزانہ کی نمازیں اور معمولات',
            descEn: 'Track your 5 daily Farz prayers, Sunnahs, and personalized spiritual habits with automatic prayer time calculations and peaceful notifications.',
            descUr: 'اپنی ۵ روزمرہ نمازیں، سنتیں، اور ذاتی معمولات وقت کی درست معلومات اور مسنون نوٹیفکیشنز کے ساتھ آسانی سے ریکارڈ کریں۔',
        },
        {
            icon: 'time-outline',
            iconColor: '#F59E0B',
            titleEn: 'Qaza Tracker & Undo Safety',
            titleUr: 'قضا نمازوں کا حساب اور واپسی کی سہولت',
            descEn: 'Calculate and log missed prayers over months or years. Unfilled indicators show pending prayers, with one-tap logging and instant Undo protection.',
            descUr: 'گزشتہ مہینوں یا سالوں کی قضا نمازوں کا خودکار حساب لگائیں۔ ایک کلک سے ادائیگی درج کریں اور غلطی کی صورت میں فوراً واپس لیں۔',
        },
        {
            icon: 'book-outline',
            iconColor: '#3B82F6',
            titleEn: 'Authentic Azkar & 365 Ayahs',
            titleUr: 'مسنون اذکار اور ۳۶۵ قرآنی آیات',
            descEn: 'Access authentic Sunnah duas (including Hardship & Anxiety) with Nastaleeq typography, plus an inspiring Quranic ayah mapped for every day of the year.',
            descUr: 'پریشانی، صبح و شام اور بعد از نماز کے مستند اذکار نستعلیق رسم الخط میں پڑھیں، اور سال کے ہر دن کیلئے منتخب قرآنی آیت سے رہنمائی حاصل کریں۔',
        },
        {
            icon: 'finger-print-outline',
            iconColor: '#8B5CF6',
            titleEn: 'Tasbeeh Counter & Reflections',
            titleUr: 'تسبیح کاؤنٹر اور فکری ڈائری',
            descEn: 'Experience natural feedback presets (Wood bead sound, Soft tap, Haptic vibration) and write daily reflections grouped chronologically.',
            descUr: 'لکڑی کے دانے اور نرم وائبریشن کے خوبصورت تاثرات کے ساتھ تسبیح پڑھیں، اور روزانہ اپنے روحانی جذبات و احساسات محفوظ کریں۔',
        },
    ];

    const handleFinish = async () => {
        soundHapticService.triggerFeedback();
        try {
            await AsyncStorage.setItem(STORAGE_KEY_WALKTHROUGH, 'true');
        } catch {
            // Non-blocking fallback
        }
        setCurrentStep(0);
        onClose();
    };

    const handleNext = () => {
        soundHapticService.triggerFeedback();
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleFinish();
        }
    };

    const handlePrev = () => {
        soundHapticService.triggerFeedback();
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const currentData = steps[currentStep];

    return (
        <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={handleFinish}>
            <View style={styles.overlay}>
                <View style={[styles.modalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    {/* Header: Skip button & Step indicator */}
                    <View style={styles.headerRow}>
                        <View style={styles.dotsRow}>
                            {steps.map((_, i) => (
                                <View
                                    key={i}
                                    style={[
                                        styles.dot,
                                        {
                                            backgroundColor: i === currentStep ? colors.primary : colors.border,
                                            width: i === currentStep ? 22 : 8,
                                        },
                                    ]}
                                />
                            ))}
                        </View>
                        <TouchableOpacity onPress={handleFinish} style={styles.skipBtn} activeOpacity={0.7}>
                            <Text style={[styles.skipBtnText, { color: colors.secondaryText, fontFamily: fonts.medium }, isUrdu && { fontSize: 13.5 }]}>
                                {isUrdu ? 'چھوڑیں' : 'Skip'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Step Icon Badge */}
                    <View style={[styles.iconWrap, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : '#F3F4F6' }]}>
                        <Ionicons name={currentData.icon as any} size={48} color={currentData.iconColor} />
                    </View>

                    {/* Step Content */}
                    <Text
                        style={[
                            styles.stepTitle,
                            { color: colors.text, fontFamily: fonts.bold, includeFontPadding: false },
                            isUrdu && { fontSize: 20, lineHeight: 28 },
                        ]}
                    >
                        {isUrdu ? currentData.titleUr : currentData.titleEn}
                    </Text>

                    <Text
                        style={[
                            styles.stepDesc,
                            { color: colors.secondaryText, fontFamily: fonts.regular, includeFontPadding: false },
                            isUrdu && { fontSize: 15, lineHeight: 22, textAlign: 'center' },
                        ]}
                    >
                        {isUrdu ? currentData.descUr : currentData.descEn}
                    </Text>

                    {/* Bottom Action Controls */}
                    <View style={styles.actionsRow}>
                        {currentStep > 0 ? (
                            <TouchableOpacity
                                style={[styles.prevBtn, { borderColor: colors.border }]}
                                onPress={handlePrev}
                                activeOpacity={0.7}
                            >
                                <Ionicons name="chevron-back" size={18} color={colors.text} style={{ marginRight: 2 }} />
                                <Text style={[styles.prevBtnText, { color: colors.text, fontFamily: fonts.semiBold }, isUrdu && { fontSize: 14 }]}>
                                    {isUrdu ? 'پیچھے' : 'Back'}
                                </Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={{ flex: 1 }} />
                        )}

                        <TouchableOpacity
                            style={[styles.nextBtn, { backgroundColor: colors.primary }]}
                            onPress={handleNext}
                            activeOpacity={0.85}
                        >
                            <Text style={[styles.nextBtnText, { fontFamily: fonts.bold, includeFontPadding: false }, isUrdu && { fontSize: 15 }]}>
                                {currentStep === steps.length - 1
                                    ? (isUrdu ? 'شروع کریں' : 'Get Started')
                                    : (isUrdu ? 'اگلا' : 'Next')}
                            </Text>
                            <Ionicons
                                name={currentStep === steps.length - 1 ? 'checkmark' : 'chevron-forward'}
                                size={18}
                                color="#FFFFFF"
                                style={{ marginLeft: 4 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalCard: {
        width: Math.min(width - 40, 380),
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 10,
    },
    headerRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    dotsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dot: {
        height: 8,
        borderRadius: 4,
    },
    skipBtn: {
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    skipBtnText: {
        fontSize: 13,
    },
    iconWrap: {
        width: 90,
        height: 90,
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 18,
    },
    stepTitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
    },
    stepDesc: {
        fontSize: 13.5,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 24,
        paddingHorizontal: 6,
    },
    actionsRow: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },
    prevBtn: {
        flex: 1,
        height: 46,
        borderRadius: 12,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    prevBtnText: {
        fontSize: 14,
    },
    nextBtn: {
        flex: 1.4,
        height: 46,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nextBtnText: {
        fontSize: 14.5,
        color: '#FFFFFF',
    },
});

