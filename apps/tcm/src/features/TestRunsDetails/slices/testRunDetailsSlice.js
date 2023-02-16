import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullDetails: null,
  isLoading: {
    testRunDetails: true,
    isFoldersLoading: true
  },
  selectedFolder: null
};

export const testRunDetailsSlice = createSlice({
  name: 'testRunsDetails',
  initialState,
  reducers: {
    setTestRunsDetails: (state, { payload }) => {
      state.fullDetails = payload;
    },
    setSelectedFolder: (state, { payload }) => {
      state.selectedFolder = payload;
    },
    setIsLoadingProps: (state, { payload }) => {
      state.isLoading[payload.key] = payload.value;
    }
  }
});

export const { setTestRunsDetails, setIsLoadingProps, setSelectedFolder } =
  testRunDetailsSlice.actions;

export default testRunDetailsSlice.reducer;
