<script lang="ts">
    import Difficulty from "$lib/components/Difficulty.svelte";
    import {createEventDispatcher} from "svelte";

    export let data: PublishedWorld;

    const dispatch = createEventDispatcher();

    function playWorld() {
        dispatch("playWorld", {
            world: data
        })
    }
</script>

<div class="realm-browser-entry">
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
    <div class="play-button">
        <button on:click={() => (playWorld())} class="btn btn-play">Play</button>
    </div>
</div>

<style>
    .btn-play {
        color: white;
        background-color: #e6a100;
        font-family: Joystix, serif;
    }

    .completed {
        color: greenyellow;
        font-weight: bold;
    }


    .btn-play:hover {
        background-color: gold;
    }

    .realm-browser-entry {
        display: flex;
        flex-direction: row;
        width: 100%;
        padding: 0.5em 1em;
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

    .play-button {
        flex-shrink: 0;
    }

    .rated  {
        flex-shrink: 0;
    }

    .play-button {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>