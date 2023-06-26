export const getProjectBuildsPath = (projectNormalisedName) =>
  `/projects/${projectNormalisedName}/builds`;
export const getBuildPath = (
  projectNormalisedName,
  normalisedName,
  buildNumber
) =>
  `/projects/${projectNormalisedName}/builds/${normalisedName}/${buildNumber}`;
export const getSuitHealthPath = (projectNormalisedName) =>
  `/projects/${projectNormalisedName}/suite_health`;
export const getSuitHealthTestsPath = (projectNormalisedName) =>
  `/projects/${projectNormalisedName}/suite_health/tests`;
export const getSuitHealthUniqueErrorsPath = (projectNormalisedName) =>
  `/projects/${projectNormalisedName}/suite_health/unique_errors`;
export const getTestingTrendPath = (projectNormalisedName) =>
  `/projects/${projectNormalisedName}/testing_trends`;

export const getSettingsPath = (projectNormalisedName, id) =>
  `/projects/${projectNormalisedName}/settings/${id}`;

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
