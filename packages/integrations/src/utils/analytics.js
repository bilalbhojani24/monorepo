import { logEvent } from '@browserstack/utils';

export const ANALYTICS_KEYS = {
  amplitudeKey: '985eaa9c45d824a94344e64a2a3ca724',
  amplitudeConfig: {
    key: '985eaa9c45d824a94344e64a2a3ca724'
  },
  analyticsKey: 'UA-418548-19',
  EDSDetails: {
    userDetails: {
      user_id: '12'
    },
    config: {
      server: 'eds.browserstack.com',
      port: '443',
      apiKey: '3T5kkUTZ2cGiy0zhLwyxBdDbx0GeJuZQd'
    }
  }
};

const analyticsEntities = {
  generalAnalyticsData: null,
  delayedAnalyticEvents: []
};

const logIntegrationsEvent = (name, data, sendToGA) => {
  /**
   * logEvent = (skipLoggingKeys,
   * eventType,
   * key,
   * data,
   * cb,
   * sendToGA
   * )
   *
   * Central-FE refuses to give sourcemaps at the moment
   *
   */

  //   if (IS_PROD) {
  logEvent([], 'web_events', name, data, undefined, sendToGA);
  //   }
};

export const analyticsEvent = (eventName, eventData, sendToGA) => {
  logIntegrationsEvent(
    eventName,
    {
      team: 'integrations',
      event_name: eventName,
      ...analyticsEntities.generalAnalyticsData,
      ...eventData
    },
    sendToGA
  );
};
