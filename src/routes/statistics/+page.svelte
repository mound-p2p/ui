<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { onDestroy, onMount } from 'svelte';

	let stats: any;

	let a: number;
	let b: number;
	let c: number;

	let data;
	let interval: NodeJS.Timer;
	onMount(() => {
		if (!localStorage.getItem('ufc')) {
			localStorage.setItem('ufc', '0');
		}
		if (!localStorage.getItem('dfc')) {
			localStorage.setItem('dfc', '0');
		}
		if (!localStorage.getItem('df')) {
			localStorage.setItem('df', '0');
		}

		a = Number(localStorage.getItem('ufc'));
		b = Number(localStorage.getItem('dfc'));
		c = Number(localStorage.getItem('df'));

		let difa = 0;
		let difb = 0;
		let difc = 0;

		interval = setInterval(async () => {
			const res = await window.electron.sendRequest({ type: 'getStats' });
			data = res.data;
			a = a + data.uploadedChunks - difa;
			b = b + data.downloadedChunks - difb;
			c = c + data.downloadedFiles - difc;

			difa = data.uploadedChunks;
			difb = data.downloadedChunks;
			difc = data.downloadedFiles;
		}, 1000);

		stats = [
			{
				title: 'Uploaded File Chunks',
				value: a,
			},

			{
				title: 'Downloaded File Chunks',
				value: b,
			},

			{
				title: 'Downloaded Files',
				value: c,
			},
			{
				title: 'Uploaded Files',
				value: 312312,
			},
			{
				title: 'Downloaded File Chunks',
				value: 312312,
			},
			{
				title: 'Most Downloaded File',
				value: 'Name',
			},
		];
	});

	onDestroy(() => {
		clearInterval(interval);
		localStorage.setItem('ufc', a.toString());
		localStorage.setItem('dfc', b.toString());
		localStorage.setItem('df', c.toString());
	});
</script>

<h1 class="pb-8 text-center text-3xl font-bold">Statistics:</h1>

<div class="grid place-items-center">
	<div class="grid max-w-7xl grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#if stats}
			{#each stats as stat}
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
