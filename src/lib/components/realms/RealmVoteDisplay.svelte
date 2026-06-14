<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import SimpleListWorldDisplay from "$lib/components/realms/SimpleListWorldDisplay.svelte";
    import type { SimpleWorldResponse } from '$lib/api/ApiClient';

    export let data: SimpleWorldResponse;
    export let selected: boolean = false;
    export let loading: boolean = false;
    export let disabled: boolean = false;

    const dispatch = createEventDispatcher();

    function vote() {
        dispatch('vote');
    }

    function play(id: string | undefined) {
        if (id) {
            window.location.href = `/r/${id}`;
        }
    }
</script>

<div
    class:selected={selected}
    on:click={() => play(data.id)}
    role="button"
    tabindex="0"
>
    <SimpleListWorldDisplay
        data={data}
        showWorldStats={false}
        showFeaturedClass={false}
    >
        <button
            slot="actions"
            on:click|stopPropagation={vote}
            class="btn btn-play"
            type="button"
            disabled={loading || disabled}
        >
            {#if loading}
                Saving...
            {:else if selected}
                Remove vote
            {:else}
                Vote
            {/if}
        </button>
    </SimpleListWorldDisplay>
</div>

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

    .selected {
        background: rgba(255, 179, 0, 0.08);
        border: 1px solid rgba(255, 179, 0, 0.589);
        border-radius: 0.5em;
    }
</style>