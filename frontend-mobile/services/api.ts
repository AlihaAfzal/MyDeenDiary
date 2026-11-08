/**
 * Dynamic Backend API Configuration & Network Wrapper
 *
 * Production Backend: https://mydeendiary.onrender.com
 */

// Live Render.com production backend URL
export const RENDER_BACKEND_URL = 'https://mydeendiary.onrender.com';

export const API_BASE_URL =
    process.env.EXPO_PUBLIC_API_URL ||
    RENDER_BACKEND_URL ||
    'https://mydeendiary.onrender.com';

// Extended timeout (25s) for cloud backends (handles Render free tier cold-starts)
const isCloudBackend =
    API_BASE_URL.includes('onrender.com') ||
    API_BASE_URL.startsWith('https://');

export const NETWORK_TIMEOUT_MS = isCloudBackend ? 25000 : 8000;

export interface FetchOptions extends RequestInit {
    timeout?: number;
}

/**
 * Strict fetch wrapper with timeout.
 * - Local Wi-Fi: 8s timeout to fail fast on incorrect subnet.
 * - Render / Cloud: 25s timeout to gracefully allow Render free tier instances to spin up.
 */
export async function fetchWithTimeout(
    url: string,
    options: FetchOptions = {},
    customTimeoutMs?: number
): Promise<Response> {
    const timeoutMs = customTimeoutMs || options.timeout || NETWORK_TIMEOUT_MS;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, timeoutMs);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        return response;
    } catch (error: any) {
        if (error.name === 'AbortError' || error.message?.includes('aborted')) {
            throw new Error(`Network timeout (${timeoutMs}ms) exceeded connecting to ${url}`);
        }
        throw error;
    } finally {
        clearTimeout(timeoutId);
    }
}
