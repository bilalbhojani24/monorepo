import axios from 'axios';
import { getEnvConfig } from 'utils/common';

import { o11yNotify } from './notification';

axios.interceptors.request.use((config) => {
  const updatedConfig = config;
  updatedConfig.baseURL = getEnvConfig().apiUrl;
  updatedConfig.withCredentials = getEnvConfig().withCredentials;
  updatedConfig.headers = updatedConfig.headers || {};
  updatedConfig.headers['x-cookie-prefix'] = getEnvConfig().cookiePrefix;
  return updatedConfig;
});

axios.interceptors.response.use(
  (res) => Promise.resolve(res),
  (res) => {
    if (res?.response?.status === 500) {
      // if server error, show toast
      o11yNotify({
        title: 'Error occurred',
        description:
          'Some technical error occurred. Please try again. If this issue persists, contact Support.',
        type: 'error'
      });
    }
    return Promise.reject(res);
  }
);
