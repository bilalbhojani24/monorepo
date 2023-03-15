/* eslint-disable no-param-reassign */
import axios from 'axios';
import { getEnvConfig } from 'utils/common';

axios.interceptors.request.use((config) => {
  config.baseURL = getEnvConfig().apiUrl;
  config.withCredentials = false;
  config.headers = config.headers || {};
  config.headers['x-cookie-prefix'] = getEnvConfig().cookiePrefix;
  return config;
});
