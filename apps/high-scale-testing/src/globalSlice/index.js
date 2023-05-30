import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'global';

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState: {
    fetchedGridData: false,
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
    },
    setFetchedGridData: (state, { payload }) => {
      state.fetchedGridData = payload;
    }
  }
});

export const { initialiseApplication, setFetchedGridData } = actions;
export default reducer;
