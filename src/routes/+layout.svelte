<script>
	import background from '$lib/images/The_Torava_Disaster.png';
	import './styles.css';
</script>

<div class="app" style="background: rgba(0, 0, 0, .65) url({background}); background-blend-mode: darken; background-size:cover;">
	<main>
		<slot />
	</main>

	<footer>

	</footer>
</div>

<style>
	.app {
		height: 100vh;
		width: 100vw;
		padding-top: 1em;
	}
</style>
