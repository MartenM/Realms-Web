<script lang="ts">

    export let realmName: string;
    export let realmId :string
</script>

<a href="/r/{realmId}">
    {realmName}
</a>

<style>
    a {
        color: inherit;
        text-decoration: none;
    }
</style>