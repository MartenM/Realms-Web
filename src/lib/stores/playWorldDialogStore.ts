import {writable} from 'svelte/store';

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
    const response = await fetch(`${PUBLIC_API_URL}/api/world/2e3aa498-5694-4e0c-a5db-d8be3e2d69ea/speedruns?page=0&limit=100`);
    return await response.json();
}

export const loadSpeedRecords = async function (worldId: string) : Promise<void> {
    try {
        const speedRecords = await fetchSpeedRecords(worldId);
        playWorldDialogStore.update(state => ({
            ...state,
            speedRecords: speedRecords
        }));
    } catch (error) {
        console.error("Failed to fetch speed records", error);
    }
}