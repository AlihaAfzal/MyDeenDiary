import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeColors, LIGHT_COLORS, DARK_COLORS } from '../constants/theme';

export type ThemeType = 'light' | 'dark';

interface ThemeContextValue {
    theme: ThemeType;
    isDark: boolean;
    colors: ThemeColors;
    setTheme: (mode: ThemeType) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: 'light',
    isDark: false,
    colors: LIGHT_COLORS,
    setTheme: () => {},
    toggleTheme: () => {},
});

export const THEME_STORAGE_KEY = 'userPref_theme';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setThemeState] = useState<ThemeType>('light');

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
                const legacy = await AsyncStorage.getItem('pref_theme');
                const active = (saved || legacy) as ThemeType;
                if (active === 'light' || active === 'dark') {
                    setThemeState(active);
                }
            } catch {
                // Fallback to light
            }
        };
        loadTheme();
    }, []);

    const setTheme = async (mode: ThemeType) => {
        setThemeState(mode);
        try {
            await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
            await AsyncStorage.setItem('pref_theme', mode);
        } catch {
            // Non-blocking
        }
    };

    const toggleTheme = () => {
        const next = theme === 'light' ? 'dark' : 'light';
        setTheme(next);
    };

    const isDark = theme === 'dark';
    const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

    return (
        <ThemeContext.Provider value={{ theme, isDark, colors, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);

