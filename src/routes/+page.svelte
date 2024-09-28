<script lang="ts">
import Counter from '$lib/Counter.svelte';
import Logo from '$lib/Logo.svelte';
import { browser } from '$app/environment';
import Button from '$lib/components/ui/button/button.svelte';
import Input from '$lib/components/ui/input/input.svelte';

let desktop: string;
let portInput: string;

const agent = window.electron ? 'Electron' : 'Browser';

function startServer() {
	const port = parseInt(portInput);
	window.electron.startServer({ port });
}
</script>

<div class="grid h-full w-full place-items-center">
	<div class="flex flex-col gap-8">
		<Input placeholder="Port: 8008" bind:value={portInput} />

		<Button on:click={startServer}>Start Process</Button>
	</div>
</div>
