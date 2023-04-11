import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAnalyzerSimilarTests as getAnalyzerSimilarTestsAPI,
  getBugDetails,
  getTestHistoryData,
  getTestList,
  getTestlistFilters,
  toggleMuteTest as toggleMuteTestAPI,
  triggerReRunBE as triggerReRunBEAPI,
  updateIssueTypes as updateIssueTypesAPI
} from 'api/testlist';
import { API_STATUSES } from 'constants/common';
import { setWidgetData } from 'features/IntegrationsWidget/slices/integrationsWidgetSlice';
import {
  EMPTY_APPLIED_FILTERS,
  EMPTY_SELECTED_FILTERS,
  EMPTY_STATIC_FILTERS,
  EMPTY_TESTLIST_DATA_STATE,
  LOG_TYPES
} from 'features/TestList/constants';
import { getAllTestHistoryDetails } from 'features/TestList/slices/selectors';

import { getRetryInfoTable, getStaticDescription, getTableRow } from './utils';

const sliceName = 'testList';

export const getTestlistFiltersData = createAsyncThunk(
  `${sliceName}/getBuildId`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTestlistFilters({ ...data });
      return { ...response?.data, ...data };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getAnalyzerSimilarTests = createAsyncThunk(
  `${sliceName}/getAnalyzerSimilarTests`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await getAnalyzerSimilarTestsAPI({ ...data });
      return { ...response?.data, ...data };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const updateIssueTypes = createAsyncThunk(
  `${sliceName}/updateIssueTypes`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateIssueTypesAPI(data?.projectId, data?.data);
      return { ...response?.data, ...data };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const triggerReRunBE = createAsyncThunk(
  `${sliceName}/triggerReRunBE`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await triggerReRunBEAPI({ ...data });
      return { ...response?.data, ...data };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const toggleMuteTest = createAsyncThunk(
  `${sliceName}/toggleMuteTest`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await toggleMuteTestAPI({ ...data });
      return { ...response?.data, ...data };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getHistoryDetails = createAsyncThunk(
  `${sliceName}/getHistoryDetails`,
  async (data, { rejectWithValue, getState }) => {
    const allHistories = getAllTestHistoryDetails(getState());
    const allHistoryKeys = Object.keys(allHistories);
    const isHistoryLoaded = data.testRunIds.every((id) =>
      allHistoryKeys.includes(id.toString())
    );
    if (isHistoryLoaded) {
      return false;
    }
    try {
      const response = await getTestHistoryData(data.testRunIds);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getTestListData = createAsyncThunk(
  `${sliceName}/getTestListData`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTestList({ ...data });
      return { ...response?.data, sentData: data };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getTestReportDetails = createAsyncThunk(
  `${sliceName}/getTestReportDetails`,
  async (data, { dispatch }) => {
    let description = `\n\n Open [URL|${window.location.href}] on Browserstack\n`;
    try {
      const response = await getBugDetails(data.buildId, data.testRunId);
      const details = response.data;
      description += `\n\n ${getStaticDescription(details)}`;
      if (details?.retries?.length) {
        description += `\n\n ${getRetryInfoTable(details?.retries)}`;
      }
      if (details?.logStruct?.[LOG_TYPES.STACKTRACE]?.length) {
        let assertionString = '';
        details.logStruct[LOG_TYPES.STACKTRACE].forEach((item) => {
          if (item) {
            assertionString += `${item}\n`;
          }
        });
        description += `\n\n{code:title=Exception|theme=FadeToGrey|language=shell|collapse=true}${assertionString}{code}`;
      }
      dispatch(
        setWidgetData({
          description
        })
      );
    } catch (err) {
      description += `\n\n ${getTableRow('Build Id', data.buildId)}`;
      description += getTableRow('Test Id', data.testRunId);
      dispatch(
        setWidgetData({
          description
        })
      );
    }
  }
);

const { actions, reducer } = createSlice({
  name: `${sliceName}`,
  initialState: {
    staticFilters: {
      data: EMPTY_STATIC_FILTERS,
      apiState: { status: API_STATUSES.IDLE, details: {} }
    },
    testList: {
      data: EMPTY_TESTLIST_DATA_STATE,
      apiState: { status: API_STATUSES.IDLE, details: {} }
    },
    historyDetails: {
      data: {},
      apiState: { status: API_STATUSES.IDLE, details: {} }
    },
    selectedFilters: { ...EMPTY_SELECTED_FILTERS },
    appliedFilters: { ...EMPTY_APPLIED_FILTERS }
  },
  reducers: {
    setStaticFilters: (state, { payload }) => {
      state.staticFilters = {
        ...state.staticFilters,
        ...payload
      };
    },
    setTestList: (state, { payload }) => {
      state.testList = {
        ...state.testList,
        ...payload
      };
    },
    setSelectedFilters: (state, { payload }) => {
      state.selectedFilters = {
        ...state.selectedFilters,
        ...payload
      };
    },
    setAppliedFilters: (state, { payload }) => {
      state.appliedFilters = {
        ...state.appliedFilters,
        ...payload
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTestlistFiltersData.pending, (state) => {
        state.staticFilters = {
          data: EMPTY_STATIC_FILTERS,
          apiState: {
            status: API_STATUSES.PENDING,
            details: {}
          }
        };
      })
      .addCase(getTestlistFiltersData.fulfilled, (state, { payload }) => {
        state.staticFilters = {
          data: payload.filters,
          apiState: {
            status: API_STATUSES.FULFILLED,
            details: {}
          }
        };
      })
      .addCase(getTestlistFiltersData.rejected, (state) => {
        state.staticFilters = {
          data: EMPTY_STATIC_FILTERS,
          apiState: {
            status: API_STATUSES.FAILED,
            details: {}
          }
        };
      })
      .addCase(getTestListData.pending, (state) => {
        state.testList.apiState = {
          status: API_STATUSES.PENDING,
          details: {}
        };
      })
      .addCase(getTestListData.fulfilled, (state, { payload }) => {
        const newAPIStatus = {
          status: API_STATUSES.FULFILLED,
          details: {}
        };
        const prevValue = state.testList?.data?.hierarchy || [];
        state.testList.data = {
          hierarchy: [...prevValue, ...payload.hierarchy],
          pagingParams: payload.pagingParams,
          buildId: payload.buildId
        };
        state.testList.apiState = newAPIStatus;
      })
      .addCase(getTestListData.rejected, (state) => {
        state.testList.apiState = {
          status: API_STATUSES.FAILED,
          details: {}
        };
      })
      .addCase(getHistoryDetails.pending, (state) => {
        state.historyDetails.apiState = {
          status: API_STATUSES.PENDING,
          details: {}
        };
      })
      .addCase(getHistoryDetails.fulfilled, (state, { payload }) => {
        state.historyDetails = {
          data: { ...state.historyDetails?.data, ...payload },
          apiState: {
            status: API_STATUSES.FULFILLED,
            details: {}
          }
        };
      })
      .addCase(getHistoryDetails.rejected, (state) => {
        state.historyDetails.apiState = {
          status: API_STATUSES.FAILED,
          details: {}
        };
      });
  }
});

export const {
  setAppliedFilters,
  setSelectedFilters,
  setStaticFilters,
  setTestList
} = actions;

export default reducer;
