import { error } from '@sveltejs/kit';
import {createApiClient} from '$lib/api/client';
import {FullProfileResponse} from "$lib/api/ApiClient";

export async function load({ params }) {
    let username = params.username;
    const apiFetch = createApiClient();

    const profile = await apiFetch.profileGET(undefined, username);

    if (profile != null) {
        const trophyProgression = (await apiFetch.profileTrophyProgressionGET(profile.id!))
            .filter(p => p.trophiesGained !== 0);

        return {
            profile,
            trophyProgression
        };
    }

    throw error(404, 'Not found');
}