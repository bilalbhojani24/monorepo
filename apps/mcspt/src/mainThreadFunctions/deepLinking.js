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
    app.on('second-instance', () => {
      // Someone tried to run a second instance, we should focus our window.
      if (mainThreadGlobals.mainWindow) {
        if (mainThreadGlobals.mainWindow.isMinimized()) {
          mainThreadGlobals.mainWindow.restore();
        }
        mainThreadGlobals.mainWindow.focus();
      }
      // call deep-link query-param-handler with this arg : ${commandLine.pop().slice(0, -1)}
    });

    // registering deep-link for mac
    app.on('open-url', (event, url) => {
      //  call deep-link query-param-handler with this arg : ${url}
    });
  }
};

module.exports = {
  initializeDeepLinking
};
