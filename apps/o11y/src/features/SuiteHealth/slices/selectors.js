// data selectors
export const getSnpTests = (state) => state.shTests.tests.data;
export const getSnpTestsLoading = (state) => state.shTests.tests.isLoading;
export const getSnpTestsSortBy = (state) => state.shTests.tests.sortBy;
export const getSnpTestsPaging = (state) => state.shTests.tests.pagingParams;
export const getSHDataErrors = (state) => state.shTests.errors.data;
export const getSnpErrorsLoading = (state) => state.shTests.errors.isLoading;
export const getSnpErrorsPaging = (state) => state.shTests.errors.pagingParams;
export const getSnpErrorsSortBy = (state) => state.shTests.errors.sortBy;

// ui selectors
export const getAllSnPTestFilters = (state) =>
  state.suiteHealthUI.snpTestFilters;
export const getSnPTestFilterByKey = (state, key) =>
  state.suiteHealthUI.snpTestFilters[key];
export const getSnPActiveTab = (state) => state.suiteHealthUI.activeTab;
