<script lang="ts">
    import { difficultyMetas} from "$lib/DifficultyImages";

    let totalMetas = difficultyMetas;
    export let selectedMetas: DifficultyMeta[] = [];

    function toggleMeta(meta: DifficultyMeta) {

        if (!selectedMetas.includes(meta)) {
            console.log("Adding: ", meta)
            selectedMetas.push(meta);
        } else {
            console.log("Removing: ", meta)
            selectedMetas.splice(selectedMetas.indexOf(meta), 1);
        }

        totalMetas = [...totalMetas];
    }
</script>

<div class="realm-box bar">
    {#each totalMetas as meta}
        <div class="difficulty" class:selected={selectedMetas.includes(meta)} class:unselected={!selectedMetas.includes(meta)} on:click={() => toggleMeta(meta)} >
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
        height: 40px;
        margin-right: 3px;
    }

    .difficulty {
        display: flex;
        text-align: center;
        flex-direction: column;
        align-content: center;
        justify-content: center;

        font-size: 12px;
        line-height: 1.8;
    }

    .unselected {
        color: grey;
        filter: grayscale(100%);
    }

    .selected {

    }
</style>