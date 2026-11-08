import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import {
    useFonts,
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
} from '@expo-google-fonts/plus-jakarta-sans';
import {
    NotoNastaliqUrdu_400Regular,
    NotoNastaliqUrdu_700Bold,
} from '@expo-google-fonts/noto-nastaliq-urdu';
import {
    Amiri_400Regular,
    Amiri_700Bold,
} from '@expo-google-fonts/amiri';

import SplashScreenComponent from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import DashboardScreen from './screens/DashboardScreen';
import MonthlyScreen from './screens/MonthlyScreen';
import AzkarLibraryScreen from './screens/AzkarLibraryScreen';
import ProfileScreen from './screens/ProfileScreen';
import QazaScreen from './screens/QazaScreen';
import TasbeehScreen from './screens/TasbeehScreen';
import NotificationScreen from './screens/NotificationScreen';
import ProgressScreen from './screens/ProgressScreen';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { ArabicProvider } from './context/ArabicContext';
import { requestNotificationPermissions, registerNotificationReceivedListener } from './services/notificationService';
import TasbeehIcon from './components/TasbeehIcon';

// Prevent splash screen from auto-hiding before fonts are fully loaded
SplashScreen.preventAutoHideAsync().catch(() => {});

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();
    const { t, fonts, isUrdu } = useLanguage();

    return (
        <Tab.Navigator
            id="HomeTabs"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.secondaryText,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    height: 64 + Math.max(insets.bottom, 10),
                    paddingBottom: Math.max(insets.bottom, 8),
                    paddingTop: 6,
                },
                tabBarLabelStyle: {
                    fontFamily: fonts.semiBold,
                    fontSize: isUrdu ? 13 : 11.5,
                    includeFontPadding: false,
                },
                tabBarIcon: ({ focused, color }) => {
                    const iconSize = 25;
                    if (route.name === 'Tasbeeh') {
                        return <TasbeehIcon focused={focused} color={color} size={iconSize} />;
                    }

                    let iconName: any;
                    if (route.name === 'Tracker') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Qaza') {
                        iconName = focused ? 'calendar-clear' : 'calendar-clear-outline';
                    } else if (route.name === 'Azkar') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={iconSize} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Tracker" component={DashboardScreen} options={{ tabBarLabel: t('homeTab') }} />
            <Tab.Screen name="Qaza" component={QazaScreen} options={{ tabBarLabel: t('qazaTab') }} />
            <Tab.Screen name="Tasbeeh" component={TasbeehScreen} options={{ tabBarLabel: t('tasbeehTab') }} />
            <Tab.Screen name="Azkar" component={AzkarLibraryScreen} options={{ tabBarLabel: t('azkarTab') }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: t('profileTab') }} />
        </Tab.Navigator>
    );
}

function RootNavigator() {
    const { colors } = useTheme();

    return (
        <NavigationContainer>
            <Stack.Navigator
                id="RootStack"
                initialRouteName="Splash"
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: colors.background },
                }}
            >
                <Stack.Screen name="Splash" component={SplashScreenComponent} />
                <Stack.Screen name="Onboarding" component={OnboardingScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="MainHub" component={TabNavigator} />
                <Stack.Screen name="Monthly" component={MonthlyScreen} />
                <Stack.Screen name="QazaScreen" component={QazaScreen} />
                <Stack.Screen name="TasbeehScreen" component={TasbeehScreen} />
                <Stack.Screen name="DuaScreen" component={AzkarLibraryScreen} />
                <Stack.Screen name="AzkarScreen" component={AzkarLibraryScreen} />
                <Stack.Screen name="Notification" component={NotificationScreen} />
                <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
                <Stack.Screen name="Progress" component={ProgressScreen} />
                <Stack.Screen name="ProgressScreen" component={ProgressScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    const [fontsLoaded] = useFonts({
        PlusJakartaSans_400Regular,
        PlusJakartaSans_500Medium,
        PlusJakartaSans_600SemiBold,
        PlusJakartaSans_700Bold,
        NotoNastaliqUrdu_400Regular,
        NotoNastaliqUrdu_700Bold,
        Amiri_400Regular,
        Amiri_700Bold,
        PDMS_Saleem_Quran: require('./assets/fonts/PDMS_Saleem_Quran.ttf'),
        KFGQPC_Uthman_Taha_Naskh: require('./assets/fonts/KFGQPC_Uthman_Taha_Naskh.otf'),
        Jameel_Noori_Nastaleeq: require('./assets/fonts/Jameel_Noori_Nastaleeq.ttf'),
        MehrNastaleeq: require('./assets/fonts/MehrNastaleeq.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync().catch(() => {});
        }
        requestNotificationPermissions().catch(() => {});
        const subscription = registerNotificationReceivedListener();
        return () => {
            subscription.remove();
        };
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <LanguageProvider>
                    <ArabicProvider>
                        <RootNavigator />
                    </ArabicProvider>
                </LanguageProvider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
