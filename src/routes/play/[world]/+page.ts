import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { createApiClient } from '$lib/api/client';
import type { FullWorldResponse } from '$lib/api/ApiClient';

export const load: PageLoad = async ({ params, fetch }) => {

    const worldId = params.world;
    const api = createApiClient({ fetch });
    try {
        const worldData: FullWorldResponse = await api.world(worldId);
        return { worldData };
    } catch (err) {
        throw error(404, 'Not found');
    }
};