<script lang="ts">
    import {fetchRealmPlayerComments, postRealmComment} from "$lib/stores/playWorldDialogStore";
    import { onMount } from "svelte";
    import LoadSpinner from "$lib/components/LoadSpinner.svelte";
    import Smiley from "$lib/components/Smiley.svelte";
    import Death from "$lib/images/death_icon.png";
    import InlineDifficulty from "$lib/components/InlineDifficulty.svelte";

    import easy from "$lib/images/difficulties/2.png";
    import ProfileLink from "$lib/components/ProfileLink.svelte";
    import { profileStore } from "$lib/stores/profileStore";
    import { extractApiErrorMessage } from "$lib/api/errors";
    import type { FullWorldResponse, WorldSpeedRecordsResponse, RealmPlayerComment } from '$lib/api/ApiClient';

    const COMMENT_MAX_LENGTH = 500;

    export let realmData: {
        world: FullWorldResponse;
        speedRecords: WorldSpeedRecordsResponse | null;
        playerComments: RealmPlayerComment[] | null;
    };

    let loadPromise : Promise<RealmPlayerComment[]>;
    let commentDraft = "";
    let isSubmitting = false;
    let submitError: string | null = null;

    $: playerComments = realmData.playerComments;

    onMount(() => {
        if (realmData.playerComments == null) {
            loadPromise = fetchRealmPlayerComments(realmData.world.id);
            loadPromise.then((res) => {
                realmData.playerComments = res;
            })
        }
    })

    async function submitComment() {
        const trimmed = commentDraft.trim();
        if (isSubmitting || trimmed.length === 0) {
            return;
        }

        isSubmitting = true;
        submitError = null;
        try {
            await postRealmComment(realmData.world.id, trimmed);
            realmData.playerComments = await fetchRealmPlayerComments(realmData.world.id);
            commentDraft = "";
        } catch (error) {
            console.error("Failed to post comment", error);
            submitError = extractApiErrorMessage(error, "Something went wrong while posting your comment.");
        } finally {
            isSubmitting = false;
        }
    }
</script>

<div class="high-scores-browser">

    {#await loadPromise}
        <LoadSpinner/>
    {:then success}
        {#if playerComments != null && playerComments.length > 0}
            {#each playerComments as comment, index}
                <div class="speed-entry">
                    <Smiley id={comment.smiley}/>
                    <div class="stats">
                        <div class="username"><ProfileLink username="{comment.playerName}"/></div>

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

                        {#if comment.comment}
                            <div class="comment-text">{comment.comment}</div>
                        {/if}
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

{#if $profileStore.isAuthenticated}
    <div class="comment-form">
        <textarea
            class="comment-input"
            placeholder="Comment on this Realm..."
            bind:value={commentDraft}
            disabled={isSubmitting}
            maxlength={COMMENT_MAX_LENGTH}
        ></textarea>
        <div class="comment-form-row">
            {#if submitError}
                <div class="comment-error">{submitError}</div>
            {/if}
            <div class="comment-char-count" class:near-limit={commentDraft.length > COMMENT_MAX_LENGTH * 0.9}>
                {commentDraft.length}/{COMMENT_MAX_LENGTH}
            </div>
            <button class="btn btn-comment" disabled={isSubmitting || commentDraft.trim().length === 0} on:click={submitComment}>
                {isSubmitting ? "Posting..." : "Post comment"}
            </button>
        </div>
    </div>
{/if}

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
        max-width: 100%;
        box-sizing: border-box;
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
        min-width: 0;
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

    .comment-text {
        margin-top: 8px;
        max-width: 100%;
        font-size: 0.85rem;
        color: #e0e0e0;
        white-space: pre-wrap;
        word-break: break-word;
        overflow-wrap: anywhere;
    }

    .comment-form {
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        margin-top: 1em;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }

    .comment-input {
        width: 100%;
        max-width: 100%;
        box-sizing: border-box;
        min-height: 4em;
        resize: vertical;
        padding: 0.5em;
        border-radius: 0.5em;
        border: 1px solid gold;
        background-color: #2c2c2c;
        color: #fff;
        font-family: inherit;
    }

    .comment-form-row {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-wrap: wrap;
        gap: 1em;
    }

    .comment-error {
        flex: 1 1 auto;
        min-width: 0;
        font-size: 0.8rem;
        color: #ff8a8a;
        word-break: break-word;
        overflow-wrap: anywhere;
    }

    .comment-char-count {
        font-size: 0.75rem;
        color: #b1b1b1;
        white-space: nowrap;
    }

    .comment-char-count.near-limit {
        color: #ffb84d;
    }

    .btn-comment {
        color: white;
        background-color: #e6a100;
        border-color: #e6a100;
        padding: 0.5em 1em;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn-comment:hover:not(:disabled) {
        background-color: gold;
        border-color: gold;
    }

    .btn-comment:focus {
        box-shadow: none;
    }

    .btn-comment:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
</style>
