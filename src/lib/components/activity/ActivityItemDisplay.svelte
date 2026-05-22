<script lang="ts">
    import type {ActivityEventDto} from "$lib/api/ApiClient";
    import ProfileLink from "$lib/components/ProfileLink.svelte";
    import RealmLink from "$lib/components/RealmLink.svelte";
    export let currentEvent: ActivityEventDto;

    function hasExtraVariables(
        event: ActivityEventDto
    ): event is ActivityEventDto & {
        extraVariables: Record<string, string>;
    } {
        return !!event.extraVariables;
    }

    function timeSince(date?: Date): string {
        if (!date) return '';

        const seconds = Math.floor(
            (Date.now() - new Date(date).getTime()) / 1000
        );

        if (seconds < 60) {
            return `${seconds} second${seconds !== 1 ? 's' : ''}`;
        }

        const minutes = Math.floor(seconds / 60);

        if (minutes < 60) {
            return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
        }

        const hours = Math.floor(minutes / 60);

        if (hours < 24) {
            return `${hours} hour${hours !== 1 ? 's' : ''}`;
        }

        const days = Math.floor(hours / 24);

        return `${days} day${days !== 1 ? 's' : ''}`;
    }
</script>


<div class="activity-item">
    <div class="activity-message">
        {#if hasExtraVariables(currentEvent)}
            {#if currentEvent.eventType === "RealmRated"}
                <div>
                    <RealmLink realmId="{currentEvent.extraVariables['realm_hash']}" realmName="{currentEvent.extraVariables['realm_name']}" /> has been rated!
                </div>

            {:else if currentEvent.eventType === 'PlayerRealmCompleted'}
                <div>
                    <ProfileLink username={currentEvent.extraVariables['player_name']}/> has completed <RealmLink realmId="{currentEvent.extraVariables['realm_hash']}" realmName="{currentEvent.extraVariables['realm_name']}" />
                </div>
            {:else if currentEvent.eventType === 'RealmBullet'}
                <div>
                    Realm bullet event
                </div>
            {/if}
        {/if}
    </div>
    <div class="activity-time">
        {timeSince(currentEvent.createdAt)} ago
    </div>
</div>

<style>
    .activity-item {
        display: flex;
        justify-content: space-between;
        align-items: center;

        width: 100%;
        gap: 12px;

        font-size: 14px
    }

    .activity-message {
        flex: 1;
        text-align: left;
        min-width: 0; /* prevents overflow issues in flex */
        opacity: 0.8;
    }

    .activity-time {
        flex-shrink: 0;
        text-align: right;
        opacity: 0.6;
        font-size: 0.85em;
        white-space: nowrap;
    }
</style>