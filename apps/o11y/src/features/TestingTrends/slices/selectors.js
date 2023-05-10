export const getAllTTFilters = (state) => state.testingTrend.ttFilters;
export const getTTFilterByKey = (state, key) =>
  state.testingTrend.ttFilters[key];
