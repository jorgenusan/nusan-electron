const { app, BrowserWindow } = require('electron')
const path = require('path')
var bcrypt = require('bcryptjs');
require('electron-reload')(__dirname);

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration:true,
      preload: path.join(__dirname, '../preload.js')
    }
  })
  //win.setMenu(null);
  win.loadFile('src/views/login.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
