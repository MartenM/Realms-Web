<script lang="ts">
    import Difficulty from "$lib/components/Difficulty.svelte";
    import ProfileLink from "$lib/components/ProfileLink.svelte";
    import WorldStatsDisplay from "$lib/components/WorldStatsDisplay.svelte";
    import type { SimpleWorldResponse } from '$lib/api/ApiClient';

    export let data: SimpleWorldResponse;
    export let showWorldStats: boolean = true;
    export let showFeaturedClass: boolean = true;

    $: ratedDifficulty = data.ratedDifficulty ?? data.requestedDifficulty ?? 0;
    $: featuredLevel = data.featuredLevel ?? 0;
    $: isRated = data.ratedDifficulty != null;
    $: worldId = data.id ?? '';
</script>

<div class="realm-browser-entry" class:featured={showFeaturedClass && featuredLevel > 0}>
    <div class="rated">
        <Difficulty difficulty={ratedDifficulty} rated={isRated} featured={featuredLevel} />
    </div>
    <div class="meta-info">
        <div class="title">
            {data.title}
            {#if data.completed}
                <i class='bx bx-check completed' ></i>
            {/if}
        </div>
        <div class="owner"><ProfileLink username={data.ownerUsername}/></div>
        {#if showWorldStats}
            <WorldStatsDisplay data={data}/>
        {/if}
    </div>
    <div class="entry-buttons">
        <slot name="actions"></slot>
    </div>

    <img class="world-preview" src="/api/world/{worldId}/minimap" alt="">
</div>

<style>
    .featured {
        box-shadow: inset 10px 0 15px -10px var(--realm-primary);
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