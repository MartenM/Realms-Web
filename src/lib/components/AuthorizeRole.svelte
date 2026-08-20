<script lang="ts">
    import { profileStore } from "$lib/stores/profileStore";
    import type { PlayerGroup } from "$lib/auth/PlayerGroup";

    export let role: PlayerGroup;
</script>

{#if $profileStore.role === role}
    <slot />
{/if}
