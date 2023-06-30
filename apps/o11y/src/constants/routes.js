export const ROUTE_PATH_KEYS = {
  builds: 'builds',
  get_started: 'get-started',
  integrations: 'integrations',
  no_access: 'no_access',
  projects: 'projects',
  request_access: 'request_access',
  settings: 'settings',
  settings_alerts: 'settings/alerts',
  settings_auto_analyser: 'settings/auto_analyser',
  settings_failure_categories: 'settings/failure_categories',
  settings_general: 'settings/general',
  settings_integrations: 'settings/integrations',
  settings_notifications: 'settings/notifications',
  settings_re_run: 'settings/re_run',
  settings_smart_tags: 'settings/smart_tags',
  suite_health: 'suite_health',
  suite_health_tests: 'suite_health/tests',
  suite_health_unique_errors: 'suite_health/unique_errors',
  testing_trends: 'testing_trends'
};

export const ROUTES = {
  all: '*',
  build: `/${ROUTE_PATH_KEYS.projects}/:projectNormalisedName/${ROUTE_PATH_KEYS.builds}/:buildNormalisedName/:buildSerialId`,
  builds: `/${ROUTE_PATH_KEYS.projects}/:projectNormalisedName/${ROUTE_PATH_KEYS.builds}`,
  buildShort: `/${ROUTE_PATH_KEYS.builds}/:buildUuid`,
  get_started: `/${ROUTE_PATH_KEYS.get_started}`,
  integrations_base: '/integrations',
  not_found: '/404',
  no_access: `/${ROUTE_PATH_KEYS.no_access}`,
  projects: `/${ROUTE_PATH_KEYS.projects}`,
  request_access: `/${ROUTE_PATH_KEYS.request_access}`,
  root: '/',
  settings_alerts: `/${ROUTE_PATH_KEYS.projects}/:projectNormalisedName/${ROUTE_PATH_KEYS.settings_alerts}`,
  settings_auto_analyser: `/${ROUTE_PATH_KEYS.projects}/:projectNormalisedName/${ROUTE_PATH_KEYS.settings_auto_analyser}`,
  settings_failure_categories: `/${ROUTE_PATH_KEYS.projects}/:projectNormalisedName/${ROUTE_PATH_KEYS.settings_failure_categories}`,
  settings_general: `/${ROUTE_PATH_KEYS.projects}/:projectNormalisedName/${ROUTE_PATH_KEYS.settings_general}`,
  settings_integrations: `/${ROUTE_PATH_KEYS.projects}/:projectNormalisedName/${ROUTE_PATH_KEYS.settings_integrations}`,
  settings_notifications: `/${ROUTE_PATH_KEYS.projects}/:projectNormalisedName/${ROUTE_PATH_KEYS.settings_notifications}`,
  settings_re_run: `/${ROUTE_PATH_KEYS.projects}/:projectNormalisedName/${ROUTE_PATH_KEYS.settings_re_run}`,
  settings: `/${ROUTE_PATH_KEYS.projects}/:projectNormalisedName/${ROUTE_PATH_KEYS.settings}`,
  smart_tags: `/${ROUTE_PATH_KEYS.projects}/:projectNormalisedName/${ROUTE_PATH_KEYS.settings_smart_tags}`,
  suite_health: `/${ROUTE_PATH_KEYS.projects}/:projectNormalisedName/${ROUTE_PATH_KEYS.suite_health}`,
  suite_health_tests: `/${ROUTE_PATH_KEYS.projects}/:projectNormalisedName/${ROUTE_PATH_KEYS.suite_health_tests}`,
  suite_health_unique_errors: `/${ROUTE_PATH_KEYS.projects}/:projectNormalisedName/${ROUTE_PATH_KEYS.suite_health_unique_errors}`,
  test_details: '/test/details/:testRunId',
  testing_trends: `/${ROUTE_PATH_KEYS.projects}/:projectNormalisedName/${ROUTE_PATH_KEYS.testing_trends}`
};

export const PROXY_PATHS = {
  builds: {
    path: `/${ROUTE_PATH_KEYS.projects}/${ROUTE_PATH_KEYS.builds}`,
    key: ROUTE_PATH_KEYS.builds
  },
  suite_health_tests: {
    path: `/${ROUTE_PATH_KEYS.projects}/${ROUTE_PATH_KEYS.suite_health_tests}`,
    key: ROUTE_PATH_KEYS.suite_health_tests
  },
  suite_health_unique_errors: {
    path: `/${ROUTE_PATH_KEYS.projects}/${ROUTE_PATH_KEYS.suite_health_unique_errors}`,
    key: ROUTE_PATH_KEYS.suite_health_unique_errors
  },
  settings_alerts: {
    path: `/${ROUTE_PATH_KEYS.projects}/${ROUTE_PATH_KEYS.settings_alerts}`,
    key: ROUTE_PATH_KEYS.settings_alerts
  },
  settings_auto_analyser: {
    path: `/${ROUTE_PATH_KEYS.projects}/${ROUTE_PATH_KEYS.settings_auto_analyser}`,
    key: ROUTE_PATH_KEYS.settings_auto_analyser
  },
  settings_failure_categories: {
    path: `/${ROUTE_PATH_KEYS.projects}/${ROUTE_PATH_KEYS.settings_failure_categories}`,
    key: ROUTE_PATH_KEYS.settings_failure_categories
  },
  settings_general: {
    path: `/${ROUTE_PATH_KEYS.projects}/${ROUTE_PATH_KEYS.settings_general}`,
    key: ROUTE_PATH_KEYS.settings_general
  },
  settings_integrations: {
    path: `/${ROUTE_PATH_KEYS.projects}/${ROUTE_PATH_KEYS.settings_integrations}`,
    key: ROUTE_PATH_KEYS.settings_integrations
  },
  settings_notifications: {
    path: `/${ROUTE_PATH_KEYS.projects}/${ROUTE_PATH_KEYS.settings_notifications}`,
    key: ROUTE_PATH_KEYS.settings_notifications
  },
  settings_re_run: {
    path: `/${ROUTE_PATH_KEYS.projects}/${ROUTE_PATH_KEYS.settings_re_run}`,
    key: ROUTE_PATH_KEYS.settings_re_run
  },
  settings: {
    path: `/${ROUTE_PATH_KEYS.projects}/${ROUTE_PATH_KEYS.settings}`,
    key: ROUTE_PATH_KEYS.settings
  },
  testing_trends: {
    path: `/${ROUTE_PATH_KEYS.projects}/${ROUTE_PATH_KEYS.testing_trends}`,
    key: ROUTE_PATH_KEYS.testing_trends
  }
};
