import axios from 'axios';
import { getConfigByKey } from 'utils';

axios.defaults.baseURL =
  getConfigByKey('VITE_APP_BACKEND_URL') ||
  // 'https://accessibility.bsstag.com/api' ||
  `${window.location.origin}/api`;

axios.interceptors.request.use((config) => {
  if (config.url.includes('eds.browserstack.com')) {
    return config;
  }
  return {
    ...config,
    withCredentials: true
  };
});
