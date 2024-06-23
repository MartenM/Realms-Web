import { error } from '@sveltejs/kit';
import type {PlayerProfile} from "../../../../ambient";
import {
    PUBLIC_API_URL
} from '$env/static/public';

export async function load({ params }) {
    let username = params.username;

    let profile: Promise<PlayerProfile> = fetch(
        `${PUBLIC_API_URL}/api/profile/?username=${username}`,
        {credentials: "include"}).then((res) => res.json());

    if (profile != null) {
        return profile;
    }

    error(404, 'Not found');
}