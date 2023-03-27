// ui selectors
export const getIsTestDetailsVisible = (state) =>
  state.testdetailsui.isDetailsVisible;
export const getShowTestDetailsFor = (state) =>
  state.testdetailsui.showDetailsFor;
export const getExceptions = (state) => state.testdetailsui.exceptions;
export const getActiveLogLevels = (state) =>
  state.testdetailsui.active_log_level;
export const getActiveLogLevelsByType = (state, type) =>
  state.testdetailsui.active_log_level[type];
export const getCurrentTestRunId = (state) =>
  state.testdetailsui.currentTestRunId;

// data selectors
export const getTestMeta = (state) => state.testdetails.testMeta;
export const getTestDetails = (state) => state.testdetails.details;
export const getNetworkLogs = (state) => state.testdetails.networkLogs;
export const getConsolidatedLogs = (state) =>
  state.testdetails.consolidatedLogs;
