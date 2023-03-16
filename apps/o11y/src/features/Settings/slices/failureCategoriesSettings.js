import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createNewSubCat,
  deleteSubCat,
  getAvailableSubCategories,
  updateSettingsByKey
} from 'api/settings';

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

export const submitNewSubCat = createAsyncThunk(
  `${SLICE_NAME}/submitNewAlert`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await createNewSubCat({ ...data });
      return {
        subCatId: response.data?.id,
        subCatData: data.payload || {}
      };
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);
export const updateSubCat = createAsyncThunk(
  `${SLICE_NAME}/updateSubCat`,
  async (data, { rejectWithValue }) => {
    try {
      await updateSettingsByKey('failure-categories/sub-categories', {
        ...data
      });
      return {
        subCatData: data.payload || {}
      };
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);
export const deleteSubCatById = createAsyncThunk(
  `${SLICE_NAME}/deleteSubCatById`,
  async (data, { rejectWithValue }) => {
    try {
      await deleteSubCat({ ...data });
      return {
        subCatId: data.subCatId,
        category: data.category
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
      })
      .addCase(submitNewSubCat.fulfilled, (state, { payload }) => {
        let updatedData = [
          {
            id: payload.subCatId,
            ...payload.subCatData
          }
        ];

        if (
          state.failureSubCategories.data?.[payload.subCatData.category]?.length
        ) {
          updatedData = [
            ...updatedData,
            ...state.failureSubCategories.data[payload.subCatData.category]
          ];
        }
        state.failureSubCategories.data[payload.subCatData.category] =
          updatedData;
      })
      .addCase(updateSubCat.fulfilled, (state, { payload }) => {
        const foundAlertIdx = state.failureSubCategories.data[
          payload.subCatData.category
        ].findIndex((item) => item.id === payload.subCatData.id);
        if (foundAlertIdx !== -1) {
          state.failureSubCategories.data[payload.subCatData.category][
            foundAlertIdx
          ] = payload.subCatData;
        }
      })
      .addCase(deleteSubCatById.fulfilled, (state, { payload }) => {
        state.failureSubCategories.data[payload.category] =
          state.failureSubCategories.data[payload.category].filter(
            (item) => item.id !== payload.subCatId
          );
      });
  }
});

export default reducer;
