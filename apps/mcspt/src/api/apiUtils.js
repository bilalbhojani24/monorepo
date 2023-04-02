const getApiPort = () => window.BS_PERF_API_PORT || 3000;

export const getBaseUrl = () => `http://localhost:${getApiPort()}/api/v1`;

export const getCsptApiUrl = () => `http://cspt-api.bsstag.com/api/v1`;
