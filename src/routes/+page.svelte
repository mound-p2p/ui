<script lang="ts">
import Counter from '$lib/Counter.svelte';
import Logo from '$lib/Logo.svelte';
import { browser } from '$app/environment';
import Button from '$lib/components/ui/button/button.svelte';
import Input from '$lib/components/ui/input/input.svelte';

let desktop: string;
let port: string;
let seed: string;
let chunkDir: string;
const agent = window.electron ? 'Electron' : 'Browser';

function startServer() {
	window.electron.startServer({ port: parseInt(port), seed, chunkDir });
}
</script>

<div class="grid h-full w-full place-items-center">
	<div class="flex flex-col gap-8">
		<Input placeholder="Seed: 0.0.0.0" bind:value={seed} />
		<Input placeholder="Port: 8008" bind:value={port} />
		<Input placeholder="Chunk Dir: 8008" bind:value={chunkDir} />

		<Button on:click={startServer}>Start Process</Button>
	</div>
</div>
