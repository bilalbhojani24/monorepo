import { cookieUtils as Cookie } from '@browserstack/utils';

import { baseURLSelector } from '../common/slices/configSlice';
import { store } from '../features/store';

import axios from './axiosInstance';
import { UAT_COOKIE_NAME } from './constants';
import { fetchTokenThunk } from './fetchToken';

// Add a request interceptor
const cookie = new Cookie();
export const requestInterceptor = axios.interceptors.request.use(
  (config) => {
    const configShallowCopy = config;
    configShallowCopy.baseURL = baseURLSelector(store.getState());
    configShallowCopy.retry = configShallowCopy.retry || 3;
    configShallowCopy.withCredentials = true;
    const token = cookie.read(UAT_COOKIE_NAME);
    if (token) {
      configShallowCopy.headers.Authorization = `Bearer ${token}`;
    }
    // Do something before request is sent
    return configShallowCopy;
  },
  (error) =>
    // Do something with request error
    Promise.reject(error)
);

// Add a response interceptor
export const responseInterceptor = axios.interceptors.response.use(
  (response) => response,
  // Do something with response data
  (error) => {
    // Do something with response error
    const { status, data } = error.response || {};
    const { config } = error;

    if (
      status === 401 &&
      (data.error?.refresh_token || !config.headers.Authorization)
    ) {
      // If config does not exist or the retry option is not set, reject
      if (!config || !config.retry) return Promise.reject(error);
      // Set the variable for keeping track of the retry count
      config.retryCount = config.retryCount || 0;

      // Check if we've maxed out the total number of retries
      if (config.retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(error);
      }

      // Increase the retry count
      config.retryCount += 1;

      // run refresh token flow
      cookie.erase(UAT_COOKIE_NAME); // remove cookie
      config.refreshToken = true;
      return store.dispatch(fetchTokenThunk(config)).then(() => {
        // new UAT has been issued and stored in cookie
        const token = cookie.read(UAT_COOKIE_NAME);
        if (token) {
          // update the original request config with new token
          config.headers.Authorization = `Bearer ${token}`;
        }
        // make new request with updated token
        return axios.request(config);
      });
    }
    return Promise.reject(error);
  }
);
