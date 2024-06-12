<script lang="ts">
    import type {HighscorePlayer} from "$lib/realmTypes";
    import {onMount} from "svelte";
    import RealmBrowserEntry from "./RealmBrowserEntry.svelte";
    import LoadSpinner from "$lib/components/LoadSpinner.svelte";
    import trophy from "$lib/images/trophy.png";
    import HighscoreEntry from "./HighscoreEntry.svelte";

    import {
        PUBLIC_API_URL
    } from '$env/static/public';

    export let apiUrl: string = `${PUBLIC_API_URL}/api/highscores/total_trophies`;

    let dataPromise: Promise<HighscorePlayer[]> = new Promise(() => {});
    onMount(async () => {
        dataPromise = fetch(apiUrl).then((res) => res.json());
    });
</script>

<div class="high-scores">
    <!-- Header -->
    {#await dataPromise}
        <LoadSpinner/>
    {:then players}
        {#each players as player, index}
            <HighscoreEntry player={player} index={index}></HighscoreEntry>
        {/each}
    {:catch error}
        <div class="alert alert-danger">Something went wrong while fetching the worlds.<br>{error}</div>
    {/await}
</div>


<style>
    .high-scores {
        max-height: 90vh;
        overflow-y: scroll;
    }
</style>