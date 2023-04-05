import axios from 'axios';
import { getEnvConfig } from 'utils/common';

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

axios.interceptors.request.use((config) => {
  let updatedConfig = config;
  const stageConfig = getEnvConfig();
  updatedConfig.baseURL = stageConfig.apiUrl;
  updatedConfig.withCredentials = stageConfig.withCredentials;
  updatedConfig.headers = updatedConfig.headers || {};
  updatedConfig.headers['x-cookie-prefix'] = stageConfig.cookiePrefix;

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
