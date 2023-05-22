const getApiPort = () => window.BS_PERF_API_PORT || 3000;

export const getBaseUrl = () => `http://localhost:${getApiPort()}/api/v1`;

export const getBaseUrlForWeb = () =>
  `https://app-performance-testing.${
    IS_PROD ? 'browserstack' : 'bsstag'
  }.com/api/v1`;

export const getCsptApiUrl = () =>
  `http://cspt-api.${IS_PROD ? 'browserstack' : 'bsstag'}.com/api/v1`;

export const getSignOutUrl = () =>
  `http://cspt-api.${IS_PROD ? 'browserstack' : 'bsstag'}.com/users/sign_out`;

export const getWebsiteUrlOrigin = () =>
  IS_DEV
    ? `http://127.0.0.1:5173/`
    : `https://app-performance-testing.${
        IS_PROD ? 'browserstack' : 'bsstag'
      }.com`;
