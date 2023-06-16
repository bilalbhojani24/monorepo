const STAGING_CONFIG = {
  signInUrl: `https://devtestops-api.bsstag.com/api/v1/auth/start-sso`,
  signOutUrl: `https://devtestops.bsstag.com/users/sign_out`,
  apiUrl: 'https://devtestops-api.bsstag.com',
  baseUrl: 'https://devtestops.bsstag.com',
  withCredentials: true,
  integrationsBaseUrl: 'https://integrations-preprod.bsstag.com',
  useIntegrationsPreProdAuth: true
};

export const ENV_MAPPING = {
  LOCAL: 'local',
  LOCAL_STAGING: 'local-staging',
  STAGING: 'staging',
  PREPROD: 'preprod',
  PRODUCTION: 'production'
};

export default {
  [ENV_MAPPING.LOCAL]: {
    ...STAGING_CONFIG,
    name: ENV_MAPPING.LOCAL,
    apiUrl: 'https://localhost:8082/testops',
    withCredentials: false,
    isMocker: true
  },
  [ENV_MAPPING.LOCAL_STAGING]: {
    ...STAGING_CONFIG,
    name: ENV_MAPPING.LOCAL_STAGING,
    apiUrl: 'http://devtestops-api.bsstag.com'
  },
  [ENV_MAPPING.STAGING]: {
    name: ENV_MAPPING.STAGING,
    ...STAGING_CONFIG,
    enableAnalytics: true
  },
  [ENV_MAPPING.PREPROD]: {
    name: ENV_MAPPING.PREPROD,
    signInUrl:
      'https://api-observability-preprod.bsstag.com/api/v1/auth/start-sso',
    signOutUrl: 'https://preprod.bsstag.com/users/sign_out',
    apiUrl: 'https://api-observability-preprod.bsstag.com',
    baseUrl: 'https://preprod.bsstag.com',
    withCredentials: true,
    integrationsBaseUrl: STAGING_CONFIG.integrationsBaseUrl,
    useIntegrationsPreProdAuth: false,
    enableAnalytics: true
    // TODO: add support to enable sentry on preprod
  },
  production: {
    name: ENV_MAPPING.PRODUCTION,
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
    enableSentry: true
  }
};
