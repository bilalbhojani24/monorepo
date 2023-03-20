// data selectors
export const getTestDetailsInfo = (state) =>
  state.shTestdetails.data.testDetailsInfo;

// ui selectors
export const getIsSnPDetailsVisible = (state) =>
  state.shTestdetails.ui.isDetailsVisible;
export const getShowSnPDetailsFor = (state) =>
  state.shTestdetails.ui.showDetailsFor;
export const getSnPCbtInfo = (state) => state.shTestdetails.ui.cbtInfo;
export const getTestDetailsActiveTab = (state) =>
  state.shTestdetails.ui.activeTab;
export const getTestDetailsChartBounds = (state) =>
  state.shTestdetails.ui.chartBounds;
