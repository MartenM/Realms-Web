import { writable } from 'svelte/store';

export interface MinimapDialog {
    isOpen: boolean;
    worldId: string | null,
    worldName: string | null,
}

export const minimapDialogStore = writable<MinimapDialog>({
    isOpen: false,
    worldId: null,
    worldName: null,
});

export const openMinimap = function (id: string, title: string) : void {
    minimapDialogStore.update( (state) => ({ isOpen: true, worldId: id, worldName: title }));
}