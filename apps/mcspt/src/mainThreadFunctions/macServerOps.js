/* eslint-disable no-param-reassign */
const { default: getPort } = require('get-port');
const axios = require('axios');

const { execSync, exec } = require('child_process');

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

const findProcessIdFromRecord = (inputProcess) =>
  inputProcess?.split?.(' ').filter?.((fragment) => fragment !== '')?.[1];

const killPreExistingServersForMac = () => {
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

export const initializeBackendServerForMac = async (
  serverEntities,
  mainThreadGlobals
) => {
  try {
    killPreExistingServersForMac();

    serverEntities.pyServerPort = await getPort({ port: 8000 });

    serverEntities.pyServerInstance = await exec(
      `${processPaths.pyIos} ${serverEntities.pyServerPort}`
    );

    serverEntities.nodeServerPort = await getPort({ port: 3000 });

    serverEntities.nodeServerInstance = await exec(
      `CSPT_ENV=${IS_PROD ? 'production' : 'staging'} ${
        processPaths.bsPerf
      } server -p ${serverEntities.nodeServerPort} -pi ${
        serverEntities.pyServerPort
      } ${IS_PROD ? '' : '-v'}`
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

export const waitForSuccessfulServerReplyForMac = async (
  serverEntities,
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
            waitForSuccessfulServerReplyForMac(
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

export const performApplicationTerminationForMac = (serverEntities) => {
  serverEntities.nodeServerInstance.kill();
  serverEntities.pyServerInstance.kill();
};
