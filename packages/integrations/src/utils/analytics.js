import { logEvent } from '@browserstack/utils';

// import { baseURLSelector } from '../common/slices/configSlice';
// import { DEFAULT_CONFIG } from '../features/CreateIssue/constants';
import { activeIntegrationSelector } from '../features/slices/integrationsSlice';
import { store } from '../features/store';

export const getAnalyticsKeys = (userId) => ({
  amplitudeKey: '985eaa9c45d824a94344e64a2a3ca724',
  amplitudeConfig: {
    key: '985eaa9c45d824a94344e64a2a3ca724',
    userData: {
      user_id: userId
    }
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
  TICKET_UPDATE_ERROR: 'IntegrationsTicketUpdateError',
  WIDGET_CLOSED: 'IntegrationsWidgetClosed'
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

  // if base url is the default base url, then we are hitting prod
  // const isProd = baseURLSelector(store.getState()) === DEFAULT_CONFIG.baseURL;
  // if (isProd) {
  logEvent([], 'web_events', name, data, undefined, sendToGA);
  // }
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

export const getCommonMetrics = () => {
  const activeIntegration = activeIntegrationSelector(store.getState());
  return {
    category: activeIntegration.category,
    integration_tool: activeIntegration.value
  };
};
