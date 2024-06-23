<script lang="ts">
    import { afterUpdate } from "svelte";

    export let difficulty : number | null;

    let className = getClass(difficulty);
    function getClass(difficulty: number | null) {
        switch (difficulty) {
            case 0:
            case 1:
            case 2:
                return "easy";
            case 3:
                return "normal";
            case 4:
            case 5:
                return "hard";
            case 6:
            case 7:
                return "harder";
            case 8:
            case 9:
                return "extreme";
            case 10:
                return "demon";
        }

        return null;
    }

    afterUpdate(() => {
        className = getClass(difficulty);
    })
</script>

<div class="box {className} {className != null ? 'shiny-background' : ''}">
    <slot/>
</div>

<!--suppress CssUnusedSymbol -->
<style>
    .easy {
        background-color: #007fff;
    }

    .normal {
        background-color: #28c800;
    }

    .hard {
        background-color: #ffd115;
    }

    .harder {
        background-color: #ea2828;
    }

    .extreme {
        background-color: #d72aff;
    }

    .demon {
        background-color: #a80000;
    }

    .box {
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    }

    .shiny-background {
        background-image: linear-gradient(135deg, rgba(47, 134, 154, 0) 30%, rgba(255, 255, 255, 0.34) 50%, rgba(47, 134, 154, 0) 70%);
        /*background: linear-gradient(135deg, rgba(255, 255, 255, 0) 25%, #2f869a 50%, rgba(255, 255, 255, 0) 75%);*/
        background-size: 200% 200%;
        animation: shine 4s infinite linear;
    }

    @keyframes shine {
        0% {
            background-position: 100% 0;
        }
        100% {
            background-position: -100% 0;
        }
    }
</style>