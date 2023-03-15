// ui selectors
export const getIsDetailsVisible = (state) =>
  state.testdetailsui.isDetailsVisible;
export const getShowDetailsFor = (state) => state.testdetailsui.showDetailsFor;
export const getExceptions = (state) => state.testdetailsui.exceptions;
export const getActiveLogLevels = (state) =>
  state.testdetailsui.active_log_level;
export const getActiveLogLevelsByType = (state, type) =>
  state.testdetailsui.active_log_level[type];

// data selectors
export const getTestMeta = (state) => state.testDetails.testMeta;
export const getTestDetails = (state) => state.testDetails.details;
export const getNetworkLogs = (state) => state.testDetails.networkLogs;
export const getConsolidatedLogs = (state) =>
  state.testDetails.consolidatedLogs;
