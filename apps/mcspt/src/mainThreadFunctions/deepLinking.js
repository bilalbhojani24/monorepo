const { app } = require('electron');
const path = require('path');

const initializeDeepLinking = (mainThreadGlobals) => {
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient('bsperf', process.execPath, [
        path.resolve(process.argv[1])
      ]);
    }
  } else {
    app.setAsDefaultProtocolClient('bsperf');
  }

  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    app.quit();
  } else {
    // registering deep-link for windows
    app.on('second-instance', (event, commandLine) => {
      // Someone tried to run a second instance, we should focus our window.
      if (mainThreadGlobals.mainWindow) {
        if (mainThreadGlobals.mainWindow.isMinimized()) {
          mainThreadGlobals.mainWindow.restore();
        }
        mainThreadGlobals.mainWindow.focus();
      }

      mainThreadGlobals.mainWindow.webContents.send(
        'save-auth-token',
        commandLine.pop().slice(0, -1)
      );
    });

    // registering deep-link for mac
    app.on('open-url', (event, url) => {
      if (mainThreadGlobals.mainWindow) {
        mainThreadGlobals.mainWindow.focus();
      }

      mainThreadGlobals.mainWindow.webContents.send('save-auth-token', url);
    });
  }
};

module.exports = {
  initializeDeepLinking
};
