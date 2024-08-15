<script lang="ts">
    import type { PageData } from './$types';
    import LoadSpinner from "$lib/components/LoadSpinner.svelte";
    import MinimapView from "$lib/components/realms/MinimapView.svelte";
    import {onMount} from "svelte";

    export let data: PageData;

    import {
        PUBLIC_API_URL
    } from '$env/static/public';

    import {browser} from "$app/environment";

    let requestRealmPromise: Promise<RequestRealmResponse> = new Promise(() => {});
    onMount(async () => {
        requestRealmPromise = fetch(`${PUBLIC_API_URL}/api/world/${data.worldData.id}/play`, {method: "POST", credentials: "include"})
            .then((res) => res.json())
            .then(x => x as RequestRealmResponse)
            .catch();
    });
</script>


<div class="col-md-10">
    <div class="play-world">
        <h1 class="text-amber-400">{data.worldData.title}</h1>
        <div class="mini-map">
            <MinimapView worldId={data.worldData.id}/>
        </div>

        <hr>
        {#await requestRealmPromise}
            <LoadSpinner/>
            <div class="hint">
                <p>Realm is loading... A new tab will open in a bit.</p>
            </div>
        {:then res}
            {#if res.pixelWalkerRoomId !== null}
                <div class="hint">
                    <a href="https://pixelwalker.net/world/{res.pixelWalkerRoomId}"><div class="btn btn-play">Play!</div></a>
                </div>
            {:else}
                <div class="error-box">
                    <div class="alert alert-none">{res.errorText}</div>
                </div>
            {/if}
        {:catch error}
            <div class="error-box">
                <div class="alert alert-none">{error}</div>
            </div>
        {/await}

    </div>
</div>

<style>
    .btn-play {
        color: white;
        background-color: #e6a100;
        font-family: Joystix, serif;
        font-size: 2em;
    }

    .play-world {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        max-height: 100vh;
    }

    .hint {
        color: var(--realm-primary);
        font-family: Joystix, serif;

        background-color: var(--realm-background);
        padding: 1em;
        text-align: center;
        border-radius: 1em;

        min-width: 25vw;
    }

    .mini-map {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
    }

</style>