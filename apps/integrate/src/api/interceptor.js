import axios from 'axios';
import { getEnvConfig } from 'utils/getEnvConfig';

const envConfig = getEnvConfig();

// Add a request interceptor
export const requestInterceptor = axios.interceptors.request.use(
  (config) => {
    const configShallowCopy = config;
    configShallowCopy.baseURL = envConfig.apiUrl;
    configShallowCopy.withCredentials = envConfig.withCredentials;
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
