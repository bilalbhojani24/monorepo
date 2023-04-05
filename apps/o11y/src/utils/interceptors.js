import axios from 'axios';
import { getEnvConfig } from 'utils/common';

const stageConfig = getEnvConfig();

axios.interceptors.request.use((config) => {
  const updatedConfig = config;
  updatedConfig.baseURL = stageConfig.apiUrl;
  updatedConfig.withCredentials = stageConfig.withCredentials;
  updatedConfig.headers = updatedConfig.headers || {};
  updatedConfig.headers['x-cookie-prefix'] = stageConfig.cookiePrefix;
  return updatedConfig;
});
