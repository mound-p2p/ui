/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />
declare interface Window {
	electron: {
		sendRequest: <T extends ProcessType>(
			request: ProcessRequest<T>,
		) => Promise<ProcessResponse<T>>;
		startServer: (options: Partial<{
			seed: string,
			port: number,
			chunkDir: string,
		}>) => void;
		receive: (
			name: `response:${number}`,
			callback: (response: {
				data: {
					progress: number;
				};
			}) => void,
		) => void;
	};
}

type ProcessType =
	| 'upload'
	| 'downloadByHash'
	| 'downloadByName'
	| 'getFiles'
	| 'getPeers'
	| 'getStats';

type ProcessRequest<Type extends ProcessType> = { type: Type } & (
	| {
			type: 'upload';
			path: string;
	  }
	| {
			type: 'downloadByHash';
			fileHash: string;
	  }
	| {
			type: 'downloadByName';
			fileName: string;
	  }
	| {
			type: 'getFiles';
	  }
	| {
			type: 'getPeers';
	  }
	| {
			type: 'getStats';
	  }
);

type ProcessFile = {
	id: string;
	name: string;
	chunks: number;
	peersWithParts: number;
};

type Peer = {
	id: number;
	addr: string;
	/**
	 * Connection speed, in MiB/s
	 */
	speed: number;
};

type ProcessResponse<Type extends ProcessType> = { id: number } & (Type extends 'upload'
	? {}
	: Type extends 'downloadByHash'
		? {}
		: Type extends 'downloadByName'
			? {}
			: Type extends 'getFiles'
				? {
						data: ProcessFile[];
					}
				: Type extends 'getPeers'
					? {
							data: Peer[];
						}
					: Type extends 'getStats'
						? {
								data: {
									uploadedChunks: number;
									downloadedChunks: number;
									downloadedFiles: number;
								};
							}
						: never);
