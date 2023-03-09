const { ipcMain, shell } = require('electron');

const fileExplorerOps = require('./fileExplorerOps');
const deepLinkingSetup = require('./deepLinking');

const initializeRemoteHandlers = () => {
  ipcMain.handle('openSystemFileFromPath', (event, path) => {
    shell.showItemInFolder(path);
  });
  ipcMain.handle('openUrlInSystemBrowser', (event, url) => {
    shell.openExternal(url);
  });
};

module.exports = {
  fileExplorerOps,
  deepLinkingSetup,
  initializeRemoteHandlers
};
