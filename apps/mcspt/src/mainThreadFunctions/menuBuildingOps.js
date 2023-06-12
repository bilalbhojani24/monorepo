import {
  generateDiagnosticLog,
  openDocsLinkInBrowser
} from './helpMenuFunctions';
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

const encapsulatedHelpMenu = {
  /**
   * this signature and arrangement of keynames is very sensitive,
   * please keep it exactly as specified in electron docs,
   */

  label: 'Help',
  submenu: [
    {
      label: 'Generate Diagnostic Log',
      click: generateDiagnosticLog
    },
    {
      label: 'Read the Docs',
      click: openDocsLinkInBrowser
    }
  ]
};

export const encapsulateMenuElements = () => {
  const currentMenuItems = Menu.getApplicationMenu()?.items?.map((menu) => {
    if (menu.label === 'View' && IS_PROD) {
      return encapsulatedViewMenu;
    }

    if (menu.label === 'Help') {
      return encapsulatedHelpMenu;
    }

    return menu;
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(currentMenuItems));

  if (IS_PROD) {
    disableReloadShortcuts();
  }
};
