<script lang="ts">
import * as Card from '$lib/components/ui/card';
import { Button } from '$lib/components/ui/button';
import { Badge } from '$lib/components/ui/badge/index.js';

type Node = {
	port: number;
	ip: string;
	peer_id: string;
};

let nodes: Node[] = [
	{
		port: 1234,
		ip: '0.0.0.0',
		peer_id: '1234567890',
	},
	{
		port: 1234,
		ip: '0.0.0.0',
		peer_id: '1234567890',
	},
	{
		port: 1234,
		ip: '0.0.0.0',
		peer_id: '1234567890',
	},
	{
		port: 1234,
		ip: '0.0.0.0',
		peer_id: '1234567890',
	},
];
</script>

<h1 class="pb-8 text-center text-3xl font-bold">Connected Nodes:</h1>
<div class="grid place-items-center">
	<div class="grid w-full max-w-5xl grid-cols-3 gap-8">
		{#each nodes as node}
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-2xl">{node.ip}:{node.port}</Card.Title>
					<Card.Description>
						<p class="text-md">id: {node.peer_id}</p>
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<Badge variant="outline" class="border-0 bg-green-300">Connected</Badge>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</div>
