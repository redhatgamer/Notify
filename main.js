const { menubar } = require('menubar');
const { app, Menu, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    menubar: true,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Set to true if you want to enable context isolation
      preload: 'renderer/index.html', // Optionally, if you have a preload script
    },
    autoHideMenuBar: false,
    
  });

  mainWindow.loadFile(path.join(__dirname,'renderer/index.html'));

  const menuTemplate=[
    {
      label: 'label 1',
      submenu:[
        {
          role:'undo'
        },
        {
          role:'cut'
        },
        {
          role:'close'
        }
      ]
    }
  ]
};  
const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);

  // Open the DevTools automatically when the app starts
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });


app.on('ready', createWindow);

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
