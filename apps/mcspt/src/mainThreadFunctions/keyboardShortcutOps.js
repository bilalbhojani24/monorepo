const { app, globalShortcut } = require('electron');

export const disableReloadShortcuts = () => {
  app.on('browser-window-focus', () => {
    globalShortcut.register('CommandOrControl+R', () => {
      // Alternate action if ever reqd
    });
    globalShortcut.register('F5', () => {
      // Alternate action if ever reqd
    });
  });

  app.on('browser-window-blur', () => {
    globalShortcut.unregister('CommandOrControl+R');
    globalShortcut.unregister('F5');
  });
};
