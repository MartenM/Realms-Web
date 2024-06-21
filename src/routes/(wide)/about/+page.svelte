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

	<h5>Publishing a world</h5>
	<p>
		To publish a world to realms follow the following steps:
	</p>
	<ol>
		<li>Join your world and copy the world ID. (The part after /world/ in your browsers URL bar)</li>
		<li>Join the realms lobby.</li>
		<li>Use the command .publish |worldId| |0-10| to start the verification process.</li>
		<li>Join your world again, and complete it!</li>
	</ol>
	<p>
		The difficulties are rated from 1 up and including 10.
	</p>
	<ul>
		<li>1: Very easy</li>
		<li>2: Easy</li>
		<li>3: Normal</li>
		<li>4-5: Hard</li>
		<li>6-7: Harder</li>
		<li>8-9: Extreme</li>
		<li>10: Demon</li>
	</ul>
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
</style>
