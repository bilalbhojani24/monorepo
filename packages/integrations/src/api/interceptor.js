import { cookieUtils as Cookie } from '@browserstack/utils';
import axios from 'axios';
// Add a request interceptor
export const requestInterceptor = axios.interceptors.request.use(
  (config) => {
    const cookie = new Cookie();
    const token = cookie.read('integrations_token');
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
  (response) =>
    // Do something with response data
    response,
  (error) =>
    // Do something with response error
    Promise.reject(error)
);
