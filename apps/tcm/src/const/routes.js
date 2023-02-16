const AppRoute = {
  ROOT: '/',
  LANDING: '/landing',
  TEST_CASES:
    '/projects/:projectId?/folder/:folderId?/test-cases?/:testCaseId?',
  TEST_CASES_SEARCH: '/projects/:projectId?/folder?/search',
  DASHBOARD: '/projects/:projectId?',
  TEST_RUNS: '/projects/:projectId?/test-runs',
  TEST_RUNS_DETAILS: '/projects/:projectId?/test-runs/:testRunId',
  ONBOARDING: '/onboarding',
  RESOURCES: '/resources',
  SETTINGS: '/settings',
  REPORTS: '/reports',
  IMPORT: '/import',
  IMPORT_CSV: '/import/csv',
  SETTINGS_API_KEYS: '/settings/api-keys',
  FIRST_TIME_USER: '/welcome'
};

export const BASE_API_URL = 'https://teststack.bsstag.com';

export default AppRoute;
