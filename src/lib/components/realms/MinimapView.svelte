<script lang="ts">
    import { afterUpdate } from 'svelte';

    export let worldId : string | null;

    import {
        PUBLIC_API_URL
    } from '$env/static/public';
    $: imageUrl = `${PUBLIC_API_URL}/api/world/${worldId}/minimap`;

    let fetchPromise : Promise<string>;
    async function fetchImage() {
        if (worldId == null) {
            throw new Error('No world ID provided.');
        }

        const response = await fetch(imageUrl);
        if (response.status === 404) {
            throw new Error("No minimap could be found 😅");
        }
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    }

    afterUpdate(() => {
        fetchPromise = fetchImage();
    });
</script>

{#await fetchPromise}
    <div class="spinner"></div>
{:then imageUrl}
    <img src={imageUrl} alt="Minimap">
{:catch error}
    {error.message}
{/await}

<style>
    img {
        width: 50%;
        image-rendering: pixelated;
    }

    .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border-left-color: #09f;
        animation: spin 1s ease infinite;
        margin: 20px auto;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>