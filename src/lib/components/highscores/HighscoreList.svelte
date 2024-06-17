<script lang="ts">
    import {onMount} from "svelte";
    import LoadSpinner from "$lib/components/LoadSpinner.svelte";
    import HighscoreEntry from "./HighscoreEntry.svelte";

    import {
        PUBLIC_API_URL
    } from '$env/static/public';

    export let configuration: HighscoreConfiguration = {
        apiUrl: '/api/highscores/total_trophies',
        type: 'Trophies'
    };

    $: fullRoute = `${PUBLIC_API_URL}${configuration.apiUrl}?limit=100`;

    let dataPromise: Promise<HighscorePlayer[]> = new Promise(() => {});
    onMount(async () => {
        dataPromise = fetch(fullRoute).then((res) => res.json());
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
    .high-scores {
        /*max-height: 90vh;*/
        /*overflow-y: scroll;*/
    }

    .alert-none {
        width: 100%;
        padding: 1em 0em;
        text-align: center;
        color: white;
        border: 1px solid red;

    }
</style>