export const FONTS = {
    regular: 'PlusJakartaSans_400Regular',
    medium: 'PlusJakartaSans_500Medium',
    semiBold: 'PlusJakartaSans_600SemiBold',
    bold: 'PlusJakartaSans_700Bold',
};

export const URDU_FONTS = {
    regular: 'Jameel_Noori_Nastaleeq',
    medium: 'Jameel_Noori_Nastaleeq',
    semiBold: 'Jameel_Noori_Nastaleeq',
    bold: 'Jameel_Noori_Nastaleeq',
};

export const ARABIC_FONTS = {
    regular: 'Amiri_400Regular',
    bold: 'Amiri_700Bold',
};

export const URDU_FONT_SIZES = {
    small: 16,
    medium: 20,
    large: 26,
};

export const getUrduLineHeight = (fontSize: number, isMultiLine: boolean = false): number | undefined => {
    return Math.round(fontSize * 1.35);
};

export const getUrduStyle = (
    fontSize: number,
    isMultiLine: boolean = false,
    tightPadding: boolean = true
) => ({
    fontFamily: 'Jameel_Noori_Nastaleeq',
    fontSize,
    lineHeight: Math.round(fontSize * 1.35),
    includeFontPadding: false,
    ...(tightPadding ? { paddingVertical: 2 } : {}),
});

export interface ThemeColors {
    background: string;
    surface: string;
    card: string;
    primary: string;
    primaryDark: string;
    primaryLight: string;
    text: string;
    secondaryText: string;
    textMuted: string;
    textPlaceholder: string;
    border: string;
    borderLight: string;
    gold: string;
    goldDark: string;
    goldLight: string;
    danger: string;
    dangerLight: string;
}

export const LIGHT_COLORS: ThemeColors = {
    background: '#F9F8F4',
    surface: '#FFFFFF',
    card: '#FFFFFF',
    primary: '#0D5C3A',
    primaryDark: '#083D26',
    primaryLight: '#EBF6F0',
    text: '#2C3E35',
    secondaryText: '#6B7280',
    textMuted: '#6B7E74',
    textPlaceholder: '#8E9AA0',
    border: '#E8ECEF',
    borderLight: '#F2EFE9',
    gold: '#DFB15B',
    goldDark: '#B08832',
    goldLight: '#FCF8EE',
    danger: '#C0392B',
    dangerLight: '#FDEDEC',
};

export const DARK_COLORS: ThemeColors = {
    background: '#121816',
    surface: '#1B2421',
    card: '#1B2421',
    primary: '#1E7E52',
    primaryDark: '#135436',
    primaryLight: '#18382B',
    text: '#F3F4F6',
    secondaryText: '#9CA3AF',
    textMuted: '#9CA3AF',
    textPlaceholder: '#6B7280',
    border: '#2A3833',
    borderLight: '#23302B',
    gold: '#E5C07B',
    goldDark: '#C99D42',
    goldLight: '#262F29',
    danger: '#E74C3C',
    dangerLight: '#3B1E1E',
};

// Default backwards compatibility
export const COLORS = LIGHT_COLORS;
