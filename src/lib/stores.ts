import { writable } from 'svelte/store';

export const ready = writable(false);

export const statsDiff = writable<Stats>({
	uploadedChunks: 0,
	downloadedChunks: 0,
	downloadedFiles: 0,
});
