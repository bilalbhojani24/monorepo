/* eslint-disable no-param-reassign */

import {
  getServerLaunchAnalyticsEntities,
  sendAppStartAnalyticsEvent,
  sendBackendAnalyticsEvent
} from './serverAnalyticsOps';

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

const analyticsEntities = getServerLaunchAnalyticsEntities();

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
    analyticsEntities.nodeInitTS = new Date();

    serverEntities.nodeServerPort = await getPort({ port: 3000 });

    serverEntities.nodeServerInstance = await exec(
      `set "CSPT_ENV=${IS_PROD ? 'production' : 'staging'}" && ${
        processPaths.bsPerf
      } server -p ${serverEntities.nodeServerPort} ${IS_PROD ? '' : '-v'}`
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
    const nodeServerResponse = await axios
      .get(`http://localhost:${serverEntities.nodeServerPort}/`)
      .then((e) => e);

    if (nodeServerResponse.status !== 200) {
      throw nodeServerResponse;
    } else {
      /**
       * we do this one-line here because until this point node server will not be able
       * to record analytics because it's not started, and if node server fails,
       * we send analytics to the failure endpoint instead of pager,
       * and that is decided based on availability of server port in analytics logic
       * */
      analyticsEntities.bsPerfPort = serverEntities.nodeServerPort;

      analyticsEntities.nodeReadyTS = new Date() - analyticsEntities.nodeInitTS;

      sendBackendAnalyticsEvent('node-start-time', {
        time: analyticsEntities.nodeReadyTS,
        type: 'Time'
      });
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

    sendBackendAnalyticsEvent('node-failed-start', { type: 'Failure' });
    sendAppStartAnalyticsEvent(false);

    throw new Error('Too Many Retries');
  }
};
