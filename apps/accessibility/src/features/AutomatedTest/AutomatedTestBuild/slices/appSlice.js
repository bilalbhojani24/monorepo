import { createSlice } from '@reduxjs/toolkit';
import {
  activeInitFilters,
  ISSUE_TYPE,
  ISSUES,
  severityOptions,
  SUMMARY,
  TESTS
} from 'constants';
// import { formatComponentIdString } from 'utils/helper';

const initialParamState = {
  activeTab: SUMMARY,
  activeSwitch: ISSUE_TYPE,
  defaultIndex: 0,
  activeViolationId: '',
  activeComponentId: '',
  isShowingIssue: false,
  activeIssueIndex: 0,
  showHiddenIssues: { hideIssues: false },
  activeFilters: { ...activeInitFilters }
};

const initialAppState = {
  isActiveOpen: false,
  showHiddenIssues: { hideIssues: false },
  activeFilters: { ...activeInitFilters },
  isFilterModalVisible: false,
  activeTab: SUMMARY
};

// const getInitialTab = () => {
//   const params = new URLSearchParams(window.location.search);
//   const activeTab = params.get('activeTab');
//   const activeSwitch = params.get('activeSwitch');
//   const activeViolationId = params.get('activeViolationId');
//   const activeComponentId = params.get('activeComponentId');
//   const activeIssueIndex = params.get('activeIssueIndex');
//   const isShowingIssue = params.get('isShowingIssue');
//   const showHiddenIssues = { hideIssues: params.get('hideIssues') === 'true' };

//   // filters
//   const activeFilters = {
//     ...activeInitFilters,
//     showNeedsReviewIssues: params.get('showNeedsReviewIssues') === 'true'
//   };

//   if (params.get('impact')) {
//     activeFilters.impact = params
//       .get('impact')
//       .split(',')
//       .map((impact) => severityOptions.find(({ value }) => impact === value));
//   }

//   if (params.get('page')) {
//     activeFilters.page = params
//       .get('page')
//       .split(',')
//       .map((value) => ({ label: value, value }));
//   }

//   if (params.get('component')) {
//     activeFilters.component = params
//       .get('component')
//       .split(',')
//       .map((value) => ({ label: formatComponentIdString(value), value }));
//   }

//   if (params.get('category')) {
//     activeFilters.category = params
//       .get('category')
//       .split(',')
//       .map((value) => ({ label: value, value }));
//   }

//   const result = { ...initialParamState, showHiddenIssues };
//   if (activeTab) {
//     if (activeTab === ISSUES) {
//       result.activeTab = ISSUES;
//       result.defaultIndex = 1;
//       if (activeSwitch) {
//         result.activeSwitch = activeSwitch;
//       } else {
//         result.activeSwitch = ISSUE_TYPE;
//       }
//       if (activeViolationId) {
//         result.activeViolationId = activeViolationId;
//       }
//       if (activeComponentId) {
//         result.activeComponentId = activeComponentId;
//       }
//       if (activeIssueIndex) {
//         result.activeIssueIndex = parseInt(activeIssueIndex, 10);
//       }
//       if (isShowingIssue) {
//         result.isShowingIssue = isShowingIssue !== 'false';
//       }
//       if (activeFilters) {
//         result.activeFilters = activeFilters;
//       }
//     } else if (activeTab === SUMMARY) {
//       result.activeTab = SUMMARY;
//       result.defaultIndex = 0;
//     } else if (activeTab === TESTS) {
//       result.activeTab = TESTS;
//     }
//   }

//   return result;
// };

const { actions, reducer } = createSlice({
  name: 'buildApp',
  initialState: {
    ...initialAppState
    // ...getInitialTab()
  },
  reducers: {
    setShowHiddenIssues: (state, { payload }) => {
      state.showHiddenIssues = payload;
    },
    setActiveComponentId: (state, { payload }) => {
      state.activeIssueIndex = 0;
      state.activeComponentId = payload;
    },
    setActiveIssueIndex: (state, { payload }) => {
      state.activeIssueIndex = payload;
    },
    setActiveViolationId: (state, { payload }) => {
      state.activeViolationId = payload;
    },
    setIsShowingIssue: (state, { payload }) => {
      state.isShowingIssue = payload;
      if (!payload) {
        state.activeIssueIndex = 0;
      }
    },
    setActiveTab: (state, { payload }) => {
      state.activeTab = payload;
    },
    setActiveSwitch: (state, { payload }) => {
      state.activeSwitch = payload;
      state.isShowingIssue = false;
      state.activeComponentId = '';
      state.activeIssueIndex = 0;
    },
    setBuildFilters: (state, { payload }) => {
      state.activeFilters = payload;
    },
    setBuildFiltersKey: (state, { payload }) => {
      state.activeFilters[payload.key] = payload.values;
    },
    setResetFilterKey: (state, { payload }) => {
      state.activeFilters[payload.key] = payload.value;
    },
    resetFilters: (state) => {
      state.activeFilters = { ...activeInitFilters };
    },
    resetReportAppInfo: (state) => {
      const initState = { ...initialParamState, ...initialAppState };
      Object.entries(initState).forEach(([key, value]) => {
        state[key] = value;
      });
    },
    resetIssueItem: (state) => {
      const resetInitState = {
        activeViolationId: '',
        activeComponentId: '',
        isShowingIssue: false,
        activeIssueIndex: 0
      };
      Object.entries(resetInitState).forEach(([key, value]) => {
        state[key] = value;
      });
    },
    resetActiveTab: (state) => {
      state.activeTab = SUMMARY;
    },
    setIsFilterModalVisible: (state, { payload }) => {
      state.isFilterModalVisible = payload;
    }
  }
});

export const {
  setShowHiddenIssues,
  setActiveComponentId,
  setActiveIssueIndex,
  setActiveViolationId,
  setIsShowingIssue,
  setActiveTab,
  setActiveSwitch,
  setBuildFilters,
  setBuildFiltersKey,
  setResetFilterKey,
  resetFilters,
  resetReportAppInfo,
  resetIssueItem,
  resetActiveTab,
  setIsFilterModalVisible
} = actions;

export default reducer;
