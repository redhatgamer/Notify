const { app, Menu, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Datastore = require('nedb');

let mainWindow;
let datastore;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(app.getAppPath(), 'Tech-Talent-Academy-TTA-Spring-2024', 'main.js'), // Correct the path to your preload script
    },
    autoHideMenuBar: false,
  });

  mainWindow.loadFile('renderer/index.html');

  const menuTemplate = [
    {
      label: 'File',
      submenu: [
        { label: 'New Note', accelerator: 'CmdOrCtrl+N' },
        { label: 'New To-Do', accelerator: 'CmdOrCtrl+T' },
        { label: 'New Notebook' },
        { type: 'separator' },
        { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() },
        { label: 'Print' },
      ],
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Copy', accelerator: 'CmdOrCtrl+C' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V' },
        { type: 'separator' },
        { label: 'Undo', role: 'undo' },
        { label: 'Redo', role: 'redo' },
        { type: 'separator' },
        { label: 'Bold', accelerator: 'CmdOrCtrl+B' },
        { label: 'Italics', accelerator: 'CmdOrCtrl+I' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A' },
        { label: 'HyperLink', accelerator: 'CmdOrCtrl+K' },
        { label: 'Code' },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function initDatastore() {
  let userDataPath = app.getPath('userData');
  datastore = new Datastore({
    filename: path.join(userDataPath, 'notes.json'),
  });

  datastore.loadDatabase((err) => {
    if (err) {
      console.error('There was some error in loading the dataset');
      throw err;
    } else {
      console.log('Datastore loaded successfully');
    }
  });
}

app.whenReady().then(() => {
  initDatastore();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on('save_note', (event, note) => {
  console.log('Received save_note event with note:', note);

  datastore.insert(note, (err, newDoc) => {
    if (err) {
      console.error('Error inserting the document:', err);
      event.sender.send('save_note_error', err.message); // Sending an error response to the renderer process
    } else {
      console.log('Data inserted successfully', newDoc);
      event.sender.send('save_note_success', newDoc); // Sending a success response to the renderer process
    }
  });
});


ipcMain.handle('get_data', async (event) => {
  try {
    const docs = await new Promise((resolve, reject) => {
      datastore.find({}, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    return docs;
  } catch (error) {
    throw new Error(`Failed to retrieve data: ${error.message}`);
  }
});
