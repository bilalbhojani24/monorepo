import axios from 'axios';
import { getEnvConfig } from 'utils/common';

axios.interceptors.request.use((config) => {
  const updatedConfig = config;
  updatedConfig.baseURL = getEnvConfig().apiUrl;
  updatedConfig.withCredentials = getEnvConfig().withCredentials;
  updatedConfig.headers = updatedConfig.headers || {};
  return updatedConfig;
});
