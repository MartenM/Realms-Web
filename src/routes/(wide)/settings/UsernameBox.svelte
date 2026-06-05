<script lang="ts">
    import { profileStore } from "$lib/stores/profileStore";

    let code = '';
    let message = '';
    let loading = false;

    async function submitCode(event: Event) {
        event.preventDefault();
        message = '';

        const trimmedCode = code?.trim();
        if (!trimmedCode) {
            message = 'Paste your authentication code before submitting.';
            return;
        }

        loading = true;
        try {
            await profileStore.authenticateWithCode(trimmedCode);
            message = 'Authentication successful.';
            code = '';
        } catch (error) {
            message = error?.message ?? 'Authentication failed. Please verify the code and try again.';
        } finally {
            loading = false;
        }
    }

    function signOut() {
        profileStore.signOut();
        message = 'Signed out successfully.';
    }
</script>

{#if $profileStore.isAuthenticated}
    <div class="auth-status">
        <p>Authenticated as <strong>{$profileStore.username}</strong>.</p>
        <button type="button" class="btn btn-save" on:click={signOut}>Sign out</button>
    </div>
{:else}
    <form class="auth-form form-inline" on:submit|preventDefault={submitCode}>
        <div class="input-group auth-input-group">
            <label for="profile-code">Authentication code</label>
            <input id="profile-code" bind:value={code} class="form-control mr-sm-2" type="text" placeholder="Paste your code here" aria-label="Authentication code" />
            <button class="btn btn-save my-2 my-sm-0" type="submit" disabled={loading}>{loading ? 'Authenticating...' : 'Authenticate'}</button>
        </div>
    </form>
    <div class="auth-guide realm-box">
        <p>Need a code? Follow these steps:</p>
        <ol>
            <li>Visit <a href="https://pixelwalker.net/world/mknckr7oqxq24xa" target="_blank" rel="noreferrer">https://pixelwalker.net/world/mknckr7oqxq24xa</a></li>
            <li>Use the command <span class="code">.login</span></li>
            <li>Paste the received code in the textbox above</li>
        </ol>
    </div>
{/if}

{#if message}
    <div class="message">{message}</div>
{/if}

<style>
    .auth-form {
        padding: 0rem 4rem;
    }

    .auth-guide {
        padding: 0.8rem;
        margin: 0.8rem;
        background-color: var(--realm-background);
        border: 1px solid #f0a900;
        border-radius: 0.5rem;
    }

    .auth-input-group {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }

    .auth-input-group label {
        margin: 0 0.75rem 0 0;
        white-space: nowrap;
    }

    .btn-save {
        background-color: #f0a900;
        color: white;
    }

    .auth-status {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .message {
        margin-top: 0.8rem;
        color: #ffd700;
    }
</style>
