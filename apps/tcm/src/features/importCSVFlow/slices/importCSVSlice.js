import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getCSVConfigurations,
  getFieldMapping,
  postCSV
} from '../../../api/importCSV.api';
import { IMPORT_CSV_STEPS } from '../const/importCSVConstants';

const initialState = {
  fileConfig: { file: '', fileName: '' },
  currentCSVScreen: 'uploadFile',
  importCSVSteps: IMPORT_CSV_STEPS,
  fieldsMappingData: {},
  allEncodings: [],
  allSeparators: [],
  csvFormData: {
    row: 1,
    encodings: '',
    separators: '',
    firstRowIsHeader: true
  },
  csvUploadError: '',
  showCSVFields: false,
  fieldsMapping: {},
  valueMappings: {},
  mapFieldModalConfig: { show: false, field: '' }
};

export const setCSVConfigurations = createAsyncThunk(
  'importCSV/setCSVConfigurations',
  async () => {
    try {
      return await getCSVConfigurations();
    } catch (err) {
      return err;
    }
  }
);

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

export const setValueMappingsThunk = createAsyncThunk(
  'importCSV/setValueMappings',
  async ({ importId, field, mapped_field }) => {
    try {
      const response = await getFieldMapping({ importId, field, mapped_field });
      return { field, ...response };
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
    },
    setFieldsMapping: (state, { payload }) => {
      state.fieldsMapping[payload.key] = payload.value;
    },
    setValueMappings: (state, { payload }) => {
      state.valueMappings[payload.key] = payload.value;
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
    builder.addCase(uploadFile.rejected, (state, { payload }) => {
      state.csvUploadError = payload;
    });
    builder.addCase(setCSVConfigurations.fulfilled, (state, { payload }) => {
      // eslint-disable-next-line prefer-destructuring
      state.csvFormData.encodings = {
        label: payload.encodings[2],
        value: payload.encodings[2]
      };
      // eslint-disable-next-line prefer-destructuring
      state.csvFormData.separators = {
        label: payload.separators[0],
        value: payload.separators[0]
      };
      state.allEncodings = payload.encodings.map((encoding) => ({
        label: encoding,
        value: encoding
      }));
      state.allSeparators = payload.separators.map((separator) => ({
        label: separator,
        value: separator
      }));
    });
    builder.addCase(setValueMappingsThunk.fulfilled, (state, { payload }) => {
      const { field, value_mappings: valueMappings } = payload;
      state.valueMappings[field] = valueMappings;
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
  setMapFieldModalConfig,
  setFieldsMapping,
  setValueMappings
} = importCSVSlice.actions;
export default importCSVSlice.reducer;
