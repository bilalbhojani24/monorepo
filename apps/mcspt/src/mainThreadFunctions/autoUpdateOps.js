const { app } = require('electron');

const updateApp = require('update-electron-app');

export const initializeAutoUpdate = () => {
  if (!IS_DEV) {
    app.on('ready', () => {
      updateApp({
        updateInterval: '1 hour',
        logger: require('electron-log'),
        notifyUser: true
      });
    });
  }
};
