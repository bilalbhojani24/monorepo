import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getBuildNames,
  getSnPErrors,
  getSnPTests,
  getSnPTestsBreakdown,
  getSnPUEBreakdown
} from 'api/snp';
import { SNP_DATE_RANGE, SNP_PARAMS_MAPPING } from 'constants/common';

import {
  TABS,
  TESTS_HEADER_LABEL_MAPPING,
  UNIQUE_ERROR_MAIN_HEADER
} from '../constants';

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

const { reducer, actions } = createSlice({
  name: 'snp',
  initialState: {
    data: {
      tests: {
        data: [],
        pagingParams: {},
        isLoading: true,
        sortBy: {
          type: Object.keys(TESTS_HEADER_LABEL_MAPPING)[3],
          status: 'desc'
        }
      },
      errors: {
        data: [],
        pagingParams: {},
        isLoading: true,
        sortBy: {
          type: Object.keys(UNIQUE_ERROR_MAIN_HEADER)[2],
          status: 'desc'
        }
      }
    },
    ui: {
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
    }
  },
  reducers: {
    setActiveTab: (state, { payload }) => {
      state.ui.activeTab = payload;
    },
    setSnPTestFilters: (state, { payload }) => {
      state.ui.snpTestFilters = {
        ...state.snpTestFilters,
        ...payload
      };
    },
    clearSnpTestFilter: (state) => {
      state.ui.snpTestFilters = {
        dateRange: {
          key: 'days7',
          ...SNP_DATE_RANGE.days7.getDuration
        },
        buildName: {
          label: 'All Builds',
          value: 'all'
        }
      };
    },
    setTestsLoading: (state, { payload }) => {
      state.data.tests.isLoading = payload;
    },
    setTestData: (state, { payload }) => {
      state.data.tests.data = payload;
    },
    updateTests: (state, { payload }) => {
      state.data.tests.data = [...state.data.tests.data, ...payload];
    },
    setTestsPagingParams: (state, { payload }) => {
      state.data.tests.pagingParams = payload;
    },
    setTestsSortBy: (state, { payload }) => {
      state.data.tests.sortBy = payload;
    },
    clearSnPTests: (state) => {
      state.data.tests = {
        ...state.data.tests,
        data: [],
        pagingParams: {},
        isLoading: false
      };
    },
    setErrorsLoading: (state, { payload }) => {
      state.data.errors.isLoading = payload;
    },
    setErrorsData: (state, { payload }) => {
      state.data.errors.data = payload;
    },
    updateErrors: (state, { payload }) => {
      state.data.errors.data = [...state.data.errors.data, ...payload];
    },
    setErrorsPagingParams: (state, { payload }) => {
      state.data.errors.pagingParams = payload;
    },
    setErrorsSortBy: (state, { payload }) => {
      state.data.errors.sortBy = payload;
    },
    clearSnPErrors: (state) => {
      state.data.errors = {
        ...state.data.errors,
        data: [],
        pagingParams: {},
        isLoading: false
      };
    }
  },
  extraReducers: {}
});

export const {
  setSnPTestFilters,
  clearSnpTestFilter,
  setActiveTab,
  setTestsLoading,
  setTestData,
  updateTests,
  setTestsPagingParams,
  setTestsSortBy,
  clearSnPTests,
  setErrorsLoading,
  setErrorsData,
  updateErrors,
  setErrorsPagingParams,
  setErrorsSortBy,
  clearSnPErrors
} = actions;

export const getSnPTestsData = createAsyncThunk(
  'testlist/getSnPTestsData',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await getSnPTests({ ...data });
      if (data?.shouldUpdate) {
        dispatch(updateTests(response.data.tests));
      } else {
        dispatch(setTestData(response.data.tests));
      }
      dispatch(setTestsPagingParams(response.data.pagingParams));
      return response.data;
    } catch (err) {
      dispatch(clearSnPTests());
      return rejectWithValue(err);
    }
  }
);
export const getBuildNamesData = createAsyncThunk(
  'testlist/getBuildNamesData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getBuildNames({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getSnPTestsBreakdownData = createAsyncThunk(
  'testlist/getSnPTestsBreakdownData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getSnPTestsBreakdown({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getSnPErrorsData = createAsyncThunk(
  'testlist/getSnPErrorsData',
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await getSnPErrors({ ...data });
      if (data?.shouldUpdate) {
        dispatch(updateErrors(response.data.errors));
      } else {
        dispatch(setErrorsData(response.data.errors));
      }
      dispatch(setErrorsPagingParams(response.data.pagingParams));
      return response.data;
    } catch (err) {
      dispatch(clearSnPErrors());
      return rejectWithValue(err);
    }
  }
);
export const getSnPUEBreakdownData = createAsyncThunk(
  'testlist/getSnPUEBreakdownData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getSnPUEBreakdown({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export default reducer;
