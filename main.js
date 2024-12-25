import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import chokidar from 'chokidar';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, '/src/assets/kaira.ico'),
    webPreferences: {
      nodeIntegration: true,
    },
  });

  // Change the taskbar color (Windows/Linux)
  if (process.platform === 'win32' || process.platform === 'linux') {
    mainWindow.setBackgroundColor('#07A22B'); // Green color
  }

  mainWindow.loadURL('http://localhost:5173');

  // Optionally, add custom CSS
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.insertCSS(`
      body::-webkit-scrollbar {
        display: none;
      }
      body {
        overflow: scroll;
      }
    `);
  });
}

app.on('ready', () => {
  createWindow();

  // Watch for file changes
  chokidar.watch([path.join(__dirname, 'src'), path.join(__dirname, 'public')]).on('change', () => {
    app.relaunch();
    app.exit();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
