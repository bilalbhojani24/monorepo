export const openUrlInSystemBrowser = (param) => {
  window.remoteThreadFunctions?.openUrlInSystemBrowser(param);
};

export const openSystemFileFromPath = (param) => {
  window.remoteThreadFunctions.openSystemFileFromPath(param);
};
