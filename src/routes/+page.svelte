<script>

import RealmBrowser from "./RealmBrowser.svelte";
import HighscoreList from "./HighscoreList.svelte";

</script>

<svelte:head>
	<title>PixelWalker | Realms</title>
	<meta name="description" content="PixelWalker Realms Browser" />
</svelte:head>

<div class="container">
	<div class="row">
		<div class="col-md-5">
			<RealmBrowser title={"Rated Realms"} subTitle={"Play realms and earn trophies!"} apiUrl={"/api/published_worlds/rated"}/>
		</div>
		<div class="col-md-5">
			<RealmBrowser title={"Published Realms"} subTitle={"Recently published realms by community members."}/>
		</div>
		<div class="col-md-2">
			<HighscoreList></HighscoreList>
		</div>
	</div>
</div>

<style>

</style>
