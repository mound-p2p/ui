import windowStateManager from 'electron-window-state';
import { app, BrowserWindow, ipcMain } from 'electron';
import contextMenu from 'electron-context-menu';
import serve from 'electron-serve';
import { spawn } from 'node:child_process';
import path from 'node:path';
import readline from 'node:readline';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let id_counter = 0;
const rustExecutablePath = path.join(__dirname, '../bin', 'peer');

const map = new Map();

ipcMain.handle('spawn', async (event, data) => {
	const args = ['--port', data.port || '8080', '--chunk-dir', data.chunkDir || 'chunks'];

	if (data.seed) {
		args.push('--seed', data.seed);
	}

	const rustProcess = spawn(rustExecutablePath, args);
	const { stdin: output, stdout: input } = rustProcess;
	const rl = readline.createInterface({ input, output });

	rl.on('line', (line) => {
		const message = JSON.parse(line);
		const { id } = message;
		const value = map.get(id);

		if (value) {
			const { resolve, reject } = value;

			map.delete(id);

			resolve(message);
		} else {
			mainWindow.webContents.send(`response:${id}`, message);
		}
	});
	rustProcess.stderr.on('data', (data) => {
		console.error(`Rust error: ${data}`);
	});

	rustProcess.on('close', (code) => {
		console.log(`Rust process exited with code ${code}`);
	});
	ipcMain.handle('request', async (event, data) => {
		return new Promise((resolve, reject) => {
			const id = id_counter++;
			const message = JSON.stringify({ id, ...data });
			map.set(id, { resolve, reject });
			rustProcess.stdin.write(`${message}\n`);
		});
	});
});

const serveURL = serve({ directory: '.' });
const port = process.env.PORT || 5173;
const dev = !app.isPackaged;
let mainWindow;

function createWindow() {
	let windowState = windowStateManager({
		defaultWidth: 800,
		defaultHeight: 600,
	});

	const mainWindow = new BrowserWindow({
		backgroundColor: 'whitesmoke',
		titleBarStyle: 'default',
		autoHideMenuBar: true,
		trafficLightPosition: {
			x: 17,
			y: 32,
		},
		minHeight: 650,
		minWidth: 575,
		webPreferences: {
			enableRemoteModule: true,
			contextIsolation: true,
			nodeIntegration: true,
			spellcheck: false,
			devTools: dev,
			preload: path.join(__dirname, 'preload.js'),
		},
		x: windowState.x,
		y: windowState.y,
		width: windowState.width,
		height: windowState.height,
		icon: path.join(__dirname, '..', 'static', 'image.png'),
	});

	windowState.manage(mainWindow);

	mainWindow.once('ready-to-show', () => {
		mainWindow.show();
		mainWindow.focus();
	});

	mainWindow.on('close', () => {
		windowState.saveState(mainWindow);
	});

	return mainWindow;
}

contextMenu({
	showLookUpSelection: false,
	showSearchWithGoogle: false,
	showCopyImage: false,
});

function loadVite(port) {
	mainWindow.loadURL(`http://localhost:${port}`).catch((e) => {
		console.log('Error loading URL, retrying', e);
		setTimeout(() => {
			loadVite(port);
		}, 200);
	});
}

function createMainWindow() {
	mainWindow = createWindow();
	mainWindow.once('close', () => {
		mainWindow = null;
	});

	if (dev) loadVite(port);
	else serveURL(mainWindow);
}

app.on('activate', () => {
	if (!mainWindow) {
		createMainWindow();
	}
});

app.once('ready', () => {
	createMainWindow();
});

app.once('close', () => {
	console.log('Electron app is closing...');
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('to-main', (event, count) => {
	return mainWindow.webContents.send('from-main', `next count is ${count + 1}`);
});
