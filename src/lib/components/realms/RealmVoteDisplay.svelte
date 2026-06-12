<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import SimpleListWorldDisplay from "$lib/components/realms/SimpleListWorldDisplay.svelte";
    import type { SimpleWorldResponse } from '$lib/api/ApiClient';

    export let data: SimpleWorldResponse;
    export let selected: boolean = false;
    export let loading: boolean = false;

    const dispatch = createEventDispatcher();

    function vote() {
        dispatch('vote');
    }
</script>

<SimpleListWorldDisplay data={data} selected={selected} showWorldStats={false} showFeaturedClass={false}>
    <button slot="actions" on:click={vote} class="btn btn-play" type="button" disabled={loading}>
        {#if loading}
            Saving...
        {:else if selected}
            Remove vote
        {:else}
            Vote
        {/if}
    </button>
</SimpleListWorldDisplay>

<style>
    :global(.realm-browser-entry .btn-play) {
        color: white;
        background-color: #e6a100;
        font-family: Joystix, serif;
        border: 1px solid #ffcf63;
    }

    :global(.realm-browser-entry .btn-play:hover) {
        background-color: gold;
        image-rendering: pixelated;
    }

    :global(.realm-browser-entry .btn-play:disabled) {
        opacity: 0.7;
        cursor: wait;
    }
</style>