<script lang="ts">
import { Button } from '$lib/components/ui/button';
let links = [
	{ name: 'Server', href: '/' },
	{ name: 'Upload', href: '/upload' },
	{ name: 'Download', href: '/download' },
	{ name: 'Node Connections', href: '/connections' },
	{ name: 'Statistics', href: '/statistics' },
];
</script>

<nav class="border-b">
	<div class="mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<span class="text-xl font-bold text-primary">FileShare</span>
			<div class="place-items-center">
				{#each links as link}
					<Button href={link.href} variant="link">
						{link.name}
					</Button>
				{/each}
			</div>
		</div>
	</div>
</nav>
