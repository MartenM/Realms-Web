<script lang="ts">
    import Difficulty from "$lib/components/Difficulty.svelte";
    import {createEventDispatcher} from "svelte";

    import { openMinimap } from "$lib/stores/minimapDialogStore";
    import { openPlayDialog } from "$lib/stores/playWorldDialogStore";

    import {
        PUBLIC_API_URL
    } from '$env/static/public';

    export let data: PublishedWorld;

    const dispatch = createEventDispatcher();

    function playWorld() {
        openPlayDialog(data);
    }

    function minimap() {
        openMinimap(data.id, data.title);
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
        <div class="owner">{data.ownerUsername}</div>
        <div class="stats">
            <div>Completions: {data.completions}</div>
            <div>Plays: {data.plays}</div>
        </div>
    </div>
    <div class="entry-buttons">
        <button on:click={playWorld} class="btn btn-play">Play</button>
    </div>
    <div class="world-preview-container">
        <img class="world-preview" src="{PUBLIC_API_URL}/api/world/{data.id}/minimap" alt="World preview">
    </div>
</div>

<style>
    .realm-browser-entry {
        overflow: hidden;
    }

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

    .world-preview-container {
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        height: 100%;
        mask-image: linear-gradient(to left, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    }

    .world-preview {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top left;
        image-rendering: pixelated;
    }

    .completed {
        color: greenyellow;
        font-weight: bold;
    }

    .realm-browser-entry {
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

    .meta-info .stats {
        display: flex;
        flex-direction: row;
        margin-top: 5px;
        font-family: ArcadeClassic, serif;
        font-size: 0.8em;
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