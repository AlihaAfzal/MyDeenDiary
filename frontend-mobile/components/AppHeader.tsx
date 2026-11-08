import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface AppHeaderProps {
    title: string;
    navigation: any;
    onBack?: () => void;
}

export default function AppHeader({ title, navigation, onBack }: AppHeaderProps) {
    const { colors } = useTheme();
    const { fonts, isUrdu } = useLanguage();

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else if (navigation?.canGoBack?.()) {
            navigation.goBack();
        } else if (navigation?.navigate) {
            navigation.navigate('Tracker');
        }
    };

    return (
        <View style={[styles.headerContainer, { backgroundColor: colors.primary }]}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={handleBack}
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
                {title}
            </Text>

            <View style={styles.rightSpacer} />
        </View>
    );
}

const styles = StyleSheet.create({
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
});

