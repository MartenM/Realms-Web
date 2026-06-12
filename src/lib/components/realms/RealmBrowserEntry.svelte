<script lang="ts">
    import { openPlayDialog } from "$lib/stores/playWorldDialogStore";
    import SimpleListWorldDisplay from "$lib/components/realms/SimpleListWorldDisplay.svelte";
    import type { SimpleWorldResponse } from '$lib/api/ApiClient';

    export let data: SimpleWorldResponse;

    function playWorld() {
        openPlayDialog(data);
    }
</script>

<SimpleListWorldDisplay data={data}>
    <button slot="actions" on:click={playWorld} class="btn btn-play">Play</button>
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
</style>