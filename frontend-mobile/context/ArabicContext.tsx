import React, { createContext, useContext, useState, useEffect } from 'react';
import { TextStyle, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ArabicScript = 'indopak' | 'madani';
export type ArabicSize = 'small' | 'medium' | 'large';

export interface ArabicContextType {
    arabicScript: ArabicScript;
    setArabicScript: (script: ArabicScript) => Promise<void>;
    arabicSize: ArabicSize;
    setArabicSize: (size: ArabicSize) => Promise<void>;
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
    getArabicStyle: (customFactor?: number) => TextStyle;
    urduSize: ArabicSize;
    setUrduSize: (size: ArabicSize) => Promise<void>;
    urduFontSize: number;
    getUrduStyle: (options?: { isMultiLine?: boolean; customFactor?: number; tightPadding?: boolean }) => TextStyle;
}

export const STORAGE_KEY_ARABIC_SCRIPT = 'userPref_arabicScript';
export const STORAGE_KEY_ARABIC_SIZE = 'userPref_arabicSize';
export const STORAGE_KEY_URDU_SIZE = 'userPref_urduSize';

const SCRIPT_FONT_MAP: Record<ArabicScript, string> = {
    indopak: 'PDMS_Saleem_Quran',
    madani: 'KFGQPC_Uthman_Taha_Naskh',
};

const SIZE_METRICS_MAP: Record<ArabicSize, { fontSize: number; lineHeight: number }> = {
    small: { fontSize: 24, lineHeight: 44 },
    medium: { fontSize: 30, lineHeight: 54 },
    large: { fontSize: 38, lineHeight: 68 },
};

const URDU_SIZE_METRICS_MAP: Record<ArabicSize, { fontSize: number; singleLineHeight: number; multiLineHeight: number }> = {
    small: { fontSize: 16, singleLineHeight: 22, multiLineHeight: 22 },
    medium: { fontSize: 20, singleLineHeight: 27, multiLineHeight: 27 },
    large: { fontSize: 26, singleLineHeight: 35, multiLineHeight: 35 },
};

const ArabicContext = createContext<ArabicContextType>({
    arabicScript: 'indopak',
    setArabicScript: async () => {},
    arabicSize: 'medium',
    setArabicSize: async () => {},
    urduSize: 'medium',
    setUrduSize: async () => {},
    fontFamily: 'PDMS_Saleem_Quran',
    fontSize: 30,
    lineHeight: 54,
    getArabicStyle: () => ({}),
    urduFontSize: 20,
    getUrduStyle: () => ({}),
});

export const ArabicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [arabicScript, setScriptState] = useState<ArabicScript>('indopak');
    const [arabicSize, setSizeState] = useState<ArabicSize>('medium');
    const [urduSize, setUrduSizeState] = useState<ArabicSize>('medium');

    useEffect(() => {
        const loadArabicSettings = async () => {
            try {
                const savedScript = await AsyncStorage.getItem(STORAGE_KEY_ARABIC_SCRIPT);
                if (savedScript === 'indopak' || savedScript === 'madani') {
                    setScriptState(savedScript);
                }
                const savedSize = await AsyncStorage.getItem(STORAGE_KEY_ARABIC_SIZE);
                if (savedSize === 'small' || savedSize === 'medium' || savedSize === 'large') {
                    setSizeState(savedSize);
                }
                const savedUrdu = await AsyncStorage.getItem(STORAGE_KEY_URDU_SIZE);
                if (savedUrdu === 'small' || savedUrdu === 'medium' || savedUrdu === 'large') {
                    setUrduSizeState(savedUrdu);
                } else if (savedSize === 'small' || savedSize === 'medium' || savedSize === 'large') {
                    setUrduSizeState(savedSize);
                }
            } catch {
                // Non-blocking fallback
            }
        };
        loadArabicSettings();
    }, []);

    const setArabicScript = async (script: ArabicScript) => {
        setScriptState(script);
        await AsyncStorage.setItem(STORAGE_KEY_ARABIC_SCRIPT, script).catch(() => {});
    };

    const setArabicSize = async (size: ArabicSize) => {
        setSizeState(size);
        await AsyncStorage.setItem(STORAGE_KEY_ARABIC_SIZE, size).catch(() => {});
    };

    const setUrduSize = async (size: ArabicSize) => {
        setUrduSizeState(size);
        await AsyncStorage.setItem(STORAGE_KEY_URDU_SIZE, size).catch(() => {});
    };

    const fontFamily = SCRIPT_FONT_MAP[arabicScript];
    const { fontSize, lineHeight } = SIZE_METRICS_MAP[arabicSize];
    const urduMetrics = URDU_SIZE_METRICS_MAP[urduSize];
    const urduFontSize = urduMetrics.fontSize;

    const getArabicStyle = (customFactor: number = 1): TextStyle => {
        const adjustedFontSize = Math.round(fontSize * customFactor);
        const adjustedLineHeight = Math.round(lineHeight * customFactor);

        return {
            fontFamily,
            fontSize: adjustedFontSize,
            lineHeight: adjustedLineHeight,
            paddingVertical: 10,
            textAlign: 'right',
            writingDirection: 'rtl',
            ...(Platform.OS === 'android' ? { includeFontPadding: false } : {}),
        };
    };

    const getUrduStyle = (options?: { isMultiLine?: boolean; customFactor?: number; tightPadding?: boolean }): TextStyle => {
        const factor = options?.customFactor ?? 1;
        const targetSize = Math.round(urduFontSize * factor);
        const isMulti = options?.isMultiLine ?? false;
        const computedLineHeight = isMulti
            ? Math.round(urduMetrics.multiLineHeight * factor)
            : Math.round(urduMetrics.singleLineHeight * factor);

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

    return (
        <ArabicContext.Provider
            value={{
                arabicScript,
                setArabicScript,
                arabicSize,
                setArabicSize,
                urduSize,
                setUrduSize,
                fontFamily,
                fontSize,
                lineHeight,
                getArabicStyle,
                urduFontSize,
                getUrduStyle,
            }}
        >
            {children}
        </ArabicContext.Provider>
    );
};

export const useArabic = () => useContext(ArabicContext);

