<script lang="ts">
    import {fetchRealmPlayerComments, fetchSpeedRecords} from "$lib/stores/playWorldDialogStore";
    import { onMount } from "svelte";
    import LoadSpinner from "$lib/components/LoadSpinner.svelte";
    import Smiley from "$lib/components/Smiley.svelte";
    import Death from "$lib/images/death_icon.png";
    import InlineDifficulty from "$lib/components/InlineDifficulty.svelte";

    import easy from "$lib/images/difficulties/2.png";

    export let realmData: RealmInformation;

    let loadPromise : Promise<RealmPlayerComment[]>;

    $: playerComments = realmData.playerComments;

    onMount(() => {
        if (realmData.playerComments == null) {
            loadPromise = fetchRealmPlayerComments(realmData.world.id);
            loadPromise.then((res) => {
                realmData.playerComments = res;
            })
        }
    })
</script>

<div class="high-scores-browser">

    {#await loadPromise}
        <LoadSpinner/>
    {:then success}
        {#if playerComments != null && playerComments.length > 0}
            {#each playerComments as comment, index}
                <div class="speed-entry">
                    <Smiley id={comment.face}/>
                    <div class="stats">
                        <div class="username">{comment.playerName}</div>

                        {#if comment.suggestedRating}
                            <div class="rating">
                                <span class="stats-hint">Suggested rating:</span>
                                <InlineDifficulty difficulty={comment.suggestedRating} rated={true} featured={0} showTrophy={true}/>
                            </div>
                        {/if}

                        <div class="achievements-row">
                            {#if comment.completed}
                                <div class="achievements-row-entry completed">
                                    <i class='bx bx-check'></i>
                                    <span>Completed</span>
                                </div>
                            {/if}
                            {#if comment.completedDeathless}
                                <div class="achievements-row-entry deathless">
                                    <img src={Death} alt="Deathless"/>
                                    <span>Deathless</span>
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>

            {/each}
        {:else}
            <div style="padding: 1em; align-content: center">No user ratings yet! Use <span class="code">.rate</span> in the realm to suggest a rating.</div>
        {/if}
    {:catch error}
        <div class="error-box">
            <div class="alert alert-none">Something went wrong while attempting to fetch the time trials of this world.</div>
        </div>
    {/await}
</div>

<style>
    .error-box {
        padding: 1em;
    }

    .high-scores-browser {
        border: 1px solid gold;
        max-height: 50vh;
        overflow-y: auto;
        border-radius: 0.5em;
        background-color: #2c2c2c;
    }

    .speed-entry {
        display: flex;
        align-items: center;
        gap: 1em;
        padding: 0.75em 1em;
        transition: background-color 0.2s ease;
    }

    .speed-entry:nth-child(even) {
        background-color: #3a3a3a;
    }

    .speed-entry:nth-child(odd) {
        background-color: #454545;
    }

    .speed-entry:hover {
        background-color: #5a5a5a;
    }

    .stats {
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex: 1;
    }

    .username {
        font-family: "Joystix", serif;
        font-size: 1rem;
        color: #fff;
        margin-bottom: 4px;
    }

    .rating {
        display: flex;
        align-items: center;
        gap: 0.4em;
        margin-bottom: 6px;
    }

    .stats-hint {
        font-size: 0.85rem;
        color: #b1b1b1;
    }

    .achievements-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5em;
    }

    .achievements-row-entry {
        display: flex;
        align-items: center;
        gap: 0.3em;
        border-radius: 0.75em;
        padding: 2px 8px;
        font-size: 0.8rem;
        border: 1px solid gold;
        color: gold;
        background-color: rgba(255, 215, 0, 0.1);
    }

    .achievements-row-entry img {
        height: 14px;
        width: 14px;
    }

    .completed i {
        color: #5cff5c;
    }
</style>
