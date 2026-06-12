<script lang="ts">
    import { createApiClient } from "$lib/api/client";
    import { profileStore } from "$lib/stores/profileStore";
    import type { AvailableVoteWorlds, SimpleWorldResponse } from "$lib/api/ApiClient";
    import RealmLink from "$lib/components/RealmLink.svelte";
    import ProfileLink from "$lib/components/ProfileLink.svelte";
    import InlineDifficulty from "$lib/components/InlineDifficulty.svelte";

    const api = createApiClient();

    let voteData: AvailableVoteWorlds | null = null;
    let maxVotes = 0;
    let loading = false;
    let loadingWorldId: string | null = null;
    let hasLoaded = false;
    let errorMessage = '';
    let statusMessage = '';
    let votedWorldIds = new Set<string>();
    let worlds: SimpleWorldResponse[] = [];
    let votesUsed = 0;

    $: votedWorldIds = new Set(voteData?.existingVotes ?? []);
    $: worlds = (voteData?.worlds ?? []).slice().sort((left, right) => {
        const leftVoted = votedWorldIds.has(left.id ?? '');
        const rightVoted = votedWorldIds.has(right.id ?? '');

        if (leftVoted === rightVoted) {
            return (right.likes ?? 0) - (left.likes ?? 0);
        }

        return leftVoted ? -1 : 1;
    });
    $: votesUsed = voteData?.existingVotes?.length ?? 0;

    async function loadVoteData() {
        if (!$profileStore.isAuthenticated) {
            return;
        }

        hasLoaded = true;
        loading = true;
        errorMessage = '';

        try {
            const [votes, max] = await Promise.all([
                api.votesGET(),
                api.votesMaxGET(),
            ]);

            voteData = votes;
            maxVotes = max;
        } catch (error) {
            errorMessage = error instanceof Error ? error.message : 'Unable to load vote data.';
        } finally {
            loading = false;
        }
    }

    async function castVote(world: SimpleWorldResponse) {
        const worldId = world.id;

        if (!worldId) {
            return;
        }

        loadingWorldId = worldId;
        errorMessage = '';
        statusMessage = '';

        try {
            const nowVoted = await api.votesPOST(worldId);

            statusMessage = nowVoted
                ? `Vote saved for ${world.title ?? 'this world'}.`
                : `Vote removed for ${world.title ?? 'this world'}.`;

            await loadVoteData();
        } catch (error) {
            errorMessage = error instanceof Error ? error.message : 'Unable to update your vote.';
        } finally {
            loadingWorldId = null;
        }
    }

    $: if (!$profileStore.isAuthenticated) {
        voteData = null;
        maxVotes = 0;
        loading = false;
        hasLoaded = false;
        errorMessage = '';
        statusMessage = '';
    }

    $: if ($profileStore.isAuthenticated && !hasLoaded && !loading) {
        void loadVoteData();
    }
</script>

<svelte:head>
    <title>PixelWalker | Vote</title>
    <meta name="description" content="Vote on available worlds" />
</svelte:head>

