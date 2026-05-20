<script lang="ts">
    import {onMount} from "svelte";
    import LoadSpinner from "$lib/components/LoadSpinner.svelte";
    import HighscoreEntry from "./HighscoreEntry.svelte";
    import { createApiFetch } from '$lib/api/client';
    import type { HighscoreResponse } from '$lib/api/ApiClient';

    export let configuration: HighscoreConfiguration = {
        apiUrl: '/api/highscores/trophies',
        type: 'Trophies'
    };

    const apiFetch = createApiFetch();
    $: fullRoute = `${configuration.apiUrl}?limit=100`;

    let dataPromise: Promise<HighscoreResponse[]> = new Promise(() => {});
    onMount(async () => {
        dataPromise = apiFetch(fullRoute).then((res) => res.json() as Promise<HighscoreResponse[]>);
    });
</script>

<div class="high-scores">
    <!-- Header -->
    {#await dataPromise}
        <LoadSpinner/>
    {:then players}
        {#if players.length > 0}
            {#each players as player, index}
                <HighscoreEntry player={player} index={index} highscoreType={configuration.type}></HighscoreEntry>
            {/each}
        {:else}
            <div class="alert alert-none">Not available</div>
        {/if}
    {:catch error}
        <div class="alert alert-danger">Something went wrong while fetching the worlds.<br>{error}</div>
    {/await}
</div>


<style>

</style>