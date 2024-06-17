<script>
	import background from '$lib/images/The_Torava_Disaster.png';
	import './styles.css';
	import Navbar from "$lib/components/Navbar.svelte";
	import HighscoreList from "$lib/components/highscores/HighscoreList.svelte";

</script>

<div class="app" style="background: rgba(0, 0, 0, .65) url({background}); background-blend-mode: darken; background-size:cover;">
	<div class="container">
		<div class="row">
			<div class="col-md-2">
				<Navbar></Navbar>
			</div>

			<slot/>
		</div>
	</div>
</div>

<style>
	.app {
		height: 100vh;
		width: 100vw;
		padding-top: 1em;
	}

	:global(.realm-box) {
		background-color: rgba(0, 0, 0, 0.75);
		border: 1px solid gray;
		border-radius: 1em;
		color: white;
		padding-left: 1em;
		padding-right: 1em;
	}

	:root {
		--realm-primary: #ffb300;
	}
</style>
