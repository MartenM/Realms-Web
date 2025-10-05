<script>
	import background from '$lib/images/MidnightMeadows.png';

	import './styles.css';
	import Navbar from "$lib/components/Navbar.svelte";
	import MinimapDialog from "$lib/components/dialogs/MinimapDialog.svelte";
	import PlayWorldModal from "$lib/components/dialogs/PlayWorldModal.svelte";

    import { fade } from 'svelte/transition';
    import { fly } from 'svelte/transition';
    import { page } from '$app/stores';
</script>

<svelte:head>
	<meta content="PixelWalker Realms" property="og:site_name">
	<meta name="theme-color" content="#fcb603">
</svelte:head>

<div class="app" style="background: rgba(0, 0, 0, .65) url({background}); background-blend-mode: darken; ">
	<div class="container">
		<div class="row">
			<div class="col-md-2">
				<Navbar></Navbar>
			</div>

            {#key $page.url.pathname}
                <div class="col-md-10" in:fly={{y:5, duration: 100, delay: 101 }} out:fade={{duration: 25 }}>
                    <slot />
                </div>
            {/key}

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
		min-height: 100vh;
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

	:global(.alert-none) {
		width: 100%;
		padding: 1em 1em;
		text-align: center;
		color: white;
		border: 1px solid red;

	}

	:global(.code) {
		background: black;
		border: 1px solid grey;
		border-radius: 4px;
		color: gold;
		padding-left: 10px;
		padding-right: 10px;
	}


	:root {
		--realm-primary: #ffb300;
		--realm-background: rgba(0, 0, 0, 0.75);
	}
</style>
