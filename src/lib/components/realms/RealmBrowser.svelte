<script lang="ts">
    import LoadSpinner from "$lib/components/LoadSpinner.svelte";
    import RealmBrowserEntry from "./RealmBrowserEntry.svelte";
    import {onMount} from "svelte";
    import PlayWorldModal from "./PlayWorldModal.svelte";

    export let title: string;
    export let subTitle: string;

    import {
        PUBLIC_API_URL
    } from '$env/static/public';
    export let apiUrl: string = `/api/worlds/`;

    $: fullRoute = `${PUBLIC_API_URL}${apiUrl}?limit=100`;
    
    let dataPromise: Promise<PublishedWorld[]> = new Promise(() => {});
    onMount(async () => {
        dataPromise = fetch(fullRoute, {credentials: "include"}).then((res) => res.json());
    });

    let modal = false;
    let clickedWorld: PublishedWorld | null;
    function onPlay(event: any) : void {
        clickedWorld = event.detail.world;
        modal = true;

    }
</script>

<PlayWorldModal bind:showModal={modal} world={clickedWorld}></PlayWorldModal>

<div class="realm-browser">
    <!-- Header -->
    <div class="row realm-browser-header">
        <div class="title">{title}</div>
        <div class="sub-title">{subTitle}</div>
    </div>

    <!-- Search bar -->
    <div class="row realm-filter-bar">

    </div>

    <!-- Content browser -->
    <div class="realm-browser-content">
        {#await dataPromise}
            <LoadSpinner/>
        {:then worlds}
            {#each worlds as world, index}
                <div class={index % 2 === 0 ? 'even' : 'odd'}>
                    <RealmBrowserEntry data={world} on:playWorld={onPlay}></RealmBrowserEntry>
                </div>
            {/each}
        {:catch error}
            <div class="alert alert-danger">Something went wrong while fetching the worlds.<br>{error}</div>
        {/await}
    </div>
</div>

<!--suppress CssUnusedSymbol -->
<style>
    .realm-browser {
        background-color: rgba(0, 0, 0, 0.75);
        border: 1px solid gray;
        border-radius: 1em;
        color: white;
        padding-left: 1em;
        padding-right: 1em;
    }

    .realm-browser-header .title {
        font-family: 'Joystix', serif;
        text-align: center;
        color: #ffb300;
        font-size: 2em;
    }

    .realm-browser-header .sub-title {
        text-align: center;
        color: gray;
        font-size: 1em;
    }

    .realm-browser-content {
        border: 1px solid gray;
        height: 80vh;
        overflow-y: scroll;
    }

    .even {
        background-color: #3a3a3a;

    }

    .even, .odd {
        border-bottom: 1px solid #4e4e4e;
    }

    .odd {
        background-color: #272727;
    }
</style>
