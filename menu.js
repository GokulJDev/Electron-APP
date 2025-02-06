import { Menu, dialog } from 'electron';
import fs from 'fs';

export function createAppMenu(mainWindow) {
  return Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        { 
          label: 'New Project', 
          click: () => mainWindow.webContents.send('new-project') 
        },
        { 
          label: 'Open Project', 
          click: () => {
            dialog.showOpenDialog({
              properties: ['openFile'],
              filters: [{ name: 'KAIRA Projects', extensions: ['kaira'] }],
            }).then(result => {
              if (!result.canceled) {
                const filePath = result.filePaths[0];
                fs.readFile(filePath, 'utf-8', (err, data) => {
                  if (err) return console.error(err);
                  mainWindow.webContents.send('load-project', JSON.parse(data));
                });
              }
            }).catch(err => console.error(err));
          }
        },
        { 
          label: 'Save Project', 
          click: () => {
            dialog.showSaveDialog({
              filters: [{ name: 'KAIRA Projects', extensions: ['kaira'] }],
            }).then(result => {
              if (!result.canceled) {
                mainWindow.webContents.send('save-project-request', result.filePath);
              }
            }).catch(err => console.error(err));
          }
        },
        { 
          label: 'Export Model', 
          submenu: [
            { 
              label: 'Export as OBJ', 
              click: () => mainWindow.webContents.send('export-obj') 
            },
            { 
              label: 'Export as STL', 
              click: () => mainWindow.webContents.send('export-stl') 
            },
            { 
              label: 'Export as FBX', 
              click: () => mainWindow.webContents.send('export-fbx') 
            },
          ],
        },
        { 
          label: 'Print Floor Plan', 
          click: () => mainWindow.webContents.send('print-floor-plan') 
        },
        { type: 'separator' },
        { 
          label: 'Exit', 
          click: () => mainWindow.close() 
        },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', role: 'undo' },
        { label: 'Redo', role: 'redo' },
        { type: 'separator' },
        { 
          label: 'Add Object', 
          submenu: [
            { label: 'Wall', click: () => mainWindow.webContents.send('add-wall') },
            { label: 'Door', click: () => mainWindow.webContents.send('add-door') },
            { label: 'Window', click: () => mainWindow.webContents.send('add-window') },
            { label: 'Furniture', click: () => mainWindow.webContents.send('add-furniture') },
          ],
        },
        { label: 'Delete Selected', click: () => mainWindow.webContents.send('delete-selected') },
        { label: 'Align to Grid', click: () => mainWindow.webContents.send('align-to-grid') },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'togglefullscreen' },
        { 
          label: 'Toggle 2D/3D View', 
          click: () => mainWindow.webContents.send('toggle-2d-3d-view') 
        },
        { 
          label: 'Enable VR Mode', 
          click: () => mainWindow.webContents.send('enable-vr-mode') 
        },
        { 
          label: 'Adjust Lighting', 
          click: () => mainWindow.webContents.send('adjust-lighting') 
        },
      ],
    },
    {
      label: 'Tools',
      submenu: [
        { 
          label: 'Measure Dimensions', 
          click: () => mainWindow.webContents.send('measure-dimensions') 
        },
        { 
          label: 'Apply Materials', 
          click: () => mainWindow.webContents.send('apply-materials') 
        },
        { 
          label: 'Customize Textures', 
          click: () => mainWindow.webContents.send('customize-textures') 
        },
      ],
    },
    {
      label: 'Help',
      submenu: [
        { 
          label: 'Tutorials', 
          click: () => mainWindow.webContents.send('open-tutorials') 
        },
        { 
          label: 'About KAIRA', 
          click: () => {
            dialog.showMessageBox({
              type: 'info',
              title: 'About KAIRA',
              message: 'KAIRA: Interactive 3D and VR Floor Planning App\nVersion: 1.0.0',
            }).then(() => {}).catch(err => console.error(err));
          }
        },
        { 
          label: 'Documentation', 
          click: () => mainWindow.webContents.send('open-documentation') 
        },
      ],
    },
  ]);
}
