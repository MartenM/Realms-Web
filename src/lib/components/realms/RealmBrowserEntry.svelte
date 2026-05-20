<script lang="ts">
    import Difficulty from "$lib/components/Difficulty.svelte";
    import {createEventDispatcher} from "svelte";

    import { openMinimap } from "$lib/stores/minimapDialogStore";
    import { openPlayDialog } from "$lib/stores/playWorldDialogStore";

    import {
        PUBLIC_API_URL
    } from '$env/static/public';
    import UsernameBox from "../../../routes/(wide)/settings/UsernameBox.svelte";
    import ProfileLink from "$lib/components/ProfileLink.svelte";
    import WorldStatsDisplay from "$lib/components/WorldStatsDisplay.svelte";
    import type { SimpleWorldResponse } from '$lib/api/ApiClient';

    export let data: SimpleWorldResponse;

    const dispatch = createEventDispatcher();

    function playWorld() {
        openPlayDialog(data);
    }

    function minimap() {
        openMinimap(data.id, data.title);
    }

    function secondsToLength(seconds: number) {
        let minutes = 60;

        // if (seconds <= 1 * minutes) {
        //     return "very short"
        // }

        if (seconds <= 5 * minutes) {
            return "short"
        }

        if (seconds <= 15 * minutes) {
            return "normal"
        }

        if (seconds <= 25 * minutes) {
            return "long"
        }

        if (seconds <= 35 * minutes) {
            return "very long"
        }

        return "MARATHON";
    }
</script>

<div class="realm-browser-entry" class:featured={data.featuredLevel > 0}>
    <div class="rated">
        <Difficulty difficulty={data.ratedDifficulty ?? data.requestedDifficulty} rated={data.ratedDifficulty != null} featured={data.featuredLevel} />
    </div>
    <div class="meta-info">
        <div class="title">
            {data.title}
            {#if data.completed}
                <i class='bx bx-check completed' ></i>
            {/if}
        </div>
        <div class="owner"><ProfileLink username="{data.ownerUsername}"/></div>
        <WorldStatsDisplay data={data}/>
    </div>
    <div class="entry-buttons">
        <button on:click={playWorld} class="btn btn-play">Play</button>
    </div>

    <img class="world-preview" src="{PUBLIC_API_URL}/api/world/{data.id}/minimap" alt="">
</div>

<style>
    .featured {
        box-shadow: inset 10px 0 15px -10px var(--realm-primary); /* Inset shadow on the left */
    }

    .btn-play {
        color: white;
        background-color: #e6a100;
        font-family: Joystix, serif;
        border: 1px solid #ffcf63;
    }

    .btn-play:hover {
        background-color: gold;

        image-rendering: pixelated;
    }

    .world-preview {
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        image-rendering: pixelated;

        mask-image: linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    }

    .completed {
        color: greenyellow;
        font-weight: bold;
    }

    .realm-browser-entry {
        overflow: hidden;
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: 0.5em 1em;
        position: relative;
    }

    .meta-info {
        flex-grow: 2;
        padding-left: 0.5em;
        padding-right: 1em;
    }

    .meta-info .title {
        font-family: Kongtext, serif;
        font-size: 1em;
    }

    .meta-info .owner {
        font-family: Kongtext, serif;
        font-size: 0.5em;
    }

    .meta-info div {
        margin-right: 10px;
    }

    .rated  {
        flex-shrink: 0;
    }

    .entry-buttons {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        margin-left: 10px;

        z-index: 50;
    }
</style>