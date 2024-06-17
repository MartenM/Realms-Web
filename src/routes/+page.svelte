<script>

import RealmBrowser from "$lib/components/realms/RealmBrowser.svelte";
import HighscoreList from "$lib/components/highscores/HighscoreList.svelte";

</script>

<svelte:head>
	<title>PixelWalker | Realms</title>
	<meta name="description" content="PixelWalker Realms Browser" />
</svelte:head>

<div class="col-md-7">
	<RealmBrowser title={"Rated Realms"} subTitle={"Play realms and earn trophies!"} apiUrl={"/api/published_worlds/rated"}/>
</div>
<div class="col-md-3 high-scores">
	<HighscoreList></HighscoreList>
</div>

<style>
	.high-scores {
		overflow-y: scroll;
		max-height: 90vh;
	}
</style>
