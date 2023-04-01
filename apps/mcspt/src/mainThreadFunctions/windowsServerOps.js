/* eslint-disable no-param-reassign */

const { default: getPort } = require('get-port');
const axios = require('axios');

const { execSync, exec } = require('child_process');

const binIndex = process.execPath.lastIndexOf('\\');
const binPath = process.execPath.substring(0, binIndex);

const processPaths = IS_DEV
  ? {
      bsPerf: `${process.cwd()}/nodeBE/mobile-performance/bs-perf-tool`
    }
  : {
      bsPerf: `${binPath}/resources/nodeBE/mobile-performance/bs-perf-tool`
    };

export const killServersForWindows = () => {
  try {
    execSync('taskkill /IM bs-perf-tool.exe /F');
  } catch (e) {
    // Handle failed killing of processes
  }
};

export const initializeBackendServerForWindows = async (
  serverEntities,
  mainThreadGlobals
) => {
  try {
    // killing pre-existing servers
    killServersForWindows();

    serverEntities.nodeServerPort = await getPort({ port: 3000 });

    serverEntities.nodeServerInstance = await exec(
      `${processPaths.bsPerf} server -p ${serverEntities.nodeServerPort}`
    );

    // sending port number to FE to call api
    mainThreadGlobals.mainWindow.webContents.send(
      'save-bs-perf-port',
      serverEntities.nodeServerPort
    );
  } catch (e) {
    // No mechanism at BE to handle logs as of now
  }
};

export const waitForSuccessfulServerReplyForWindows = async (
  serverEntities,
  retries,
  maxRetries,
  intervalDuration
) => {
  try {
    const nodeServerResponse = await axios.get(
      `http://localhost:${serverEntities.nodeServerPort}/`
    );

    if (nodeServerResponse.status !== 200) {
      throw nodeServerResponse;
    }

    return [nodeServerResponse];
  } catch (error) {
    if (retries < maxRetries) {
      return new Promise((resolverFn) => {
        setTimeout(() => {
          resolverFn(
            waitForSuccessfulServerReplyForWindows(
              serverEntities,
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
