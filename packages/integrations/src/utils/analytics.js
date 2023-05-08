import { logEvent } from '@browserstack/utils';

export const getAnalyticsKeys = (userId) => ({
  amplitudeKey: '985eaa9c45d824a94344e64a2a3ca724',
  amplitudeConfig: {
    key: '985eaa9c45d824a94344e64a2a3ca724'
  },
  analyticsKey: 'UA-418548-19',
  EDSDetails: {
    userDetails: {
      user_id: userId
    },
    config: {
      server: 'eds.browserstack.com',
      port: '443',
      apiKey: '3T5kkUTZ2cGiy0zhLwyxBdDbx0GeJuZQd'
    }
  }
});

export const ANALYTICS_EVENTS = {
  AUTH_CONNECT: 'IntegrationsAuthConnectCTAClicked',
  AUTH_SUCCESS: 'IntegrationsAuthSuccess',
  AUTH_ERROR: 'IntegrationsAuthError',
  ISSUE_TYPE_SELECTION: 'IntegrationsIssueTypeSelected',
  TICKET_CREATE_SUCCESS: 'IntegrationsTicketCreateSuccess',
  TICKET_CREATE_ERROR: 'IntegrationsTicketCreateError',
  TICKET_UPDATE_SUCCESS: 'IntegrationsTicketUpdateSuccess',
  TICKET_UPDATE_ERROR: 'IntegrationsTicketUpdateError'
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
