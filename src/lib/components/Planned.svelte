<script lang="ts">
    import construction from '$lib/images/construction.png';

    export let message: string | null = null;
</script>

<div class="planned realm-box">
    <h5>This feature is planned!</h5>
    <img src={construction} alt="Construction barrier"/>
    {#if message != null}
        <p>{message}</p>
    {/if}
</div>

<style>
    .planned {
        display: flex;
        flex-direction: column;
        align-items: center;

        content: var(--realm-primary);
        font-family: Joystix, serif;
        text-align: center;

        padding: 3em 0;
    }

    .planned img {
        width: 200px;
    }

    p {
        font-size: 0.7em;
    }
</style>