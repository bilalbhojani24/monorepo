import axios from 'axios';
import { getEnvConfig } from 'utils/common';

axios.interceptors.request.use((config) => {
  const updatedConfig = config;
  updatedConfig.baseURL = getEnvConfig().apiUrl;
  updatedConfig.withCredentials = getEnvConfig().withCredentials;
  updatedConfig.headers = updatedConfig.headers || {};
  updatedConfig.headers['x-cookie-prefix'] = getEnvConfig().cookiePrefix;

  // for use in local api-mocker only
  if (
    !getEnvConfig().withCredentials &&
    (config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'patch')
  ) {
    if (typeof config.data === 'object') {
      // To submit form data
      if (config.headers['Content-Type'] === 'multipart/form-data') {
        config.data?.append('authenticity_token', new Date());
      } else {
        updatedConfig.data = {
          ...config.data,
          authenticity_token: new Date()
        };
      }
    } else {
      updatedConfig.data = `${
        config.data ? `${config.data}&` : ''
      }authenticity_token=${encodeURIComponent(new Date())}`;
    }
  }
  return updatedConfig;
});
