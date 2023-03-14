// data selectors
export const getBuilds = (state) => state.buildsData.builds;
export const getSelectedFilters = (state) => state.buildsData.selectedFilters;
export const getAppliedFilters = (state) => state.buildsData.appliedFilters;
export const getSearchTextFilters = (state) =>
  state.buildsData.appliedFilters.searchText;
export const getBuildsApiState = (state) => state.buildsData.apiState;
export const getBuildsPagingParams = (state) =>
  state.buildsData.buildsPagingParams;
