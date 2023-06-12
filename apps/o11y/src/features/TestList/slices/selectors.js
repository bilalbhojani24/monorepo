export const getTestList = (state) => state.testList.testList;
export const getAggregatedStatus = (state) =>
  state.testList.testList.data.status;

export const getTestHistoryDetails = (state, id) =>
  state.testList.historyDetails.data[id];
export const getTestHistoryDetailsApiState = (state) =>
  state.testList.historyDetails.apiState;
export const getAllTestHistoryDetails = (state) =>
  state.testList.historyDetails;
