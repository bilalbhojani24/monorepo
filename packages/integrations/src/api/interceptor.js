import { cookieUtils as Cookie } from '@browserstack/utils';
import axios from 'axios';

import { store } from '../features/store';

import { UAT_COOKIE_NAME } from './constants';
import { fetchTokenThunk } from './fetchToken';

// Add a request interceptor
const cookie = new Cookie();
export const requestInterceptor = axios.interceptors.request.use(
  (config) => {
    const token = cookie.read(UAT_COOKIE_NAME);
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Do something before request is sent
    return config;
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
    const { status, data } = error.response;
    if (
      status === 401 &&
      typeof data.error_message === 'object' &&
      data.error_message.refresh_token
    ) {
      // run refresh token flow
      cookie.erase(UAT_COOKIE_NAME); // remove cookie
      return store.dispatch(fetchTokenThunk()).then(() => {
        // new UAT has been issued and stored in cookie
        const token = cookie.read(UAT_COOKIE_NAME);
        const configShallowCopy = error.config;
        if (token) {
          // update the original request config with new token
          configShallowCopy.headers.Authorization = `Bearer ${token}`;
        }
        // make new request with updated token
        return axios.request(configShallowCopy);
      });
    }
    return Promise.reject(error);
  }
);
