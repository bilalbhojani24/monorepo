import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAnalyzerSimilarTests as getAnalyzerSimilarTestsAPI,
  getBugDetails,
  getJenkinsBuildParams,
  getTestHistoryData,
  getTestList,
  toggleMuteTest as toggleMuteTestAPI,
  triggerJenkinsBuildAPI,
  triggerReRunBE as triggerReRunBEAPI,
  updateIssueTypes as updateIssueTypesAPI
} from 'api/testlist';
import { toggleModal } from 'common/ModalToShow/slices/modalToShowSlice';
import { API_STATUSES } from 'constants/common';
import { getAllAppliedFilters } from 'features/FilterSkeleton/slices/selectors';
import { getFilterQueryParams } from 'features/FilterSkeleton/utils';
import { setWidgetData } from 'features/IntegrationsWidget/slices/integrationsWidgetSlice';
import {
  EMPTY_TESTLIST_DATA_STATE,
  LOG_TYPES
} from 'features/TestList/constants';
import { getAllTestHistoryDetails } from 'features/TestList/slices/selectors';
import { o11yNotify } from 'utils/notification';

import {
  getRetryInfoTable,
  getStaticDescription,
  getTableRow,
  parseJenkinsBuildParams
} from './utils';

const sliceName = 'testList';
const reRunSuccess = {
  title: `Re-run triggered!`,
  description: '',
  type: 'success'
};

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

const triggerJenkinsBuild = createAsyncThunk(
  `${sliceName}/triggerJenkinsBuild`,
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await triggerJenkinsBuildAPI({
        ...data.data,
        parameters: data.parameters
      });
      dispatch(toggleModal({ version: '', data: {} }));
      o11yNotify(reRunSuccess);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const getJenkinsBuildParameters = createAsyncThunk(
  `${sliceName}/getJenkinsBuildParams`,
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await getJenkinsBuildParams(data);
      let parameters = [];
      if (response.data?.actions) {
        parameters = parseJenkinsBuildParams(response.data?.actions);
      }
      return dispatch(
        triggerJenkinsBuild({
          data,
          parameters
        })
      );
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const triggerReRunBE = createAsyncThunk(
  `${sliceName}/triggerReRunBE`,
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const response = await triggerReRunBEAPI({ ...data });
      const responseData = response.data;
      if (responseData.created) {
        dispatch(toggleModal({ version: '', data: {} }));
        o11yNotify(reRunSuccess);
        return responseData;
      }
      if (
        responseData.username &&
        responseData.authToken &&
        responseData.paramUrl
      ) {
        return dispatch(getJenkinsBuildParameters(responseData));
      }
      return rejectWithValue(new Error('Failure to re-run trigger'));
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
    const allHistoryKeys = Object.keys(allHistories.data);
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
  async (data, { rejectWithValue, getState }) => {
    try {
      const appliedFilters = getAllAppliedFilters(getState());
      const response = await getTestList({
        ...data,
        searchString: getFilterQueryParams(appliedFilters).toString()
      });
      return { ...response?.data, sentData: data };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getTestReportDetails = createAsyncThunk(
  `${sliceName}/getTestReportDetails`,
  async (data, { dispatch, rejectWithValue }) => {
    let description = `\n\n Open [URL](${window.location.href}) on Browserstack\n`;
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
        description += `\n\n\n **Exception** \n \`\`\`shell\n${assertionString}\`\`\``;
      }
      dispatch(
        setWidgetData({
          description,
          testRunId: data.testRunId
        })
      );
      return response;
    } catch (err) {
      description += `\n\n ${getTableRow('Build Id', data.buildId)}`;
      description += getTableRow('Test Id', data.testRunId);
      dispatch(
        setWidgetData({
          description
        })
      );
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  testList: {
    data: EMPTY_TESTLIST_DATA_STATE,
    apiState: { status: API_STATUSES.IDLE, details: {} }
  },
  historyDetails: {
    data: {},
    apiState: { status: API_STATUSES.IDLE, details: {} }
  }
};
const { actions, reducer } = createSlice({
  name: `${sliceName}`,
  initialState,
  reducers: {
    setTestList: (state, { payload }) => {
      state.testList = {
        ...state.testList,
        ...payload
      };
    },
    resetTestListSlice: () => initialState
  },
  extraReducers: (builder) => {
    builder
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
          buildId: payload.buildId,
          status: payload.status
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

export const { setTestList, resetTestListSlice } = actions;

export default reducer;
