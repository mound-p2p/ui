<script lang="ts">
import Navbar from '$lib/components/Navbar.svelte';
import '../app.css';
import { onMount } from 'svelte';

let ready: boolean = false;
onMount(() => (ready = true));
</script>

<div class="dragbar"/>

{#if ready}
	<Navbar />
	<div class="p-8">
		<slot />
	</div>
{/if}

<style>
.dragbar {
	-webkit-app-region: drag;
	position: absolute;
	z-index: 100;
	height: 20px;
	width: 100%;
}
</style>
