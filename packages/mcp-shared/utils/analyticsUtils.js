import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { initLogger, logEvent } from '@browserstack/utils';

export const getGeneralAnalyticsForUtils = (state) =>
  state.dashboard?.generalAnalytics;

export const ANALYTICS_KEYS = {
  amplitudeConfig: {
    key: '985eaa9c45d824a94344e64a2a3ca724',
    userData: {}
  },
  analyticsKey: 'UA-418548-19',
  EDSDetails: {
    userDetails: {},
    config: {
      server: 'eds.browserstack.com',
      port: '443',
      apiKey: '5PJymLNdWrOwzQNC7J6SXBuUFQGWq4Vuw'
    }
  }
};

const analyticsEntities = {
  generalAnalyticsData: null,
  delayedAnalyticEvents: []
};

const logMcpEvent = (name, data, sendToGA) => {
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

  if (IS_PROD) {
    logEvent([], 'web_events', name, data, undefined, sendToGA);
  }
};

const sendDelayedEvents = () => {
  /**
   * When react app is launced but redux store is not initiated yet,
   * we cant get general analytics details because it needs to come from api.
   * hence, we store those events and launch them together one GA data is available
   */

  if (
    analyticsEntities.generalAnalyticsData &&
    analyticsEntities.delayedAnalyticEvents.length > 0
  ) {
    analyticsEntities.delayedAnalyticEvents.forEach((analyticEvent) => {
      logMcpEvent(
        analyticEvent.eventName,
        {
          team: 'cspt',
          event_name: analyticEvent.eventName,
          ...analyticsEntities.generalAnalyticsData,
          ...analyticEvent.eventData
        },
        analyticEvent.sendToGA
      );

      analyticsEntities.delayedAnalyticEvents.shift();
    });
  }
};

export const mcpAnalyticsEvent = (eventName, eventData, sendToGA) => {
  if (analyticsEntities.generalAnalyticsData) {
    logMcpEvent(
      eventName,
      {
        team: 'cspt',
        event_name: eventName,
        ...analyticsEntities.generalAnalyticsData,
        ...eventData
      },
      sendToGA
    );
  } else {
    analyticsEntities.delayedAnalyticEvents.push({
      eventName,
      eventData,
      sendToGA
    });
  }
};

export const useMcpAnalytics = () => {
  const generalAnalytics = useSelector(getGeneralAnalyticsForUtils);

  useEffect(() => {
    if (generalAnalytics) {
      analyticsEntities.generalAnalyticsData = generalAnalytics;

      sendDelayedEvents();
    }
  }, [generalAnalytics]);
};

export const updateAndInitiateAnalytics = (analyticsDataFromBE) => {
  ANALYTICS_KEYS.amplitudeConfig.userData = { ...analyticsDataFromBE };
  ANALYTICS_KEYS.EDSDetails.userDetails = { ...analyticsDataFromBE };

  initLogger(ANALYTICS_KEYS);
};
