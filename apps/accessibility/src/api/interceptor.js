import axios from 'axios';
import { getConfigByKey, getCookieByKeyName } from 'utils';

axios.defaults.baseURL = getConfigByKey('VITE_APP_BACKEND_URL');

axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    console.log('_gid: ', getCookieByKeyName('_authcookie'));
    return config;
  },
  (error) =>
    // Do something with request error
    Promise.reject(error)
);
