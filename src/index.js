const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const window = new BrowserWindow({
    width: 720,
    minWidth: 480,
    height: 400,
    minHeight: 300,
    resizable: true,
    fullscreen: false,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'js', 'preloader', 'preload.js'),
    },
  });
  
  window.on('close', function (event) {
    const choice = dialog.showMessageBoxSync(this, closeDialog);
    if (choice === 1) {
      event.preventDefault();
      return;
    } 
    window.webContents.send('save-to-storage-sync');
  });

  // and load the index.html of the app.
  window.loadFile(path.join(__dirname, 'index.html'));
};

const closeDialog = {
  type: 'question',
  buttons: ['Yes', 'No'],
  title: 'Confirm',
  message: 'Are you sure you want to quit?'
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => 
  (process.platform !== 'darwin') && app.quit());

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

