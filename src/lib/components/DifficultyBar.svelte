<script lang="ts">
    import { difficultyMetas} from "$lib/DifficultyImages";

</script>

<div class="realm-box bar">
    {#each difficultyMetas as meta}
        <div class="difficulty">
            <img src="{meta.icon}" alt="{meta.name}"/>
            <div>{meta.name}</div>
        </div>
    {/each}
</div>

<style>
    .bar {
        margin-top: 10px;
        margin-bottom: 10px;

        padding: 0.2em 2em;

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-content: center;
    }

    .difficulty img {
        height: 20px;
        margin-right: 3px;
    }

    .difficulty {
        display: flex;
        align-content: center;
        justify-content: center;

        font-size: 12px;
        line-height: 1.8;
    }
</style>