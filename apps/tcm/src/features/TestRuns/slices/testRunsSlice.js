import { createSlice } from '@reduxjs/toolkit';

import { STATE_OPTIONS } from '../const/addEditConst';
import { TABS_ARRAY } from '../const/immutableConst';

const initialState = {
  isVisible: {
    addTestRunsForm: false,
    addTestCaseModal: false,
    addTagsModal: false,
    addIssuesModal: false
  },
  isLoading: {
    testRuns: true
  },
  loadedDataProjectId: null, // data fetched for which projectID (to cache data)
  currentTab: TABS_ARRAY[0].name,
  allTestRuns: [],
  tagsArray: [],
  issuesArray: [],
  usersArray: null,
  metaPage: {
    page: null,
    next: null,
    prev: null,
    count: null,
    page_size: null
  },
  testRunFormData: {
    test_run: {
      name: '',
      description: '',
      run_state: STATE_OPTIONS[0].value,
      owner: null,
      tags: [],
      issues: []
    },
    test_case_ids: [37369]
  },
  isUnsavedDataExists: false
};

const testRunslice = createSlice({
  name: 'testRuns',
  initialState,
  reducers: {
    setAddTestRunForm: (state, { payload }) => {
      state.isVisible.addTestRunsForm = payload;
      if (!payload) {
        // reset form data
        state.testRunFormData = initialState.testRunFormData;
      }
    },
    updateTestRunFormData: (state, { payload }) => {
      if (payload.innerKey) {
        // goes inside test_run object
        state.testRunFormData[payload.key][payload.innerKey] = payload.value;
      } else state.testRunFormData[payload.key] = payload.value;
    },
    setIsVisibleProps: (state, { payload }) => {
      state.isVisible[payload.key] = payload.value;
    },
    setLoader: (state, { payload }) => {
      state.isLoading[payload.key] = payload.value;
    },
    addTestRun: (state, { payload }) => {
      state.allTestRuns = [payload, ...state.allTestRuns];
    },
    setAllTestRuns: (state, { payload }) => {
      state.allTestRuns = payload;
    },
    setCurrentTab: (state, { payload }) => {
      state.currentTab = payload;
    },
    setMetaPage: (state, { payload }) => {
      state.metaPage = payload;
    },
    setTagsArray: (state, { payload }) => {
      state.tagsArray = payload;
    },
    setIssuesArray: (state, { payload }) => {
      state.issuesArray = payload;
    },
    setLoadedDataProjectId: (state, { payload }) => {
      state.loadedDataProjectId = payload;
    },
    setUsers: (state, { payload }) => {
      // prefill for edit
      state.usersArray = payload || initialState.usersArray;
    },
    setUnsavedDataExists: (state, { payload }) => {
      state.isUnsavedDataExists = payload;
    }
  }
});

export const {
  updateTestRunFormData,
  setUnsavedDataExists,
  setIsVisibleProps,
  setLoadedDataProjectId,
  setUsers,
  setIssuesArray,
  setTagsArray,
  setLoader,
  addTestRun,
  setAllTestRuns,
  setAddTestRunForm,
  setCurrentTab,
  setMetaPage
} = testRunslice.actions;
export default testRunslice.reducer;
