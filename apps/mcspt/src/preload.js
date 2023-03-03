// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

const openSystemFileFromPath = async (path) => {
  await ipcRenderer.invoke('openSystemFileFromPath', path);
};

const openUrlInSystemBrowser = async (url) => {
  await ipcRenderer.invoke('openUrlInSystemBrowser', url);
};

const remoteThreadFunctions = {
  openSystemFileFromPath,
  openUrlInSystemBrowser
};

contextBridge.exposeInMainWorld('remoteThreadFunctions', remoteThreadFunctions);
