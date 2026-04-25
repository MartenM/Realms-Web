<script lang="ts">

    export let username: string;
    export let showIcon : boolean = false;
</script>

<a href="/profile/{username}">
    {username}
    {#if showIcon}
        <i class='bx bx-link-external' ></i>
    {/if}
</a>

<style>
    a {
        color: inherit;
        text-decoration: none;
    }
</style>