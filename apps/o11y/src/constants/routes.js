export const ROUTES = {
  builds: '/projects/:projectNormalisedName/builds',
  build:
    '/projects/:projectNormalisedName/builds/:buildNormalisedName/:buildSerialId',
  buildShort: '/builds/:buildUuid',
  suite_health: '/projects/:projectNormalisedName/suite_health',
  testing_trends: '/projects/:projectNormalisedName/testing_trends',
  integrations_base: '/integrations',
  integrations_jenkins: '/integrations/jenkins',
  integrations_azurePipelines: '/integrations/azure-pipelines',
  settings: '/projects/:projectNormalisedName/settings',
  settings_general: '/projects/:projectNormalisedName/settings/general',
  settings_alerts: '/projects/:projectNormalisedName/settings/alerts',
  smartTags: '/projects/:projectNormalisedName/settings/smart_tags',
  settings_auto_analyser:
    '/projects/:projectNormalisedName/settings/auto_analyser',
  settings_failure_categories:
    '/projects/:projectNormalisedName/settings/failure_categories',
  settings_re_run: '/projects/:projectNormalisedName/settings/re_run',
  settings_integrations:
    '/projects/:projectNormalisedName/settings/integrations',
  settings_notifications:
    '/projects/:projectNormalisedName/settings/notifications',
  test_details: '/test/details/:testRunId',
  projects: '/projects',
  request_access: '/request_access',
  get_started: '/get-started',
  root: '/',
  all: '*',
  not_found: '/404'
};
