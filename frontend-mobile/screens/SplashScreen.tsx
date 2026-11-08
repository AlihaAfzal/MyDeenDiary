import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FONTS, COLORS } from '../constants/theme';

export default function SplashScreen({ navigation }: any) {
    const handleProceed = async () => {
        try {
            const savedEmail = await AsyncStorage.getItem('userEmail');
            if (savedEmail && savedEmail.trim() !== '') {
                navigation.replace('MainHub');
                return;
            }
        } catch {
            // Non-blocking fallback
        }
        navigation.replace('Onboarding');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            handleProceed();
        }, 2200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <TouchableWithoutFeedback onPress={handleProceed}>
            <View style={styles.fullBackground}>
                <StatusBar style="dark" />

                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/logo.png')}
                        style={styles.logoImage}
                    />
                    <Text style={styles.appName}>My Deen Diary</Text>
                    <Text style={styles.tagline}>Your Spiritual & Routine Anchor</Text>
                </View>

                <Text style={styles.tapPrompt}>Tap anywhere to continue</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    fullBackground: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logoContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    logoImage: {
        width: 140,
        height: 140,
        resizeMode: 'contain',
        marginBottom: 18,
    },
    appName: {
        fontFamily: FONTS.bold,
        fontSize: 30,
        color: COLORS.primary,
        letterSpacing: 0.5,
    },
    tagline: {
        fontFamily: FONTS.semiBold,
        fontSize: 13,
        color: COLORS.goldDark,
        marginTop: 6,
        letterSpacing: 0.5,
    },
    tapPrompt: {
        fontFamily: FONTS.medium,
        fontSize: 12,
        color: COLORS.textPlaceholder,
        marginBottom: 35,
        letterSpacing: 0.3,
    },
});
