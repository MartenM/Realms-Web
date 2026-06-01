<script lang="ts">
    import trophy from "$lib/images/trophy.png";
    import builder from "$lib/images/builder_block.png";
    import RealmBrowser from "$lib/components/realms/RealmBrowser.svelte";
    import Smiley from "$lib/components/Smiley.svelte";

    export let data;
    const { profile } = data;
</script>

<svelte:head>
    <meta content="{profile.username}" property="og:title">

    <meta content="{profile.username} - Trophies: {profile.trophies} - Builder points: {profile.builderPoints}" property="og:description">
    <meta content='/image/smileys/{profile.smiley?.toLowerCase()}.png' property='og:image'>
    <meta name="twitter:card" content="summary_large_image">
</svelte:head>

<div class="realm-box profile-box">
    <div class="header">
        <Smiley id="{profile.smiley}"/>
        <h1 class="username">{profile.username}</h1>
    </div>

    <div class="stats-grid">
        <div class="stat">
            <img src={trophy} alt="Trophies" class="icon" />
            <div class="info">
                <div class="label">Trophies</div>
                <div class="value">{profile.trophies}</div>
            </div>
        </div>

        <div class="stat">
            <img src={builder} alt="Builder Points" class="icon" />
            <div class="info">
                <div class="label">Builder Points</div>
                <div class="value">{profile.builderPoints}</div>
            </div>
        </div>

        <div class="stat">
            <div class="icon"><i class='bx bx-play' ></i></div>
            <div class="info">
                <div class="label">World Visitors</div>
                <div class="value">{profile.totalPlays}</div>
            </div>
        </div>

        <div class="stat">
            <div class="icon"><i class='bx bxs-flag-checkered'></i></div>
            <div class="info">
                <div class="label">Completed Worlds</div>
                <div class="value">{profile.completedWorlds}</div>
            </div>
        </div>
    </div>

    <hr />

    <RealmBrowser
            title="Published worlds"
            subTitle="Worlds created by {profile.username}"
            apiUrl="/api/worlds/search"
            extraParameters={`&builderName=${profile.username}`}
    />
</div>

<style>
    .profile-box {
        padding: 1.5em;
        display: flex;
        flex-direction: column;
        gap: 1.5em;
        color: white;
        font-family: Joystix, serif;
    }

    .header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .username {
        font-size: 2.5em;
        margin: 0;
        color:white;
    }

    /* Simple uniform stats grid */
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 1em;
        justify-items: center;
        text-align: center;
    }

    .stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.3em;
    }

    .icon {
        width: 1.8em;
        height: 1.8em;
        image-rendering: pixelated;
    }

    .label {
        font-size: 0.85em;
        color: var(--realm-primary);
    }

    .value {
        font-size: 1.4em;
    }

    hr {
        border: none;
        border-top: 2px solid var(--realm-primary);
    }
</style>
