import axios from 'axios';
import { versionedBaseRoute } from 'constants/common';

export const getAlwaysFailingStats = async (buildId) =>
  axios.get(`${versionedBaseRoute()}/builds/${buildId}/alwaysFailingStats/`);

export const getFlakyStats = async (buildId) =>
  axios.get(`${versionedBaseRoute()}/builds/${buildId}/flakyStats`);

export const getNewFailureStats = async (buildId) =>
  axios.get(`${versionedBaseRoute()}/builds/${buildId}/newFailureStats`);

export const getMutedStats = async (buildId) =>
  axios.get(`${versionedBaseRoute()}/builds/${buildId}/mutedStats`);
export const getDefectStats = async (buildId) =>
  axios.get(`${versionedBaseRoute()}/builds/${buildId}/defectStats`);
export const getBuildSummaryStats = async (buildId, signal) =>
  axios.get(`${versionedBaseRoute()}/builds/${buildId}/buildSummary`, {
    signal
  });
export const getBuildHistoryStats = async (buildId, signal) =>
  axios.get(`${versionedBaseRoute()}/builds/${buildId}/buildHistory`, signal);
export const getBuildStabilityStats = async (buildId) =>
  axios.get(`${versionedBaseRoute()}/builds/${buildId}/buildStabilityStats`);
export const getBuildAlerts = async (buildId) =>
  axios.get(`${versionedBaseRoute()}/builds/${buildId}/buildAlerts`);
export const getRerunStats = async (buildId) =>
  axios.get(`${versionedBaseRoute()}/builds/${buildId}/buildRerunStats`);
export const getBuildTimelineStats = async (buildId) =>
  axios.get(`${versionedBaseRoute()}/builds/${buildId}/buildTimelineStats`);
export const getTopErrorsStats = async (buildId) =>
  axios.get(`${versionedBaseRoute()}/builds/${buildId}/topErrorStats`);

export const getTopErrorsTestRuns = async (buildId, statId) =>
  axios.get(
    `${versionedBaseRoute()}/builds/${buildId}/testRuns/flat?clusterIds=${statId}`
  );

export const getFailureCategoriesData = async (buildId) =>
  axios.get(`${versionedBaseRoute()}/builds/${buildId}/buildRerunStats`);

export const getFailureByModules = async (buildId) =>
  axios.get(`${versionedBaseRoute()}/builds/${buildId}/failureByModules`);
