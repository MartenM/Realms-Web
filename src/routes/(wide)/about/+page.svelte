<script>

</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About Realms" />
</svelte:head>

<div class="about realm-box">
	<h1>Realms</h1>

	<p>
		Create, compete, conquer. Share your worlds, challenge the globe!
	</p>

	<p>
		Realms is designed to make exploring and discovering worlds of varying difficulties easy.<br>
		Additionally, it rewards players and builders for their participation with trophies or builder points.
	</p>

	<h5>Contact</h5>
	<p>Questions, suggestions or something else? Contact me on Discord!</p>
	<div class="discord">
		<div>
			<i class='bx bxl-discord-alt' ></i>
			<span>@MartenM</span>
		</div>
	</div>
</div>

<style>
	.about {
		padding: 1em;
	}

	.about h1 {
		font-family: Joystix, serif;
		color: var(--realm-primary);
	}

	.about h5 {
		font-family: Joystix, serif;
		color: var(--realm-primary);
	}

	.discord {
		display: flex;
		justify-content: start;
	}

	.discord div {
		padding: 0.5em;
		border-radius: 1em;
		background-color: #1e5dd5;

		font-weight: bold;

		display: flex;
		align-content: center;
		justify-content: center;
	}

	.discord div i {
		margin-right: 0.5em;
		line-height: 1.3;
		font-size: 18px;
	}
</style>
