const AppRoute = {
  ROOT: '/',
  LANDING: '/landing',
  TEST_CASES:
    '/projects/:projectId?/folder?/:folderId?/test-cases?/:testCaseId?',
  DASHBOARD: '/projects/:projectId?',
  TEST_RUNS: '/projects/:projectId?/test-runs',
  ONBOARDING: '/onboarding',
  RESOURCES: '/resources',
  SETTINGS: '/settings',
  REPORTS: '/reports',
  IMPORT: '/import',
};

export default AppRoute;
