/* eslint-disable no-console */
import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'global';

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState: {
    isLoading: true,
    userDetails: {
      groupId: null,
      id: null,
      username: null,
      planType: null,
      accessKey: null
    }
  },
  reducers: {
    initialiseApplication: (state, { payload }) => {
      const { userDetails } = payload;

      state.isLoading = false;
      state.userDetails = userDetails;
    }
  }
});

export const { initialiseApplication } = actions;
export default reducer;
