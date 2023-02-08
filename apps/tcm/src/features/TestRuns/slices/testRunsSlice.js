import { createSlice } from '@reduxjs/toolkit';

import { TABS_ARRAY } from '../const/immutableConst';

const initialState = {
  isVisible: {
    addTestRunsForm: false,
    addTestCaseModal: false
  },
  isLoading: {
    testRuns: true
  },
  currentTab: TABS_ARRAY[0].name,
  allTestRuns: [],
  metaPage: {
    page: null,
    next: null,
    prev: null,
    count: null
  },
  testRunFormData: {
    test_run: {
      name: '',
      description: '',
      state: '',
      assignTo: []
    },
    test_case_ids: []
  }
};

const testRunslice = createSlice({
  name: 'testRuns',
  initialState,
  reducers: {
    setAddTestRunForm: (state, { payload }) => {
      state.isVisible.addTestRunsForm = payload;
      if (payload) {
        // reset form data
        state.testRunFormData = initialState.testRunFormData;
      }
    },
    setAddTestCaseModal: (state, { payload }) => {
      state.isVisible.addTestCaseModal = payload;
    },
    setLoader: (state, { payload }) => {
      state.isLoading[payload.key] = payload.value;
    },
    addSingleTestRun: (state, { payload }) => {
      state.allTestRuns.push(payload);
    },
    setAllTestRuns: (state, { payload }) => {
      state.allTestRuns = payload;
    },
    setCurrentTab: (state, { payload }) => {
      state.currentTab = payload;
    },
    setMetaPage: (state, { payload }) => {
      state.metaPage = payload;
    }
  }
});

export const {
  setLoader,
  addSingleTestRun,
  setAllTestRuns,
  setAddTestRunForm,
  setAddTestCaseModal,
  setCurrentTab,
  setMetaPage
} = testRunslice.actions;
export default testRunslice.reducer;
