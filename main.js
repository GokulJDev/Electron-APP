import { app, BrowserWindow, Menu } from 'electron';
import { createAppMenu } from './menu.js'; // Import the menu component
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process'; // For starting the backend server

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
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL('http://localhost:5173'); // Point to the frontend

  // Apply the menu
  const appMenu = createAppMenu(mainWindow);
  Menu.setApplicationMenu(appMenu);
}

function startBackend() {
  // Start the Node.js backend server
  backendProcess = spawn('node', ['backend/server.js'], {
    cwd: __dirname, // Set the current working directory
    shell: true, // Required for Windows compatibility
  });

  backendProcess.stdout.on('data', (data) => {
    console.log(`[Backend]: ${data}`);
  });

  backendProcess.stderr.on('data', (data) => {
    console.error(`[Backend Error]: ${data}`);
  });

  backendProcess.on('close', (code) => {
    console.log(`[Backend Process Exited]: Code ${code}`);
  });
}

app.on('ready', () => {
  startBackend(); // Start the backend server
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    // Ensure backend process is killed
    if (backendProcess) backendProcess.kill();
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
 