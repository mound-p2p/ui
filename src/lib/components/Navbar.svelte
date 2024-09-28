<script lang="ts">
import { Button } from '$lib/components/ui/button';
let links = [
	{ name: 'Home', href: '/' },
	{ name: 'Data', href: '/data' },
	{ name: 'Connections', href: '/connections' },
];
</script>

<nav class="border-b">
	<div class="mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<span class="text-primary text-xl font-bold">FileShare</span>
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
