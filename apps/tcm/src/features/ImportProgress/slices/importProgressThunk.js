import { getQuickImportResult } from 'api/import.api';

import { getQuickImportResultFulfilled } from './importProgressSlice';

const getImportId = (state) => state.import.importId;

export const setQuickImportResult = () => async (dispatch, getState) => {
  const state = getState();
  const id = getImportId(state);

  try {
    const response = await getQuickImportResult(id);
    dispatch(getQuickImportResultFulfilled(response));
  } catch (err) {
    // something on error
  }
};
