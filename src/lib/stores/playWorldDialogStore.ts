import { writable } from 'svelte/store';

export interface PlayWorldDialogType {
    isOpen: boolean;
    world: PublishedWorld | null;
}

export const playWorldDialogStore = writable<PlayWorldDialogType>({
    isOpen: false,
    world: null,
});

export const openPlayDialog = function (world: PublishedWorld) : void {
    playWorldDialogStore.update( (state) => ({ isOpen: true, world: world }));
}