<div class="realm-box vote-page">
    <div class="page-header">
        <div>
            <h2>Vote</h2>
            <p>Choose the worlds you want to vote for. You can change your vote at any time.</p>
        </div>
        <div class="vote-summary">
            <span class="summary-label">Votes used</span>
            <span class="summary-value">{votesUsed} / {maxVotes}</span>
        </div>
    </div>

    {#if !$profileStore.isAuthenticated}
        <div class="auth-callout">
            <div>
                <strong>Authentication required.</strong>
                <div>Authenticate your profile in settings to cast votes.</div>
            </div>
            <a class="settings-link" href="/settings">Go to settings</a>
        </div>
    {:else if loading && !voteData}
        <div class="state state-loading">Loading worlds...</div>
    {:else if errorMessage && !voteData}
        <div class="state state-error">{errorMessage}</div>
        <button class="refresh-button" type="button" on:click={() => void loadVoteData()}>Retry</button>
    {:else}
        {#if errorMessage}
            <div class="state state-error">{errorMessage}</div>
        {/if}

        {#if statusMessage}
            <div class="state state-success">{statusMessage}</div>
        {/if}

        <div class="world-list">
            {#each worlds as world, index}
                <article class:active={votedWorldIds.has(world.id ?? '')} class="world-card">
                    <div class="world-main">
                        <div class="world-title-row">
                            <h5><RealmLink realmId={world.id ?? world.shortHash ?? ''} realmName={world.title ?? 'Untitled world'} /></h5>
                            {#if votedWorldIds.has(world.id ?? '')}
                                <span class="vote-pill">Voted</span>
                            {/if}
                        </div>

                        <div class="world-meta">
                            <span>By: <ProfileLink username={world.ownerUsername} /></span>
                            <span><InlineDifficulty difficulty={world.ratedDifficulty ?? world.requestedDifficulty ?? 0} featured={world.featuredLevel ?? 0} rated={world.ratedDifficulty != null} /></span>
                        </div>
                    </div>

                    <div class="world-action">
                        <button
                            class="vote-button"
                            type="button"
                            disabled={loadingWorldId === (world.id ?? null)}
                            on:click={() => castVote(world)}
                        >
                            {#if loadingWorldId === (world.id ?? null)}
                                Saving...
                            {:else if votedWorldIds.has(world.id ?? '')}
                                Remove vote
                            {:else}
                                Vote
                            {/if}
                        </button>
                    </div>
                </article>
            {/each}
        </div>

        {#if worlds.length === 0}
            <div class="state state-empty">No worlds are currently available for voting.</div>
        {/if}
    {/if}
</div>

<style>
    .vote-page {
        padding: 1.5rem;
        gap: 1rem;
    }

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .lead {
        margin: 0.25rem 0 0;
        color: #d0d0d0;
    }

    .vote-summary {
        min-width: 9rem;
        padding: 0.75rem 1rem;
        border-radius: 0.85rem;
        background: rgba(255, 179, 0, 0.12);
        border: 1px solid rgba(255, 179, 0, 0.25);
        text-align: right;
    }

    .summary-label {
        display: block;
        font-size: 0.8rem;
        color: #d9c089;
        text-transform: uppercase;
        letter-spacing: 0.08em;
    }

    .summary-value {
        font-family: Joystix, serif;
        font-size: 1.1rem;
        color: white;
    }

    .auth-callout {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-radius: 0.9rem;
        border: 1px solid rgba(255, 215, 0, 0.35);
        background: rgba(0, 0, 0, 0.35);
    }

    .settings-link,
    .settings-link:hover {
        color: #111;
        text-decoration: none;
        background: var(--realm-primary);
        padding: 0.65rem 1rem;
        border-radius: 0.75rem;
        font-weight: 700;
    }

    .world-list {
        display: grid;
        gap: 0.9rem;
    }

    .world-card {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        padding: 1rem;
        border-radius: 1rem;
        background: rgba(0, 0, 0, 0.28);
        border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .world-card.active {
        border-color: rgba(255, 179, 0, 0.45);
        box-shadow: 0 0 0 1px rgba(255, 179, 0, 0.08) inset;
    }

    .world-main {
        flex: 1;
        min-width: 0;
    }

    .world-title-row {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex-wrap: wrap;
    }

    .world-title-row h3 {
        margin: 0;
    }

    .vote-pill {
        display: inline-flex;
        align-items: center;
        padding: 0.2rem 0.55rem;
        border-radius: 999px;
        background: rgba(255, 179, 0, 0.16);
        border: 1px solid rgba(255, 179, 0, 0.3);
        color: #ffdd8a;
        font-size: 0.8rem;
    }

    .world-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 0.85rem;
        margin-top: 0.55rem;
        color: #d1d1d1;
        font-size: 0.95rem;
    }

    .world-action {
        display: flex;
        align-items: center;
    }

    .vote-button,
    .refresh-button {
        border: none;
        border-radius: 0.75rem;
        padding: 0.7rem 1rem;
        font-family: Joystix, serif;
        background: var(--realm-primary);
        color: #111;
        font-weight: 700;
        white-space: nowrap;
    }

    .vote-button:disabled {
        opacity: 0.7;
        cursor: wait;
    }

    .state {
        padding: 0.9rem 1rem;
        border-radius: 0.85rem;
        border: 1px solid rgba(255, 255, 255, 0.12);
    }

    .state-loading,
    .state-empty {
        background: rgba(255, 255, 255, 0.04);
    }

    .state-error {
        background: rgba(124, 0, 0, 0.35);
        border-color: rgba(255, 80, 80, 0.35);
    }

    .state-success {
        background: rgba(0, 92, 35, 0.35);
        border-color: rgba(95, 255, 160, 0.35);
    }

    @media (max-width: 768px) {
        .auth-callout,
        .world-card {
            flex-direction: column;
            align-items: stretch;
        }

        .vote-summary {
            text-align: left;
        }
    }
</style>