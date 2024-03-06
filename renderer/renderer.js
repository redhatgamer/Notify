const { BrowserWindow } = require('electron').remote;
const path = require('path');

document.getElementById('openNewWindow').addEventListener('click', () => {
    // Create a new BrowserWindow
    const newWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load the HTML file for the new window
    newWindow.loadFile(path.join(__dirname, 'newWindow.html'));
});
