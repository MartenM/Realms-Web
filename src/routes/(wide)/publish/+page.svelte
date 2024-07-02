<script>

import DifficultyBar from "$lib/components/DifficultyBar.svelte";
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About Realms" />
</svelte:head>

<div class="about realm-box">
	<h4>Publishing a world</h4>
	<p>
		Everyone can upload their worlds to Realms. All realms you can play have been uploaded by other builders. <br> To publish a world to realms follow the following steps:
	</p>
	<ol class="upload-steps">
		<li>Join your world and copy the world ID. (The part after /world/ in your browsers URL bar)</li>
		<li>Join the realms lobby <span class="code"><a href="https://pixelwalker.net/world/mknckr7oqxq24xa">https://pixelwalker.net/world/mknckr7oqxq24xa</a></span></li>
		<li>Use the command <span class="code">.publish worldId 1-10</span> to start the verification process.</li>
		<div class="sub-step">Check the text below to see the difficulties!</div>
		<li>Join your world again, and complete it!</li>
		<div class="sub-step">By completing the world you show the system that the world is actually beatable.</div>
		<li>That's it! You have now uploaded your world to Realms</li>
	</ol>
	<h5>Difficulties</h5>
	<p>
		When uploading a world you can give it an initial difficulty. The difficulties are rated from 1 up and including 10.
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
	<DifficultyBar/>
	<h5>Trophies & Builder points</h5>
	<p>Trophies are rewarded to players on completing a realm. Trophies ratings are given manually to ensure that the competition and achievements stay fair. Currently there are no requirements for levels to receive trophy ratings although some levels might be left out if they are deemed to be unfair, low-effort or too short.</p>
	<p>Builder points are automatically rewarded to the builder of the world when a trophy rating is given to a certain world.</p>

</div>

<style>
	.about {
		padding: 1em;
	}

	.upload-steps li {
		margin-top: 5px;
	}

	.sub-step {
		font-size: 0.8em;
		color: grey;
		margin-left: 10px;
	}

	a { color: inherit; }

	.code {
		background: black;
		border: 1px solid grey;
		border-radius: 4px;
		color: gold;
		padding-left: 10px;
		padding-right: 10px;
	}

</style>
