import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, fetchWithTimeout } from './config';
import { FONTS, COLORS } from '../constants/theme';

export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        const cleanEmail = email.replace(/[\s,]/g, '').trim();
        const cleanPassword = password.replace(/\s/g, '').slice(0, 6);

        if (!cleanEmail) {
            Alert.alert('Required', 'Please provide your registered email address.');
            setErrorMessage('Please provide your registered email address.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(cleanEmail)) {
            Alert.alert('Invalid Email', 'Please provide a valid email address.');
            setErrorMessage('Please provide a valid email address.');
            return;
        }

        if (cleanPassword.length !== 6) {
            Alert.alert('Required', 'Please enter your 6-digit password.');
            setErrorMessage('Please enter your 6-digit password.');
            return;
        }

        setLoading(true);
        setErrorMessage('');

        try {
            const response = await fetchWithTimeout(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                await AsyncStorage.setItem('userEmail', cleanEmail);

                // Fetch and cache user name to eliminate dashboard name lag
                try {
                    const profRes = await fetchWithTimeout(`${API_BASE_URL}/profile/${cleanEmail}`, {}, 4000);
                    const profData = await profRes.json();
                    if (profRes.ok && profData.data?.name) {
                        await AsyncStorage.setItem('userName', profData.data.name);
                    }
                } catch {
                    // Non-blocking fallback
                }

                navigation.replace('MainHub');
            } else {
                setErrorMessage(data.detail || 'Login failed. Please verify credentials.');
            }
        } catch (error) {
            const connectionErrorMsg = API_BASE_URL.includes('onrender.com')
                ? `Unable to connect to backend server (${API_BASE_URL}). If using Render free tier, please allow ~30 seconds for initial server spin up.`
                : 'Unable to connect to backend server. Ensure backend is running and phone is connected to the same Wi-Fi network (192.168.88.55:8000).';
            setErrorMessage(connectionErrorMsg);
            Alert.alert('Connection Error', connectionErrorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.fullBackground}>
            <StatusBar style="dark" />
            <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
                <View style={styles.headerBlock}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Log in to continue your spiritual routine</Text>
                </View>

                {errorMessage !== '' && (
                    <View style={styles.errorBanner}>
                        <Ionicons name="alert-circle-outline" size={18} color={COLORS.danger} style={{ marginRight: 6 }} />
                        <Text style={styles.errorText}>{errorMessage}</Text>
                    </View>
                )}

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="example@domain.com"
                        placeholderTextColor={COLORS.textPlaceholder}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(val) => setEmail(val.replace(/[\s,]/g, ''))}
                    />

                    <Text style={styles.label}>Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Enter 6-digit password"
                            placeholderTextColor={COLORS.textPlaceholder}
                            secureTextEntry={!showPassword}
                            maxLength={6}
                            value={password}
                            onChangeText={(val) => setPassword(val.replace(/\s/g, '').slice(0, 6))}
                        />
                        <TouchableOpacity
                            style={styles.eyeBtn}
                            onPress={() => setShowPassword(!showPassword)}
                            activeOpacity={0.7}
                        >
                            <Ionicons
                                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                                size={20}
                                color={COLORS.textPlaceholder}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.forgotBtn}
                        onPress={() => navigation.navigate('ForgotPassword')}
                    >
                        <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.primaryBtn}
                        onPress={handleLogin}
                        disabled={loading}
                        activeOpacity={0.85}
                    >
                        {loading ? (
                            <ActivityIndicator color={COLORS.card} />
                        ) : (
                            <Text style={styles.primaryBtnText}>Log In</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.footerRow}>
                        <Text style={styles.footerText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.linkText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
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
    container: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    headerBlock: {
        marginBottom: 24,
        alignItems: 'center',
    },
    title: {
        fontFamily: FONTS.bold,
        fontSize: 26,
        color: COLORS.primary,
        textAlign: 'center',
        letterSpacing: 0.2,
    },
    subtitle: {
        fontFamily: FONTS.regular,
        fontSize: 14,
        color: COLORS.textMuted,
        marginTop: 4,
        textAlign: 'center',
    },
    errorBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.dangerLight,
        borderColor: COLORS.danger,
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginBottom: 16,
    },
    errorText: {
        flex: 1,
        fontFamily: FONTS.medium,
        color: COLORS.danger,
        fontSize: 13,
    },
    formContainer: {
        backgroundColor: COLORS.card,
        padding: 22,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 2,
    },
    label: {
        fontFamily: FONTS.semiBold,
        fontSize: 12,
        color: COLORS.text,
        marginBottom: 6,
    },
    input: {
        backgroundColor: COLORS.background,
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontFamily: FONTS.medium,
        fontSize: 14,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: 16,
        color: COLORS.text,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: 14,
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontFamily: FONTS.medium,
        fontSize: 14,
        color: COLORS.text,
    },
    eyeBtn: {
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    forgotBtn: {
        alignSelf: 'flex-end',
        marginBottom: 18,
    },
    forgotText: {
        fontFamily: FONTS.semiBold,
        color: COLORS.goldDark,
        fontSize: 12,
    },
    primaryBtn: {
        backgroundColor: COLORS.primary,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    primaryBtnText: {
        fontFamily: FONTS.bold,
        color: COLORS.card,
        fontSize: 15,
        letterSpacing: 0.3,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 18,
    },
    footerText: {
        fontFamily: FONTS.regular,
        fontSize: 13,
        color: COLORS.textMuted,
    },
    linkText: {
        fontFamily: FONTS.bold,
        fontSize: 13,
        color: COLORS.primary,
    },
});
