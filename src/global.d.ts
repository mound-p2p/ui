/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />
declare interface Window {
	electron: {
		sendRequest: (request: any) => Promise<any>;
	}
}
