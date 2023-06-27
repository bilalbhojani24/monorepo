const { app, BrowserWindow } = require('electron');

const {
  fileExplorerOps,
  deepLinkingSetup,
  initializeRemoteHandlers,
  backendServerOps,
  autoUpdateOps,
  serverAnalyticsOps,
  menuBuildingOps
} = require('./mainThreadFunctions');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

serverAnalyticsOps.saveInitializationTimestamp();

const mainThreadGlobals = {
  /**
   * storing globals into object so that they can be
   * passed by reference to asynchronous handlers
   */
  mainWindow: undefined,
  splashScreen: undefined
};

const closeSplashAndLoadMainWindow = () => {
  mainThreadGlobals.mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  mainThreadGlobals.mainWindow.once('ready-to-show', () => {
    mainThreadGlobals.splashScreen.destroy();
    mainThreadGlobals.mainWindow.show();

    serverAnalyticsOps.sendAppStartAnalyticsEvent(true);

    autoUpdateOps.initializeAutoUpdate();
  });
};

const createWindow = async () => {
  menuBuildingOps.encapsulateMenuElements();

  mainThreadGlobals.mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1024,
    minHeight: 720,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    },
    show: false
  });

  mainThreadGlobals.splashScreen = new BrowserWindow({
    width: 640,
    height: 360,
    center: true,
    frame: false,
    hasShadow: true,
    transparent: true,
    alwaysOnTop: true,
    resizable: false
  });

  mainThreadGlobals.splashScreen.loadURL(SPLASH_WEBPACK_ENTRY);

  if (!IS_DEV) {
    // order is important for this one

    await backendServerOps.initializeBackendServer(mainThreadGlobals);

    await backendServerOps.checkServerAvailability(
      closeSplashAndLoadMainWindow
    );
  } else {
    closeSplashAndLoadMainWindow();
  }

  fileExplorerOps.initializeProtocolForFileRead();
  backendServerOps.registerQuitHotkeys();
};

fileExplorerOps.initializeSchemeForFileRead();
deepLinkingSetup.initializeDeepLinking(mainThreadGlobals);

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

backendServerOps.registerAppTerminationListeners();

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
