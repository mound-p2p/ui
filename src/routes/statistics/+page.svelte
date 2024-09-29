<script lang="ts">
import * as Card from '$lib/components/ui/card';
import { statsDiff } from '$lib/stores';
import { onDestroy, onMount } from 'svelte';
import { get } from 'svelte/store';

let stats: Stats = {
	uploadedChunks: 0,
	downloadedChunks: 0,
	downloadedFiles: 0,
};

let interval: NodeJS.Timeout;
onMount(() => {
	const statsString = localStorage.getItem('stats');

	stats = statsString
		? JSON.parse(statsString)
		: {
				uploadedChunks: 0,
				downloadedChunks: 0,
				downloadedFiles: 0,
			};

	async function update() {
		const { data } = await window.electron.sendRequest({ type: 'getStats' });
		const diff = get(statsDiff);

		stats.uploadedChunks += data.uploadedChunks - diff.uploadedChunks;
		stats.downloadedChunks += data.downloadedChunks - diff.downloadedChunks;
		stats.downloadedFiles += data.downloadedFiles - diff.downloadedFiles;

		statsDiff.set(data);
	}

	update();
	interval = setInterval(update, 1000);
});

$: liveStats = [
	{
		title: 'Uploaded File Chunks',
		value: stats.uploadedChunks,
	},

	{
		title: 'Downloaded File Chunks',
		value: stats.downloadedChunks,
	},

	{
		title: 'Downloaded Files',
		value: stats.downloadedFiles,
	},
	{
		title: 'Uploaded Files',
		value: 3,
	},
	{
		title: 'Most Downloaded File',
		value: '.gitignore',
	},
];

onDestroy(() => {
	if (interval) clearInterval(interval);
	localStorage.setItem('stats', JSON.stringify(stats));
});
</script>

<h1 class="pb-8 text-center text-3xl font-bold">Statistics:</h1>

<div class="grid place-items-center">
	<div class="grid max-w-7xl grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#if stats}
			{#each liveStats as stat}
				<Card.Root class="w-full">
					<Card.Header>
						<Card.Title class="flex place-items-center">{stat.title}</Card.Title>
					</Card.Header>

					<Card.Content>
						{stat.value}
					</Card.Content>
				</Card.Root>
			{/each}
		{/if}
	</div>
</div>
