<script lang="ts">
import { Input } from '$lib/components/ui/input';
import { Label } from '$lib/components/ui/label';
import Button from '$lib/components/ui/button/button.svelte';
import { Progress } from '$lib/components/ui/progress';

let isDragging = false;
let uploadProgress = 0;
let file: {
	path: string;
	name: string;
	size: number;
} | null = null;

function handleDragEnter(e: DragEvent) {
	e.preventDefault();
	e.stopPropagation();
	isDragging = true;
}

function handleDragLeave(e: DragEvent) {
	e.preventDefault();
	e.stopPropagation();
	isDragging = false;
}

function handleDragOver(e: DragEvent) {
	e.preventDefault();
	e.stopPropagation();
}

function handleDrop(e: DragEvent) {
	e.preventDefault();
	e.stopPropagation();
	isDragging = false;

	const droppedFile = e.dataTransfer?.files[0];
}

async function handleClick() {
	const path = await window.electron.openDialog();

	file = path ?? null;
}

async function uploadFile() {
	if (!file) {
		return;
	}

	const res = await window.electron.sendRequest({ type: 'upload', path: file.path });

	window.electron.receive(`response:${res.id}`, ({ data }) => {
		uploadProgress = data.progress;
	});
}
</script>

<h1 class="pb-8 text-center text-3xl font-bold">Upload Files:</h1>
<div class="flex justify-center">
	<div class="grid w-full max-w-5xl items-center justify-items-center gap-1.5">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors"
			class:border-primary={isDragging}
			class:bg-primary-100={isDragging}
			class:border-gray-300={!isDragging}
			class:hover:bg-gray-50={!isDragging}
			on:dragenter={handleDragEnter}
			on:dragleave={handleDragLeave}
			on:dragover={handleDragOver}
			on:drop={handleDrop}
			on:click={handleClick}
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
				<path
					fill="#000000"
					d="M18 9q-.013 0-.025.003A6.496 6.496 0 0 0 5 9.5a6.5 6.5 0 0 0 .186 1.519C5.123 11.016 5.064 11 5 11a4 4 0 0 0-4 4c0 1.202.541 2.267 1.38 3h18.593C22.196 17.089 23 15.643 23 14a5 5 0 0 0-5-5m-5 4v3h-2v-3H8l4-5l4 5z"
				/>
			</svg>
			<p class="mt-2 text-sm text-gray-500">
				{file ? file.name : 'Drop your file here, or click to select'}
			</p>
		</div>
		{#if file}
			<p class="mt-2 text-sm text-gray-500">
				Selected file: {file.name} ({(file.size / 1024).toFixed(2)} KiB)
			</p>
		{/if}

		<Progress value={uploadProgress * 100} class="my-8"></Progress>
		<Button class=" w-32" on:click={uploadFile}>Upload</Button>
	</div>
</div>
