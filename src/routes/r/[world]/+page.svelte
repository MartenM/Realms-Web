<script lang="ts">
    import type { PageData } from './$types';
    import RealmDisplay from "$lib/components/realms/RealmDisplay.svelte";

    import {
        PUBLIC_API_URL
    } from '$env/static/public';

    export let data: PageData;

    let realmData: RealmInformation = {
        world: data.worldData,
        speedRecords: null
    }

    let realm = realmData.world;
</script>

<svelte:head>
    <meta content="{realm.title}" property="og:title">

    {#if realm.ratedDifficulty != null}
        <meta content="Builder: {realm.ownerUsername} - Difficulty: {realm.ratedDifficulty} (Rated)" property="og:description">
    {:else}
        <meta content="Builder: {realm.ownerUsername} - Difficulty: {realm.requestedDifficulty} (Requested)" property="og:description">
    {/if}
    <meta content='{PUBLIC_API_URL}/api/world/{realm.id}/minimap' property='og:image'>
    <meta name="twitter:card" content="summary_large_image">

</svelte:head>

<div class="col-md-10">
    <div class="background">
        <RealmDisplay realmData={realmData}/>
    </div>
</div>

<style>
    .background {
        border: 4px solid gold;
        padding: 1em;
        color:white;
        background-color: #313131;
    }
</style>