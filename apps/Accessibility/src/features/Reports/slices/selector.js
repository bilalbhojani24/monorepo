export const getReportList = (state) =>
  state.accessibility.app.reports.reportList;
export const getReport = (id) => (state) =>
  state.accessibility.app.reports.reportList.find((report) => report.id === id);
export const getActiveVersion = (state) =>
  state.accessibility.app.reports.activeVersion;
export const getSelectedReportCount = (state) =>
  state.accessibility.app.reports.reportList.filter(
    (report) => !!report.isSelected
  ).length;
export const getIsSelectionMode = (state) =>
  state.accessibility.app.reports.reportList.filter(
    (report) => !!report.isSelected
  ).length > 0;
