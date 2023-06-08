const hostMappings = {
  local: 'https://integrate.bsstag.com',
  staging: 'https://integrate.bsstag.com',
  production: 'https://integrate.browserstack.com'
};

export default {
  local: {
    apiUrl: hostMappings.local,
    signOutUrl: `${hostMappings.local}/api/dashboard/v1/user/logout`,
    env: 'local',
    withCredentials: true
  },
  staging: {
    apiUrl: hostMappings.staging,
    signOutUrl: `${hostMappings.staging}/api/dashboard/v1/user/logout`,
    env: 'staging',
    withCredentials: true
  },
  production: {
    apiUrl: hostMappings.production,
    signOutUrl: `${hostMappings.production}/api/dashboard/v1/user/logout`,
    env: 'production',
    withCredentials: true
  }
};
