<script>
	import HighscoreList from "$lib/components/highscores/HighscoreList.svelte";
</script>

<div class="row">
    <div class="col-md-9">
        <slot/>
    </div>

    <div class="col-md-3 side-bar">
        <HighscoreList></HighscoreList>
    </div>
</div>

<style>
	.side-bar {
		overflow-y: scroll;
		max-height: 90vh;
	}
</style>
