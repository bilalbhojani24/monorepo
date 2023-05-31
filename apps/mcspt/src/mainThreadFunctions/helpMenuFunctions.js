import { DOC_LINKS_CONSTANTS } from '@browserstack/mcp-shared';

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
    if (isMacMachine) {
      const processPathsForMac = getProcessPathsForMac();

      exec(
        `${
          processPathsForMac.bsPerf
        } diagnostic -p mac -av ${app.getVersion()} -bp 3000 -pi 8000`
      );
    } else if (isWindowsMachine) {
      const processPathsForWindows = getProcessPathsForWindows();

      exec(
        `${
          processPathsForWindows.bsPerf
        } diagnostic -p win -av ${app.getVersion()} -bp 3000`
      );
    }
  } catch (e) {
    // handle error after PM defines Scenario
  }
};

export const openDocsLinkInBrowser = () => {
  shell.openExternal(DOC_LINKS_CONSTANTS.ROOT_DOC_LINK);
};
