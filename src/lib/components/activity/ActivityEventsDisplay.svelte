<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    import { createApiClient } from '$lib/api/client';
    import type { ActivityEventDto } from '$lib/api/ApiClient';
    import ActivityItemDisplay from '$lib/components/activity/ActivityItemDisplay.svelte';
    import LoadSpinner from '$lib/components/LoadSpinner.svelte';

    const client = createApiClient();

    export let amount = 5;

    let dataPromise: Promise<ActivityEventDto[]> = client.eventsLastGET(amount);

    let currentIndex = 0;
    let interval: ReturnType<typeof setInterval>;

    function next(events: ActivityEventDto[]) {
        if (!events.length) return;

        currentIndex = (currentIndex + 1) % events.length;
    }

    onMount(() => {
        let cancelled = false;

        dataPromise.then((events) => {
            if (cancelled) return;

            if (events.length > 1) {
                interval = setInterval(() => next(events), 5000);
            }
        });

        return () => {
            cancelled = true;

            if (interval) {
                clearInterval(interval);
            }
        };
    });
</script>

<div class="activity-events realm-box">
    <div class="activity-content">
        {#await dataPromise}
            <LoadSpinner size="2.5em" />
        {:then events}
            {#if events.length > 0}
                {@const currentEvent = events[currentIndex]}

                <div class="activity-fade-container">
                    {#key currentIndex}
                        <div class="activity-item" in:fade={{ duration: 500, delay: 400 }}>
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

    <div class="activity-toolbar">
        <a class="activity-link" href="/activity" aria-label="Open activity page" title="View all activity">
            <i class="bx bx-chevron-right"></i>
        </a>
    </div>
</div>

<style>
    .activity-events {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        padding: 0.6rem 0.8rem;
        margin-bottom: 0.5rem;
        gap: 0.45rem;
    }

    .activity-content {
        flex: 1;
        min-width: 0;
    }

    .activity-toolbar {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-shrink: 0;
    }

    .activity-link {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: 999px;
        color: var(--realm-primary);
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.08);
        text-decoration: none;
        flex-shrink: 0;
    }

    .activity-link:hover {
        background: rgba(255, 255, 255, 0.12);
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