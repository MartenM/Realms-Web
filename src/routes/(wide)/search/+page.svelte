<script lang="ts">
    import DifficultySelector from "$lib/components/DifficultySelector.svelte";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import RealmBrowser from "$lib/components/realms/RealmBrowser.svelte";
    import DifficultyBar from "$lib/components/DifficultyBar.svelte";

    function objectToQueryParams(obj: Record<string, any>): string {
        const params = new URLSearchParams();

        // Loop through each key-value pair in the object
        for (const [key, value] of Object.entries(obj)) {
            // If the value is an array, iterate through it and append each item
            if (Array.isArray(value)) {
                value.forEach(item => params.append(key, item));
            } else {
                // Otherwise, append the key and value
                params.append(key, String(value));
            }
        }

        return params.toString(); // Return the query string
    }

    function search() {
        const currentUrl = new URL(window.location.href);

        searchQuery.difficulties = selectedMetas.map(m => m.trophies).flat();

        currentUrl.searchParams.set('query', JSON.stringify(searchQuery)); // Add or update a query parameter

        goto(currentUrl.toString());
        isSearching = true;
    }

    onMount(() => {
        let queryParams = $page.url.searchParams; // Get the URL search parameters (query params)

        // Example of accessing specific query parameters
        let query = queryParams.get('query'); // Get the value of 'myParam'

        if (query == null) return;
        if (query.length < 2) return;

        searchQuery = JSON.parse(query);
        isSearching = true;
    })

    let isSearching = false;
    let searchQuery: RealmSearchQuery = {
        worldName: "",
        builderName: "",
        ratedOnly: false,
        featuredOnly: false,
        difficulties: []
    }

    let selectedMetas: DifficultyMeta[] = []
</script>

<div class="realm-box search">
    {#if !isSearching}
        <div class="row justify-content-md-center">
            <div class="col-md-6">
                <h2>Search</h2>
                <div class="form-group">
                    <label for="world-name">World name:</label>
                    <input bind:value={searchQuery.worldName} type="text" class="form-control" id="world-name" aria-describedby="emailHelp">
                </div>

                <div class="form-group">
                    <label for="world-name">By builder:</label>
                    <input bind:value={searchQuery.builderName} type="text" class="form-control" id="world-name" aria-describedby="emailHelp">
                </div>

                <hr/>

                <div class="form-check">
                    <input bind:checked={searchQuery.ratedOnly} class="form-check-input" type="checkbox" id="featured-only">
                    <label class="form-check-label" for="featured-only">
                        Rated worlds only
                    </label>
                </div>

                <div class="form-check">
                    <input bind:checked={searchQuery.featuredOnly} class="form-check-input" type="checkbox" id="featured-only">
                    <label class="form-check-label" for="featured-only">
                        Featured worlds only
                    </label>
                </div>

                <hr/>

                <DifficultySelector bind:selectedMetas={selectedMetas}/>

                <button class="btn btn-search" on:click={search}>Search</button>
            </div>
        </div>
    {:else}

        <RealmBrowser title={"Search results"} subTitle={null} apiUrl={`/api/worlds/search`} extraParameters="&{objectToQueryParams(searchQuery)}"/>
        <button class="btn btn-search" style="margin-top: 10px" on:click={() => isSearching = false}>Back to search</button>
    {/if}
</div>

<style>
    .search {
        padding: 1em;
    }

    .btn-search {
        background-color: var(--realm-primary);
        width: 100%;
    }
</style>

