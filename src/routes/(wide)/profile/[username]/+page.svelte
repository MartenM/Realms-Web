<script lang="ts">
    import trophy from "$lib/images/trophy.png";
    import builder from "$lib/images/builder_block.png";
    import Planned from "$lib/components/Planned.svelte";
    import RealmBrowser from "$lib/components/realms/RealmBrowser.svelte";

    export let data : PlayerProfile;
</script>


<div class="realm-box profile-box">
    <div class="header">
        <div class="username">{data.username}</div>
    </div>
    <hr>
    <div class="stats">
        <div class="stat">
            <div class="value" style="font-size: 1.5em;">{data.trophies}</div>
            <div class="icon"><img src={trophy} alt="Trophies"/></div>

        </div>
        <div class="stat">
            <div class="value" style="font-size: 1.5em;">{data.builderPoints}  </div>
            <div class="icon"><img src={builder} alt="Builder Points"/></div>
        </div>


    </div>

    <hr>

    <div class="stats">
        <div class="stat">
            <div class="icon">World visitors:</div>
            <div class="value">{data.totalPlays}</div>
        </div>
        <div class="stat">
            <div class="icon">Completed worlds:</div>
            <div class="value">{data.completedWorlds}</div>
        </div>
    </div>

    <hr>

    <RealmBrowser title={"Published worlds"} subTitle={null} apiUrl={`/api/worlds/search`} extraParameters="&builderName={data.username}"/>

</div>

<style>
    .profile-box {
        padding: 1em;
    }

    .header {
        display: flex;
        text-align: center;
        flex-direction: row;
        align-content: center;
        justify-content: center;
    }

    .header {
        font-size: 3em;
        font-family: Joystix, serif;
        color: white;
        text-shadow: -1px -1px 0 var(--realm-primary), 1px -1px 0 var(--realm-primary), -1px 1px 0 var(--realm-primary), 1px 1px 0 var(--realm-primary);
    }

    .stats {
        font-size: 1em;
        font-family: Joystix, serif;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-content: center;
    }

    .stat {
        margin-left: 20px;
        margin-right: 20px;

        display: flex;
        flex-direction: row;
        align-content: center;
    }

    .icon {
        padding-left: 4px;
        padding-right: 4px;
    }

    img {
        width: 200%;
        image-rendering: pixelated;
    }
</style>
