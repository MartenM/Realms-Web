<script lang="ts">
    import { playWorldDialogStore, loadSpeedRecords } from "$lib/stores/playWorldDialogStore";
    import {onMount} from "svelte";
    import LoadSpinner from "$lib/components/LoadSpinner.svelte";
    import Smiley from "$lib/components/Smiley.svelte";


    let loadPromise : Promise<boolean>;

    $: otherRecords = $playWorldDialogStore.speedRecords?.records;
    $: ownRecord = $playWorldDialogStore.speedRecords?.ownRecord;

    onMount(() => {
        if ($playWorldDialogStore.speedRecords == null) {
            var worldId = $playWorldDialogStore.world?.id;
            if (worldId == null) return;

            loadPromise = loadSpeedRecords();
        }
    })
</script>

{#if ownRecord != null}
    <div class="self-record">Your best time: <span style="font-family: Roboto">{ownRecord.time}</span></div>
    <hr>
{/if}

<div class="high-scores-browser">

    {#await loadPromise}
        <LoadSpinner/>
    {:then success}
        {#if !success}
            <div class="alert alert-error">Something went wrong while attempting to fetch the time trails of this world.</div>
        {:else if otherRecords != null && otherRecords.length > 0}
            {#each otherRecords as record, index}
                <div class="speed-entry">
                    <div class="index">
                        <div>
                            {index + 1}.
                        </div>
                    </div>
                    <Smiley id={record.face}/>
                    <div class="stats">
                        <div>{record.username}</div>
                        <div>{record.time}</div>
                    </div>
                </div>
            {/each}
        {:else}
            <div>No runs have been completed on this map yet.</div>
        {/if}
    {:catch error}
        <div class="alert alert-danger">Something went wrong while fetching the worlds.<br>{error}</div>
    {/await}
</div>

<style>
    .self-record {
        text-align: center;
        font-family: Joystix, serif;
    }

    .high-scores-browser {
        border: 1px solid gold;
        max-height: 50vh;
        overflow-y: scroll;
        /*overflow-x: hidden;*/
    }

    .speed-entry {
        display: flex;
        flex-direction: row;

        padding: 0.5em 1em;
    }

    .index {
        display: flex;
        flex-direction: row;
        align-items: center;

        padding-right: 0.1em;

        font-family: ArcadeClassic, serif;
        font-size: 2em;
    }

    .stats {
        display: flex;
        flex-direction: column;
    }

    .stats div:nth-child(1) {
        font-family: Joystix, serif;
    }

    .stats div:nth-child(2) {
        font-family: Roboto, serif;
    }

    .high-scores-browser .speed-entry:nth-child(1) .index {
        color: gold;
    }

    .high-scores-browser .speed-entry:nth-child(2) .index {
        color: silver;
    }

    .high-scores-browser .speed-entry:nth-child(3) .index {
        color: #f17622;
    }

    .high-scores-browser .speed-entry:nth-child(even) {
        background-color: #3a3a3a;
    }

    .high-scores-browser .speed-entry:nth-child(odd) {
        background-color: #555555;
    }
</style>