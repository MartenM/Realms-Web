<script>
	import background from '$lib/images/The_Torava_Disaster.png';
	import './styles.css';
	import Navbar from "$lib/components/Navbar.svelte";
	import MinimapDialog from "$lib/components/dialogs/MinimapDialog.svelte";
	import PlayWorldModal from "$lib/components/dialogs/PlayWorldModal.svelte";

</script>

<div class="app" style="background: rgba(0, 0, 0, .65) url({background}); background-blend-mode: darken; background-size:cover;">
	<div class="container">
		<div class="row">
			<div class="col-md-2">
				<Navbar></Navbar>
			</div>

			<slot/>
		</div>

		<!-- Dialogs -->
		<div>
			<PlayWorldModal/>
			<MinimapDialog/>
		</div>
	</div>
</div>

<style>
	.app {
		height: 100vh;
		width: 100vw;
		padding-top: 1em;
	}

	/*noinspection CssUnusedSymbol*/
	:global(.realm-box) {
		background-color: rgba(0, 0, 0, 0.75);
		border: 1px solid gray;
		border-radius: 1em;
		color: white;
		padding-left: 1em;
		padding-right: 1em;
	}

	:global(h1), :global(h2), :global(h3), :global(h4), :global(h5) {
		color: var(--realm-primary);
		font-family: Joystix, serif;
	}

	:root {
		--realm-primary: #ffb300;
		--realm-background: rgba(0, 0, 0, 0.75);
	}
</style>
