import { createSlice } from '@reduxjs/toolkit';
import { formatTime } from 'utils/helperFunctions';

import { STATE_OPTIONS } from '../const/addEditConst';

const initialState = {
  isVisible: {
    addTestRunsForm: false,
    editTestRunsForm: false,
    addTestCaseModal: false,
    addTagsModal: false,
    addIssuesModal: false,
    deleteTestRunModal: false,
    assignTestRunModal: false,
    closeRunTestRunModal: false
  },
  isLoading: {
    testRuns: true,
    createTestRunCta: false,
    editTestRunCta: false,
    assignTestRunCta: false,
    closeTestRunCta: false,
    deleteTestRunCta: false
  },
  selectedTestRun: null,
  loadedDataProjectId: null, // data fetched for which projectID (to cache data)
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
      name: `Test Run-${formatTime(new Date(), 'date')}`,
      description: '',
      run_state: STATE_OPTIONS[0].value,
      owner: null,
      tags: [],
      issues: []
    },
    test_case_ids: []
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
        state.isVisible.editTestRunsForm = false;
        state.selectedTestRun = null;
      }
    },
    closeAllVisibleForms: (state) => {
      state.isVisible = initialState.isVisible;
      state.selectedTestRun = null;
    },
    setEditTestRunForm: (state, { payload }) => {
      state.isVisible.editTestRunsForm = payload;
    },
    setSelectedTestRun: (state, { payload }) => {
      state.selectedTestRun = payload;
    },
    updateTestRunFormData: (state, { payload }) => {
      if (payload.innerKey) {
        // goes inside test_run object
        state.testRunFormData[payload.key][payload.innerKey] = payload.value;
      } else state.testRunFormData[payload.key] = payload.value;
    },
    setTestRunFormData: (state, { payload }) => {
      state.testRunFormData = payload;
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
    updateTestRun: (state, { payload }) => {
      state.allTestRuns = state.allTestRuns.map((item) =>
        item.id === payload.id ? payload : item
      );
    },
    deleteTestRun: (state, { payload }) => {
      state.allTestRuns = state.allTestRuns.filter(
        (item) => item.id !== payload.id
      );
    },
    setAllTestRuns: (state, { payload }) => {
      state.allTestRuns = payload;
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
    },
    updateTestRunsCtaLoading: (state, { payload }) => {
      state.isLoading[payload.key] = payload.value;
    }
  }
});

export const {
  closeAllVisibleForms,
  setTestRunFormData,
  setSelectedTestRun,
  setEditTestRunForm,
  updateTestRunFormData,
  setUnsavedDataExists,
  setIsVisibleProps,
  setLoadedDataProjectId,
  setUsers,
  setIssuesArray,
  setTagsArray,
  setLoader,
  addTestRun,
  updateTestRun,
  setAllTestRuns,
  setAddTestRunForm,
  setMetaPage,
  deleteTestRun,
  updateTestRunsCtaLoading
} = testRunslice.actions;
export default testRunslice.reducer;
