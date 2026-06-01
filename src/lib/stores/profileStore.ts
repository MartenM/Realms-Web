import {get, writable} from 'svelte/store';
import { browser } from "$app/environment"
import { createApiClient } from '$lib/api/client';
import { SessionUpdate } from '$lib/api/ApiClient';

const loadFromStorage = function () : Profile {
    let storage = browser ? localStorage.getItem("profile") : null;
    if (storage == null || storage == 'undefined') return {
        isSimple: true,
        hasSession: false,
        username: null,
    }

    console.log("From storage: " + storage);
    return JSON.parse(storage);
}

const store = writable<Profile>(loadFromStorage(), () => {
    console.log("[ProfileStore] Subscriber")
    return () => console.log("[ProfileStore] No longer a subscriber.")
})

const storeMethods = () => {
    const { subscribe } = store;

    const updateSession = async () => {
        // Update session:
        console.log("[ProfileStore] Updating session");
        const api = createApiClient();
        const username = get(store).username ?? undefined;
        await api.sessionUsernamePOST(new SessionUpdate({ username }));
    }

    const setUsername = async (newUsername: string | null) => {
        if (newUsername?.length == 0) newUsername = null;
        if (newUsername != null) newUsername = newUsername.toUpperCase();
        store.update((state) => ({...state, username: newUsername}))

        // Update session:
        await updateSession();
    }

    store.subscribe((newProfile) => {
        if (browser) localStorage.setItem("profile", JSON.stringify(newProfile));
    })

    return {
        subscribe,
        setUsername,
        updateSession,
    }
}

export const profileStore = storeMethods();
