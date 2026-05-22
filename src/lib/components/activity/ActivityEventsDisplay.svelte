<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    import { createApiClient } from '$lib/api/client';
    import type { ActivityEventDto } from '$lib/api/ApiClient';
    import ProfileLink from "$lib/components/ProfileLink.svelte";
    import ActivityItemDisplay from "$lib/components/activity/ActivityItemDisplay.svelte";
    import LoadSpinner from "$lib/components/LoadSpinner.svelte";

    const client = createApiClient();

    let dataPromise: Promise<ActivityEventDto[]> = client.eventsLastGET(5);

    let currentIndex = 0;

    let interval: ReturnType<typeof setInterval>;

    function next(events: ActivityEventDto[]) {
        if (!events.length) return;

        currentIndex = (currentIndex + 1) % events.length;
    }

    onMount(async () => {
        const events = await dataPromise;

        if (events.length > 1) {
            interval = setInterval(() => next(events), 5000);
        }

        return () => {
            clearInterval(interval);
        };
    });


</script>

<div class="activity-events realm-box">
    {#await dataPromise}
       ...
    {:then events}

        {#if events.length > 0}

            {@const currentEvent = events[currentIndex]}

            <div class="activity-fade-container">
                {#key currentIndex}
                    <div
                            class="activity-item"
                            in:fade={{ duration: 500, delay: 400 }}
                    >
                        <ActivityItemDisplay currentEvent={currentEvent} />
                    </div>
                {/key}
            </div>

        {:else}
            No recent activity.
        {/if}

    {:catch error}
        Something went wrong while fetching the activity events.<br>{error}
    {/await}
</div>

<style>
    .activity-events {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;

        padding: 0.1rem 1rem;
        margin-bottom: 0.5rem;
    }

    .activity-fade-container {
        display: flex;
        align-items: center;
        justify-content: center;

        min-height: 1.5em;
        height: 100%;
    }

    .activity-item {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 100%;
        text-align: center;
    }
</style>