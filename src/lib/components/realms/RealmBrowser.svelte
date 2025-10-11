<script lang="ts">
    import LoadSpinner from "$lib/components/LoadSpinner.svelte";
    import RealmBrowserEntry from "./RealmBrowserEntry.svelte";
    import {onMount} from "svelte";
    import {fade} from "svelte/transition"

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
    <div class="realm-browser-content" transition:fade>
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
        background: linear-gradient(180deg, rgba(20, 20, 20, 0.95), rgba(10, 10, 10, 0.95));
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 1rem;
        color: #f5f5f5;
        padding: 0rem 1rem 1rem 1rem;
        box-shadow: 0 0 24px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(6px);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        transition: all 0.3s ease;
    }

    /* Header */
    .realm-browser-header {
        text-align: center;
        margin-bottom: 0.5rem;
    }

    .realm-browser-header .title {
        font-family: 'Joystix', serif;
        color: var(--realm-primary);
        font-size: 2rem;
        letter-spacing: 1px;
        text-shadow: 0 0 4px rgba(255, 204, 51, 0.4);
    }

    .realm-browser-header .sub-title {
        color: #aaa;
        font-size: 1rem;
    }

    /* Content area */
    .realm-browser-content {
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 0.5rem;
        height: 65vh;
        overflow-y: auto;
        background-color: rgba(25, 25, 25, 0.85);
        scrollbar-width: thin;
        scrollbar-color: #555 #222;
    }

    .realm-browser-content::-webkit-scrollbar {
        width: 8px;
    }
    .realm-browser-content::-webkit-scrollbar-track {
        background: #1a1a1a;
    }
    .realm-browser-content::-webkit-scrollbar-thumb {
        background-color: #444;
        border-radius: 4px;
    }

    /* Alternating row backgrounds */
    .even {
        background-color: rgba(30, 30, 30, 0.9);
    }

    .odd {
        background-color: rgba(40, 40, 40, 0.9);
    }

    .even, .odd {
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        transition: background-color 0.2s ease;
    }

    .even:hover, .odd:hover {
        background-color: rgba(80, 80, 80, 0.2);
    }

    /* Pagination */
    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin-top: 0.75rem;
    }

    .navigation-button {
        background-color: var(--realm-primary, #ffb300);
        color: #000;
        border: none;
        border-radius: 50%;
        width: 2.5rem;
        height: 2.5rem;
        font-weight: bold;
        transition: all 0.2s ease;
        box-shadow: 0 0 6px rgba(255, 179, 0, 0.4);
    }

    .navigation-button:hover:not(:disabled) {
        transform: scale(1.1);
        background-color: #ffd54f;
        box-shadow: 0 0 12px rgba(255, 210, 77, 0.6);
    }

    .navigation-button:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

    .current-page {
        font-size: 1.1rem;
        font-weight: 600;
        color: #ffb300;
        min-width: 2rem;
        text-align: center;
    }

    /* Spinner container */
    .realm-browser-content .pagination {
        height: 100%;
    }


    /* Responsive */
    @media (max-width: 768px) {
        .realm-browser {
            padding: 1rem;
        }

        .realm-browser-header .title {
            font-size: 1.5rem;
        }

        .realm-browser-header .sub-title {
            font-size: 0.9rem;
        }

        .navigation-button {
            width: 2rem;
            height: 2rem;
        }
    }
</style>
