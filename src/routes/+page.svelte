<script lang="ts">
import Button from '$lib/components/ui/button/button.svelte';
import Input from '$lib/components/ui/input/input.svelte';
import { ready } from '$lib/stores';

let desktop: string;
let port: string;
let seed: string;
let chunkDir: string;
const agent = window.electron ? 'Electron' : 'Browser';

async function startServer() {
	await window.electron.startServer({ port: parseInt(port), seed, chunkDir });
	ready.set(true);
}
</script>

<div class="grid h-screen w-screen place-items-center">
	<div class="flex flex-col items-center justify-center gap-8">
		<h1 class="pb-8 text-center text-3xl font-bold">Launch Process:</h1>
		<Input placeholder="Seed: 0.0.0.0" bind:value={seed} />
		<Input placeholder="Port: 8008" bind:value={port} />
		<Input placeholder="Chunk Dir: 8008" bind:value={chunkDir} />

		<Button on:click={startServer}>Start Process</Button>
	</div>
</div>
