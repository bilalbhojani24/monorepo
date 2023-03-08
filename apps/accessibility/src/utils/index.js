import { ENVS } from 'constants';

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

export const defaultPath = () => {
  const link = window.location.href;
  if (link.includes('/reports')) {
    return 'report-listing';
  }
  if (link.includes('/screen-reader')) {
    return 'screen-reader';
  }
  return 'report-listing';
};

export const getCurrentEnv = () => {
  const { href } = window.location;
  if (href.includes('localhost')) {
    return ENVS.LOCAL;
  }
  if (href.includes('bsstag.com')) {
    return ENVS.STAGING;
  }
  if (href.includes('browserstack.com')) {
    return ENVS.PRODUCTION;
  }
  return ENVS.DEVELOPMENT;
};

export const getEnvUrl = () => {
  const env = getCurrentEnv();
  let baseURL = 'https://accessibility-beta.browserstack.com/api';
  if (env === ENVS.LOCAL) {
    baseURL = 'https://accessibility.bsstag.com/api';
  } else if (env === ENVS.STAGING) {
    baseURL = 'https://accessibility.bsstag.com/api';
  } else if (env === ENVS.PRODUCTION) {
    baseURL = 'https://accessibility-beta.browserstack.com/api';
  }
  return baseURL;
};

export const getBrowserStackEnvUrl = () => {
  const env = getCurrentEnv();
  let baseURL = 'https://www.browserstack.com/accessibility/api';
  if (env === ENVS.LOCAL) {
    baseURL = 'https://devaccessibility.bsstag.com/accessibility/api';
  } else if (env === ENVS.STAGING) {
    baseURL = 'https://devaccessibility.bsstag.com/accessibility/api';
  } else if (env === ENVS.PRODUCTION) {
    baseURL = 'https://www.browserstack.com/accessibility/api';
  }
  return baseURL;
};
