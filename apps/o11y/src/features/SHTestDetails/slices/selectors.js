// data selectors
export const getSHTestsDetailsInfo = (state) =>
  state.shTestdetails.data.testDetailsInfo;

// ui selectors
export const getIsSHTestsDetailsVisible = (state) =>
  state.shTestdetails.ui.isDetailsVisible;
export const getShowSHTestsDetailsFor = (state) =>
  state.shTestdetails.ui.showDetailsFor;
export const getSnPCbtInfo = (state) => state.shTestdetails.ui.cbtInfo;
export const getTestDetailsActiveTab = (state) =>
  state.shTestdetails.ui.activeTab;
export const getTestDetailsChartBounds = (state) =>
  state.shTestdetails.ui.chartBounds;
