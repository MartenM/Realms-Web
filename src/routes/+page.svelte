<script lang="ts">


import RealmBrowser from "$lib/components/realms/RealmBrowser.svelte";
import HighscoreList from "$lib/components/highscores/HighscoreList.svelte";

import { profileStore } from "$lib/stores/profileStore";
import DifficultyBar from "$lib/components/DifficultyBar.svelte";

let usernameHint = $profileStore.username == null;
</script>

<svelte:head>
	<title>PixelWalker | Realms</title>
	<meta name="description" content="PixelWalker Realms Browser" />
</svelte:head>

<div class="row">
    <div class="col-md-9">
        {#if usernameHint}
            <div class="alert-profile">
                <div class="alert-text">See completed worlds? Set your username <a href="/settings">here</a>!</div>

            </div>
        {/if}
        <RealmBrowser title={"Rated Realms"} subTitle={"Play realms and earn trophies!"} apiUrl={"/api/worlds/rated"}/>
        <DifficultyBar/>
    </div>
    <div class="col-md-3 sidebar">
        <HighscoreList></HighscoreList>
    </div>
</div>

<style>
	.sidebar {
		max-height: 90vh;
		overflow-y: scroll;
	}

	.alert-profile {
		border: 1px solid gold;
		border-radius: 0.5em;
		margin-bottom: 10px;
		color: white;
		background-color: var(--realm-background);
	}

	a {
		color: var(--realm-primary);
	}

	.alert-text {
		font-family: Joystix, serif;
		font-size: 0.8em;
		padding: 0.8em;
	}
</style>
