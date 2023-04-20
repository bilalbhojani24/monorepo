export const getTestList = (state) => state.testList.testList;
export const getSearchTextFilters = (state) =>
  state.testList.appliedFilters.search;
export const getSelectedFilters = (state) => state.testList.selectedFilters;
export const getAppliedFilters = (state) => state.testList.appliedFilters;
export const getStaticFilters = (state) => state.testList.staticFilters;

export const getTestHistoryDetails = (state, id) =>
  state.testList.historyDetails.data[id];
export const getTestHistoryDetailsApiState = (state) =>
  state.testList.historyDetails.apiState;
export const getAllTestHistoryDetails = (state) =>
  state.testList.historyDetails;
