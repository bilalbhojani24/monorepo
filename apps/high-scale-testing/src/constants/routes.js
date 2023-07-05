const AUTOMATION_CONSOLE_ROUTE = '/automation-console';

const ROUTES = {
  ALL: '*',
  AUTOMATION_CONSOLE: AUTOMATION_CONSOLE_ROUTE,
  BUILDS: '/dashboard',
  CLUSTER: `${AUTOMATION_CONSOLE_ROUTE}/cluster/:id`,
  CLUSTER_OVERVIEW: `${AUTOMATION_CONSOLE_ROUTE}/cluster/:id/overview`,
  CLUSTER_UTILIZATION: `${AUTOMATION_CONSOLE_ROUTE}/cluster/:id/utilization`,
  CREATE_GRID: '/create-grid',
  GRID: `${AUTOMATION_CONSOLE_ROUTE}/grid/:id`,
  GRID_OVERVIEW: `${AUTOMATION_CONSOLE_ROUTE}/grid/:id/overview`,
  GRID_SETTINGS: `${AUTOMATION_CONSOLE_ROUTE}/grid/:id/settings`,
  GRID_SETTINGS_GENERAL: `${AUTOMATION_CONSOLE_ROUTE}/grid/:id/settings/general`,
  GRID_SETTINGS_BROWSER: `${AUTOMATION_CONSOLE_ROUTE}/grid/:id/settings/browsers`,
  GRID_SETTINGS_TIMEOUT: `${AUTOMATION_CONSOLE_ROUTE}/grid/:id/settings/timeout`,
  GRID_SETTINGS_TEST_ARTIFACTS: `${AUTOMATION_CONSOLE_ROUTE}/grid/:id/settings/test-artifacts`,
  GRID_UTILIZATION: `${AUTOMATION_CONSOLE_ROUTE}/grid/:id/utilization`,
  SETUP: '/setup',
  ROOT: '/',
  SIGN_OUT: '/users/sign_out'
};

export default ROUTES;
