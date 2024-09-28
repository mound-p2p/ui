<script lang="ts">
import * as Card from '$lib/components/ui/card';
import { Badge } from '$lib/components/ui/badge/index.js';
import axios from 'axios';
import { onMount } from 'svelte';

type Node = {
	port: number;
	ip: string;
	peer_id: string;
	location: string;
};

let nodes: Node[] = [
	{
		port: 1234,
		ip: '24.48.0.1',
		peer_id: '1234567890',
		location: 'Ontario, Canada',
	},
	{
		port: 1234,
		ip: '24.48.0.1',
		peer_id: '1234567890',
		location: 'Ontario, Canada',
	},
	{
		port: 1234,
		ip: '24.48.0.1',
		peer_id: '1234567890',
		location: 'Ontario, Canada',
	},
	{
		port: 1234,
		ip: '24.48.0.1',
		peer_id: '1234567890',
		location: 'Ontario, Canada',
	},
];

async function updateNodeLocations() {
	const updatedNodes = await Promise.all(
		nodes.map(async (node) => {
			const response = await axios.get(`http://ip-api.com/json/${node.ip}`);
			return {
				...node,
				location: response.data.city + ', ' + response.data.country,
			};
		}),
	);

	nodes = updatedNodes;
}

onMount(() => {
	updateNodeLocations();
	console.log(nodes);
});
</script>

<h1 class="pb-8 text-center text-3xl font-bold">Connected Nodes:</h1>
<div class="grid place-items-center">
	<div class="grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each nodes as node}
			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-2xl">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M3.055 11a9.01 9.01 0 0 1 6.277-7.598A16.9 16.9 0 0 0 7.029 11zm7.937-9.954C5.39 1.554 1 6.265 1 12s4.39 10.446 9.992 10.955l.008.01l.425.02A13 13 0 0 0 12 23a11 11 0 0 0 .575-.015l.425-.02l.008-.01C18.61 22.444 23 17.735 23 12S18.61 1.554 13.008 1.046L13 1.036l-.426-.021a11 11 0 0 0-1.148 0l-.426.02zM12.002 3a14.9 14.9 0 0 1 2.965 8H9.033a14.9 14.9 0 0 1 2.966-8H12M7.028 13c.16 2.76.98 5.345 2.303 7.598A9.01 9.01 0 0 1 3.055 13zm4.97 8a14.9 14.9 0 0 1-2.966-8h5.934A14.9 14.9 0 0 1 12 21zm2.67-.402A16.9 16.9 0 0 0 16.97 13h3.974a9.01 9.01 0 0 1-6.276 7.598M16.97 11c-.16-2.76-.98-5.345-2.303-7.598A9.01 9.01 0 0 1 20.945 11z"
							/>
						</svg>
						{node.ip} : {node.port}

						<Badge variant="outline" class="border-0 bg-green-300">Connected</Badge>
					</Card.Title>
					<Card.Description>
						<p class="text-md">id: {node.peer_id}</p>
					</Card.Description>
				</Card.Header>
				<Card.Content class="pb-4 pt-1">
					<p class="text-md">
						<span class="text-lg font-bold">Location:</span>
						{node.location}
					</p>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</div>
