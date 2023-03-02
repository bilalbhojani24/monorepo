import { cookieUtils as Cookie } from '@browserstack/utils';
import axios from 'axios';

import { store } from '../features/store';

import { fetchTokenThunk } from './fetchToken';
// Add a request interceptor
export const requestInterceptor = axios.interceptors.request.use(
  (config) => {
    const cookie = new Cookie();
    const token = cookie.read('UAT');
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
    if (status === 401 && data.message.name === 'TokenExpiredError') {
      // token has expired, refetch it
      // console.log(dispatch);
      store.dispatch(fetchTokenThunk());
    }
    return Promise.reject(error);
  }
);
