export const getGeneralSettingsState = (state) => state.settings.general;
export const getAutoAnalyzerSettingsState = (state) =>
  state.settings.autoFailureAnalysis;
export const getReRunSettingsState = (state) => state.settings.reRun;
export const getAlertsState = (state) => state.settings.alerts;
export const getAlertDataByType = (type) => (state) =>
  state.settings.alerts.data?.[type];
