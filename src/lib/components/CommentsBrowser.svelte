<script lang="ts">

import Smiley from "$lib/components/Smiley.svelte";
</script>

<div class="comments-browser">
    <div class="comment">
        <Smiley id={4}/>
        <div class="stats">
            <div>TEST USER</div>
            <div>Pretty epic world!</div>
        </div>
    </div>
    <div class="comment">
        <Smiley id={4}/>
        <div class="stats">
            <div>TEST USER</div>
            <div>Pretty epic world!</div>
        </div>
    </div>
    <div class="comment">
        <Smiley id={4}/>
        <div class="stats">
            <div>TEST USER</div>
            <div>Pretty epic world!</div>
        </div>
    </div>
</div>

<style>
    .comment {
        display: flex;
        flex-direction: row;
        padding: 0.5em;
    }

    .comments-browser .comment:nth-child(even) {
        background-color: #3a3a3a;
    }

    .comments-browser .comment:nth-child(odd) {
        background-color: #555555;
    }

    .comments-browser {
        border: 1px solid gold;
        max-height: 50vh;
        overflow-y: scroll;
        /*overflow-x: hidden;*/
    }

    .stats {
        display: flex;
        flex-direction: column;
    }

    .stats div:nth-child(1) {
        font-family: Joystix, serif;
    }

    .stats div:nth-child(2) {
        font-family: Roboto, serif;
    }
</style>