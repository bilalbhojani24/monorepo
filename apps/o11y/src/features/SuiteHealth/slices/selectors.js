// data selectors
export const getSnpTests = (state) => state.shTests.data.tests.data;
export const getSnpTestsLoading = (state) => state.shTests.data.tests.isLoading;
export const getSnpTestsSortBy = (state) => state.shTests.data.tests.sortBy;
export const getSnpTestsPaging = (state) =>
  state.shTests.data.tests.pagingParams;
export const getSHDataErrors = (state) => state.shTests.data.errors.data;
export const getSnpErrorsLoading = (state) =>
  state.shTests.data.errors.isLoading;
export const getSnpErrorsPaging = (state) =>
  state.shTests.data.errors.pagingParams;
export const getSnpErrorsSortBy = (state) => state.shTests.data.errors.sortBy;

// ui selectors
export const getAllSnPTestFilters = (state) => state.shTests.ui.snpTestFilters;
export const getSnPTestFilterByKey = (state, key) =>
  state.shTests.ui.snpTestFilters[key];
export const getSnPActiveTab = (state) => state.shTests.ui.activeTab;
