import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { API_BASE_URL, fetchWithTimeout } from './config';
import { FONTS, COLORS } from '../constants/theme';

export default function ForgotPasswordScreen({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [step, setStep] = useState(1);
    const [infoMsg, setInfoMsg] = useState('');
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRequestOTP = async () => {
        const cleanEmail = email.replace(/[\s,]/g, '').trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

        if (!cleanEmail || !emailRegex.test(cleanEmail)) {
            setIsError(true);
            setInfoMsg('Please provide a valid account email address.');
            return;
        }

        setLoading(true);
        setInfoMsg('');
        setIsError(false);

        try {
            const response = await fetchWithTimeout(`${API_BASE_URL}/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: cleanEmail }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsError(false);
                setInfoMsg('Verification code generated. Please inspect system logs to proceed.');
                setTimeout(() => {
                    setInfoMsg('');
                    setStep(2);
                }, 1500);
            } else {
                setIsError(true);
                setInfoMsg(data.detail || 'Could not generate reset code.');
            }
        } catch {
            setIsError(true);
            setInfoMsg('Network error. Unable to reach server.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        const cleanOtp = otpCode.replace(/\D/g, '').slice(0, 6);
        if (cleanOtp.length < 6) {
            setIsError(true);
            setInfoMsg('Please enter the complete 6-digit verification code.');
            return;
        }

        setLoading(true);
        setInfoMsg('');
        setIsError(false);

        try {
            const response = await fetchWithTimeout(`${API_BASE_URL}/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email.trim(),
                    otp_code: cleanOtp,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsError(false);
                setInfoMsg('Authentication verified. Returning to login...');
                setTimeout(() => {
                    navigation.navigate('Login');
                }, 1500);
            } else {
                setIsError(true);
                setInfoMsg(data.detail || 'Invalid or expired verification code.');
            }
        } catch {
            setIsError(true);
            setInfoMsg('Network error during verification.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.fullBackground}>
            <StatusBar style="dark" />
            <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right']}>
                <Text style={styles.headerTitle}>Reset Password</Text>

                {infoMsg !== '' && (
                    <View style={[styles.msgBanner, isError ? styles.errorBanner : styles.successBanner]}>
                        <Ionicons
                            name={isError ? 'alert-circle-outline' : 'checkmark-circle-outline'}
                            size={18}
                            color={isError ? COLORS.danger : COLORS.primary}
                            style={{ marginRight: 6 }}
                        />
                        <Text style={[styles.msgBannerText, isError ? styles.errorText : styles.successText]}>
                            {infoMsg}
                        </Text>
                    </View>
                )}

                <View style={styles.cardContainer}>
                    {step === 1 ? (
                        <View>
                            <Text style={styles.subtitleText}>
                                Enter your registered email address to request a 6-digit verification code valid for 15 minutes.
                            </Text>
                            <Text style={styles.label}>Registered Email</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="name@domain.com"
                                placeholderTextColor={COLORS.textPlaceholder}
                                value={email}
                                onChangeText={(val) => setEmail(val.replace(/[\s,]/g, ''))}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <TouchableOpacity style={styles.button} onPress={handleRequestOTP} disabled={loading} activeOpacity={0.85}>
                                {loading ? (
                                    <ActivityIndicator color={COLORS.card} />
                                ) : (
                                    <Text style={styles.buttonText}>Send Verification Code</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.subtitleText}>
                                A verification code has been dispatched. Enter the 6-digit security code below.
                            </Text>
                            <Text style={styles.label}>Security Code</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="6-digit code"
                                placeholderTextColor={COLORS.textPlaceholder}
                                value={otpCode}
                                onChangeText={(val) => setOtpCode(val.replace(/\D/g, '').slice(0, 6))}
                                keyboardType="number-pad"
                                maxLength={6}
                            />
                            <TouchableOpacity style={styles.buttonGold} onPress={handleVerifyOTP} disabled={loading} activeOpacity={0.85}>
                                {loading ? (
                                    <ActivityIndicator color={COLORS.card} />
                                ) : (
                                    <Text style={styles.buttonText}>Verify & Authenticate</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}

                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backButton}>
                        <Text style={styles.backButtonText}>Cancel and Return to Login</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    fullBackground: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    safeContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    headerTitle: {
        fontFamily: FONTS.bold,
        fontSize: 24,
        color: COLORS.primary,
        marginBottom: 16,
        textAlign: 'center',
    },
    msgBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
    },
    errorBanner: {
        backgroundColor: COLORS.dangerLight,
        borderColor: COLORS.danger,
    },
    successBanner: {
        backgroundColor: COLORS.primaryLight,
        borderColor: COLORS.primary,
    },
    msgBannerText: {
        fontFamily: FONTS.medium,
        fontSize: 13,
        flex: 1,
    },
    errorText: {
        color: COLORS.danger,
    },
    successText: {
        color: COLORS.primary,
    },
    cardContainer: {
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 22,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
    },
    subtitleText: {
        fontFamily: FONTS.regular,
        fontSize: 13,
        color: COLORS.textMuted,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 19,
    },
    label: {
        fontFamily: FONTS.semiBold,
        fontSize: 12,
        color: COLORS.text,
        marginBottom: 6,
    },
    input: {
        backgroundColor: COLORS.background,
        paddingVertical: 12,
        paddingHorizontal: 14,
        borderRadius: 10,
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: COLORS.text,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonGold: {
        backgroundColor: COLORS.goldDark,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontFamily: FONTS.bold,
        color: COLORS.card,
        fontSize: 15,
        letterSpacing: 0.3,
    },
    backButton: {
        alignItems: 'center',
        marginTop: 20,
    },
    backButtonText: {
        fontFamily: FONTS.semiBold,
        color: COLORS.textPlaceholder,
        fontSize: 13,
    },
});
