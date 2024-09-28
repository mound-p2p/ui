/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />
declare interface Window {
	electron: {
		sendRequest: <T>(request: ProcessRequest) => Promise<ProcessResponse>;
		receive: (
			name: `response:${number}`,
			callback: (response: ProcessResponse) => void,
		) => void;
	};
}

type ProcessRequest =
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
	  };

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

type ProcessResponse = { id: number } & (
	| {
			data: ProcessFile[];
	  }
	| {
			data: Peer[];
	  }
	| {
			data: {
				progress: number;
			};
	  }
	| {
			data: {
				uploadedChunks: number;
				downloadedChunks: number;
				downloadedFiles: number;
			};
	  }
);
