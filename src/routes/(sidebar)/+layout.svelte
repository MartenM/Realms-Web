<script>
	import HighscoreList from "$lib/components/highscores/HighscoreList.svelte";
</script>

<div class="col-md-7">
	<slot/>
</div>

<div class="col-md-3">
	<HighscoreList></HighscoreList>
</div>

