import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

import {
    PUBLIC_API_URL
} from '$env/static/public';

export const load: PageLoad = async ({ params }) => {

    var worldId = params.world;
    var worldDataRequest = await fetch(`${PUBLIC_API_URL}/api/world/${worldId}`);
    if (!worldDataRequest.ok) {
        error(404, 'Not found');
    }

    const publishedWorld: PublishedWorld = await worldDataRequest.json();

    return {
        worldData: publishedWorld,
    }
};