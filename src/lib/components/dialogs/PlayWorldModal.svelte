<script lang="ts">
    import { playWorldDialogStore } from "$lib/stores/playWorldDialogStore";
    import RealmDisplay from "$lib/components/realms/RealmDisplay.svelte";

    let dialog: HTMLDialogElement; // HTMLDialogElement
    $: if (dialog && $playWorldDialogStore.isOpen) {
        dialog.removeAttribute('open')
        dialog.showModal()
    }

    function closeDialog() {
        playWorldDialogStore.update((value) => ({isOpen: false, world: null, speedRecords: null}))
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

        {#if $playWorldDialogStore.world !== null}
            <RealmDisplay realmData={{world: $playWorldDialogStore.world, speedRecords: null}}/>
        {:else}
            <div class="alert alert-none">Something went horribly wrong!</div>
        {/if}

        <hr />
        <!-- svelte-ignore a11y-autofocus -->
        <button autofocus on:click={() => dialog.close()} class="btn btn-secondary">Close</button>
    </div>
</dialog>

<style>
    dialog {
        max-width: 80em;
        min-width: 40em;
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
