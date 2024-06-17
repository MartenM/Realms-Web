<script lang="ts">

import HighscoreList from "$lib/components/highscores/HighscoreList.svelte";

let builderConfiguration = {
    apiUrl: '/api/highscores/total_builder_points',
    type: 'BuilderPoints'
}

let speedRunner = {
    apiUrl: '/api/highscores/total_speedrunner',
    type: 'BuilderPoints'
}

</script>

<div class="row">
    <div class="col-md-3">
        <div class="banner">
            Trophies
            <p>Total amount of trophies</p>
        </div>
        <div class="content">
            <HighscoreList></HighscoreList>
        </div>
    </div>
    <div class="col-md-3">
        <div class="banner">
            Builders
            <p>Rewarded for building worlds</p>
        </div>
        <div class="content">
            <HighscoreList configuration={builderConfiguration}></HighscoreList>
        </div>
    </div>
    <div class="col-md-3">
        <div class="banner">
            Speedrunner
            <p>Amount of fastest world completions</p>
        </div>
        <div class="content">
            <HighscoreList configuration={speedRunner}></HighscoreList>
        </div>
    </div>
</div>

<style>
    .banner {
        text-align: center;
        padding: 0.5em 0;
        color: var(--realm-primary);
        font-family: Joystix, serif;
        font-size: 1.5em;
    }

    .banner p{
        font-family: Arial;
        font-size: 0.6em;
        color: white;
    }

    .content {
        max-height: 80vh;
        overflow-y: scroll;
    }
</style>