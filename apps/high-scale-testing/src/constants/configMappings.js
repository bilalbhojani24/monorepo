const configMappings = {
  local: {
    baseUrl: 'https://localhost:5173',
    docHomeURL: 'https://browserstack.com/docs',
    enableAnalytics: false,
    enableSentry: false
  },
  production: {
    baseUrl: 'https://www.browserstack.com',
    docHomeURL: 'https://browserstack.com/docs',
    enableAnalytics: true,
    enableSentry: true
  },
  staging: {
    baseUrl: '',
    enableAnalytics: false,
    enableSentry: true
  }
};

export default configMappings;
