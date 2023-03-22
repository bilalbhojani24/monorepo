import waitForLocalhost from 'wait-for-localhost';

const { app, globalShortcut } = require('electron');
const { default: getPort } = require('get-port');
const axios = require('axios');

const { spawn } = require('child_process');

const binIndex = process.execPath.lastIndexOf('/');
const binPath = process.execPath.substring(0, binIndex);

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

export const initializeBackendServer = async (mainThreadGlobals) => {
  try {
    serverEntities.pyServerPort = await getPort({ port: 8000 });

    serverEntities.pyServerInstance = await spawn(processPaths.pyIos, [
      serverEntities.pyServerPort
    ]);

    serverEntities.nodeServerPort = await getPort({ port: 3000 });

    serverEntities.nodeServerInstance = await spawn(processPaths.bsPerf, [
      'server',
      '-p',
      serverEntities.nodeServerPort,
      '-pi',
      serverEntities.pyServerPort
    ]);

    // sending port number to FE to call api
    mainThreadGlobals.mainWindow.webContents.send(
      'save-bs-perf-port',
      serverEntities.nodeServerPort
    );
  } catch (e) {
    // No mechanism at BE to handle logs as of now
  }
};

const waitForSuccessfulServerReply = async (
  retries,
  maxRetries,
  intervalDuration
) => {
  try {
    const response = await axios.get(
      `http://localhost:${serverEntities.nodeServerPort}/`
    );

    if (response.status !== 200) {
      throw response;
    } else {
      Promise.resolve(response);
    }
  } catch (error) {
    if (retries < maxRetries) {
      setTimeout(() => {
        waitForSuccessfulServerReply(retries + 1, maxRetries, intervalDuration);
      }, intervalDuration);
    } else {
      throw new Error('Too Many Retries');
    }
  }
};

export const checkServerAvailability = async (initiationCallback) => {
  try {
    await waitForLocalhost({ port: serverEntities.nodeServerPort });
    await waitForSuccessfulServerReply(1, 1, 1000);
    initiationCallback();
  } catch (e) {
    // console.log(e);
  }
};

export const registerQuitHotkeys = () => {
  process.on('SIGTERM', () => {
    serverEntities.nodeServer.kill();
    serverEntities.pyServer.kill();
  });

  if (process.platform === 'darwin') {
    globalShortcut.register('Command+Q', () => {
      serverEntities.nodeServerInstance.kill();
      serverEntities.pyServerInstance.kill();
      app.quit();
    });
  }
};
