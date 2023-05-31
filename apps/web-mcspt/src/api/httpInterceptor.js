import axios from 'axios';

import { getAuthToken } from '../features/Dashboard';
import { store } from '../store';

axios.interceptors.request.use((config) => {
  const interceptedConfig = { ...config };

  if (interceptedConfig?.headers?.['Content-Type']) {
    interceptedConfig.headers['Content-Type'] = 'application/json';
  }

  const authToken = getAuthToken(store?.getState());

  if (authToken && interceptedConfig.url.indexOf('eds.browserstack') === -1) {
    interceptedConfig.headers.Authorization = `Bearer ${authToken}`;
  }

  return interceptedConfig;
});
