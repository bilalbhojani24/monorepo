// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

const openSystemFileFromPath = async (path) => {
  await ipcRenderer.invoke('openSystemFileFromPath', path);
};

const openUrlInSystemBrowser = async (url) => {
  await ipcRenderer.invoke('openUrlInSystemBrowser', url);
};

const registerCallbackForSavingAuthToken = (callback) =>
  ipcRenderer.on('save-auth-token', callback);

const remoteThreadFunctions = {
  openSystemFileFromPath,
  openUrlInSystemBrowser,
  registerCallbackForSavingAuthToken
};

ipcRenderer.on('save-bs-perf-port', (event, data) => {
  contextBridge.exposeInMainWorld('BS_PERF_API_PORT', data);
});

contextBridge.exposeInMainWorld('remoteThreadFunctions', remoteThreadFunctions);
