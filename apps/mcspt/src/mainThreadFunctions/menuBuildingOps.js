import { disableReloadShortcuts } from './keyboardShortcutOps';
import { processPathsForMac } from './macServerOps';
import { processPathsForWindows } from './windowsServerOps';

const { exec } = require('child_process');
const { app, Menu, shell } = require('electron');

const isMacMachine = process.platform === 'darwin';
const isWindowsMachine = process.platform?.slice(0, 3) === 'win';
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
      click() {
        if (isMacMachine) {
          exec(
            `${
              processPathsForMac.bsPerf
            } diagnostic -p mac -av ${app.getVersion()}`
          );
        } else if (isWindowsMachine) {
          exec(
            `${
              processPathsForWindows.bsPerf
            } diagnostic -p win -av ${app.getVersion()}`
          );
        }
      }
    },
    {
      label: 'Read the Docs',
      click() {
        shell.openExternal(
          'https://www.browserstack.com/docs/app-performance/overview/what-is-browserstack-app-performance'
        );
      }
    }
  ]
};

export const encapsulateMenuElements = () => {
  const currentMenuItems = Menu.getApplicationMenu()?.items?.map((menu) => {
    if (menu.label === 'View') {
      return encapsulatedViewMenu;
    }
    if (menu.label === 'Help') {
      return encapsulatedHelpMenu;
    }
    return menu;
  });

  Menu.setApplicationMenu(Menu.buildFromTemplate(currentMenuItems));

  disableReloadShortcuts();
};
