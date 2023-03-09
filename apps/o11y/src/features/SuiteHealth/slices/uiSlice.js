import { createSlice } from '@reduxjs/toolkit';
import { SNP_DATE_RANGE, SNP_PARAMS_MAPPING } from 'constants/common';

import { TABS } from '../constants';

const getInitialDateRange = () => {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(SNP_PARAMS_MAPPING.snpDateRange) || 'days7';
};

const getInitialActiveTab = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const tabVal = searchParams.get(SNP_PARAMS_MAPPING.snpTab);
  if (!tabVal) {
    return {
      idx: 0,
      value: TABS.tests
    };
  }
  const foundTabIdx = Object.keys(TABS).findIndex((item) => item === tabVal);
  if (foundTabIdx !== -1) {
    return {
      idx: foundTabIdx,
      value: TABS[tabVal]
    };
  }
  return {
    idx: 0,
    value: TABS.tests
  };
};

const getInitialBuild = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const snpActiveBuild = searchParams.get(SNP_PARAMS_MAPPING.snpActiveBuild);
  if (snpActiveBuild && snpActiveBuild !== 'all') {
    return {
      label: snpActiveBuild,
      value: snpActiveBuild
    };
  }
  return {
    label: 'All Builds',
    value: 'all'
  };
};
const getInitialMuted = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const snpIsMuted = searchParams.get(SNP_PARAMS_MAPPING.snpIsMuted);
  return snpIsMuted ? snpIsMuted === 'true' : false;
};
const getInitialFlaky = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const snpIsFlaky = searchParams.get(SNP_PARAMS_MAPPING.snpIsFlaky);
  return snpIsFlaky ? snpIsFlaky === 'true' : false;
};

const { actions, reducer } = createSlice({
  name: 'snp',
  initialState: {
    snpTestFilters: {
      dateRange: {
        key: getInitialDateRange(),
        ...SNP_DATE_RANGE[getInitialDateRange()].getDuration
      },
      buildName: getInitialBuild(),
      isMuted: getInitialMuted(),
      isFlaky: getInitialFlaky()
    },
    activeTab: getInitialActiveTab()
  },
  reducers: {
    setActiveTab: (state, { payload }) => {
      state.activeTab = payload;
    },
    setSnPTestFilters: (state, { payload }) => {
      state.snpTestFilters = {
        ...state.snpTestFilters,
        ...payload
      };
    },
    clearSnpTestFilter: (state) => {
      state.snpTestFilters = {
        dateRange: {
          key: 'days7',
          ...SNP_DATE_RANGE.days7.getDuration
        },
        buildName: {
          label: 'All Builds',
          value: 'all'
        }
      };
    }
  }
});

export const { setSnPTestFilters, clearSnpTestFilter, setActiveTab } = actions;

export default reducer;
