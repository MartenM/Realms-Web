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

    function parseDurationToMs(value: string): number | null {
        const match = value.match(/^(\d+):([0-5]\d):([0-5]\d)(?:\.(\d+))?$/);

        if (!match) {
            return null;
        }

        const hours = Number(match[1]);
        const minutes = Number(match[2]);
        const seconds = Number(match[3]);
        const fraction = match[4] ? Number(`0.${match[4]}`) : 0;

        return (((hours * 60 + minutes) * 60) + seconds + fraction) * 1000;
    }

    function formatDuration(ms: number): string {
        const totalMilliseconds = Math.max(0, Math.round(ms));
        const hours = Math.floor(totalMilliseconds / 3_600_000);
        const minutes = Math.floor((totalMilliseconds % 3_600_000) / 60_000);
        const seconds = Math.floor((totalMilliseconds % 60_000) / 1000);
        const tenths = Math.floor((totalMilliseconds % 1000) / 100);

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths}`;
    }

    function formatSignedDuration(ms: number): string {
        return `${ms < 0 ? '-' : '+'}${formatDuration(Math.abs(ms))}`;
    }

    function getSpeedrunDelta(): string | null {
        const previousRecord = currentEvent.extraVariables?.['previous_record'];
        const newRecord = currentEvent.extraVariables?.['new_record'];

        if (!previousRecord || !newRecord) {
            return null;
        }

        const previousMs = parseDurationToMs(previousRecord);
        const newMs = parseDurationToMs(newRecord);

        if (previousMs === null || newMs === null) {
            return null;
        }

        return formatSignedDuration(newMs - previousMs);
    }

    function getActivityIconClass(eventType: string): string {
        if (eventType === 'RealmRated') {
            return 'bx bx-trophy';
        }

        if (eventType === 'RealmPublished') {
            return 'bx bx-world';
        }

        if (eventType === 'PlayerRealmCompleted') {
            return 'bx bx-check-circle';
        }

        if (eventType === 'RealmSpeedrunBeaten') {
            return 'bx bx-stopwatch';
        }

        return 'bx bx-bell';
    }
</script>


<div class="activity-item">
    <div class="activity-message">
        {#if hasExtraVariables(currentEvent)}
            {#if currentEvent.eventType === "RealmRated"}
                <div class="activity-line">
                    <i class={getActivityIconClass(currentEvent.eventType)} aria-hidden="true"></i>
                    <span class="activity-content"><RealmLink realmId="{currentEvent.extraVariables['realm_hash']}" realmName="{currentEvent.extraVariables['realm_name']}" /> has been rated!</span>
                </div>
            {:else if currentEvent.eventType === 'RealmPublished'}
                <div class="activity-line">
                    <i class={getActivityIconClass(currentEvent.eventType)} aria-hidden="true"></i>
                    <span class="activity-content"><RealmLink realmId="{currentEvent.extraVariables['realm_hash']}" realmName="{currentEvent.extraVariables['realm_name']}" /> was published!</span>
                </div>
            {:else if currentEvent.eventType === 'PlayerRealmCompleted'}
                <div class="activity-line">
                    <i class={getActivityIconClass(currentEvent.eventType)} aria-hidden="true"></i>
                    <span class="activity-content"><ProfileLink username={currentEvent.extraVariables['player_name']}/> has completed <RealmLink realmId="{currentEvent.extraVariables['realm_hash']}" realmName="{currentEvent.extraVariables['realm_name']}" /></span>
                </div>
            {:else if currentEvent.eventType === 'RealmSpeedrunBeaten'}
                <div class="activity-line">
                    <i class={getActivityIconClass(currentEvent.eventType)} aria-hidden="true"></i>
                    <span class="activity-content"><ProfileLink username={currentEvent.extraVariables['player_name']}/> has beaten the fastest time on <RealmLink realmId={currentEvent.extraVariables['realm_hash']} realmName={currentEvent.extraVariables['realm_name']} />: {currentEvent.extraVariables['new_record']}{#if getSpeedrunDelta()}
                            {' '}
                            ({getSpeedrunDelta()})
                        {/if}</span>
                </div>
            {:else if currentEvent.eventType === 'RealmBullet'}
                <div class="activity-line">
                    <i class={getActivityIconClass(currentEvent.eventType)} aria-hidden="true"></i>
                    <span class="activity-content">Realm bullet event</span>
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

    .activity-line {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        align-items: center;
        column-gap: 0.45rem;
        min-width: 0;
        line-height: 1.35;
    }

    .activity-line i {
        width: 1rem;
        height: 1rem;
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        line-height: 1;
    }

    .activity-content {
        min-width: 0;
    }

    .activity-time {
        flex-shrink: 0;
        text-align: right;
        opacity: 0.6;
        font-size: 0.85em;
        white-space: nowrap;
    }
</style>