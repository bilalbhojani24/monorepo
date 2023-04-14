const STAGING_CONFIG = (envName) => ({
  signInUrl: `https://${envName}.bsstag.com/users/sign_in`,
  apiUrl: 'https://devtestops-api.bsstag.com',
  baseDocUrl: 'https://devtestops.bsstag.com',
  withCredentials: true
});

export default {
  local: {
    signInUrl: `${STAGING_CONFIG('').apiUrl}/api/v1/auth/start-sso`,
    apiUrl: 'https://localhost:8082/testops',
    baseDocUrl: STAGING_CONFIG('').baseDocUrl,
    withCredentials: false
  },
  'local-staging': {
    signInUrl: `${STAGING_CONFIG('').apiUrl}/api/v1/auth/start-sso`,
    baseDocUrl: STAGING_CONFIG('').baseDocUrl,
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
    apiUrl: 'https://api-observability-preprod.bsstag.com',
    baseDocUrl: 'https://preprod.bsstag.com',
    withCredentials: true
  },
  production: {
    signInUrl:
      'https://api-observability.browserstack.com/api/v1/auth/start-sso',
    apiUrl: 'https://api-observability.browserstack.com',
    baseDocUrl: 'https://browserstack.com',
    withCredentials: true,
    enableAnalytics: true
  }
};
