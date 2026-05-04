<script lang="ts">
    import RealmBrowser from "$lib/components/realms/RealmBrowser.svelte";
    import DifficultyBar from "$lib/components/DifficultyBar.svelte";

    export let data;
</script>



<div class="row">
    {#if data.contest !== undefined}
        <div class="col-md-9">
            <RealmBrowser
                    title={"Summer Build Event 2026"}
                    subTitle={"Realms submitted for the Summer Build Event 2026"}
                    apiUrl="/api/worlds/search"
                    extraParameters={`&contestId=${data.contestId}`}/>
            <DifficultyBar/>
        </div>

        <div class="col-md-3 side-bar">
            <div class="realm-box" style="padding: 10px">
                <h5>{data.contest.title}</h5>
                <span>{data.contest.message}</span>

                {#if data.contest.contestUrlType === "discord"}
                    <a class="btn btn-discord" href="{data.contest.contestUrl}">
                        <i class='bx bxl-discord-alt'/>
                        More info
                    </a>
                {/if}
            </div>
        </div>
    {/if}
</div>

<style>
    .side-bar {
        overflow-y: scroll;
        max-height: 90vh;
    }

    .btn-discord {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        color: white;
        background-color: #7785cc;
    }
</style>



