import waitForLocalhost from 'wait-for-localhost';

import {
  initializeBackendServerForMac,
  performApplicationTerminationForMac,
  waitForSuccessfulServerReplyForMac
} from './macServerOps';
import {
  initializeBackendServerForWindows,
  killServersForWindows,
  waitForSuccessfulServerReplyForWindows
} from './windowsServerOps';

const { app, globalShortcut } = require('electron');

const binIndex = process.execPath.lastIndexOf('/');
const binPath = process.execPath.substring(0, binIndex);

const isMacMachine = process.platform === 'darwin';
const isWindowsMachine = process.platform?.slice(0, 3) === 'win';

const processPaths = IS_DEV
  ? {
      pyIos: `${process.cwd()}/nodeBE/py-ios/server`,
      bsPerf: `${process.cwd()}/nodeBE/mobile-performance/bs-perf-tool`
    }
  : {
      pyIos: `${binPath}/../Resources/nodeBE/py-ios/server`,
      bsPerf: `${binPath}/../Resources/nodeBE/mobile-performance/bs-perf-tool`
    };

const serverEntities = {
  pyServerInstance: null,
  nodeServerInstance: null,
  pyServerPort: null,
  nodeServerPort: null
};

export const initializeBackendServer = (mainThreadGlobals) => {
  if (isMacMachine) {
    return initializeBackendServerForMac(
      serverEntities,
      processPaths,
      mainThreadGlobals
    );
  }

  if (isWindowsMachine) {
    return initializeBackendServerForWindows(
      serverEntities,
      processPaths,
      mainThreadGlobals
    );
  }

  return undefined;
};

const waitForSuccessfulServerReply = (
  retries,
  maxRetries,
  intervalDuration
) => {
  if (isMacMachine) {
    return waitForSuccessfulServerReplyForMac(
      serverEntities,
      retries,
      maxRetries,
      intervalDuration
    );
  }

  if (isWindowsMachine) {
    return waitForSuccessfulServerReplyForWindows(
      serverEntities,
      retries,
      maxRetries,
      intervalDuration
    );
  }

  return undefined;
};

export const checkServerAvailability = async (initiationCallback) => {
  try {
    await waitForLocalhost({ port: serverEntities.nodeServerPort });
    await waitForSuccessfulServerReply(1, 120, 1000);
    initiationCallback();
  } catch (e) {
    // console.log(e);
  }
};

const performApplicationTermination = () => {
  if (!IS_DEV) {
    if (isMacMachine) {
      performApplicationTerminationForMac(serverEntities);
    }

    if (isWindowsMachine) {
      killServersForWindows();
    }
  }

  app.quit();
};

export const registerQuitHotkeys = () => {
  process.on('SIGTERM', () => {
    performApplicationTermination();
  });

  if (process.platform === 'darwin') {
    globalShortcut.register('Command+Q', () => {
      performApplicationTermination();
    });
  }
};

export const registerAppTerminationListeners = () => {
  app.on('window-all-closed', () => {
    performApplicationTermination();
  });

  app.on('quit', () => {
    performApplicationTermination();
  });
};
