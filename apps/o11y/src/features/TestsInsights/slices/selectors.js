export const getAlwaysFailingStats = (state) =>
  state.testInsights.alwaysFailing;
export const getNewFailureStats = (state) => state.testInsights.newFailure;
export const getMutedStats = (state) => state.testInsights.mutedTests;
export const getFlakyStats = (state) => state.testInsights.flakiness;

export const getDefectsStats = (state) => state.testInsights.defects;
export const getBuildSummaryStats = (state) => state.testInsights.buildSummary;
export const getBuildHistoryStats = (state) => state.testInsights.buildHistory;
export const getBuildStabilityStats = (state) =>
  state.testInsights.buildStability;
export const getBuildAlerts = (state) => state.testInsights.buildAlerts;
export const getRerunStats = (state) => state.testInsights.reRunSummary;
export const getBuildTimelineStats = (state) =>
  state.testInsights.buildTimeline;

export const getTopErrorStats = (state) => state.testInsights.topErrors;
export const getFailureByModules = (state) =>
  state.testInsights.failureByModules;
export const getTopErrorsTestRuns = (state, id) => {
  const data = state.testInsights.topErrors.data?.data?.find(
    (item) => item.id === id
  );
  if (data?.testRuns) {
    return data.testRuns;
  }
  return [];
};
