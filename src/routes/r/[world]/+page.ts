import { error } from '@sveltejs/kit';
import { createApiClient } from '$lib/api/client';
import type { FullWorldResponse } from '$lib/api/ApiClient';
import type {PageLoad} from "../../../../.svelte-kit/types/src/routes/r/[world]/$types";

export const load: PageLoad = async ({ params, fetch }) => {

    var worldId = params.world;
    const api = createApiClient({ fetch });

    try {
        const worldData: FullWorldResponse = await api.worldGET(worldId);
        return { worldData };
    } catch (err) {
        throw error(404, 'The specified world could not be found...');
    }
};