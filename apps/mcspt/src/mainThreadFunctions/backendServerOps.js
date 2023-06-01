import {
  initializeBackendServerForMac,
  performApplicationTerminationForMac,
  waitForSuccessfulServerReplyForMac
} from './macServerOps';
import { isMacMachine, isWindowsMachine } from './mainThreadUtils';
import {
  initializeBackendServerForWindows,
  killServersForWindows,
  waitForSuccessfulServerReplyForWindows
} from './windowsServerOps';

const { app, globalShortcut } = require('electron');

const serverEntities = {
  pyServerInstance: null,
  nodeServerInstance: null,
  pyServerPort: null,
  nodeServerPort: null
};

export const getCurrentServerEntities = () => serverEntities;

export const initializeBackendServer = (mainThreadGlobals) => {
  if (isMacMachine) {
    return initializeBackendServerForMac(serverEntities, mainThreadGlobals);
  }

  if (isWindowsMachine) {
    return initializeBackendServerForWindows(serverEntities, mainThreadGlobals);
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

  if (isMacMachine) {
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
