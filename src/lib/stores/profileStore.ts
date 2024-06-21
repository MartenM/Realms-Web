import {get, writable} from 'svelte/store';
import { browser } from "$app/environment"

import {
    PUBLIC_API_URL
} from '$env/static/public';

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
        const res = await fetch(`${PUBLIC_API_URL}/api/session/username`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": get(store).username
            }),
            credentials: "include"
        });

        if (res.ok) {
            var data = JSON.parse(await res.json());
            console.log("Session update " + data)
        }
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
