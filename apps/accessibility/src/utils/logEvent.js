import {
  cookieUtils as CookieUtils,
  initLogger,
  logEvent as logAccessibilityEvent
} from '@browserstack/utils';
import { ANALYTICS_KEYS, EDSKey, ENVS } from 'constants';
import { getCurrentEnv } from 'utils';

import store from '../store';

let isInit = false;
const eventQueue = [];

const cookieUtils = new CookieUtils();

const env = getCurrentEnv();

const getLoggersKeys = () => {
  const currentUser = store.getState().accessibility.app.dashboard || {};

  if (env === ENVS.PRODUCTION) {
    return {
      amplitudeKey: '985eaa9c45d824a94344e64a2a3ca724',
      amplitudeConfig: {
        key: '985eaa9c45d824a94344e64a2a3ca724',
        userData: {},
        groupData: {}
      },
      analyticsKey: 'UA-418548-19',
      EDSDetails: {
        config: {
          server: 'eds.browserstack.com',
          port: '443',
          apiKey: '5PJymLNdWrOwzQNC7J6SXBuUFQGWq4Vuw'
        },
        userDetails: {
          user_id: currentUser.user.user_id ? currentUser.user.user_id : ''
        }
      }
    };
  }
  return {
    ...ANALYTICS_KEYS,
    analyticsKey: 'UA-x-x',
    EDSDetails: {
      ...ANALYTICS_KEYS.EDSDetails,
      userDetails: {
        user_id: currentUser.user.user_id ? currentUser.user.user_id : ''
      }
    }
  }; // added random key so that it does not break UI. Done for staging and local.
};

export const getConfigByKey = (key) => {
  const envVars = import.meta.env;
  if (!key) {
    return null;
  }
  return envVars[key];
};

export const getCookieByKeyName = (key) => {
  const name = `${key}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const logEvent = (name, data = {}, skipLoggingKeys = []) => {
  const product = 'accessibility';
  const experimentValue = {
    experimentValue: cookieUtils.read('header_scalability')
  };
  const analyticsPayload = { ...data, ...experimentValue };
  analyticsPayload.event_name = name;

  if (!isInit) {
    eventQueue.push({ name, data, skipLoggingKeys });
  }

  logAccessibilityEvent(skipLoggingKeys, EDSKey, name, {
    product,
    team: product,
    ...analyticsPayload
  });
};

export const startLogging = () => {
  const keys = getLoggersKeys();
  initLogger(keys);
  const experimentValue = {
    experimentValue: cookieUtils.read('header_scalability')
  };
  if (eventQueue.length) {
    eventQueue.forEach(({ name, data, skipLoggingKeys }) => {
      logEvent(name, { ...data, ...experimentValue }, skipLoggingKeys);
    });
  }
  isInit = true;
};
