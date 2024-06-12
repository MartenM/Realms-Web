<script lang="ts">

    import unknownIcon from "$lib/images/difficulties/unkown.png";
    import easy from "$lib/images/difficulties/2.png";
    import normal from "$lib/images/difficulties/3.png";
    import hard from "$lib/images/difficulties/4.png";
    import harder from "$lib/images/difficulties/5.png";
    import extreme from "$lib/images/difficulties/6.png";
    import demon from "$lib/images/difficulties/7.png";

    import trophy from "$lib/images/trophy.png";

    export let difficulty: number;
    export let featured: number;
    export let rated: boolean;


    let icon = unknownIcon;
    switch (difficulty) {
        case 0:
        case 1:
        case 2:
            icon = easy;
            break;
        case 3:
            icon = normal;
            break;
        case 4:
        case 5:
            icon = hard;
            break;
        case 6:
        case 7:
            icon = harder;
            break;
        case 8:
        case 9:
            icon = extreme;
            break;
        case 10:
            icon = demon;
            break;
    }
</script>

<div class="difficulty">
    <img src={icon} alt="Difficulty icon" class="difficulty-icon"/>
    <div class="trophy-display">
        {#if rated}
            <div>{difficulty}</div>
            <img src={trophy} alt="Trophy icon"/>
        {/if}
    </div>
</div>

<style>
    .difficulty {
        display: flex;
        flex-direction: column;
    }

    .difficulty-icon {
        height: 40px;
        width: 40px;
    }

    .trophy-display {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row;
        height: 16px;
    }

    .trophy-display img {
        max-width: 100%;
        height: auto;
    }

    .trophy-display div {
        font-family: ArcadeClassic, Serif;
        font-size: 16px;
    }
</style>
