import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getBehaviour,
  getCapabilities,
  getConsolidatedLogs,
  getNetworkLogs,
  getTestCode,
  getTestDetails,
  getTestInfoTabs,
  getTestMeta,
  getTestOverview
} from 'api/testDetails';
import isEmpty from 'lodash/isEmpty';

export const getTestMetaData = createAsyncThunk(
  'testDetails/getTestMetaData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTestMeta(data?.testRunId);
      return { res: response.data, data };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getConsolidatedLogsData = createAsyncThunk(
  'testDetails/getConsolidatedLogsData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getConsolidatedLogs(data?.testRunId);
      return { res: response.data, data };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getTestDetailsData = createAsyncThunk(
  'testDetails/getTestDetailsData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTestDetails(data?.testRunId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getNetworkLogsData = createAsyncThunk(
  'testDetails/getNetworkLogsData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getNetworkLogs(data?.testRunId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const { actions, reducer } = createSlice({
  name: 'testDetails',
  initialState: {
    consolidatedLogs: {
      isLoading: false,
      data: {
        testRunId: null,
        logs: []
      }
    },
    networkLogs: {
      isLoading: true,
      data: []
    },
    details: {
      isLoading: true,
      isValidVideo: false,
      data: { videoLogs: null, browserstackSessionUrl: '' }
    },
    testMeta: {
      isLoading: false,
      data: {}
    }
  },
  reducers: {
    setConsolidatedLogs: (state, { payload }) => {
      state.consolidatedLogs = {
        ...state.consolidatedLogs,
        ...payload
      };
    },
    setNetworkLogs: (state, { payload }) => {
      state.networkLogs = {
        ...state.networkLogs,
        ...payload
      };
    },
    setTestDetails: (state, { payload }) => {
      state.details = {
        ...state.details,
        ...payload
      };
    },
    setTestMeta: (state, { payload }) => {
      state.testMeta = {
        ...state.testMeta,
        ...payload
      };
    },
    setIsValidVideo: (state, { payload }) => {
      state.details.isValidVideo = payload;
    },
    clearTestDetails: (state) => {
      state.details = {
        isLoading: true,
        data: { videoLogs: null, browserstackSessionUrl: '' }
      };
    },
    clearTestMeta: (state) => {
      state.testMeta = {
        isLoading: true,
        data: { videoLogs: null, browserstackSessionUrl: '' }
      };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTestMetaData.pending, (state) => {
        state.testMeta.isLoading = true;
        state.details = {
          isLoading: true,
          data: { videoLogs: null, browserstackSessionUrl: '' }
        };
      })
      .addCase(getTestMetaData.rejected, (state) => {
        state.testMeta.isLoading = false;
      })
      .addCase(getTestMetaData.fulfilled, (state, { payload }) => {
        state.testMeta = {
          isLoading: false,
          data: {
            ...payload.res,
            testRunId: payload.data?.testRunId
          }
        };
      })
      .addCase(getConsolidatedLogsData.pending, (state) => {
        state.consolidatedLogs = {
          isLoading: true,
          data: {
            testRunId: null,
            logs: []
          }
        };
      })
      .addCase(getConsolidatedLogsData.rejected, (state) => {
        state.consolidatedLogs = {
          isLoading: false,
          data: {
            testRunId: null,
            logs: []
          }
        };
      })
      .addCase(getConsolidatedLogsData.fulfilled, (state, { payload }) => {
        state.consolidatedLogs = {
          isLoading: false,
          data: {
            testRunId: payload.data?.testRunId,
            logs: payload.res
          }
        };
      })
      .addCase(getTestDetailsData.pending, (state) => {
        state.details = {
          isLoading: true,
          data: { videoLogs: null, browserstackSessionUrl: '' },
          isValidVideo: false
        };
      })
      .addCase(getTestDetailsData.rejected, (state) => {
        state.details = {
          isLoading: true,
          data: { videoLogs: null, browserstackSessionUrl: '' },
          isValidVideo: false
        };
      })
      .addCase(getTestDetailsData.fulfilled, (state, { payload }) => {
        state.details = {
          isLoading: false,
          data: payload,
          isValidVideo: !isEmpty(payload?.videoLogs)
        };
      })
      .addCase(getNetworkLogsData.pending, (state) => {
        state.networkLogs = {
          isLoading: true,
          data: []
        };
      })
      .addCase(getNetworkLogsData.rejected, (state) => {
        state.networkLogs = {
          isLoading: true,
          data: []
        };
      })
      .addCase(getNetworkLogsData.fulfilled, (state, { payload }) => {
        state.networkLogs = {
          isLoading: false,
          data: payload
        };
      });
  }
});

export const {
  setTestMeta,
  setConsolidatedLogs,
  setNetworkLogs,
  setTestDetails,
  setIsValidVideo,
  clearTestDetails,
  clearTestMeta
} = actions;

export const getCapabilitiesData = createAsyncThunk(
  'testDetails/getCapabilitiesData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getCapabilities(data?.testRunId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getBehaviourData = createAsyncThunk(
  'testDetails/getBehaviourData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getBehaviour(data?.testRunId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getTestCodeData = createAsyncThunk(
  'testDetails/getTestCodeData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTestCode(data?.testRunId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getTestOverviewData = createAsyncThunk(
  'testDetails/getTestOverviewData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTestOverview(data?.testRunId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const getTestInfoTabsData = createAsyncThunk(
  'testDetails/getTestInfoTabsData',
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTestInfoTabs(data?.testRunId);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export default reducer;
