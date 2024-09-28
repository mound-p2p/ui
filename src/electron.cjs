const windowStateManager = require('electron-window-state');
const { app, BrowserWindow, ipcMain } = require('electron');
const contextMenu = require('electron-context-menu');
const serve = require('electron-serve');
const { spawn } = require('child_process');
const path = require('path');
const readline = require('node:readline');
let id_counter = 0;
const rustExecutablePath = path.join(__dirname, '../bin', 'peer');

try {
	require('electron-reloader')(module);
} catch (e) {
	console.error(e);
}

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
		titleBarStyle: 'defualt',
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
			preload: path.join(__dirname, 'preload.cjs'),
		},
		x: windowState.x,
		y: windowState.y,
		width: windowState.width,
		height: windowState.height,
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
	prepend: (defaultActions, params, browserWindow) => [
		{
			label: 'Make App 💻',
		},
	],
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
	console.log(
		"Electron app is closing..."
	)
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('to-main', (event, count) => {
	return mainWindow.webContents.send('from-main', `next count is ${count + 1}`);
});
