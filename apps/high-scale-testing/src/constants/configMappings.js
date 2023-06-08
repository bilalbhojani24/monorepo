const configMappings = {
  local: {
    enableAnalytics: false,
    enableSentry: false
  },
  production: {
    enableAnalytics: true,
    enableSentry: true
  },
  staging: {
    enableAnalytics: false,
    enableSentry: true
  }
};

export default configMappings;
