<script lang="ts">
    import clock from "$lib/images/clock.png";
    import type { SimpleWorldResponse } from '$lib/api/ApiClient';

    export let data: SimpleWorldResponse;

    function secondsToLength(seconds: number) {
        let minutes = 60;

        if (seconds <= 5 * minutes) {
            return "short"
        }

        if (seconds <= 15 * minutes) {
            return "normal"
        }

        if (seconds <= 25 * minutes) {
            return "long"
        }

        if (seconds <= 35 * minutes) {
            return "very long"
        }

        return "MARATHON";
    }
</script>

<div class="stats">
    <div><i class='bx bxs-flag-checkered'></i><div>{data.completions}</div></div>
    <div><i class='bx bx-play' ></i><div>{data.plays}</div></div>
    {#if data.secondsToComplete != null}
        <div data-toggle="tooltip" data-placement="top" title="Tooltip on top"><i class='bx bx-stopwatch' ></i> <div>{secondsToLength(data.secondsToComplete)}</div></div>
    {/if}
    {#if data.ranked == true}
        <img src={clock} title="Ranked" alt="Speedrun icon"/>
    {/if}
</div>

<style>
    .stats {
        display: flex;
        gap: 1.0rem; /* space between the items */
        align-items: center; /* vertically center all items */
        justify-content: left; /* horizontally center the whole section */
    }

    .stats > div {
        display: flex;
        align-items: center; /* center icon and text vertically */
        gap: 0.2rem; /* space between icon and number */
        font-size: 0.8rem;
    }

    .stats i {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.9rem; /* slightly larger icons */
    }
</style>