import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { logEvent } from '@browserstack/utils';

import { getGeneralAnalytics } from '../features/Dashboard/slices/dashboardSlice';

export const ANALYTICS_KEYS = {
  amplitudeKey: '985eaa9c45d824a94344e64a2a3ca724',
  amplitudeConfig: {
    key: '985eaa9c45d824a94344e64a2a3ca724'
  },
  analyticsKey: 'UA-418548-19',
  EDSDetails: {
    userDetails: '12',
    config: {
      server: 'eds.browserstack.com',
      port: '443',
      api: '3T5kkUTZ2cGiy0zhLwyxBdDbx0GeJuZQd'
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

  if (!IS_DEV) {
    logEvent([], 'MCSPT', name, data, undefined, sendToGA);
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
      { ...analyticsEntities.generalAnalyticsData, ...eventData },
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
  const generalAnalytics = useSelector(getGeneralAnalytics);

  useEffect(() => {
    if (generalAnalytics) {
      analyticsEntities.generalAnalyticsData = generalAnalytics;
      sendDelayedEvents();
    }
  }, [generalAnalytics]);
};
