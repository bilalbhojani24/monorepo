import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { postCSV } from '../../../api/importCSV.api';
import { IMPORT_CSV_STEPS } from '../const/importCSVConstants';

const initialState = {
  fileConfig: { file: '', fileName: '' },
  currentCSVScreen: 'uploadFile',
  importCSVSteps: IMPORT_CSV_STEPS,
  fieldsMappingData: {},
  csvFormData: {
    row: 1,
    encodings: '',
    separators: '',
    firstRowIsHeader: true
  },
  csvUploadError: '',
  showCSVFields: false,
  mapFieldModalConfig: { show: false, field: '' }
};

export const uploadFile = createAsyncThunk(
  'importCSV/uploadFile',
  async (payload) => {
    try {
      return await postCSV(payload);
    } catch (err) {
      return err;
    }
  }
);

const importCSVSlice = createSlice({
  name: 'importCSV',
  initialState,
  reducers: {
    setCSVCurrentScreen: (state, { payload }) => {
      state.currentCSVScreen = payload;
    },
    setCSVImportSteps: (state, { payload }) => {
      state.importCSVSteps = payload;
    },
    setCSVFormData: (state, { payload }) => {
      state.csvFormData[payload.key] = payload.value;
    },
    setCSVUploadError: (state, { payload }) => {
      state.csvUploadError = payload;
    },
    setFileConfig: (state, { payload }) => {
      state.fileConfig = payload;
    },
    setShowMoreFields: (state, { payload }) => {
      state.showCSVFields = payload;
    },
    setMapFieldModalConfig: (state, { payload }) => {
      state.mapFieldModalConfig = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.fieldsMappingData = action.payload;
      state.currentCSVScreen = 'mapFields';
      state.importCSVSteps = initialState.importCSVSteps.map((step, idx) => {
        if (idx === 0) return { ...step, status: 'complete' };
        if (idx === 1) return { ...step, status: 'current' };
        return step;
      });
    });
    builder.addCase(uploadFile.rejected, (state, action) => {
      state.csvUploadError = action.payload;
    });
  }
});

export const {
  setCSVCurrentScreen,
  setCSVImportSteps,
  setCSVFormData,
  setCSVUploadError,
  setFileConfig,
  setShowMoreFields,
  setMapFieldModalConfig
} = importCSVSlice.actions;
export default importCSVSlice.reducer;
