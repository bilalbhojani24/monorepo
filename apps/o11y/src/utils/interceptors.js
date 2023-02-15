/* eslint-disable no-param-reassign */
import axios from 'axios';

axios.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  config.headers['x-cookie-prefix'] = 'development___';
  config.withCredentials = true;
  return config;
});
