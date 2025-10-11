<script lang="ts">
    import UsernameBox from "./UsernameBox.svelte";
    import Planned from "$lib/components/Planned.svelte";
</script>

<div class="realm-box settings">
    <h4>Settings</h4>
    <hr>
    <div class="row">
       <div class="col-md-5">
           <UsernameBox/>
       </div>
    </div>
    <hr>
    <h5>Account settings</h5>
    <div class="container">
        <Planned message="Or maybe not.. who knows?"/>
    </div>
</div>

<style>
    .settings {
        padding: 1em;
    }
</style>