export const getAlertDataByType = (type) => (state) =>
  state.alertSettings.alerts.data?.[type];
export const getAlertsState = (state) => state.alertSettings.alerts;
export const getAllFailureSubCategory = (state) =>
  state.failureCategoriesSettings.failureSubCategories.data || {};
export const getAutoAnalyzerSettingsState = (state) =>
  state.autoAnalyserSettings.autoFailureAnalysis;
export const getBuildNamesState = (state) => state.alertSettings.buildNames;
export const getFailureSubCategoriesState = (state) =>
  state.failureCategoriesSettings.failureSubCategories;
export const getFailureSubCategoryByType = (type) => (state) =>
  state.failureCategoriesSettings.failureSubCategories.data?.[type] || [];
export const getGeneralSettingsState = (state) => state.generalSettings.general;
export const getNotificationsStatus = (state) =>
  state.notificationsSettings.status;
export const getNotifiedUsersState = (state) =>
  state.notificationsSettings.notifiedUsers;
export const getReRunSettingsState = (state) => state.reRunSettings.reRun;
export const getSmartTagsSettings = (state) =>
  state.smartTagsSettings.smartTags;
