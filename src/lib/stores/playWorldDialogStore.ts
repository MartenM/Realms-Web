import {get, writable} from 'svelte/store';
import { createApiClient } from '$lib/api/client';
import type { SimpleWorldResponse, WorldSpeedRecordsResponse, RealmPlayerComment } from '$lib/api/ApiClient';

export interface PlayWorldDialogType {
    isOpen: boolean;
    world: SimpleWorldResponse | null;
    speedRecords: WorldSpeedRecordsResponse | null
}

export const playWorldDialogStore = writable<PlayWorldDialogType>({
    isOpen: false,
    world: null,
    speedRecords: null
});

export const openPlayDialog = function (world: SimpleWorldResponse) : void {
    playWorldDialogStore.update( (state) => ({ isOpen: true, world: world, speedRecords: null }));
}

export async function fetchSpeedRecords(worldId: string): Promise<WorldSpeedRecordsResponse> {
    const api = createApiClient();
    return api.worldSpeedrunsGET(worldId, 0, 100);
}

export async function fetchRealmPlayerComments(worldId: string): Promise<RealmPlayerComment[]> {
    const api = createApiClient();
    return api.worldCommentsGET(worldId, 0, 100);
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