<script lang="ts">
    import type {HighscorePlayer} from "$lib/realmTypes";
    import trophy from "$lib/images/trophy.png";

    export let index = 0;
    export let player: HighscorePlayer;
</script>

{#if index < 3}
    <div class="player place-{index + 1} {index % 2 === 0 ? 'even' : 'odd'}">
        <div class="index">{index + 1}.</div>
        <div class="stats">
            <div class="username">{player.username}</div>
            <div class="amount">{player.trophies}  <img src={trophy} alt="Trophy icon"/></div>
        </div>
    </div>
{:else}
    <div class="player {index % 2 === 0 ? 'even' : 'odd'}">
        <div class="index">{index + 1}.</div>
        <div class="stats">
            <div class="username">{player.username}</div>
            <div class="amount">{player.trophies}  <img src={trophy} alt="Trophy icon"/></div>
        </div>
    </div>
{/if}


<style>
    .place-1 {
        border-color: gold !important;
    }

    .place-2 {
        border-color: silver !important;
    }

    .place-3 {
        border-color: saddlebrown !important;
    }

    .player {
        display: flex;
        flex-direction: row;
        align-items: center;

        border-radius: 0.5em;
        margin-bottom: 5px;

        padding: 5px;

        color: white;

        border: 2px solid transparent;
    }

    .player .index {
        font-family: ArcadeClassic, Serif;
        font-size: 1.5em;
        margin-right: 10px;
    }

    .player .stats {
        display: flex;
        flex-direction: column;
    }

    .stats .username {
        font-size: 0.8em;
        font-family: Joystix, serif;
    }

    .stats .amount {
        font-size: 18px;
        font-family: ArcadeClassic, serif;
    }

    .even {
        background-color: #3a3a3a;

    }

    .odd {
        background-color: #272727;
    }
</style>