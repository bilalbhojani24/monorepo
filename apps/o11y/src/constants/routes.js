export const ROUTES = {
  all: '*',
  build:
    '/projects/:projectNormalisedName/builds/:buildNormalisedName/:buildSerialId',
  builds: '/projects/:projectNormalisedName/builds',
  buildShort: '/builds/:buildUuid',
  get_started: '/get-started',
  integrations_azurePipelines: '/integrations/azure-pipelines',
  integrations_base: '/integrations',
  integrations_jenkins: '/integrations/jenkins',
  not_found: '/404',
  no_access: '/no_access',
  projects: '/projects',
  request_access: '/request_access',
  root: '/',
  settings_alerts: '/projects/:projectNormalisedName/settings/alerts',
  settings_auto_analyser:
    '/projects/:projectNormalisedName/settings/auto_analyser',
  settings_failure_categories:
    '/projects/:projectNormalisedName/settings/failure_categories',
  settings_general: '/projects/:projectNormalisedName/settings/general',
  settings_integrations:
    '/projects/:projectNormalisedName/settings/integrations',
  settings_notifications:
    '/projects/:projectNormalisedName/settings/notifications',
  settings_re_run: '/projects/:projectNormalisedName/settings/re_run',
  settings: '/projects/:projectNormalisedName/settings',
  smart_tags: '/projects/:projectNormalisedName/settings/smart_tags',
  suite_health: '/projects/:projectNormalisedName/suite_health',
  test_details: '/test/details/:testRunId',
  testing_trends: '/projects/:projectNormalisedName/testing_trends'
};
