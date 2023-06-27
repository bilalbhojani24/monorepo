import { ROUTE_PATH_KEYS } from 'constants/routes';
import { getActiveProject } from 'globalSlice/selectors';

export const getProjectBuildsPath = (projectNormalisedName) =>
  `/${ROUTE_PATH_KEYS.projects}/${projectNormalisedName}/${ROUTE_PATH_KEYS.builds}`;
export const getBuildPath = (
  projectNormalisedName,
  normalisedName,
  buildNumber
) =>
  `/${ROUTE_PATH_KEYS.projects}/${projectNormalisedName}/${ROUTE_PATH_KEYS.builds}/${normalisedName}/${buildNumber}`;
export const getSuitHealthPath = (projectNormalisedName) =>
  `/${ROUTE_PATH_KEYS.projects}/${projectNormalisedName}/${ROUTE_PATH_KEYS.suite_health}`;
export const getSuitHealthTestsPath = (projectNormalisedName) =>
  `/${ROUTE_PATH_KEYS.projects}/${projectNormalisedName}/${ROUTE_PATH_KEYS.suite_health_tests}`;
export const getSuitHealthUniqueErrorsPath = (projectNormalisedName) =>
  `/${ROUTE_PATH_KEYS.projects}/${projectNormalisedName}/${ROUTE_PATH_KEYS.suite_health_unique_errors}`;
export const getTestingTrendPath = (projectNormalisedName) =>
  `/${ROUTE_PATH_KEYS.projects}/${projectNormalisedName}/${ROUTE_PATH_KEYS.testing_trends}`;

export const getSettingsPath = (projectNormalisedName, id) =>
  `/${ROUTE_PATH_KEYS.projects}/${projectNormalisedName}/settings/${id}`;

export const getPageUrlByMapping = (projectNormalisedName, mapping) =>
  `/${ROUTE_PATH_KEYS.projects}/${projectNormalisedName}/${mapping}`;

export const getPageUrl = (mapping) => (_, getState) => {
  const activeProject = getActiveProject(getState());

  return `/${ROUTE_PATH_KEYS.projects}/${activeProject?.normalisedName}/${mapping}`;
};

// /builds || /build
export const isBuildsPage = () => /build/.test(window.location.pathname);

// /dashboard
export const isDashboardPage = () => /dashboard/.test(window.location.pathname);

// /settings
export const isSettingsPage = () => /settings/.test(window.location.pathname);

// /suite_health
export const isSuiteHealth = () =>
  /suite_health/.test(window.location.pathname);

// /testing_trends
export const isTestingTrendsPage = () =>
  /testing_trends/.test(window.location.pathname);

export const isIntegrationsPage = () =>
  /integrations/.test(window.location.pathname);

export const isActivePage = (slug) => {
  const matcher = new RegExp(slug, 'g');
  return matcher.test(window.location.pathname);
};
