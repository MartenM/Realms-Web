<script lang="ts">
    import { profileStore } from "$lib/stores/profileStore";
</script>

<h4>Current settings</h4>
<table>
    <tr>
        <td>Username:</td>
        <td>{$profileStore.username}</td>
    </tr>
</table>