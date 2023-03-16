import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAvailableSubCategories } from 'api/settings';

import { getFailureSubCategoriesState } from './selectors';

const SLICE_NAME = 'failureCategoriesSettings';

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
    failureSubCategories: {
      isLoading: false,
      project: '',
      data: {}
    }
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFailureSubCategories.pending, (state) => {
        state.failureSubCategories.isLoading = true;
      })
      .addCase(getFailureSubCategories.fulfilled, (state, { payload }) => {
        state.failureSubCategories = {
          ...state.failureSubCategories,
          ...payload,
          isLoading: false
        };
      })
      .addCase(getFailureSubCategories.rejected, (state) => {
        state.failureSubCategories = {
          isLoading: false,
          project: '',
          data: {}
        };
      });
  }
});

export default reducer;
