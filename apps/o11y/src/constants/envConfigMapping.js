const STAGING_CONFIG = () => ({
  signInUrl: `https://devtestops-api.bsstag.com/api/v1/auth/start-sso`,
  signOutUrl: `https://devtestops.bsstag.com/users/sign_out`,
  apiUrl: 'https://devtestops-api.bsstag.com',
  baseUrl: 'https://devtestops.bsstag.com',
  withCredentials: true,
  integrationsBaseUrl: 'https://integrations-preprod.bsstag.com',
  useIntegrationsPreProdAuth: true
});

export default {
  local: {
    ...STAGING_CONFIG(),
    apiUrl: 'https://localhost:8082/testops',
    withCredentials: false,
    isMocker: true
  },
  'local-staging': {
    ...STAGING_CONFIG(),
    apiUrl: 'http://devtestops-api.bsstag.com'
  },
  staging: {
    ...STAGING_CONFIG()
  },
  devtestops: {
    ...STAGING_CONFIG()
  },
  'dev-staging': {
    ...STAGING_CONFIG()
  },
  preprod: {
    signInUrl:
      'https://api-observability-preprod.bsstag.com/api/v1/auth/start-sso',
    signOutUrl: 'https://preprod.bsstag.com/users/sign_out',
    apiUrl: 'https://api-observability-preprod.bsstag.com',
    baseUrl: 'https://preprod.bsstag.com',
    withCredentials: true,
    integrationsBaseUrl: STAGING_CONFIG().integrationsBaseUrl,
    useIntegrationsPreProdAuth: false
  },
  production: {
    signInUrl:
      'https://api-observability.browserstack.com/api/v1/auth/start-sso',
    signOutUrl: '',
    apiUrl: 'https://api-observability.browserstack.com',
    baseUrl: 'https://browserstack.com',
    withCredentials: true,
    enableAnalytics: true,
    integrationsBaseUrl: '',
    disableLogs: true,
    useIntegrationsPreProdAuth: false,
    enableSentry: true,
    enableNps: true
  }
};
