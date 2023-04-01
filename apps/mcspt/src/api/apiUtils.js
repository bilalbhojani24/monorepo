const getApiPort = () => window.BS_PERF_API_PORT || 3000;

export const getBaseUrl = () => `http://localhost:${getApiPort()}/api/v1`;

export const getCsptApiUrl = () =>
  `http://cspt-api.${IS_DEV ? 'bsstag' : 'browserstack'}.com/api/v1`;
