import { browser } from "$app/environment";
import { writable } from 'svelte/store';
import { Client, AuthenticatedDto, RequestAuthenticationDto, RefreshAuthenticationDto } from '$lib/api/ApiClient';
import { PUBLIC_API_URL } from '$env/static/public';
import type { Profile } from '../../ambient';

const STORAGE_KEY = 'realms-auth';
const REFRESH_MARGIN_MS = 30 * 1000;

const defaultProfile: Profile = {
    isAuthenticated: false,
    username: null,
    id: null,
    smiley: null,
};

type StoredAuthState = {
    jwtToken?: string | null;
    refreshToken?: string | null;
    expiresAt?: number | null;
    profile: Profile;
};

let authState: StoredAuthState = {
    jwtToken: null,
    refreshToken: null,
    expiresAt: null,
    profile: defaultProfile,
};

function decodeJwtPayload(token: string): any | null {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;

        const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const padded = payload + '==='.slice((payload.length + 3) % 4);
        const decoded = atob(padded);
        return JSON.parse(decodeURIComponent(decoded.split('').map((c) => '%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)).join('')));
    } catch {
        return null;
    }
}

function getProfileFromToken(token: string): Profile {
    const payload = decodeJwtPayload(token);
    const username = payload?.name || null;
    const id = payload?.sub || payload?.id || null;
    const smiley = payload?.smiley || null;

    return {
        isAuthenticated: !!username,
        username,
        id,
        smiley,
    };
}

function loadAuthState() {
    if (!browser) return;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const stored = JSON.parse(raw) as StoredAuthState;

        authState = {
            jwtToken: stored.jwtToken ?? null,
            refreshToken: stored.refreshToken ?? null,
            expiresAt: stored.expiresAt ?? null,
            profile: stored.profile ?? defaultProfile,
        };
    } catch {
        authState = {
            jwtToken: null,
            refreshToken: null,
            expiresAt: null,
            profile: defaultProfile,
        };
    }
}

function saveAuthState() {
    if (!browser) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authState));
}

function clearAuthState() {
    authState = {
        jwtToken: null,
        refreshToken: null,
        expiresAt: null,
        profile: defaultProfile,
    };

    saveAuthState();
    store.set(defaultProfile);
}

function updateAuthState(tokens: AuthenticatedDto) {
    authState.jwtToken = tokens.jwtToken ?? null;
    authState.refreshToken = tokens.refreshToken ?? null;
    authState.expiresAt = null;

    if (authState.jwtToken) {
        authState.profile = getProfileFromToken(authState.jwtToken);

        const payload = decodeJwtPayload(authState.jwtToken);
        if (payload?.exp) {
            authState.expiresAt = payload.exp * 1000;
        }
    } else {
        authState.profile = defaultProfile;
    }

    saveAuthState();
    store.set(authState.profile);
}

async function fetchWithoutAuth(url: RequestInfo, init?: RequestInit) {
    return browser ? window.fetch(url, init) : fetch(url, init);
}

let refreshPromise: Promise<void> | null = null;

function shouldRefreshToken(): boolean {
    if (!authState.jwtToken) return !!authState.refreshToken;
    if (!authState.expiresAt) return false;
    return authState.expiresAt - Date.now() <= REFRESH_MARGIN_MS;
}

async function refreshJwtToken() {
    if (!browser || !authState.refreshToken) {
        clearAuthState();
        return;
    }

    const client = new Client(PUBLIC_API_URL, { fetch: fetchWithoutAuth });
    const result = await client.authRefreshPOST(new RefreshAuthenticationDto({ token: authState.refreshToken }));

    if (!result || !result.jwtToken) {
        clearAuthState();
        return;
    }

    updateAuthState(result);
}

export async function ensureAuthToken(): Promise<string | null> {
    if (!browser) return null;

    if (refreshPromise) {
        await refreshPromise;
    }

    if (shouldRefreshToken()) {
        if (!refreshPromise) {
            refreshPromise = refreshJwtToken().finally(() => {
                refreshPromise = null;
            });
        }
        await refreshPromise;
    }

    return authState.jwtToken ?? null;
}

export async function authenticateWithCode(code: string) {
    if (!browser) {
        throw new Error('Authentication is only supported in the browser.');
    }

    const client = new Client(PUBLIC_API_URL, { fetch: fetchWithoutAuth });
    const result = await client.authPOST(new RequestAuthenticationDto({ code }));

    if (!result || !result.jwtToken) {
        throw new Error('Authentication failed.');
    }

    updateAuthState(result);
}

export function signOut() {
    clearAuthState();
}

loadAuthState();

const store = writable<Profile>(authState.profile);

export const profileStore = {
    subscribe: store.subscribe,
    authenticateWithCode,
    signOut,
    ensureAuthToken,
};
