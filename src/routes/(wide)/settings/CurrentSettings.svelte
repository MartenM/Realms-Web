<script lang="ts">
    import { profileStore } from "$lib/stores/profileStore";
</script>

<h4>Current settings</h4>
<table>
    <tr>
        <td>Authenticated:</td>
        <td>{$profileStore.isAuthenticated ? 'Yes' : 'No'}</td>
    </tr>
    <tr>
        <td>Username:</td>
        <td>{$profileStore.username ?? '—'}</td>
    </tr>
    {#if $profileStore.isAuthenticated}
        <tr>
            <td>Profile ID:</td>
            <td>{$profileStore.id ?? '—'}</td>
        </tr>
    {/if}
</table>