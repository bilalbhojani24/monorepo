import axios from 'axios';
import Cookies from 'js-cookie';

import { EdsConfig, EDSThresholdConstants, EDSUserDetails } from '../constants';

export const EDS = {
  appAutomateWebEvents: 'app_automate_web_events',
  automateWebEvent: 'automate_web_events',
  liveWebEvents: 'live_web_events',
  appLiveWebEvents: 'app_live_web_events',
  webEvents: 'web_events',
  webEventsPii: 'web_events_pii',
  liveTestSessions: 'live_test_sessions',
  appLiveTestSessions: 'app_live_test_sessions',
  statUptimeCalculation: 'stat_uptime_calculation',
  user: { location: {} },
  initialized: false,

  init: (userDetails) => {
    if (EDS.initialized) {
      return;
    }
    EDS.user = userDetails;
    EDS.initialized = true;
  },

  getHeader: (eventName) => {
    switch (eventName) {
      case 'FrontendGeneralStats':
        return {
          name: 'X-Frontend-Stats',
          val: 'general'
        };
      case 'FrontendPerformanceStats':
        return {
          name: 'X-Frontend-Stats',
          val: 'performance'
        };
      default:
        return false;
    }
  },

  getAmplitudeSpecificData: () => {
    const bsDeviceId = EDS.getBsDeviceId();
    const demographics = EDS.getUserDemographics();
    return {
      device_id: bsDeviceId,
      city: EDS.user.location.city,
      country: EDS.user.location.country,
      ip: EDS.user.location.ip,
      region: EDS.user.location.region,
      location_lng: EDS.user.location.longitude,
      location_lat: EDS.user.location.latitude,
      device_family: demographics.os,
      device_model: demographics.os,
      device_type: demographics.os,
      os: demographics.os,
      os_name: demographics.os,
      os_version: demographics.os,
      browser: demographics.browser,
      browser_version: demographics.browser_version,
      platform: demographics.platform
    };
  },

  shouldSendToEDS: (eventType) => {
    if (eventType === EDS.liveTestSessions) {
      return EDSThresholdConstants.EDSLiveTestSessionsThrottleThreshold;
    }
    if (eventType === EDS.appLiveTestSessions) {
      return EDSThresholdConstants.EDSAppLiveTestSessionsThrottleThreshold;
    }
    if (eventType === EDS.liveWebEvents) {
      return EDSThresholdConstants.EDSLiveWebEventsThrottleThreshold;
    }
    if (eventType === EDS.appLiveWebEvents) {
      return EDSThresholdConstants.EDSAppLiveWebEventsThrottleThreshold;
    }
    if (eventType === EDS.appAutomateWebEvents) {
      return EDSThresholdConstants.EDSAppAutomateWebEventsThrottleThreshold;
    }
    if (eventType === EDS.webEvents) {
      return EDSThresholdConstants.EDSWebEventsThrottleThreshold;
    }
    if (eventType === EDS.webEventsPii) {
      return EDSThresholdConstants.EDSWebEventsPiiThrottleThreshold;
    }
    return (
      eventType === EDS.automateWebEvent ||
      Math.floor(Math.random() * 100) <
        EDSThresholdConstants.EDSCommonThrottleThreshold
    );
  },

  logEvent: (eventName, eventType, extraData, sessionId) => {
    let eventData;
    let edsURL;
    // let header;
    if (typeof EDSUserDetails !== 'undefined') {
      EDS.init(EDSUserDetails);

      if (!EDS.shouldSendToEDS(eventType)) {
        return;
      }

      // These fields are not present in the live_test_sessions schema, are anyways dropped and creating a lot of noise during EDS parsing
      if (eventType !== EDS.liveTestSessions) {
        // EDS.user = $.extend(EDS.user, EDS.getAmplitudeSpecificData());
        EDS.user = { ...EDS.user, ...EDS.getAmplitudeSpecificData() };
      }

      // is only meant for web_events as confirmed from online sales (used by bizops), temporarily excluding it from live_test_sessions to avoid EDS parsing noise
      if (eventType !== EDS.liveTestSessions) {
        EDS.user = {
          ...EDS.user
          //   abUserId: BrowserStackConfig.abUserId,
          //   internalExps: BrowserStackConfig.allExperiments,
          //   internalAbExps: BrowserStackConfig.allAbExperiments,
          //   browserStackExperiments:
          //     typeof Experiments !== 'undefined' ? Experiments : {}
        };
      }

      eventData = {
        event_type: eventType,
        data: {
          user: EDS.user,
          session_id: sessionId,
          eds_timestamp: parseInt(new Date().getTime() / 1000, 10),
          ...extraData
        },
        api_key: EdsConfig.api
      };

      // is only meant for web_events, temporarily excluding it from live_test_sessions to avoid EDS parsing noise
      if (eventType !== EDS.liveTestSessions) {
        eventData.data = {
          ...eventData.data,
          event_name: eventName
        };
      }

      edsURL = `https://${EdsConfig.server}:${EdsConfig.port}/send_event`;
      //   header = EDS.getHeader(eventName);

      axios({
        method: 'post',
        url: edsURL,
        data: JSON.stringify(eventData),
        headers: {
          'content-type': 'application/json'
        }
      });

      //   jQuery.ajax({
      //     url: edsURL,
      //     type: 'POST',
      //     contentType: 'application/json',
      //     data: JSON.stringify(eventData),
      //     beforeSend(xhr) {
      //       if (header) {
      //         xhr.setRequestHeader(header.name, header.val);
      //       }
      //     }
      //   });
    }
  },

  //   sendToEDSDenorm: (params) => {
  //     const allowedEDSParams = {};
  //     params.forEach((k, v) => {
  //       try {
  //         if (
  //           EDSDenormalizedLogs.edsAllowedParams.indexOf(k) > -1 ||
  //           EDSDenormalizedLogs.edsAllowedParams.indexOf(
  //             k.replace('_count', '')
  //           ) > -1
  //         ) {
  //           // Only send the events to EDS that are required for DenormalizedSummaryLogs of BigQuery
  //           // Most of the events are log_attempt_count requests and hence require both
  //           // <event> and <event>_count to be whitelisted
  //           allowedEDSParams[k] = v;
  //         }
  //       } catch (err) {}
  //     });

  //     try {
  //       if (
  //         Object.keys(allowedEDSParams).length > 0 &&
  //         BsWebrtcApi.live_session_id
  //       ) {
  //         allowedEDSParams.version = BsWebrtcApi.version;
  //         allowedEDSParams.session_id = BsWebrtcApi.live_session_id;
  //         if (BrowserStack.app_live_testing) {
  //           EDSDenormalizedLogs.sendEvent(
  //             'eds_app_live_session_report',
  //             allowedEDSParams
  //           );
  //         } else {
  //           EDSDenormalizedLogs.sendEvent(
  //             'eds_live_session_report',
  //             allowedEDSParams
  //           );
  //         }
  //       }
  //     } catch (err) {}
  //   },

  guid: () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
  },

  getUserDemographics: () => {
    const browserAndVersion = EDS.getBrowserVersion();
    const browser = browserAndVersion[0];
    const browserVersion = browserAndVersion[1];
    return {
      os: EDS.getUserOS(),
      browser,
      browser_version: browserVersion,
      platform: EDS.getPlatform()
    };
  },

  getUserOS: () => {
    let OSName = 'Unknown OS';
    if (navigator.appVersion.indexOf('Win') !== -1) {
      OSName = 'Windows';
    }
    if (navigator.appVersion.indexOf('Mac') !== -1) {
      OSName = 'Mac';
    }
    if (navigator.appVersion.indexOf('X11') !== -1) {
      OSName = 'UNIX';
    }
    if (navigator.appVersion.indexOf('Linux') !== -1) {
      OSName = 'Linux';
    }

    return OSName;
  },

  getBrowserVersion: () => {
    const ua = navigator.userAgent;
    let tem;
    let M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      ) || [];
    if (/Edg/.test(ua)) {
      const edgeUA = ua.match(/(Edg(?=\/))\/?\s*(\d+)/i) || [];
      return ['Edge', edgeUA[2]];
    }
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return `IE ${tem[1] || ''}`;
    }
    if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem !== null) {
        return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }
    }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    // eslint-disable-next-line no-cond-assign
    if ((tem = ua.match(/version\/(\d+)/i)) !== null) {
      M.splice(1, 1, tem[1]);
    }
    return M;
  },

  getPlatform: () => {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      return 'Mobile';
    }
    return 'Web';
  },

  getBsDeviceId: () => {
    let bsDeviceId = Cookies.get('bs_deviceId');
    if (
      bsDeviceId === undefined ||
      bsDeviceId === 'undefined' ||
      bsDeviceId === ''
    ) {
      bsDeviceId = EDS.guid();
      Cookies.set('bs_deviceId', bsDeviceId);
    }
    return bsDeviceId;
  }
};
