const { ipcMain, shell } = require('electron');

const initializeRemoteHandlers = () => {
  ipcMain.handle('openSystemFileFromPath', (event, path) => {
    shell.showItemInFolder(path);
  });
};

module.exports = { initializeRemoteHandlers };
