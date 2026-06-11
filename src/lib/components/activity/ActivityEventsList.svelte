<script lang="ts">
    import { createApiClient } from '$lib/api/client';
    import type { ActivityEventDto } from '$lib/api/ApiClient';
    import ActivityItemDisplay from '$lib/components/activity/ActivityItemDisplay.svelte';
    import LoadSpinner from '$lib/components/LoadSpinner.svelte';

    const client = createApiClient();

    export let amount = 100;

    const dataPromise: Promise<ActivityEventDto[]> = client.eventsLastGET(amount);
</script>

<div class="activity-list realm-box">
    {#await dataPromise}
        <LoadSpinner size="2.5em" />
    {:then events}
        {#if events.length > 0}
            <div class="activity-list-scroll">
                {#each events as event}
                    <div class="activity-list-item">
                        <ActivityItemDisplay currentEvent={event} />
                    </div>
                {/each}
            </div>
        {:else}
            No recent activity.
        {/if}
    {:catch error}
        Something went wrong while fetching the activity events.<br>{error}
    {/await}
</div>

<style>
    .activity-list {
        display: flex;
        flex-direction: column;
        width: 100%;
        padding: 0.75rem 0.9rem;
        gap: 0.5rem;
    }

    .activity-list-scroll {
        display: flex;
        flex-direction: column;
        gap: 0.35rem;
        max-height: 72vh;
        overflow-y: auto;
        padding-right: 0.25rem;
    }

    .activity-list-item {
        padding: 0.35rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .activity-list-item:last-child {
        border-bottom: none;
    }
</style>