<script lang="ts">
    import ActivityEventsList from '$lib/components/activity/ActivityEventsList.svelte';
</script>

<svelte:head>
    <title>PixelWalker | Activity</title>
    <meta name="description" content="Last 100 realm activity events." />
</svelte:head>

<ActivityEventsList amount={100} />