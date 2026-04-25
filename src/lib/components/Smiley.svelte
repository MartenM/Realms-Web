<script lang="ts">
    // Define a prop to receive the ID
    export let id: string;
</script>

<style>
    img {
        height: 48px;
        width: 48px;
        image-rendering: pixelated;
    }
</style>

<!-- Render the smiley image based on the ID -->
{#if id !== undefined && id !== ""}
    <img src='/image/smileys/{id}.png' alt={`Smiley ${id}`}/>
{:else}
    <img src='/image/smileys/smiley.png' alt={`Smiley smiley`}/>
{/if}
