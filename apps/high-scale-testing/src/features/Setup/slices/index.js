import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'gridSetup';

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState: {
    isSetupInProgress: false
  },
  reducers: {
    setIsSetupInProgress: (state, { payload }) => {
      state.isSetupInProgress = payload;
    }
  }
});

export const { setIsSetupInProgress } = actions;
export default reducer;
