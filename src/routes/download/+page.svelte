<script lang="ts">
import * as Card from '$lib/components/ui/card';
import { Badge } from '$lib/components/ui/badge/index.js';
import axios from 'axios';
import { onMount } from 'svelte';
import Button from '$lib/components/ui/button/button.svelte';

type File = {
	name: string;
	hash: string;
	size: number; // In bytes
};

let files: File[] = [
	{
		name: 'File Name',
		hash: '24.48.0.1',
		size: 1234567,
	},
	{
		name: 'File Name 2',
		hash: '24.132891738912dwas48.0.1',
		size: 12345132167,
	},
	{
		name: 'File Name 3',
		hash: '24.48.0.3193781892y738121',
		size: 1231221567,
	},
];
</script>

<h1 class="pb-8 text-center text-3xl font-bold">Available Files:</h1>
<div class="grid place-items-center">
	<div class="grid w-full max-w-5xl grid-cols-3 gap-8">
		{#each files as file}
			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-3 text-2xl">
						{file.name}
					</Card.Title>
					<Card.Description>
						<p class="text-md">hash: {file.hash}</p>
						<p class="text-md">size: {file.size}</p>
					</Card.Description>
					<Button href="/download" variant="outline" class=" p-6">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="32"
							height="32"
							viewBox="0 0 24 24"
						>
							<path fill="currentColor" d="M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z" />
						</svg>
					</Button>
				</Card.Header>
				<Card.Content class="pb-4 pt-1"></Card.Content>
			</Card.Root>
		{/each}
	</div>
</div>
