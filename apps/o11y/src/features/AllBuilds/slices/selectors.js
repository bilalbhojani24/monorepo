// data selectors
export const getBuilds = (state) => state.buildsData.builds;
export const getBuildsApiState = (state) => state.buildsData.apiState;
export const getBuildsPagingParams = (state) =>
  state.buildsData.buildsPagingParams;
