import { error } from '@sveltejs/kit';
import {createApiClient} from '$lib/api/client';
import {FullProfileResponse} from "$lib/api/ApiClient";

export async function load({ params }) {
    let username = params.username;
    const apiFetch = createApiClient();

    const profile = await apiFetch.profileGET(undefined, username);

    if (profile != null) {
        return {
            profile
        };
    }

    throw error(404, 'Not found');
}