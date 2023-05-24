const hostMappings = {
  local: 'https://integrations-local.bsstag.com',
  staging: 'https://integrations.bsstag.com',
  production: 'https://integrate.browserstack.com'
};

export default {
  local: {
    apiUrl: hostMappings.local,
    signOutUrl: `${hostMappings.local}/api/dashboard/v1/user/logout`,
    withCredentials: true
  },
  staging: {
    apiUrl: hostMappings.staging,
    signOutUrl: `${hostMappings.staging}/api/dashboard/v1/user/logout`,
    withCredentials: true
  },
  production: {
    apiUrl: hostMappings.production,
    signOutUrl: `${hostMappings.production}/api/dashboard/v1/user/logout`,
    withCredentials: true
  }
};
