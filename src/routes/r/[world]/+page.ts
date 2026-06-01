import { error } from '@sveltejs/kit';
import { createApiClient } from '$lib/api/client';
import {ApiException, type FullWorldResponse} from '$lib/api/ApiClient';
export async function load({ params }) {
    var worldId = params.world;
    const api = createApiClient();

    try {
        const worldData: FullWorldResponse = await api.worldGET(worldId);
        return { worldData };
    } catch (err) {
        if (err instanceof ApiException) {
            if (err.status === 404) {
                throw error(404, 'The specified world could not be found...');
            }
        }
        throw error(500, 'Something went wrong internally...');
    }
};