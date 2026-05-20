import {get, writable} from 'svelte/store';
import type { SimpleWorldResponse } from '$lib/api/ApiClient';

import {
    PUBLIC_API_URL
} from '$env/static/public';

export interface PlayWorldDialogType {
    isOpen: boolean;
    world: SimpleWorldResponse | null;
    speedRecords: SpeedRecordResponse | null
}

export const playWorldDialogStore = writable<PlayWorldDialogType>({
    isOpen: false,
    world: null,
    speedRecords: null
});

export const openPlayDialog = function (world: SimpleWorldResponse) : void {
    playWorldDialogStore.update( (state) => ({ isOpen: true, world: world, speedRecords: null }));
}

export async function fetchSpeedRecords(worldId: string): Promise<SpeedRecordResponse> {
    // Replace with actual data fetching logic
    const response = await fetch(`${PUBLIC_API_URL}/api/world/${worldId}/speedruns?page=0&limit=100`, {credentials: "include"});
    return await response.json();
}

export async function fetchRealmPlayerComments(worldId: string): Promise<RealmPlayerComment[]> {
    // Replace with actual data fetching logic
    const response = await fetch(`${PUBLIC_API_URL}/api/world/${worldId}/comments?page=0&limit=100`, {credentials: "include"});
    return await response.json();
}

export const loadSpeedRecords = async (): Promise<boolean> => {
    const state = get(playWorldDialogStore);
    if (state.world == null) {
        console.error('World is not set in the store');
        return false;
    }

    try {
        const worldId = state.world?.id;
        if (!worldId) {
            console.error('World id is missing');
            return false;
        }
        const speedRecords = await fetchSpeedRecords(worldId);
        playWorldDialogStore.update(state => ({
            ...state,
            speedRecords: speedRecords
        }));
    } catch (error) {
        console.error("Failed to fetch speed records", error);
        throw error;
        return false;
    }

    return true;
}