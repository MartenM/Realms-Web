<script lang="ts">

    import unknownIcon from "$lib/images/difficulties/unkown.png";
    import easy from "$lib/images/difficulties/2.png";
    import normal from "$lib/images/difficulties/3.png";
    import hard from "$lib/images/difficulties/4.png";
    import harder from "$lib/images/difficulties/5.png";
    import extreme from "$lib/images/difficulties/6.png";
    import demon from "$lib/images/difficulties/7.png";

    import featured_easy from "$lib/images/difficulties/featured_2.png";
    import featured_normal from "$lib/images/difficulties/featured_3.png";
    import featured_hard from "$lib/images/difficulties/featured_4.png";
    import featured_harder from "$lib/images/difficulties/featured_5.png";
    import featured_extreme from "$lib/images/difficulties/featured_6.png";
    import featured_demon from "$lib/images/difficulties/featured_7.png";

    import trophy from "$lib/images/trophy.png";

    export let difficulty: number;
    export let featured: number;
    export let rated: boolean;

    export let showIcon: boolean = true;
    export let showNumber: boolean = true;
    export let showTrophy: boolean = true;


    let icon = unknownIcon;
    switch (difficulty) {
        case 0:
        case 1:
        case 2:
            icon = (featured == 0 ? easy : featured_easy);
            break;
        case 3:
            icon = (featured == 0 ? normal : featured_normal);
            break;
        case 4:
        case 5:
            icon = (featured == 0 ? hard : featured_hard);
            break;
        case 6:
        case 7:
            icon = (featured == 0 ? harder : featured_harder);
            break;
        case 8:
        case 9:
            icon = (featured == 0 ? extreme : featured_extreme);
            break;
        case 10:
            icon = (featured == 0 ? demon : featured_demon);
            break;
    }
</script>

<div class="difficulty">
    {#if showIcon}
        <img src={icon} alt="Difficulty icon" class="difficulty-icon" style="margin-right: 4px"/>
    {/if}
    {#if showNumber}
        <div>{difficulty}</div>
    {/if}
    {#if showTrophy}
        <div>
            <img src={trophy} class="trophy-display" alt="Trophy icon"/>
        </div>
    {/if}
</div>

<style>
    .difficulty {
        display: flex;
        flex-direction: row;

        font-family: ArcadeClassic, serif;
        font-size: 16px;
    }

    .difficulty-icon {
        height: 24px;
        width: 24px;
    }

    .trophy-display {
        height: 12px;
    }
</style>
