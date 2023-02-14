import { createSlice } from '@reduxjs/toolkit';
import { activeInitFilters, ISSUE_TYPE, ISSUES, SUMMARY } from 'constants';

const initialParamState = {
  activeTab: SUMMARY,
  activeSwitch: ISSUE_TYPE,
  defaultIndex: 0,
  activeViolationId: '',
  activeComponentId: '',
  isShowingIssue: false,
  openAccordionId: '',
  activeIssueIndex: 0,
  showHiddenIssues: { hideIssues: false },
  activeFilters: { ...activeInitFilters },
  intermediateFilters: { ...activeInitFilters }
};

const initialAppState = {
  isActiveOpen: false,
  showHiddenIssues: { hideIssues: false },
  activeFilters: { ...activeInitFilters },
  intermediateFilters: { ...activeInitFilters }
};

const getInitialTab = () => {
  const params = new URLSearchParams(window.location.search);
  const activeTab = params.get('activeTab');
  const activeSwitch = params.get('activeSwitch');
  const activeViolationId = params.get('activeViolationId');
  const activeComponentId = params.get('activeComponentId');
  const activeIssueIndex = params.get('activeIssueIndex');
  const isShowingIssue = params.get('isShowingIssue');
  const showHiddenIssues = { hideIssues: params.get('hideIssues') === 'true' };

  // filters
  const activeFilters = {
    ...activeInitFilters,
    showNeedsReviewIssues: params.get('showNeedsReviewIssues') === 'true'
  };

  if (params.get('impact')) {
    activeFilters.impact = params.get('impact').split(',');
  }

  if (params.get('page')) {
    activeFilters.page = params.get('page').split(',');
  }

  if (params.get('component')) {
    activeFilters.component = params.get('component').split(',');
  }

  if (params.get('category')) {
    activeFilters.category = params.get('category').split(',');
  }

  const result = { ...initialParamState, showHiddenIssues };
  if (activeTab) {
    if (activeTab === ISSUES) {
      result.activeTab = ISSUES;
      result.defaultIndex = 1;
      if (activeSwitch) {
        result.activeSwitch = activeSwitch;
      } else {
        result.activeSwitch = ISSUE_TYPE;
      }
      if (activeViolationId) {
        result.activeViolationId = activeViolationId;
        result.openAccordionId = activeViolationId;
      }
      if (activeComponentId) {
        result.activeComponentId = activeComponentId;
      }
      if (activeIssueIndex) {
        result.activeIssueIndex = parseInt(activeIssueIndex, 10);
      }
      if (isShowingIssue) {
        result.isShowingIssue = isShowingIssue;
      }
      if (activeFilters) {
        result.activeFilters = activeFilters;
        result.intermediateFilters = activeFilters;
      }
    } else if (activeTab === SUMMARY) {
      result.activeTab = SUMMARY;
      result.defaultIndex = 0;
    }
  }
  return result;
};

const { actions, reducer } = createSlice({
  name: 'reportApp',
  initialState: {
    ...initialAppState,
    ...getInitialTab()
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
    setOpenAccordionId: (state, { payload }) => {
      state.openAccordionId = payload;
    },
    setReportFilters: (state, { payload }) => {
      state.activeFilters = payload;
    },
    setReportFiltersKey: (state, { payload }) => {
      console.log('payload: ', payload.values);
      state.activeFilters[payload.key] = payload.values;
    },
    setResetFilterKey: (state, { payload }) => {
      state.activeFilters[payload.key] = payload.value;
    },
    resetFilters: (state) => {
      state.activeFilters = { ...activeInitFilters };
    },
    setIntermediateReportFiltersKey: (state, { payload }) => {
      state.intermediateFilters[payload.key] = payload.values;
    },
    resetIntermediateResetFilterKey: (state, { payload }) => {
      state.intermediateFilters[payload.key] = payload.value;
    },
    resetIntermediateFilters: (state) => {
      state.intermediateFilters = { ...activeInitFilters };
    },
    resetIntermediateFiltersToActiveFilters: (state) => {
      Object.entries(state.activeFilters).forEach(([key, value]) => {
        state.intermediateFilters[key] = value;
      });
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
        openAccordionId: '',
        activeIssueIndex: 0
      };
      Object.entries(resetInitState).forEach(([key, value]) => {
        state[key] = value;
      });
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
  setOpenAccordionId,
  setReportFilters,
  setReportFiltersKey,
  setResetFilterKey,
  setIntermediateReportFiltersKey,
  resetIntermediateResetFilterKey,
  resetIntermediateFilters,
  resetIntermediateFiltersToActiveFilters,
  resetFilters,
  resetReportAppInfo,
  resetIssueItem
} = actions;

export default reducer;
