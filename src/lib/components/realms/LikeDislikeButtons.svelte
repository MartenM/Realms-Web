<script lang="ts">
    import { createApiClient } from "$lib/api/client";
    import { profileStore } from "$lib/stores/profileStore";
    import { SetWorldLikeRequest } from '$lib/api/ApiClient';
    import type { FullWorldResponse } from '$lib/api/ApiClient';

    export let world: FullWorldResponse;

    const api = createApiClient();
    let isLoading = false;

    async function setLiked(liked: boolean) {
        if (isLoading || !world.id) {
            return;
        }

        const nextLiked = world.ownLiked === liked ? undefined : liked;

        isLoading = true;
        try {
            const result = await api.worldLikePOST(world.id, new SetWorldLikeRequest({ liked: nextLiked }));
            world.ownLiked = result.liked;
            world.likes = result.likes;
            world.dislikes = result.dislikes;
            world = world;
        } catch (error) {
            console.error("Failed to update like status", error);
        } finally {
            isLoading = false;
        }
    }
</script>

<div class="button-row">
    <button
        class="btn btn-row btn-like"
        class:active={world.ownLiked === true}
        disabled={isLoading}
        on:click={() => setLiked(true)}
    >
        <i class='bx bxs-like'></i> Like
    </button>
    <div style="width: 10px"></div>
    <button
        class="btn btn-row btn-dislike"
        class:active={world.ownLiked === false}
        disabled={isLoading}
        on:click={() => setLiked(false)}
    >
        <i class='bx bxs-dislike'></i> Dislike
    </button>
</div>

<style>
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

    .btn-like, .btn-dislike {
        background-color: #5b5b5bc9;
        color: rgba(255, 255, 255, 0.79);
    }

    .btn-like:hover, .btn-dislike:hover {
        background-color: rgba(122, 122, 122, 0.79);
    }

    .btn-row:disabled {
        opacity: 0.7;
        cursor: wait;
    }

    .btn-like.active {
        background-color: rgba(46, 125, 50, 0.85);
        color: white;
        border-color: #90ee90;
    }

    .btn-like.active:hover {
        background-color: rgba(56, 145, 60, 0.9);
    }

    .btn-like.active:focus {
        box-shadow: 0 0 0 0.25rem rgba(144, 238, 144, 0.5);
    }

    .btn-dislike.active {
        background-color: rgba(183, 28, 28, 0.85);
        color: white;
        border-color: #ff8a8a;
    }

    .btn-dislike.active:hover {
        background-color: rgba(203, 38, 38, 0.9);
    }

    .btn-dislike.active:focus {
        box-shadow: 0 0 0 0.25rem rgba(255, 138, 138, 0.5);
    }
</style>
