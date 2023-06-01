const AppRoute = {
  ROOT: '/',
  NO_ACCESS: '/access',
  NOT_FOUND: '/404',
  LANDING: '/landing',
  TEST_CASES: '/projects/:projectId/folder/:folderId?/test-cases?/:testCaseId?',
  TEST_CASES_SEARCH: '/projects/:projectId/folder/search',
  DASHBOARD: '/projects/:projectId',
  TEST_RUNS: '/projects/:projectId/test-runs',
  TEST_RUN_DETAILS: '/projects/:projectId/test-runs/:testRunId',
  TEST_RUN_ISSUES: '/projects/:projectId/test-runs/:testRunId/issues',
  TEST_RUNS_EDIT: '/projects/:projectId/test-runs/:testRunId/edit',
  ONBOARDING: '/onboarding',
  RESOURCES: '/resources',
  SETTINGS: '/settings',
  REPORTS: '/reports',
  IMPORT: '/projects/quick-import',
  IMPORT_WITH_PROJECTS: '/projects/:projectId/quick-import',
  IMPORT_CSV: '/projects/:projectId/import/csv',
  SETTINGS_API_KEYS: '/settings/api-keys'
};

// export const BASE_API_URL = import.meta.env.DEV
//   ? 'https://api.teststack.bsstag.com'
//   : 'https://api.teststack.bsstag.com';

export const BASE_API_URL = import.meta.env.DEV
  ? 'http://10.8.2.96:3000' // 'https://test-management.bsstag.com'
  : window.location.origin;

export const WS_URL = import.meta.env.DEV
  ? 'wss://test-management.bsstag.com/api/v1/cable'
  : `wss://${window.location.host}/api/v1/cable`;

export const DEV_SIGN_OUT_URL =
  'https://devteststack.bsstag.com/users/sign_out';

export default AppRoute;
