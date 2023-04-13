import axios from 'axios';
import { STATIC_INTEGRATIONS_PREPROD_BASE_URL } from 'features/IntegrationsWidget/constants';
import { getEnvConfig } from 'utils/common';

import { o11yNotify } from './notification';

const stageConfig = getEnvConfig();

axios.interceptors.request.use((config) => {
  const updatedConfig = config;
  updatedConfig.baseURL = stageConfig.apiUrl;
  updatedConfig.withCredentials = stageConfig.withCredentials;
  updatedConfig.headers = updatedConfig.headers || {};
  if (!config.url.includes(STATIC_INTEGRATIONS_PREPROD_BASE_URL)) {
    updatedConfig.headers['x-cookie-prefix'] = stageConfig.cookiePrefix;
  }
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
