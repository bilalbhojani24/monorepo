const STAGING_CONFIG = (envName) => ({
  signInUrl: `https://devtestops-api.bsstag.com/api/v1/auth/start-sso`,
  signOutUrl: `https://${envName}.bsstag.com/users/sign_out`,
  apiUrl: 'https://devtestops-api.bsstag.com',
  baseUrl: 'https://devtestops.bsstag.com',
  withCredentials: true
});

export default {
  local: {
    signInUrl: `${STAGING_CONFIG('').apiUrl}/api/v1/auth/start-sso`,
    signOutUrl: STAGING_CONFIG('devtestops').signOutUrl,
    apiUrl: 'https://localhost:8082/testops',
    baseDocUrl: STAGING_CONFIG('').baseUrl,
    withCredentials: false,
    isMocker: true
  },
  'local-staging': {
    signInUrl: `${STAGING_CONFIG('').apiUrl}/api/v1/auth/start-sso`,
    signOutUrl: STAGING_CONFIG('devtestops').signOutUrl,
    baseUrl: STAGING_CONFIG('').baseUrl,
    apiUrl: STAGING_CONFIG('').apiUrl,
    withCredentials: true
  },
  staging: {
    ...STAGING_CONFIG('devtestops')
  },
  devtestops: {
    ...STAGING_CONFIG('devtestops')
  },
  'dev-staging': {
    ...STAGING_CONFIG('devtestops')
  },
  preprod: {
    signInUrl:
      'https://api-observability-preprod.bsstag.com/api/v1/auth/start-sso',
    signOutUrl: 'https://preprod.bsstag.com/users/sign_out',
    apiUrl: 'https://api-observability-preprod.bsstag.com',
    baseUrl: 'https://preprod.bsstag.com',
    withCredentials: true
  },
  production: {
    signInUrl:
      'https://api-observability.browserstack.com/api/v1/auth/start-sso',
    signOutUrl: '',
    apiUrl: 'https://api-observability.browserstack.com',
    baseUrl: 'https://browserstack.com',
    withCredentials: true,
    enableAnalytics: true,
    disableLogs: true
  }
};
