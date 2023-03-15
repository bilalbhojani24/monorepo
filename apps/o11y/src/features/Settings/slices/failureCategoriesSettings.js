import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAvailableCategoriesData,
  getAvailableSubCategories
} from 'api/settings';

import {
  getFailureCategoriesState,
  getFailureSubCategoriesState
} from './selectors';

const SLICE_NAME = 'failureCategoriesSettings';

export const getFailureCategories = createAsyncThunk(
  `${SLICE_NAME}/getFailureCategories`,
  async (data, { rejectWithValue, getState }) => {
    const currentState = getFailureCategoriesState(getState());
    if (currentState.project === data.projectNormalisedName) {
      return currentState;
    }
    try {
      const response = await getAvailableCategoriesData({ ...data });
      return {
        data: response.data?.data || [],
        project: data?.projectNormalisedName
      };
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);
export const getFailureSubCategories = createAsyncThunk(
  `${SLICE_NAME}/getFailureSubCategories`,
  async (data, { rejectWithValue, getState }) => {
    const currentState = getFailureSubCategoriesState(getState());
    if (currentState.project === data.projectNormalisedName) {
      return currentState;
    }
    try {
      const response = await getAvailableSubCategories({ ...data });
      return {
        data: response.data?.data || [],
        project: data?.projectNormalisedName
      };
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);

const { reducer } = createSlice({
  name: SLICE_NAME,
  initialState: {
    failureCategories: {
      isLoading: false,
      project: '',
      data: []
    },
    failureSubCategories: {
      isLoading: false,
      project: '',
      data: []
    }
  },
  reducers: {},
  extraReducers: {}
});

export default reducer;
