<script lang="ts">
    import trophy from "$lib/images/trophy.png";
    import builder from "$lib/images/builder_block.png";

    export let highscoreType: string;
    export let index = 0;
    export let player: HighscorePlayer;
</script>

<div class="player place-{index + 1} {index % 2 === 0 ? 'even' : 'odd'}">
    <div class="index">{index + 1}</div>
    <div class="username" title={player.username}>{player.username}</div>
    <div class="amount">
        {player.amount}
        {#if highscoreType === 'Trophies'}
            <img src={trophy} alt="Trophy icon"/>
        {:else}
            <img src={builder} alt="Builder icon"/>
        {/if}
    </div>
</div>

<style>
    .player {
        display: grid;
        grid-template-columns: 50px 1fr auto;
        align-items: center;

        padding: 5px 5px;
        margin-bottom: 6px;

        border: 2px solid transparent;
        border-radius: 10px;

        color: #fff;
        font-family: Joystix, ArcadeClassic, serif;

        background-color: #2b2b2b;
        transition: background 0.2s ease, transform 0.1s ease;
    }

    .player:hover {
        background-color: #3e3e3e;
        transform: scale(1.01);
    }

    .place-1 {
        border-color: gold !important;
        background: linear-gradient(90deg, rgba(255,215,0,0.15), rgba(43,43,43,1));
    }

    .place-2 {
        border-color: silver !important;
        background: linear-gradient(90deg, rgba(192,192,192,0.15), rgba(43,43,43,1));
    }

    .place-3 {
        border-color: #cd7f32 !important;
        background: linear-gradient(90deg, rgba(205,127,50,0.15), rgba(43,43,43,1));
    }

    .index {
        font-size: 1.3em;
        text-align: center;
        font-family: ArcadeClassic, serif;
    }

    .username {
        font-size: 0.9em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 10px;
        color: #eaeaea;
    }

    .amount {
        display: flex;
        align-items: center;
        font-size: 1em;
        font-family: ArcadeClassic, serif;
        white-space: nowrap;
    }

    img {
        margin-left: 5px;
        height: 18px;
        width: auto;
        vertical-align: middle;
        filter: drop-shadow(0 0 2px rgba(255,255,255,0.4));
    }

    .even {
        background-color: #2f2f2f;
    }

    .odd {
        background-color: #252525;
    }
</style>
