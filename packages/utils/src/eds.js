import axios from 'axios';

const EDS = {
  user: { location: {} },
  initialized: false,
  config: {},

  getHeader: (eventName) => {
    switch (eventName) {
      case 'FrontendGeneralStats':
        return {
          'X-Frontend-Stats': 'general'
        };
      case 'FrontendPerformanceStats':
        return { 'X-Frontend-Stats': 'performance' };
      default:
        return {};
    }
  }
};

export const initEDS = (initializer) => {
  if (EDS.initialized) {
    throw new Error('EDS already initialsed!');
  }
  EDS.user = initializer.userDetails;
  EDS.config = initializer.config;
  EDS.initialized = true;
};

/**
 *
 * @param {*} eventName : string
 * @param {*} eventType : string
 * @param {*} extraData : {any}
 */

export const logEDSEvent = (eventName, eventType, extraData, sessionId) => {
  if (!EDS.initialized) {
    throw new Error('EDS not initialised');
  }

  const eventData = {
    event_type: eventType,
    data: {
      user: EDS.user,
      session_id: sessionId,
      eds_timestamp: parseInt(new Date().getTime() / 1000, 10),
      event_name: eventName,
      ...extraData
    },
    api_key: EDS.config.apiKey
  };

  const edsURL = `https://${EDS.config.server}:${EDS.config.port}/send_event`;

  axios({
    method: 'post',
    url: edsURL,
    data: JSON.stringify(eventData),
    headers: {
      'content-type': 'application/json',
      ...EDS.getHeader(eventName)
    }
  });
};
