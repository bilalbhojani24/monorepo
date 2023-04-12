import { disableReloadShortcuts } from './keyboardShortcutOps';

const { Menu } = require('electron');

const encapsulatedViewMenu = {
  /**
   * this signature and arrangement of keynames is very sensitive,
   * please keep it exactly as specified in electron docs,
   */

  label: 'View',
  submenu: [
    { role: 'toggleDevTools' },
    { type: 'separator' },
    { role: 'resetZoom' },
    { role: 'zoomIn' },
    { role: 'zoomOut' },
    { type: 'separator' },
    { role: 'togglefullscreen' }
  ]
};

export const encapsulateMenuElementsInProd = () => {
  if (!IS_PROD) {
    return;
  }

  const currentMenuItems = Menu.getApplicationMenu()?.items?.map((menu) =>
    menu.label === 'View' ? encapsulatedViewMenu : menu
  );

  Menu.setApplicationMenu(Menu.buildFromTemplate(currentMenuItems));

  disableReloadShortcuts();
};
