// data selectors
export const getSnpTests = (state) => state.shTests.tests.data;
export const getSnpTestsLoading = (state) => state.shTests.tests.isLoading;
export const getSnpTestsSortBy = (state) => state.shTests.tests.sortBy;
export const getSnpTestsPaging = (state) => state.shTests.tests.pagingParams;
export const getSHDataErrors = (state) => state.shTests.errors.data;
export const getSnpErrorsLoading = (state) => state.shTests.errors.isLoading;
export const getSnpErrorsPaging = (state) => state.shTests.errors.pagingParams;
export const getSnpErrorsSortBy = (state) => state.shTests.errors.sortBy;
export const getUESingleBreakdownData = (state, errorId) =>
  state.shTests.errors.breakdownData[errorId];

// ui selectors
export const getSnPActiveTab = (state) => state.shTests.activeTab;
