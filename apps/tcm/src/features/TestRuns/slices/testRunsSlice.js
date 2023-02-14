import { createSlice } from '@reduxjs/toolkit';

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
      run_state: '',
      owner: null,
      tags: [],
      issues: []
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
    setIsVisibleProps: (state, { payload }) => {
      state.isVisible[payload.key] = payload.value;
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
    }
  }
});

export const {
  setIsVisibleProps,
  setLoadedDataProjectId,
  setUsers,
  setIssuesArray,
  setTagsArray,
  setLoader,
  addSingleTestRun,
  setAllTestRuns,
  setAddTestRunForm,
  setAddTestCaseModal,
  setCurrentTab,
  setMetaPage
} = testRunslice.actions;
export default testRunslice.reducer;
