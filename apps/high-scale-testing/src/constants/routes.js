const ROUTES = {
  ALL: '*',
  BUILDS: '/dashboard',
  CLUSTER: '/grid-console/cluster/:id',
  CLUSTER_OVERVIEW: '/grid-console/cluster/:id/overview',
  CREATE_GRID: '/create-grid',
  GRID_CONSOLE: '/grid-console',
  GRID: '/grid-console/grid/:id',
  GRID_OVERVIEW: '/grid-console/grid/:id/overview',
  GRID_SETTINGS: '/grid-console/grid/:id/settings',
  GRID_SETTINGS_GENERAL: '/grid-console/grid/:id/settings/general',
  GRID_SETTINGS_BROWSER: '/grid-console/grid/:id/settings/browsers',
  GRID_SETTINGS_TIMEOUT: '/grid-console/grid/:id/settings/timeout',
  GRID_SETTINGS_TEST_ARTIFACTS:
    '/grid-console/grid/:id/settings/test-artifacts',
  GRID_UTILIZATION: '/grid-console/grid/:id/utilization',
  ONBOARDING: '/setup',
  ROOT: '/',
  SIGN_OUT: 'users/sign_out'
};

export default ROUTES;
