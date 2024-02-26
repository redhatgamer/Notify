let{app, BrowserWindow} = require('electron')

let win;


function createWindow(){
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences : {
            nodeIntegration : true 
        },
        autoHideMenuBar : true
    })



}

app.whenReady().then(() => {
    createWindow
}) 