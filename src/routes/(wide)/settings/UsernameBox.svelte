<script lang="ts">
    import { profileStore } from "$lib/stores/profileStore";

    let username = $profileStore.username;

    function changeUsername() {
        profileStore.setUsername(username);
        username = $profileStore.username;
    }
</script>

<form class="form-inline">
    <div class="input-group">
        <label for="username">Username used to personalize some elements of the site.</label>
        <input bind:value={username} class="form-control mr-sm-2" type="text" id="username" placeholder="Username" aria-label="Username">
        <button on:click={changeUsername} class="btn btn-save my-2 my-sm-0">Save</button>
    </div>
</form>

<style>
    .btn-save {
        background-color: #f0a900;
        color: white;
    }
</style>
