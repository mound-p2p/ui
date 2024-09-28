<script lang="ts">
import * as Card from '$lib/components/ui/card';

let stats = [
	{
		title: 'Downloaded File Chunks',
		value: 3321312,
	},
	{
		title: 'Uploaded File Chunks',
		value: 312321,
	},
	{
		title: 'Downloaded Files',
		value: 123,
	},
	{
		title: 'Uploaded Files',
		value: 312312,
	},
	{
		title: 'Downloaded File Chunks',
		value: 312312,
	},
	{
		title: 'Most Downloaded File',
		value: 'Name',
	},
];
</script>

<h1 class="pb-8 text-center text-3xl font-bold">Statistics:</h1>

<div class="grid place-items-center">
	<div class="grid max-w-7xl grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
		{#each stats as stat}
			<Card.Root class="w-full">
				<Card.Header>
					<Card.Title class="flex place-items-center">{stat.title}</Card.Title>
				</Card.Header>

				<Card.Content>
					{stat.value}
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</div>
