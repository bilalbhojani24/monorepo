// export const API_ROUTE = 'https://localhost:8082/testops';
export const API_ROUTE = 'https://devtestops-api.bsstag.com';

export const versionedBaseRoute = (version = 'v1') =>
  `${API_ROUTE}/api/${version}`;
