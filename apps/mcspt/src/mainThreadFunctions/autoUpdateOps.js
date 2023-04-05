const updateApp = require('update-electron-app');

export const initializeAutoUpdate = () => {
  if (!IS_DEV) {
    updateApp({
      updateInterval: '1 hour',
      logger: require('electron-log'),
      notifyUser: true
    });
  }
};
