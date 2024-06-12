<script lang="ts">
    import type {PublishedWorld} from "$lib/realmTypes";

    export let showModal: boolean; // boolean

    let dialog: HTMLDialogElement; // HTMLDialogElement
    export let world: PublishedWorld | null;

    $: if (dialog && showModal) dialog.showModal();
    $: if (world) lastClip = null;

    let lastClip: string | null;
    function copyToClipboard(content: string): void {
        lastClip = content;
        navigator.clipboard.writeText(content);
    }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
        bind:this={dialog}
        on:close={() => (showModal = false)}
        on:click|self={() => dialog.close()}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
        <div class="title">Play: {world?.title}</div>
        <hr />
        <ol>
            <li>Join<br><span class="code" on:click={() => copyToClipboard("https://pixelwalker.net/world/mknckr7oqxq24xa")}>https://pixelwalker.net/world/mknckr7oqxq24xa</span></li>
            <li>Paste the command <br><span class="code" on:click={() => copyToClipboard(`.join ${world?.shortHash}`)}>.join {world?.shortHash}</span></li>
            <li>Follow the instructions in the game. Enjoy!</li>
        </ol>
        {#if lastClip != null}
        <div class="clip-notify">Copied {lastClip} to clipboard!</div>
        {:else}
        <div class="clip-hint"><strong>Hint:</strong>  Click the code blocks to copy the text!</div>
        {/if}
        <hr />
        <!-- svelte-ignore a11y-autofocus -->
        <button autofocus on:click={() => dialog.close()} class="btn btn-ok">Close</button>
    </div>
</dialog>

<style>
    .btn-ok {
        color: white;
        background-color: grey;
    }

    .title {
        font-size: 1.2em;
        font-family: Joystix, Serif;
    }

    .code {
        background: black;
        border: 1px solid grey;
        border-radius: 4px;
        color: gold;
        padding-left: 10px;
        padding-right: 10px;
    }

    .clip-notify {
        font-size: 12px;
        padding: 0.5em;
        text-align: center;
        background-color: #5b5b5bc9;
        border-radius: 5px;
    }

    .clip-hint {
        font-size: 12px;
        padding: 0.5em;
        text-align: center;
        background-color: #5b5b5bc9;
        border-radius: 5px;
    }

    dialog {
        max-width: 32em;
        border-radius: 0.2em;
        border: 4px solid gold;
        padding: 0;
        color:white;
        background-color: #313131;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.6);
    }
    dialog > div {
        padding: 1em;
    }
    dialog[open] {
        animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    @keyframes zoom {
        from {
            transform: scale(0.95);
        }
        to {
            transform: scale(1);
        }
    }
    dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    }
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    button {
        display: block;
    }
</style>
