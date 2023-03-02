import axios from 'axios';
import { getConfigByKey, getCookieByKeyName } from 'utils';

axios.defaults.baseURL = getConfigByKey('VITE_APP_BACKEND_URL');

axios.interceptors.request.use(
  (request) => {
    // Do something before request is sent
    console.log('_gid: request', getCookieByKeyName('_authcookie'), request);
    return request;
  },
  (error) =>
    // Do something with request error
    Promise.reject(error)
);
