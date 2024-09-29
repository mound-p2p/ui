import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import 'electron';

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
