import { DOC_LINKS_CONSTANTS } from '@browserstack/mcp-shared';

import { getCurrentServerEntities } from './backendServerOps';
import {
  getProcessPathsForMac,
  getProcessPathsForWindows,
  isMacMachine,
  isWindowsMachine
} from './mainThreadUtils';

const { exec } = require('child_process');

const { app, shell } = require('electron');

export const generateDiagnosticLog = () => {
  try {
    const serverEntities = getCurrentServerEntities();

    if (isMacMachine) {
      const processPathsForMac = getProcessPathsForMac();

      exec(
        `${
          processPathsForMac.bsPerf
        } diagnostic -p mac -av ${app.getVersion()} -bp ${
          serverEntities.nodeServerPort
        } -pi ${serverEntities.pyServerPort}`
      );
    } else if (isWindowsMachine) {
      const processPathsForWindows = getProcessPathsForWindows();

      exec(
        `${
          processPathsForWindows.bsPerf
        } diagnostic -p win -av ${app.getVersion()} -bp ${
          serverEntities.nodeServerPort
        }`
      );
    }
  } catch (e) {
    // handle error after PM defines Scenario
  }
};

export const openDocsLinkInBrowser = () => {
  shell.openExternal(DOC_LINKS_CONSTANTS.ROOT_DOC_LINK);
};
