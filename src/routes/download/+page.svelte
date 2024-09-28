<script lang="ts">
import * as Card from '$lib/components/ui/card';
import { onMount } from 'svelte';
import Button from '$lib/components/ui/button/button.svelte';
import { Progress } from '$lib/components/ui/progress';

let files: (ProcessFile & { downloadProgress?: number })[] = [];

onMount(async () => {
	const res = await window.electron.sendRequest({ type: 'getFiles' });
	files = res.data;
	console.log(files);
});

async function downloadFile(event: Event, file_hash: string) {
	event.preventDefault();
	console.log('downloadFile', file_hash);
	const res = await window.electron.sendRequest({ type: 'downloadByHash', fileHash: file_hash });
	console.log(res);
	window.electron.receive(`response:${res.id}`, ({ data }) => {
		console.log('download progress', data.progress);
		files.map((file) => {
			if (file.id === file_hash) {
				file.downloadProgress = data.progress;
			}
		});
	});
}
</script>

<h1 class="pb-8 text-center text-3xl font-bold">Available Files:</h1>
<div class="grid place-items-center">
	<div class="grid w-full max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#each files as file}
			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-3 text-2xl">
						{file.name}
					</Card.Title>
					<Card.Description class="flex flex-col gap-2">
						<p class="text-md">hash: {file.id}</p>
						<p class="text-md">chunk amount: {file.chunks}</p>
						<p class="text-md">peers with parts: {file.chunks}</p>

						{#if file.downloadProgress}
							<Progress value={file.downloadProgress * 100} />
						{/if}
					</Card.Description>
				</Card.Header>
				<Card.Content class="pb-4 pt-1"></Card.Content>
				<Card.Footer>
					<Button
						variant="outline"
						type="button"
						class="w-full p-6"
						on:click={(e) => downloadFile(e, file.id)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 24 24"
						>
							<path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z" />
						</svg>
					</Button>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>
