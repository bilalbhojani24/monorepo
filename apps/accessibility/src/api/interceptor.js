import { cookieUtils as CookieUtils } from '@browserstack/utils';
import axios from 'axios';
import { getConfigByKey, getCookieByKeyName } from 'utils';

// console.log('hello');
// const cookieUtils = new CookieUtils();
// console.log('_gid: ', cookieUtils.read('_gid'));
axios.defaults.baseURL = getConfigByKey('VITE_APP_BACKEND_URL');

axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    console.log('_gid: ', getCookieByKeyName('_gid'));
    return config;
  },
  (error) =>
    // Do something with request error
    Promise.reject(error)
);
