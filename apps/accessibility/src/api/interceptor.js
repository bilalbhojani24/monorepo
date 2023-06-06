import axios from 'axios';
import { ENVS } from 'constants';
import { getConfigByKey, getCurrentEnv } from 'utils';

const env = getCurrentEnv();

axios.defaults.baseURL =
  env === ENVS.LOCAL
    ? 'https://accessibility.bsstag.com/api'
    : getConfigByKey('VITE_APP_BACKEND_URL') || `${window.location.origin}/api`;

axios.interceptors.request.use((config) => {
  const newConfig = { ...config };

  if ([ENVS.LOCAL, ENVS.DEVELOPMENT].includes(env)) {
    newConfig.headers['X-Auth-Override'] = 6;
  }

  if (newConfig.url.includes('eds.browserstack.com') || env === ENVS.LOCAL) {
    return newConfig;
  }
  return {
    ...newConfig,
    withCredentials: true
  };
});
