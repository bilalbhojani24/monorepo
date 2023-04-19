import axios from 'axios';
import { getEnvConfig } from 'utils/common';
import { o11yNotify } from 'utils/notification';

const getMockerConfig = (config) => {
  const updatedConfig = {};
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
  return updatedConfig;
};

export const excludeConfig = (url) => !!url.includes('https://eds');

const stageConfig = getEnvConfig();

axios.interceptors.request.use((config) => {
  let updatedConfig = config;
  const shouldExcludeConfig = excludeConfig(config.url);
  updatedConfig.baseURL = stageConfig.apiUrl;
  updatedConfig.withCredentials = shouldExcludeConfig
    ? false
    : stageConfig.withCredentials;

  // for use in local api-mocker only
  if (
    !stageConfig.isMocker &&
    (config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'patch')
  ) {
    updatedConfig = {
      ...updatedConfig,
      ...getMockerConfig(config)
    };
  }
  return updatedConfig;
});

axios.interceptors.response.use(
  (res) => Promise.resolve(res),
  (res) => {
    if (res?.response?.status === 500) {
      // if server error, show toast
      o11yNotify({
        title: 'Error occurred',
        description:
          'Some technical error occurred. Please try again. If this issue persists, contact Support.',
        type: 'error'
      });
    }
    return Promise.reject(res);
  }
);
