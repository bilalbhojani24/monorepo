/* eslint-disable no-param-reassign */

import {
  getServerLaunchAnalyticsEntities,
  sendAppStartAnalyticsEvent,
  sendBackendAnalyticsEvent
} from './serverAnalyticsOps';

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

const analyticsEntities = getServerLaunchAnalyticsEntities();

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
    analyticsEntities.pyInitTS = new Date();

    killPreExistingServersForMac();

    serverEntities.pyServerPort = await getPort({ port: 8000 });

    serverEntities.pyServerInstance = await exec(
      `${processPaths.pyIos} ${serverEntities.pyServerPort}`
    );

    analyticsEntities.nodeInitTS = new Date();

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
    const pyServerResponse = await axios
      .get(`http://localhost:${serverEntities.pyServerPort}/`)
      .then((e) => e);

    const nodeServerResponse = await axios
      .get(`http://localhost:${serverEntities.nodeServerPort}/`)
      .then((e) => e);

    if (nodeServerResponse.status === 200 && !analyticsEntities.nodeReadyTS) {
      /**
       * we do this one-line here because until this point node server will not be able
       * to record analytics because it's not started, and if node server fails,
       * we send analytics to the failure endpoint instead of pager,
       * and that is decided based on availability of server port in analytics logic */
      analyticsEntities.bsPerfPort = serverEntities.nodeServerPort;

      analyticsEntities.nodeReadyTS = new Date() - analyticsEntities.nodeInitTS;

      sendBackendAnalyticsEvent('node-start-time', {
        time: analyticsEntities.nodeReadyTS,
        type: 'Time'
      });
    }

    if (pyServerResponse.status === 200 && !analyticsEntities.pyReadyTS) {
      analyticsEntities.pyReadyTS = new Date() - analyticsEntities.pyInitTS;
    }

    if (nodeServerResponse.status !== 200 || pyServerResponse.status !== 200) {
      // we need these two values in the catch block
      // eslint-disable-next-line no-throw-literal
      throw { pyServerResponse, nodeServerResponse };
    }

    /**
     * we send py server analytics event after node's event because
     * without node server, analytics cant be logged, hence,
     * we cache the time taken by py server, but send event only when,
     * both servers are ready, since in mac, node server requires py server */
    sendBackendAnalyticsEvent('py-start-time', {
      time: analyticsEntities.pyReadyTS,
      type: 'Time'
    });

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

    if (error?.pyServerResponse?.status !== 200) {
      sendBackendAnalyticsEvent('py-failed-start', { type: 'Failure' });
    }

    if (error?.nodeServerResponse?.status !== 200) {
      sendBackendAnalyticsEvent('node-failed-start', { type: 'Failure' });
    }

    sendAppStartAnalyticsEvent(false);

    throw new Error('Too Many Retries');
  }
};

export const performApplicationTerminationForMac = (serverEntities) => {
  serverEntities.nodeServerInstance.kill();
  serverEntities.pyServerInstance.kill();
};
