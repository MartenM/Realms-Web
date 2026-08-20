<script lang="ts">
    import DifficultySelector from "$lib/components/DifficultySelector.svelte";
    import {goto} from "$app/navigation";
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

    // Ranked or Featured => always Rated
    $: if (searchQuery.rankedOnly || searchQuery.featuredOnly) {
        searchQuery.ratedOnly = true;
    }

    // Whether Rated checkbox should be locked
    $: ratedLocked = searchQuery.rankedOnly || searchQuery.featuredOnly;

    function search() {
        const currentUrl = new URL(window.location.href);

        searchQuery.difficulties = selectedMetas.map(m => m.trophies).flat();

        currentUrl.searchParams.set('query', JSON.stringify(searchQuery)); // Add or update a query parameter

        goto(currentUrl.toString());
    }

    // Keep the shown search results in sync with the URL, including when
    // navigating back to a bare /search (e.g. via the navbar) while results
    // are already showing, since SvelteKit reuses this component instance.
    $: {
        let query = $page.url.searchParams.get('query');

        if (query != null && query.length >= 2) {
            searchQuery = JSON.parse(query);
            isSearching = true;
        } else {
            isSearching = false;
        }
    }

    let isSearching = false;
    let searchQuery: RealmSearchQuery = {
        worldName: "",
        builderName: "",
        ratedOnly: false,
        featuredOnly: false,
        rankedOnly: false,
        difficulties: [],
        sortBy: 0,
        sortDescending: true
    }

    let selectedMetas: DifficultyMeta[] = []

    const sortOptions: { value: SortOption, label: string }[] = [
        {value: 0, label: "Publish date"},
        {value: 1, label: "Likes"},
        {value: 2, label: "Plays"},
        {value: 3, label: "Unique finishes"},
        {value: 4, label: "Length"}
    ];
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
                    <input bind:checked={searchQuery.ratedOnly} disabled="{ratedLocked}" class="form-check-input" type="checkbox" id="rated-only">
                    <label class="form-check-label" for="rated-only">
                        Rated
                    </label>
                </div>

                <div class="form-check">
                    <input bind:checked={searchQuery.rankedOnly} class="form-check-input" type="checkbox" id="ranked-only">
                    <label class="form-check-label" for="ranked-only">
                        Ranked <span style="font-size: 10px; color: gray">(Speedrun leaderboard)</span>
                    </label>
                </div>

                <div class="form-check">
                    <input bind:checked={searchQuery.featuredOnly} class="form-check-input" type="checkbox" id="featured-only">
                    <label class="form-check-label" for="featured-only">
                        Featured
                    </label>
                </div>

                <hr/>

                <label for="sort-chips">Sort by:</label>
                <div id="sort-chips" class="chip-row">
                    {#each sortOptions as option}
                        <button
                            type="button"
                            class="chip"
                            class:selected={searchQuery.sortBy === option.value}
                            on:click={() => searchQuery.sortBy = option.value}
                        >
                            {option.label}
                        </button>
                    {/each}
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

    .chip-row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5em;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
    }

    .chip {
        border: 1px solid var(--realm-primary);
        background-color: transparent;
        color: var(--realm-primary);
        border-radius: 999px;
        padding: 0.3em 1em;
        font-size: 0.85rem;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .chip:hover {
        background-color: rgba(255, 179, 0, 0.15);
    }

    .chip.selected {
        background-color: var(--realm-primary);
        color: #000;
    }
</style>

