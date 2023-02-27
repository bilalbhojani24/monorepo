export const getProjectBuildsPath = (projectNormalisedName) =>
  `/projects/${projectNormalisedName}/builds`;
export const getBuildPath = (
  projectNormalisedName,
  normalisedName,
  buildNumber
) =>
  `/projects/${projectNormalisedName}/builds/${normalisedName}/${buildNumber}`;
export const getSnPPath = (projectNormalisedName) =>
  `/projects/${projectNormalisedName}/suite_health`;
export const getTestingTrendPath = (projectNormalisedName) =>
  `/projects/${projectNormalisedName}/testing_trends`;
