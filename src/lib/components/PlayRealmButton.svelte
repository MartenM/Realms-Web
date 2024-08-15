<script lang="ts">

    import {PUBLIC_API_URL} from "$env/static/public";
    import LoadSpinner from "$lib/components/LoadSpinner.svelte";

    export let worldId: string;

    let requestResponse: RequestRealmResponse | null;
    let isLoading = false;
    let errorText: string | null = null;

    function PlayRealm() {
        console.log("Loading realm....")

        isLoading = true;

        fetch(`${PUBLIC_API_URL}/api/world/${worldId}/play`, {method: "POST", credentials: "include"})
            .then((res) => res.json())
            .then(x => {
                x = x as RequestRealmResponse
                return x;
            })
            .then(x => {
                requestResponse = x;

                if (x.pixelWalkerRoomId !== null) {
                    window.open(`https://pixelwalker.net/world/${x.pixelWalkerRoomId}`, '_blank');
                } else {
                    errorText = x.errorText;
                }

                isLoading = false;
            })
            .catch((ex) => {
                errorText = ex;
            });
    }

</script>


<button class="btn btn-play" on:click={() => PlayRealm()} >
    {#if isLoading}
        <LoadSpinner color="white" size="2em"/>
    {:else }
        Play!
    {/if}
</button>

{#if errorText !== null}
    <br>
    <div class="alert alert-none">{errorText}</div>
{/if}

<style>
    .btn-play {
        color: white;
        background-color: #e6a100;
        font-family: Joystix, serif;
        font-size: 1.5em;
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .btn-play:hover {
        background-color: gold;
    }
</style>