<script lang="ts">
    import MinimapView from "$lib/components/realms/MinimapView.svelte";
    import DifficultyBackground from "$lib/components/realms/DifficultyBackground.svelte";
    import ProfileLink from "$lib/components/ProfileLink.svelte";
    import WorldSpeedHighscores from "$lib/components/WorldSpeedHighscores.svelte";
    import PlayRealmButton from "$lib/components/PlayRealmButton.svelte";

    export let realmData: RealmInformation
    let world = realmData.world;

    let currentSelection = "main";
    let showLegacy = false;

    let lastClip: string | null;
    function copyToClipboard(content: string): void {
        lastClip = content;
        navigator.clipboard.writeText(content);
    }

</script>

<div class="header">
    <DifficultyBackground difficulty={world.ratedDifficulty ?? null}>
        <div class="title">{world.title}</div>
    </DifficultyBackground>
    <div class="builder ">
        <span>Built by:</span>
        <span><ProfileLink username="{world.ownerUsername}" showIcon={true} >{world.ownerUsername}</ProfileLink></span>
    </div>
</div>
<hr />

<div class="content">
    <div class="navigator">
        <button class="btn-nav {(currentSelection === 'main' ? 'selected' : null)}" on:click={() => { currentSelection = "main" }}><i class='bx bx-info-square' ></i></button>
        <button class="btn-nav {(currentSelection === 'speed' ? 'selected' : null)}" on:click={() => { currentSelection = "speed" }}><i class='bx bx-stopwatch'></i></button>
    </div>
    <div>
        {#if currentSelection === "main" && world !== null}
            <div class="minimap">
                <MinimapView worldId={world?.id ?? null} />
            </div>
            <hr />
            <div>
                <PlayRealmButton worldId={world.id}/>
            </div>
            <div class="button-row">
                <button class="btn btn-row btn-share" on:click={() => copyToClipboard(`${window.location.origin}/r/${world.shortHash}`)}>Copy share URL</button>
                <div style="width: 10px"></div>
                <button class="btn btn-row btn-legacy" on:click={() => showLegacy = !showLegacy}>Legacy</button>
            </div>
            {#if showLegacy}
                <ol>
                    <li>Join<br><span class="code"><a href="https://pixelwalker.net/world/mknckr7oqxq24xa" target="_blank">https://pixelwalker.net/world/mknckr7oqxq24xa</a></span></li>
                    <li>Paste the command <br><span class="code" on:click={() => copyToClipboard(`.join ${world?.shortHash}`)}>.join {world.shortHash}</span></li>
                    <li>Follow the instructions in the game. Enjoy!</li>
                </ol>
                {#if lastClip == null}
                    <div class="clip-hint"><strong>Hint:</strong>  Click the code blocks to copy the text!</div>
                {/if}
            {/if}

            {#if lastClip != null}
                <div class="clip-notify">Copied {lastClip} to clipboard!</div>
            {/if}
        {:else}
            <WorldSpeedHighscores bind:realmData={realmData}/>
        {/if}
    </div>
</div>

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
        margin: 5px 0;
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

    .button-row {
        display: flex;
        flex-direction: row;
    }

    .btn-row {
        margin-top: 10px;
        font-size: 0.8em;
        width: 100%;
        padding: 0.5em;
    }

    .btn-legacy {
        background-color: #5b5b5bc9;
        color: rgba(156, 156, 156, 0.79);
    }

    .btn-legacy:hover {
        background-color: rgba(122, 122, 122, 0.79);
    }

    .btn-share {
        background-color: rgba(218, 136, 0, 0.79);
        color: rgba(255, 255, 255, 0.79);
    }

    .btn-share:hover {
        background-color: rgba(255, 159, 0, 0.79);
    }
</style>