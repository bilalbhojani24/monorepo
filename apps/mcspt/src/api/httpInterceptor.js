import axios from 'axios';

// Interceptors for api calls. This was not added in the main axios interceptors; didn't want to break things there!
axios.interceptors.request.use((config) => {
  const interceptedConfig = { config };

  interceptedConfig.headers.Accept = 'application/json';

  return interceptedConfig;
});
