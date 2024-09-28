import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const config = defineConfig({
	plugins: [sveltekit()],
	server: {
		hmr: false,
		watch: {
			ignored: ['**/chunks/**'],
		},
	},
});

export default config;
