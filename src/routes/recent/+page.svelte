<script lang="ts">
    import RealmBrowser from "$lib/components/realms/RealmBrowser.svelte";
    import DifficultyBar from "$lib/components/DifficultyBar.svelte";
    import HighscoreList from "$lib/components/highscores/HighscoreList.svelte";

    let builderConfiguration = {
        apiUrl: '/api/highscores/total_builder_points',
        type: 'BuilderPoints'
    }
</script>



<div class="row">
    <div class="col-md-9">
        <RealmBrowser title={"Published Realms"} subTitle={"Recently published realms by community members."}/>
        <DifficultyBar/>
    </div>

    <div class="col-md-3 side-bar">
        <HighscoreList configuration={builderConfiguration}></HighscoreList>
    </div>
</div>

<style>
    .side-bar {
        overflow-y: scroll;
        max-height: 90vh;
    }
</style>



