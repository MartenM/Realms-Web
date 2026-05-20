import { error } from '@sveltejs/kit';
import { createApiFetch } from '$lib/api/client';

export async function load({ params }) {
    let username = params.username;
    const apiFetch = createApiFetch();

    const profile = await apiFetch(`/api/profile/?username=${username}`, { credentials: 'include' })
        .then((res) => res.json() as Promise<PlayerProfile>);

    if (profile != null) {
        return profile;
    }

    throw error(404, 'Not found');
}