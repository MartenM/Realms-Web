<script lang="ts">
    import { minimapDialogStore } from "$lib/stores/minimapDialogStore";

    let dialog: HTMLDialogElement;

    $: if (dialog && $minimapDialogStore.isOpen) dialog.showModal();

    function closeDialog() {
        minimapDialogStore.set({ isOpen: false, worldId: null, worldName: null });
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
        bind:this={dialog}
        on:close={closeDialog}
        on:click|self={() => dialog.close()}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:click|stopPropagation>
        <div class="title">Minimap: {$minimapDialogStore.worldName}</div>
        <hr />

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
        font-family: Joystix, serif;
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
