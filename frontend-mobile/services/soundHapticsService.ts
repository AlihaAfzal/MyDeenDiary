import { Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEY_HAPTICS = 'userPref_haptics';
export const STORAGE_KEY_SOUND = 'userPref_sound';
export const STORAGE_KEY_REMINDER_SOUND = 'userPref_reminderSound';
export const STORAGE_KEY_SOUND_PRESET = 'userPref_soundPreset';

export type SoundPreset = 'wood' | 'soft' | 'haptic';

let audioPlayerInstance: any = null;

function getClickAudioPlayer() {
    if (!audioPlayerInstance) {
        try {
            const { createAudioPlayer } = require('expo-audio');
            audioPlayerInstance = createAudioPlayer(require('../assets/sounds/click.wav'));
        } catch {
            audioPlayerInstance = null;
        }
    }
    return audioPlayerInstance;
}

export const soundHapticService = {
    async getHapticsEnabled(): Promise<boolean> {
        try {
            const val = await AsyncStorage.getItem(STORAGE_KEY_HAPTICS);
            const legacy = await AsyncStorage.getItem('pref_haptics');
            if (val !== null) return val === 'true';
            if (legacy !== null) return legacy === 'true';
            return true; // default ON
        } catch {
            return true;
        }
    },

    async setHapticsEnabled(enabled: boolean): Promise<void> {
        await AsyncStorage.setItem(STORAGE_KEY_HAPTICS, enabled.toString());
        await AsyncStorage.setItem('pref_haptics', enabled.toString());
    },

    async getSoundEnabled(): Promise<boolean> {
        try {
            const val = await AsyncStorage.getItem(STORAGE_KEY_SOUND);
            if (val !== null) return val === 'true';
            return true; // default ON
        } catch {
            return true;
        }
    },

    async setSoundEnabled(enabled: boolean): Promise<void> {
        await AsyncStorage.setItem(STORAGE_KEY_SOUND, enabled.toString());
    },

    async getReminderSoundEnabled(): Promise<boolean> {
        try {
            const val = await AsyncStorage.getItem(STORAGE_KEY_REMINDER_SOUND);
            if (val !== null) return val === 'true';
            return true; // default ON
        } catch {
            return true;
        }
    },

    async setReminderSoundEnabled(enabled: boolean): Promise<void> {
        await AsyncStorage.setItem(STORAGE_KEY_REMINDER_SOUND, enabled.toString());
    },

    async triggerHaptic(pattern: number | number[] = 35): Promise<void> {
        const enabled = await this.getHapticsEnabled();
        if (enabled) {
            try {
                Vibration.vibrate(pattern);
            } catch {
                // Non-blocking fallback
            }
        }
    },

    async playClick(): Promise<void> {
        const enabled = await this.getSoundEnabled();
        if (!enabled) return;

        try {
            const player = getClickAudioPlayer();
            if (player) {
                if (typeof player.seekTo === 'function') {
                    player.seekTo(0);
                }
                player.play();
                return;
            }
        } catch {
            // Non-blocking fallback
        }

        try {
            Vibration.vibrate(15);
        } catch {
            // Non-blocking fallback
        }
    },

    async triggerFeedback(hapticPattern: number | number[] = 35): Promise<void> {
        const hapticOn = await this.getHapticsEnabled();
        const soundOn = await this.getSoundEnabled();

        if (hapticOn) {
            try {
                Vibration.vibrate(hapticPattern);
            } catch {
                // Non-blocking fallback
            }
        } else if (soundOn) {
            try {
                Vibration.vibrate(10);
            } catch {
                // Non-blocking fallback
            }
        }
    },

    async getSoundPreset(): Promise<SoundPreset> {
        try {
            const val = await AsyncStorage.getItem(STORAGE_KEY_SOUND_PRESET);
            if (val === 'wood' || val === 'soft' || val === 'haptic') {
                return val;
            }
            return 'wood';
        } catch {
            return 'wood';
        }
    },

    async setSoundPreset(preset: SoundPreset): Promise<void> {
        await AsyncStorage.setItem(STORAGE_KEY_SOUND_PRESET, preset);
    },

    async playTasbeehFeedback(): Promise<void> {
        const preset = await this.getSoundPreset();
        const soundOn = await this.getSoundEnabled();
        const hapticOn = await this.getHapticsEnabled();

        if (preset === 'haptic') {
            if (hapticOn) {
                try {
                    Vibration.vibrate(30);
                } catch {
                    // Non-blocking fallback
                }
            }
            return;
        }

        if (preset === 'soft') {
            if (hapticOn) {
                try {
                    Vibration.vibrate(12);
                } catch {
                    // Non-blocking fallback
                }
            }
            return;
        }

        // 'wood' bead preset: audio click + gentle bead vibration
        if (soundOn) {
            try {
                const player = getClickAudioPlayer();
                if (player) {
                    if (typeof player.seekTo === 'function') {
                        player.seekTo(0);
                    }
                    player.play();
                }
            } catch {
                // Non-blocking fallback
            }
        }
        if (hapticOn) {
            try {
                Vibration.vibrate(18);
            } catch {
                // Non-blocking fallback
            }
        }
    },
};
