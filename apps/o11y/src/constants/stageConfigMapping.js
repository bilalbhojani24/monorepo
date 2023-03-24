const COOKIE_SEPARATOR = '___';
const STAGING_CONFIG = (envName) => ({
  cookiePrefix: `${envName}${COOKIE_SEPARATOR}`,
  signInUrl: `https://${envName}.bsstag.com/users/sign_in`,
  apiUrl: 'https://devtestops-api.bsstag.com',
  withCredentials: true
});

export default {
  local: {
    cookiePrefix: `development${COOKIE_SEPARATOR}`,
    signInUrl: 'https://local.bsstag.com/users/sign_in',
    apiUrl: 'https://localhost:8082/testops',
    withCredentials: false
  },
  'local-staging': {
    cookiePrefix: `development${COOKIE_SEPARATOR}`,
    signInUrl: 'https://local.bsstag.com/users/sign_in',
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
    cookiePrefix: `preprod${COOKIE_SEPARATOR}`,
    signInUrl: 'https://preprod.bsstag.com/users/sign_in',
    apiUrl: 'https://api-observability-preprod.bsstag.com',
    withCredentials: true
  },
  production: {
    cookiePrefix: '',
    signInUrl: 'https://browserstack.com/users/sign_in',
    apiUrl: 'https://api-observability.browserstack.com',
    withCredentials: true,
    enableAnalytics: true
  }
};
