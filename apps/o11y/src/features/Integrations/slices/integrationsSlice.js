import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getEmailPreferences, submitEmailPreferences } from 'api/integrations';

const SLICE_NAME = 'integrations';

export const getEmailPreferencesData = createAsyncThunk(
  `${SLICE_NAME}/getEmailPreferencesData`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await getEmailPreferences({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);
export const submitEmailPreferencesData = createAsyncThunk(
  `${SLICE_NAME}/submitEmailPreferencesData`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await submitEmailPreferences({ ...data });
      return response.data;
    } catch (err) {
      return rejectWithValue({ err, data });
    }
  }
);

const { reducer, actions } = createSlice({
  name: 'integrations',
  initialState: {
    ciData: {}
  },
  reducers: {
    updateCiData: (state, { payload }) => {
      state.ciData = {
        ...state.ciData,
        ...payload
      };
    }
  },
  extraReducers: {}
});

export const { updateCiData } = actions;

export default reducer;