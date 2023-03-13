const { app, BrowserWindow } = require('electron');
// eslint-disable-next-line import/no-extraneous-dependencies
const { resolve } = require('path');

const {
  fileExplorerOps,
  deepLinkingSetup,
  initializeRemoteHandlers
} = require('./mainThreadFunctions');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const mainThreadGlobals = {
  /**
   * storing globals into object so that they can be
   * passed by reference to asynchronous handlers
   */
  mainWindow: undefined
};

const createWindow = () => {
  mainThreadGlobals.mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    },
    show: false
  });

  const splashScreen = new BrowserWindow({
    width: 640,
    height: 320,
    frame: false,
    alwaysOnTop: true
  });

  splashScreen.loadURL(resolve(__dirname, '../renderer/splash/index.html'));

  // mainThreadGlobals.mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // if main window is ready to show, then destroy the splashScreen window and show up the main window
  mainThreadGlobals.mainWindow.once('ready-to-show', () => {
    // splashScreen.destroy();
    // mainThreadGlobals.mainWindow.show();
  });

  fileExplorerOps.initializeProtocolForFileRead();
};

fileExplorerOps.initializeSchemeForFileRead();
deepLinkingSetup.initializeDeepLinking(mainThreadGlobals);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
initializeRemoteHandlers();
