// data selectors
export const getUEDetailsInfo = (state) =>
  state.shErrordetails.data.errorDetailsInfo;

// ui selectors
export const getIsUEDetailsVisible = (state) =>
  state.shErrordetails.ui.isDetailsVisible;
export const getShowUEDetailsFor = (state) =>
  state.shErrordetails.ui.showDetailsFor;
export const getUECbtInfo = (state) => state.shErrordetails.ui.cbtInfo;
export const getUEActiveTab = (state) => state.shTestdetails.ui.activeTab;
export const getUEChartBounds = (state) => state.shTestdetails.ui.chartBounds;
