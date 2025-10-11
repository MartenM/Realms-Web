<script>

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

<div class="app">
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

    .app::before {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.65) url("/background/MidnightMeadows.png") center/cover no-repeat;
        background-blend-mode: darken;
        filter: blur(8px);
        transform: scale(1.05); /* avoid edge blur clipping */
        z-index: -1;
    }

	/*noinspection CssUnusedSymbol*/
	:global(.realm-box) {
        background: linear-gradient(180deg, rgba(20, 20, 20, 0.95), rgba(10, 10, 10, 0.95));
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 1rem;
        color: #f5f5f5;
        padding: 0rem 1rem 1rem 1rem;
        box-shadow: 0 0 24px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(6px);
        display: flex;
        flex-direction: column;
        gap: 1rem;
        transition: all 0.3s ease;
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
