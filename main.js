// const { menubar } = require('menubar');
const { app, Menu, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
let Datastore = require('nedb');

let mainWindow;
let datastore;

function createWindow() {
  mainWindow = new BrowserWindow({
    menubar: true,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(app.getAppPath(), 'Tech-Talent-Academy-TTA-Spring-2024', 'renderer.js'), // Correct the path to your preload script
    },
    autoHideMenuBar: false,
  });

  mainWindow.loadFile('renderer/index.html');

  const menuTemplate = [
    {
      label: 'label 1',
      submenu: [
        {
          role: 'undo',
        },
        {
          role: 'cut',
        },
        {
          role: 'close',
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // Open the DevTools automatically when the app starts
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
      console.log("There was some error in loading the dataset");
      throw err;
    } else {
      console.log("Datastore loaded successfully");
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

ipcMain.on('save_note', (e, note) => {
  datastore.insert(note, (err, new_doc) => {
    console.log(new_doc);
    if(err){
      console.log("There was some error in inserting the doc")
      throw err;
    }else{
      console.log("Data inserted successfully")
    }
  });
  // Add your logic to handle the 'save_note' event here
});

ipcMain.handle('get_data', (e) => {
  return new Promise((resolve, reject) => {
    datastore.find({} , (err, docs) => {
      if(err){
        reject(err);
      }else{
        resolve(docs);
      }
    })
  })
});



