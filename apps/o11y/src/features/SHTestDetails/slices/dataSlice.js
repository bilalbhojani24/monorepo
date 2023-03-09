import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getSnPDetailsBuilds,
  getSnPDetailsStats,
  getSnPDetailsTrend,
  getSnPTestsDetailsInfo
} from 'api/snp';
import { getAllSnPTestFilters } from 'features/SuiteHealth/slices/selectors';

const { reducer } = createSlice({
  name: 'snpDetails',
  initialState: {},
  reducers: {},
  extraReducers: {}
});

export const getSnPTestsDetailsInfoData = createAsyncThunk(
  'testlist/getSnPTestsDetailsInfoData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const filters = getAllSnPTestFilters(getState());
      const response = await getSnPTestsDetailsInfo({ ...data, filters });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPDetailsStatsData = createAsyncThunk(
  'testlist/getSnPDetailsStatsData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const filters = getAllSnPTestFilters(getState());
      const response = await getSnPDetailsStats({ ...data, filters });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPDetailsTrendData = createAsyncThunk(
  'testlist/getSnPDetailsTrendData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const filters = getAllSnPTestFilters(getState());
      const response = await getSnPDetailsTrend({ ...data, filters });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getSnPDetailsBuildsData = createAsyncThunk(
  'testlist/getSnPDetailsBuildsData',
  async (data, { rejectWithValue, getState }) => {
    try {
      const filters = getAllSnPTestFilters(getState());
      const response = await getSnPDetailsBuilds({ ...data, filters });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export default reducer;
