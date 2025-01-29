import { app, BrowserWindow, Menu } from 'electron';
import { createAppMenu } from './menu.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let backendProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, '/src/assets/kaira.ico'),
    webPreferences: {
      nodeIntegration: false, // More secure, enable if needed
      contextIsolation: true, // Recommended for security
    },
  });

  mainWindow.loadURL('http://localhost:3001');

  const appMenu = createAppMenu(mainWindow);
  Menu.setApplicationMenu(appMenu);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function startBackend() {
  if (backendProcess) {
    console.log('Backend is already running.');
    return;
  }

  backendProcess = spawn('node', ['backend/server.js'], {
    cwd: __dirname,
    shell: true,
    stdio: ['pipe', 'pipe', 'pipe'], // Handle logs properly
  });

  backendProcess.stdout.on('data', (data) => {
    const message = data.toString();
    console.log(`[Backend]: ${message}`);

    if (message.includes('Connected to MongoDB')) {
      if (!mainWindow) {
        createWindow();
      }
    }
  });

  backendProcess.stderr.on('data', (data) => {
    console.error(`[Backend Error]: ${data.toString()}`);
  });

  backendProcess.on('close', (code) => {
    console.log(`[Backend Process Exited]: Code ${code}`);
    backendProcess = null;
    // Optional: Restart the backend on crash
    setTimeout(startBackend, 3000);
  });
}

app.whenReady().then(startBackend);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (backendProcess) {
      backendProcess.kill();
      backendProcess = null;
    }
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
