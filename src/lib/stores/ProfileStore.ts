import { writable } from 'svelte/store';

export const profileStore = writable<Profile>({
    isSet: false,
    name: "",
    pwId: ""
})