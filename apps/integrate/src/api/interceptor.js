import axios from 'axios';

// Add a request interceptor
export const requestInterceptor = axios.interceptors.request.use(
  (config) => {
    const configShallowCopy = config;
    configShallowCopy.baseURL = 'http://localhost:3001';
    configShallowCopy.withCredentials = true;
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
  // eslint-disable-next-line sonarjs/cognitive-complexity
  (error) =>
    // Do something with response error
    Promise.reject(error)
);
