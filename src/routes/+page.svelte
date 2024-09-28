<script lang="ts">
import Counter from '$lib/Counter.svelte';
import Logo from '$lib/Logo.svelte';
import { browser } from '$app/environment';
import Button from '$lib/components/ui/button/button.svelte';
import Input from '$lib/components/ui/input/input.svelte';

let desktop: string;

if (window.electron && browser) {
	window.electron.receive('from-main', (data: any) => {
		desktop = `Received Message "${data}" from Electron`;
		console.log(desktop);
	});
}

const agent = window.electron ? 'Electron' : 'Browser';
</script>

<div class="grid h-full w-full place-items-center">
	<div class="flex flex-col gap-8">
		<Input placeholder="Port: 8008" />

		<Button>Start Process</Button>
	</div>
</div>
