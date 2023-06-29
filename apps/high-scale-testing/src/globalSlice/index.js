import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'global';

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState: {
    appInitComplete: false,
    fetchedGridData: false,
    instanceTypes: {},
    isLoading: true,
    showSetup: false,
    trialGridUsed: false,
    regions: {},
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
      const { instanceTypes, regions, showSetup, trialGridUsed, userDetails } =
        payload;

      state.appInitComplete = true;
      state.instanceTypes = instanceTypes;
      state.isLoading = false;
      state.showSetup = showSetup;
      state.trialGridUsed = trialGridUsed;
      state.regions = regions;
      state.userDetails = userDetails;
    },
    setFetchedGridData: (state, { payload }) => {
      state.fetchedGridData = payload;
    }
  }
});

export const { initialiseApplication, setFetchedGridData } = actions;
export default reducer;
