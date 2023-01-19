import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAddTestRunsForm: false,
  allTestRunsArray: [],
  currentFolderId: null,
  testRunFormData: {
    test_run: {
      name: '',
      description: '',
      state: '',
      assignTo: [],
    },
    test_case_ids: [],
  },
  showAddTestCaseModal: false,
};

const testRunslice = createSlice({
  name: 'testRuns',
  initialState,
  reducers: {
    setAddTestRun: (state, { payload }) => {
      state.showAddTestRunsForm = payload;
      if (payload) {
        // reset form data
        state.testRunFormData = initialState.testRunFormData;
      }
    },
    addSingleTestRun: (state, { payload }) => {
      state.allTestRunsArray.push(payload);
    },
    updateAllTestRuns: (state, { payload }) => {
      state.allTestRunsArray = payload;
    },
    setCurrentFolder: (state, { payload }) => {
      state.currentFolder = payload;
    },
    setAddTestRunFormData: (state, { payload }) => {
      if (payload.key1 === 'test_run') {
        if (payload.key2 === 'assignTo')
          state.testRunFormData[payload.key1][payload.key2].push(payload.value);

        state.testRunFormData[payload.key1][payload.key2] = payload.value;
      } else {
        state.testRunFormData[payload.key1] = payload.value;
      }
    },
    setAddTestCaseModal: (state, { payload }) => {
      state.showAddTestCaseModal = payload;
    },
  },
});

export const {
  addSingleTestRun,
  updateAllTestRuns,
  setAddTestRun,
  setCurrentFolder,
  setAddTestCaseModal,
  setAddTestRunFormData,
} = testRunslice.actions;
export default testRunslice.reducer;
