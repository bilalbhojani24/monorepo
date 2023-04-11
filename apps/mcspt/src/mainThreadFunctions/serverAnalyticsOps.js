import axios from 'axios';

const serverLaunchAnalyticsEntities = {
  bsPerfPort: null,
  applicationInitTS: null,
  nodeInitTS: null,
  nodeReadyTS: null,
  pyInitTS: null,
  pyReadyTS: null
};

const generateEventBody = (eventName, eventBody) => ({
  kind: eventName,
  payload: {
    ...eventBody
  },
  team: 'cspt'
});

const generateAnalyticsUrl = (port) =>
  port
    ? `http://localhost:${port}/api/v1/sendToBq`
    : `http://cspt-api.${
        IS_PROD ? 'browserstack' : 'bsstag'
      }.com/api/v1/frontendEvents`;

export const getServerLaunchAnalyticsEntities = () =>
  serverLaunchAnalyticsEntities;

export const saveInitializationTimestamp = () => {
  serverLaunchAnalyticsEntities.applicationInitTS = new Date();
};

export const sendBackendAnalyticsEvent = (eventName, eventBody) => {
  try {
    if (IS_PROD) {
      axios.post(
        generateAnalyticsUrl(serverLaunchAnalyticsEntities.bsPerfPort),
        generateEventBody(eventName, eventBody)
      );
    }
  } catch (e) {
    // silent error until scenario definition by EM
  }
};

export const sendAppStartAnalyticsEvent = (hasStarted) => {
  if (hasStarted) {
    const timeTakenServerStart =
      new Date() - serverLaunchAnalyticsEntities.applicationInitTS;

    sendBackendAnalyticsEvent('app-start-time', {
      type: 'Time',
      time: timeTakenServerStart
    });
  } else {
    sendBackendAnalyticsEvent('app-failed-start', { type: 'Failure' });
  }
};
