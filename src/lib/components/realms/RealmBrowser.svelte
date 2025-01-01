<script lang="ts">
    import LoadSpinner from "$lib/components/LoadSpinner.svelte";
    import RealmBrowserEntry from "./RealmBrowserEntry.svelte";
    import {onMount} from "svelte";

    export let title: string | null;
    export let subTitle: string | null;

    import {
        PUBLIC_API_URL
    } from '$env/static/public';
    export let apiUrl: string = `/api/worlds/`;
    export let extraParameters: string = "";

    let pageSize= 8;
    let currentPage = 0;
    let hasNextPage = true;
    async function nextPage() {
        currentPage++;

        doRequest();

        let results = await dataPromise;
        hasNextPage = results.length >= pageSize;
    }

    function previousPage() {
        currentPage--;

        doRequest();

        hasNextPage = true;
    }

    function doRequest() {
        let fullRoute = `${PUBLIC_API_URL}${apiUrl}?pageSize=${pageSize}&page=${currentPage}${extraParameters}`
        dataPromise = fetch(fullRoute, {credentials: "include"}).then((res) => res.json());
    }
    
    let dataPromise: Promise<PublishedWorld[]> = new Promise(() => {});
    onMount(async () => {
        doRequest();
    });

    let modal = false;
    let clickedWorld: PublishedWorld | null;
    function onPlay(event: any) : void {
        clickedWorld = event.detail.world;
        modal = true;
    }
</script>
<div class="realm-browser">
    <!-- Header -->
    <div class="row realm-browser-header">
        {#if title != null}
            <div class="title">{title}</div>
        {/if}
        {#if subTitle != null}
            <div class="sub-title">{subTitle}</div>
        {/if}
    </div>

    <!-- Content browser -->
    <div class="realm-browser-content">
        {#await dataPromise}
            <div class="d-flex justify-content-center align-items-center pagination ">
                <LoadSpinner/>
            </div>
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

    <!-- Control bar -->
    <div class="row">
        <div class="d-flex justify-content-center align-items-center pagination">
            <button class="btn navigation-button" on:click={previousPage} disabled={currentPage === 0}>◄</button>
            <div class=" current-page">{currentPage + 1}</div>
            <button class="btn navigation-button" on:click={nextPage} disabled={!hasNextPage}>►</button>
        </div>
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
        height: 70vh;
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

    .pagination {
        padding: 0.5em;
    }

    .navigation-button {
        margin: 0em 1em;
        background-color: var(--realm-primary);
    }
</style>
