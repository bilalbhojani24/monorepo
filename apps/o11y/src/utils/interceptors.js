import axios from 'axios';
import { getEnvConfig } from 'utils/common';

axios.interceptors.request.use((config) => {
  const updatedConfig = config;
  updatedConfig.baseURL = getEnvConfig().apiUrl;
  updatedConfig.withCredentials = false;
  updatedConfig.headers = updatedConfig.headers || {};
  updatedConfig.headers['x-cookie-prefix'] = getEnvConfig().cookiePrefix;
  return updatedConfig;
});
