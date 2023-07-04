import axios from 'axios';
import { ENVS } from 'constants';
import { getConfigByKey, getCurrentEnv } from 'utils';

const env = getCurrentEnv();

axios.defaults.baseURL =
  env === ENVS.LOCAL
    ? 'https://accessibility.bsstag.com/api'
    : getConfigByKey('VITE_APP_BACKEND_URL') || `${window.location.origin}/api`;

axios.interceptors.request.use((config) => {
  if (env === ENVS.LOCAL) {
    const bypassHeaders = {
      'X-Auth-Override': 6
    };
    return {
      ...config,
      headers: {
        ...config.headers,
        ...bypassHeaders
      }
    };
  }

  if (config.url.includes('eds.browserstack.com') || env === ENVS.LOCAL) {
    return config;
  }
  return {
    ...config,
    withCredentials: true
  };
});
