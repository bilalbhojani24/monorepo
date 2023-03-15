const STAGING_CONFIG = (envName) => ({
  cookiePrefix: `${envName}__`,
  signInUrl: `https://${envName}.bsstag.com/users/sign_in`,
  apiUrl: 'https://devtestops-api.bsstag.com'
});

export default {
  local: {
    cookiePrefix: 'development__',
    signInUrl: 'https://local.bsstag.com/users/sign_in',
    apiUrl: 'https://localhost:8082/testops'
  },
  'local-staging': {
    cookiePrefix: 'development__',
    signInUrl: 'https://local.bsstag.com/users/sign_in',
    apiUrl: STAGING_CONFIG('').apiUrl
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
    cookiePrefix: 'preprod__',
    signInUrl: 'https://preprod.bsstag.com/users/sign_in',
    apiUrl: 'https://api-observability-preprod.bsstag.com'
  },
  production: {
    cookiePrefix: '',
    signInUrl: 'https://browserstack.com/users/sign_in',
    apiUrl: 'https://api-observability.browserstack.com'
  }
};
