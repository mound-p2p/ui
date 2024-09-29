<script lang="ts">
import Navbar from '$lib/components/Navbar.svelte';
import { ready } from '$lib/stores';
import '../app.css';
import { onMount } from 'svelte';
</script>

<div class="dragbar" />

{#if $ready}
	<Navbar />
	<div class="p-8">
		<slot />
	</div>
{:else}
	<slot />
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
