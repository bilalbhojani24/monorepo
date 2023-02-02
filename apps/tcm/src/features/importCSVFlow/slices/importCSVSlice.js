import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fileConfig: { file: '', fileName: '' },
  currentCSVScreen: 'uploadFile',
  importCSVSteps: [],
  csvFormData: {
    row: 1,
    encodings: '',
    separators: '',
    firstRowIsHeader: true
  },
  csvUploadError: ''
};

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
    }
  }
});

export const {
  setCSVCurrentScreen,
  setCSVImportSteps,
  setCSVFormData,
  setCSVUploadError,
  setFileConfig
} = importCSVSlice.actions;
export default importCSVSlice.reducer;
