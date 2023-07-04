import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'global';

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState: {
    appInitComplete: false,
    fetchedGridData: false,
    hasSessions: false,
    instanceTypes: {},
    isLoading: true,
    lastKnownSetupType: null,
    regions: {},
    showSetup: false,
    trialGrid: {
      isExpired: true,
      isUsed: false
    },
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
      const {
        hasSessions,
        instanceTypes,
        regions,
        showSetup,
        trialGrid,
        userDetails
      } = payload;

      state.appInitComplete = true;
      state.hasSessions = hasSessions;
      state.instanceTypes = instanceTypes;
      state.isLoading = false;
      state.showSetup = showSetup;
      state.trialGrid = trialGrid;
      state.regions = regions;
      state.userDetails = userDetails;
    },
    setFetchedGridData: (state, { payload }) => {
      state.fetchedGridData = payload;
    },
    setTrialGridUsed: (state, { payload }) => {
      state.trialGrid.isUsed = payload;
    }
  }
});

export const { initialiseApplication, setFetchedGridData, setTrialGridUsed } =
  actions;
export default reducer;
