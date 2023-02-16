export const ROUTES = {
  builds: '/projects/:projectNormalisedName/builds',
  build:
    '/projects/:projectNormalisedName/builds/:buildNormalisedName/:buildSerialId',
  buildShort: '/builds/:buildUuid',
  stability: '/projects/:projectNormalisedName/suite_health',
  dashboard: '/dashboard',
  integrations: {
    base: '/integrations',
    jenkins: '/integrations/jenkins',
    azurePipelines: '/integrations/azure-pipelines'
  },
  settings: '/settings',
  settings_general: '/settings/general',
  settings_alerts: '/settings/alerts',
  settings_auto_analyser: '/settings/auto_analyser',
  settings_failure_categories: '/settings/failure_categories',
  settings_re_run: '/settings/re_run',
  settings_integrations: '/settings/integrations',
  test_details: '/test/details/:testRunId',
  projects: '/projects',
  request_access: '/request_access',
  root: '/'
};
