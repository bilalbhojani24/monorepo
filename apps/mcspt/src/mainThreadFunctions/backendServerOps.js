import waitForLocalhost from 'wait-for-localhost';

const { app, globalShortcut } = require('electron');
const { default: getPort } = require('get-port');
const axios = require('axios');

const { spawn, execSync } = require('child_process');

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

const findProcessIdFromRecord = (inputProcess) =>
  inputProcess?.split?.(' ').filter?.((fragment) => fragment !== '')?.[1];

const killPreExistingServers = () => {
  try {
    const stalePyServers = execSync(
      "ps aux | grep 'py-ios/server' | sed -e '/grep/d'"
    )
      ?.toString()
      ?.split('\n')
      ?.filter((processEntry) => processEntry !== '')
      .map((record) => findProcessIdFromRecord(record));

    const staleNodeServers = execSync(
      "ps aux | grep 'mobile-performance/bs-perf-tool server' | sed -e '/grep/d'"
    )
      ?.toString()
      ?.split('\n')
      ?.filter((processEntry) => processEntry !== '')
      .map((record) => findProcessIdFromRecord(record));

    stalePyServers.concat(staleNodeServers).forEach((stalePID) => {
      if (stalePID) {
        process.kill(stalePID);
      }
    });
  } catch (e) {
    // Handle failed killing of pre-existing stale processes
  }
};

export const initializeBackendServer = async (mainThreadGlobals) => {
  try {
    killPreExistingServers();

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
    const pyServerResponse = await axios.get(
      `http://localhost:${serverEntities.pyServerPort}/`
    );

    const nodeServerResponse = await axios.get(
      `http://localhost:${serverEntities.nodeServerPort}/`
    );

    if (nodeServerResponse.status !== 200 || pyServerResponse.status !== 200) {
      throw nodeServerResponse;
    }

    return [pyServerResponse, nodeServerResponse];
  } catch (error) {
    if (retries < maxRetries) {
      return new Promise((resolverFn) => {
        setTimeout(() => {
          resolverFn(
            waitForSuccessfulServerReply(
              retries + 1,
              maxRetries,
              intervalDuration
            )
          );
        }, intervalDuration);
      });
    }

    throw new Error('Too Many Retries');
  }
};

export const checkServerAvailability = async (initiationCallback) => {
  try {
    await waitForLocalhost({ port: serverEntities.nodeServerPort });
    await waitForSuccessfulServerReply(1, 30, 1000);
    initiationCallback();
  } catch (e) {
    // console.log(e);
  }
};

const performApplicationTermination = () => {
  if (!IS_DEV) {
    serverEntities.nodeServerInstance.kill();
    serverEntities.pyServerInstance.kill();
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
