<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let file: File | null = null;
	let isDragging = false;
	let inputElement: HTMLInputElement;

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
		if (droppedFile) {
			file = droppedFile;
		}
	}

	function handleFileChange(e: Event) {
		const target = e.target as HTMLInputElement;
		const selectedFile = target.files?.[0];
		file = selectedFile || null;
	}

	function handleClick() {
		inputElement.click();
	}
</script>

<div class="flex justify-center">
	<div class="grid w-full max-w-md items-center gap-1.5">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors"
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
			<input
				id="picture"
				type="file"
				class="hidden"
				on:change={handleFileChange}
				bind:this={inputElement}
			/>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#000000" d="M18 9q-.013 0-.025.003A6.496 6.496 0 0 0 5 9.5a6.5 6.5 0 0 0 .186 1.519C5.123 11.016 5.064 11 5 11a4 4 0 0 0-4 4c0 1.202.541 2.267 1.38 3h18.593C22.196 17.089 23 15.643 23 14a5 5 0 0 0-5-5m-5 4v3h-2v-3H8l4-5l4 5z"/></svg>
			<p class="mt-2 text-sm text-gray-500">
				{file ? file.name : 'Drop your file here, or click to select'}
			</p>
		</div>
		{#if file}
			<p class="mt-2 text-sm text-gray-500">
				Selected file: {file.name} ({(file.size / 1024).toFixed(2)} KB)
			</p>
		{/if}
	</div>
</div>
