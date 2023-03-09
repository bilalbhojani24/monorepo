// data selectors
export const getSnpTests = (state) => state.snptests.tests.data;
export const getSnpTestsLoading = (state) => state.snptests.tests.isLoading;
export const getSnpTestsSortBy = (state) => state.snptests.tests.sortBy;
export const getSnpTestsPaging = (state) => state.snptests.tests.pagingParams;
export const getSnpErrors = (state) => state.snptests.errors.data;
export const getSnpErrorsLoading = (state) => state.snptests.errors.isLoading;
export const getSnpErrorsPaging = (state) => state.snptests.errors.pagingParams;
export const getSnpErrorsSortBy = (state) => state.snptests.errors.sortBy;

// ui selectors
export const getAllSnPTestFilters = (state) => state.snpui.snpTestFilters;
export const getSnPTestFilterByKey = (state, key) =>
  state.snpui.snpTestFilters[key];
export const getSnPActiveTab = (state) => state.snpui.activeTab;
