import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TextStyle, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SupportedLanguage, TRANSLATIONS } from '../locales/translations';
import { FONTS, URDU_FONTS, URDU_FONT_SIZES, getUrduLineHeight as calcUrduLineHeight } from '../constants/theme';

export type UrduSize = 'small' | 'medium' | 'large';

export interface LanguageContextValue {
    language: SupportedLanguage;
    isUrdu: boolean;
    setLanguage: (lang: SupportedLanguage) => void;
    t: (key: string, fallback?: string) => string;
    fonts: typeof FONTS;
    urduSize: UrduSize;
    setUrduSize: (size: UrduSize) => Promise<void>;
    urduFontSize: number;
    getUrduStyle: (options?: { isMultiLine?: boolean; fontSize?: number; tightPadding?: boolean }) => TextStyle;
    getUrduLineHeight: (fontSize: number, isMultiLine?: boolean) => number | undefined;
}

export const URDU_SIZE_METRICS: Record<UrduSize, { fontSize: number; singleLineHeight: number; multiLineHeight: number }> = {
    small: { fontSize: 16, singleLineHeight: 22, multiLineHeight: 22 },
    medium: { fontSize: 20, singleLineHeight: 27, multiLineHeight: 27 },
    large: { fontSize: 26, singleLineHeight: 35, multiLineHeight: 35 },
};

const URDU_SIZE_MAP: Record<UrduSize, number> = {
    small: URDU_SIZE_METRICS.small.fontSize,
    medium: URDU_SIZE_METRICS.medium.fontSize,
    large: URDU_SIZE_METRICS.large.fontSize,
};

const LanguageContext = createContext<LanguageContextValue>({
    language: 'en',
    isUrdu: false,
    setLanguage: () => {},
    t: (k, fb) => fb || k,
    fonts: FONTS,
    urduSize: 'medium',
    setUrduSize: async () => {},
    urduFontSize: 20,
    getUrduStyle: () => ({}),
    getUrduLineHeight: () => undefined,
});

export const LANGUAGE_STORAGE_KEY = 'userPref_lang';
export const URDU_SIZE_STORAGE_KEY = 'userPref_urduSize';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguageState] = useState<SupportedLanguage>('en');
    const [urduSize, setUrduSizeState] = useState<UrduSize>('medium');

    useEffect(() => {
        const loadPreferences = async () => {
            try {
                const saved = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
                const legacy = await AsyncStorage.getItem('pref_language');
                const lang = (saved || legacy) as SupportedLanguage;
                if (lang === 'en' || lang === 'ur') {
                    setLanguageState(lang);
                }
                const savedUrduSize = await AsyncStorage.getItem(URDU_SIZE_STORAGE_KEY);
                if (savedUrduSize === 'small' || savedUrduSize === 'medium' || savedUrduSize === 'large') {
                    setUrduSizeState(savedUrduSize);
                } else {
                    const fallbackSize = await AsyncStorage.getItem('userPref_arabicSize');
                    if (fallbackSize === 'small' || fallbackSize === 'medium' || fallbackSize === 'large') {
                        setUrduSizeState(fallbackSize);
                    }
                }
            } catch {
                // Fallback to defaults
            }
        };
        loadPreferences();
    }, []);

    const setLanguage = async (lang: SupportedLanguage) => {
        setLanguageState(lang);
        try {
            await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
            await AsyncStorage.setItem('pref_language', lang);
        } catch {
            // Non-blocking
        }
    };

    const setUrduSize = async (size: UrduSize) => {
        setUrduSizeState(size);
        try {
            await AsyncStorage.setItem(URDU_SIZE_STORAGE_KEY, size);
        } catch {
            // Non-blocking
        }
    };

    const isUrdu = language === 'ur';

    const t = (key: string, fallback?: string): string => {
        const dict = TRANSLATIONS[language];
        if (dict && dict[key]) {
            return dict[key];
        }
        if (TRANSLATIONS.en[key]) {
            return TRANSLATIONS.en[key];
        }
        return fallback || key;
    };

    const fonts = isUrdu ? URDU_FONTS : FONTS;
    const urduFontSize = URDU_SIZE_MAP[urduSize] || 20;

    const getUrduStyle = (options?: { isMultiLine?: boolean; fontSize?: number; tightPadding?: boolean }): TextStyle => {
        const metrics = URDU_SIZE_METRICS[urduSize];
        const targetSize = options?.fontSize ?? metrics.fontSize;
        const isMulti = options?.isMultiLine ?? false;
        const computedLineHeight = isMulti
            ? metrics.multiLineHeight
            : metrics.singleLineHeight;

        return {
            fontFamily: 'Jameel_Noori_Nastaleeq',
            fontSize: targetSize,
            lineHeight: computedLineHeight,
            textAlign: 'right',
            writingDirection: 'rtl',
            includeFontPadding: false,
            ...(options?.tightPadding !== false ? { paddingVertical: 2 } : {}),
        };
    };

    const getUrduLineHeight = (fontSize: number, isMultiLine: boolean = false): number | undefined => {
        return calcUrduLineHeight(fontSize, isMultiLine);
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                isUrdu,
                setLanguage,
                t,
                fonts,
                urduSize,
                setUrduSize,
                urduFontSize,
                getUrduStyle,
                getUrduLineHeight,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);

