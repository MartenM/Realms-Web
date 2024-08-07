<script lang="ts">
    import { playWorldDialogStore } from "$lib/stores/playWorldDialogStore";
    import MinimapView from "$lib/components/realms/MinimapView.svelte";
    import DifficultyBackground from "$lib/components/realms/DifficultyBackground.svelte";
    import ProfileLink from "$lib/components/ProfileLink.svelte";
    import WorldSpeedHighscores from "$lib/components/WorldSpeedHighscores.svelte";

    let dialog: HTMLDialogElement; // HTMLDialogElement
    $: world = $playWorldDialogStore.world;

    $: if (dialog && $playWorldDialogStore.isOpen) {
        dialog.removeAttribute('open')
        dialog.showModal()
    }
    $: if (world) lastClip = null;

    let currentSelection = "main";

    let lastClip: string | null;
    function copyToClipboard(content: string): void {
        lastClip = content;
        navigator.clipboard.writeText(content);
    }

    function closeDialog() {
        playWorldDialogStore.update((value) => ({isOpen: false, world: null, speedRecords: null}))
        currentSelection = "main";
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

        <div class="header">
            <DifficultyBackground difficulty={$playWorldDialogStore.world?.ratedDifficulty ?? null}>
                <div class="title">{world?.title}</div>
            </DifficultyBackground>
            <div class="builder ">
                <span>Built by:</span>
                <span><ProfileLink username="{world?.ownerUsername ?? 'marten'}" showIcon={true} >{world?.ownerUsername}</ProfileLink></span>
            </div>
        </div>
        <hr />

        <div class="content">
            <div class="navigator">
                <button class="btn-nav {(currentSelection === 'main' ? 'selected' : null)}" on:click={() => { currentSelection = "main" }}><i class='bx bx-info-square' ></i></button>
                <button class="btn-nav {(currentSelection === 'speed' ? 'selected' : null)}" on:click={() => { currentSelection = "speed" }}><i class='bx bx-stopwatch'></i></button>
            </div>
            <div>
                {#if currentSelection === "main"}
                    <div class="minimap">
                        <MinimapView worldId={world?.id ?? null} />
                    </div>
                    <hr />
                    <ol>
                        <li>Join<br><span class="code"><a href="https://pixelwalker.net/world/mknckr7oqxq24xa" target="_blank">https://pixelwalker.net/world/mknckr7oqxq24xa</a></span></li>
                        <li>Paste the command <br><span class="code" on:click={() => copyToClipboard(`.join ${world?.shortHash}`)}>.join {world?.shortHash}</span></li>
                        <li>Follow the instructions in the game. Enjoy!</li>
                    </ol>
                    {#if lastClip != null}
                        <div class="clip-notify">Copied {lastClip} to clipboard!</div>
                    {:else}
                        <div class="clip-hint"><strong>Hint:</strong>  Click the code blocks to copy the text!</div>
                    {/if}
                {:else}
                    <WorldSpeedHighscores/>
                {/if}
            </div>
        </div>

        <hr />
        <!-- svelte-ignore a11y-autofocus -->
        <button autofocus on:click={() => dialog.close()} class="btn btn-ok">Close</button>
    </div>
</dialog>

<style>
    a { color: inherit; }

    .minimap {
        display: flex;
        align-content: center;
        justify-content: center;
    }

    .btn-ok {
        color: white;
        background-color: grey;
    }

    .content {
        display: flex;
        flex-direction: column;
        min-height: 60vh;
    }

    .navigator {
        display: flex;
        flex-direction: row;
    }

    .btn-nav {
        flex-grow: 1;
        margin-bottom: 0.5em;
        background-color: gold;
        color: grey;
        border-color: #313131;
    }

    .selected {
        background-color: var(--realm-primary);
        color: white;
    }

    .btn-nav:hover {
        background-color: #ffdf43;
        color: white;
    }

    .header {
        text-align: center;
    }

    .title {
        font-size: 2em;
        font-family: Joystix, serif;
        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    }

    .builder {
        margin-top: 10px;
        font-size: 1em;
        font-family: Joystix, serif;
    }

    .builder span:nth-of-type(1) {
        color: white;
    }

    .builder span:nth-of-type(2) {
        color: gold;
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
