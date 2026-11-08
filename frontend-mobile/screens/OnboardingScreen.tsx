import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { FONTS, COLORS } from '../constants/theme';

export default function OnboardingScreen({ navigation }: any) {
    return (
        <View style={styles.fullBackground}>
            <StatusBar style="dark" />
            <SafeAreaView style={styles.safeContainer} edges={['top', 'left', 'right', 'bottom']}>
                <View style={styles.textContainer}>
                    <View style={styles.iconBadge}>
                        <Ionicons name="compass-outline" size={36} color={COLORS.primary} />
                    </View>
                    <Text style={styles.title}>Welcome to My Deen Diary</Text>
                    <Text style={styles.description}>
                        Bring structure and mindfulness to your daily spiritual routine. Track your obligatory prayers, maintain consistency with morning and evening Azkar, and document your personal reflections in one purposeful workspace.
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                    activeOpacity={0.85}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
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
        justifyContent: 'space-between',
        paddingHorizontal: 28,
        paddingTop: 40,
        paddingBottom: 24,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    iconBadge: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    title: {
        fontFamily: FONTS.bold,
        fontSize: 28,
        color: COLORS.primary,
        marginBottom: 16,
        letterSpacing: 0.2,
    },
    description: {
        fontFamily: FONTS.regular,
        fontSize: 15,
        color: COLORS.text,
        lineHeight: 24,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: FONTS.bold,
        color: COLORS.card,
        fontSize: 16,
        letterSpacing: 0.3,
    },
});
