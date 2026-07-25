import { error } from '@sveltejs/kit';
import {createApiClient} from '$lib/api/client';
import {FullProfileResponse, TrophyProgressionPoint} from "$lib/api/ApiClient";

function groupByDate(points: TrophyProgressionPoint[]) {
    const grouped: TrophyProgressionPoint[] = [];

    for (const point of points) {
        const dateKey = new Date(point.date).toDateString();
        const last = grouped[grouped.length - 1];

        if (last && new Date(last.date).toDateString() === dateKey) {
            last.trophiesGained += point.trophiesGained;
            last.totalTrophies = point.totalTrophies;
            last.worldTitle = last.worldTitle === point.worldTitle
                ? last.worldTitle
                : `${last.worldTitle}, ${point.worldTitle}`;
        } else {
            grouped.push({ ...point });
        }
    }

    return grouped;
}

export async function load({ params }) {
    let username = params.username;
    const apiFetch = createApiClient();

    const profile = await apiFetch.profileGET(undefined, username);

    if (profile != null) {
        const trophyProgression = groupByDate(
            (await apiFetch.profileTrophyProgressionGET(profile.id!))
                .filter(p => p.trophiesGained !== 0)
        );

        return {
            profile,
            trophyProgression
        };
    }

    throw error(404, 'Not found');
}