export const ROUTES = {
  builds: '/projects/:projectNormalisedName/builds',
  build:
    '/projects/:projectNormalisedName/builds/:buildNormalisedName/:buildSerialId',
  buildShort: '/builds/:buildUuid',
  suite_health: '/projects/:projectNormalisedName/suite_health',
  testing_trends: '/projects/:projectNormalisedName/testing_trends',
  dashboard: '/dashboard',
  integrations_base: '/integrations',
  integrations_jenkins: '/integrations/jenkins',
  integrations_azurePipelines: '/integrations/azure-pipelines',
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
  get_started: '/get-started',
  root: '/'
};
