export const getGeneralSettingsState = (state) => state.generalSettings.general;
export const getAutoAnalyzerSettingsState = (state) =>
  state.autoAnalyserSettings.autoFailureAnalysis;
export const getReRunSettingsState = (state) => state.reRunSettings.reRun;
export const getBuildNamesState = (state) => state.alertSettings.buildNames;
export const getAlertsState = (state) => state.alertSettings.alerts;
export const getAlertDataByType = (type) => (state) =>
  state.alertSettings.alerts.data?.[type];

export const getFailureSubCategoriesState = (state) =>
  state.failureCategoriesSettings.failureSubCategories;

export const getFailureSubCategoryByType = (type) => (state) =>
  state.failureCategoriesSettings.failureSubCategories.data?.[type] || [];
