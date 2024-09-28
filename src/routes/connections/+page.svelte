<script lang="ts">
import { each } from 'svelte/internal';

let nodes = [];
</script>

<h1 class="text-3xl font-bold">Connected Nodes</h1>

<div class="grid-cols grid">
	{#each nodes as node}{/each}
</div>
