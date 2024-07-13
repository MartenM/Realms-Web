import {get, writable} from 'svelte/store';

import {
    PUBLIC_API_URL
} from '$env/static/public';

export interface PlayWorldDialogType {
    isOpen: boolean;
    world: PublishedWorld | null;
    speedRecords: SpeedRecordResponse | null
}

export const playWorldDialogStore = writable<PlayWorldDialogType>({
    isOpen: false,
    world: null,
    speedRecords: null
});

export const openPlayDialog = function (world: PublishedWorld) : void {
    playWorldDialogStore.update( (state) => ({ isOpen: true, world: world, speedRecords: null }));
}

async function fetchSpeedRecords(worldId: string): Promise<SpeedRecordResponse> {
    // Replace with actual data fetching logic
    const response = await fetch(`${PUBLIC_API_URL}/api/world/${worldId}/speedruns?page=0&limit=100`, {credentials: "include"});
    return await response.json();
}

export const loadSpeedRecords = async (): Promise<boolean> => {
    const state = get(playWorldDialogStore);
    if (state.world == null) {
        console.error('World is not set in the store');
        return false;
    }

    try {
        const speedRecords = await fetchSpeedRecords(state.world?.id);
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