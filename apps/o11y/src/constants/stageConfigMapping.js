const COOKIE_SEPARATOR = '___';
const STAGING_CONFIG = (envName) => ({
  cookiePrefix: `${envName}${COOKIE_SEPARATOR}`,
  signInUrl: `https://${envName}.bsstag.com/users/sign_in`,
  signOutUrl: `https://${envName}.bsstag.com/users/sign_out`,
  apiUrl: 'https://devtestops-api.bsstag.com',
  baseUrl: 'https://devtestops.bsstag.com',
  withCredentials: true
});

export default {
  local: {
    cookiePrefix: `development${COOKIE_SEPARATOR}`,
    signInUrl: 'https://local.bsstag.com/users/sign_in',
    signOutUrl: 'https://local.bsstag.com/users/sign_out',
    apiUrl: 'https://localhost:8082/testops',
    baseUrl: STAGING_CONFIG('').baseUrl,
    withCredentials: false,
    isMocker: true
  },
  'local-staging': {
    cookiePrefix: `development${COOKIE_SEPARATOR}`,
    signInUrl: 'https://local.bsstag.com/users/sign_in',
    signOutUrl: 'https://local.bsstag.com/users/sign_out',
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
    cookiePrefix: `preprod${COOKIE_SEPARATOR}`,
    signInUrl: 'https://preprod.bsstag.com/users/sign_in',
    signOutUrl: 'https://preprod.bsstag.com/users/sign_out',
    apiUrl: 'https://api-observability-preprod.bsstag.com',
    baseUrl: 'https://preprod.bsstag.com',
    withCredentials: true
  },
  production: {
    cookiePrefix: '',
    signInUrl: 'https://browserstack.com/users/sign_in',
    signOutUrl: '',
    apiUrl: 'https://api-observability.browserstack.com',
    baseUrl: 'https://browserstack.com',
    withCredentials: true,
    enableAnalytics: true,
    disableLogs: true
  }
};
