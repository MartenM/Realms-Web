<script lang="ts">
    import construction from '$lib/images/construction.png';

    export let message: string | null = null;
</script>

<div class="search realm-box">
    <h5>This feature is planned!</h5>
    <img src={construction} alt="Construction barrier"/>
    {#if message != null}
        <p>{message}</p>
    {/if}
</div>

<style>
    .search {
        content: var(--realm-primary);
        font-family: Joystix, serif;
        text-align: center;

        padding: 3em 0;
    }

    .search img {
        width: 200px;
    }

    p {
        font-size: 0.7em;
    }
</style>