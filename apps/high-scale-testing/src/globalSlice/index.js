import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'global';

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState: {
    appInitComplete: false,
    fetchedGridData: false,
    instanceTypes: {},
    isLoading: true,
    lastKnownSetupType: null,
    regions: {},
    showSetup: false,
    trialGridUsed: false,
    userDetails: {
      accessKey: null,
      groupId: null,
      id: null,
      planType: null,
      trialGridProductOnboardingCompleted: false,
      username: null
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
