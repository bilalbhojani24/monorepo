// data selectors
export const getBuilds = (state) => state.buildsData.builds;
export const getSelectedFilters = (state) => state.buildsData.selectedFilters;
export const getAppliedFilters = (state) => state.buildsData.appliedFilters;
export const getAppliedFilterTags = (state) =>
  state.buildsData.appliedFilters.tags;
export const getSelectedFilterTags = (state) =>
  state.buildsData.selectedFilters.tags;
export const getSelectedFilterUsers = (state) =>
  state.buildsData.selectedFilters.users;
export const getSearchTextFilters = (state) =>
  state.buildsData.appliedFilters.searchText;
export const getBuildsApiState = (state) => state.buildsData.apiState;
export const getStaticFilters = (state) =>
  state.buildsData.filtersMetaData.staticFilters;
export const getAllUsersDataFilters = (state) =>
  state.buildsData.filtersMetaData.allUsers;
export const getBuildsPagingParams = (state) =>
  state.buildsData.buildsPagingParams;
