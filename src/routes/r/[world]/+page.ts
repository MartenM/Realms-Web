import { error } from '@sveltejs/kit';
import { createApiClient } from '$lib/api/client';
import type { FullWorldResponse } from '$lib/api/ApiClient';

export const load: PageLoad = async ({ params, fetch }) => {

    var worldId = params.world;
    const api = createApiClient({ fetch });
    try {
        const worldData: FullWorldResponse = await api.world(worldId);
        return { worldData };
    } catch (err) {
        throw error(404, 'The specified world could not be found...');
    }
};