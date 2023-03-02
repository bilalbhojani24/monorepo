/* eslint-disable no-param-reassign */
import axios from 'axios';

const getCookiePrefix = () => {
  const url = new URL(window.location);

  if (url.hostname.includes('bsstag')) {
    if (url.hostname.includes('-local')) {
      return 'development__';
    }
    return `${url.hostname.split('.')[0].split('-').slice(1).join('-')}__`;
  }
  return '';
};

axios.interceptors.request.use((config) => {
  config.baseURL = 'https://localhost:8082/testops';
  config.withCredentials = false;
  config.headers = config.headers || {};
  config.headers['x-cookie-prefix'] = getCookiePrefix();
  return config;
});
