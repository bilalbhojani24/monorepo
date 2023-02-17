import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getCSVConfigurations,
  getFieldMapping,
  getUsers,
  postCSV,
  postMappingData,
  startCSVImport
} from '../../../api/importCSV.api';
import {
  COMPLETE_STEP,
  CURRENT_STEP,
  FAILED_IMPORT_MODAL_DATA,
  IMPORT_CSV_STEPS,
  ONGOING_IMPORT_MODAL_DATA,
  PREVIEW_AND_CONFIRM_IMPORT,
  UPLOAD_FILE,
  VALUE_MAPPING_OPTIONS
} from '../const/importCSVConstants';

const initialState = {
  fileConfig: { file: '', fileName: '' },
  currentCSVScreen: UPLOAD_FILE,
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
  mapFieldModalConfig: { show: false, field: '' },
  usersForDropdown: [],
  mapFieldsConfig: {
    importId: null,
    customFields: [],
    defaultFields: [],
    importFields: []
  },
  VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN: {
    ...VALUE_MAPPING_OPTIONS
  },
  previewData: [],
  folderName: '',
  retryCSVImport: false,
  uploadFileProceedLoading: false,
  confirmCSVImportNotificationConfig: {
    show: false,
    status: 'ongoing',
    modalData: ONGOING_IMPORT_MODAL_DATA
  }
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
export const setUsers = createAsyncThunk('importCSV/setUsers', async (id) => {
  try {
    return await getUsers(id);
  } catch (err) {
    return err;
  }
});

export const setValueMappingsThunk = createAsyncThunk(
  'importCSV/setValueMappings',
  // eslint-disable-next-line camelcase
  async ({ importId, field, mapped_field }) => {
    try {
      const response = await getFieldMapping({ importId, field, mapped_field });
      return { field, ...response };
    } catch (err) {
      return err;
    }
  }
);

export const submitMappingData = createAsyncThunk(
  'importCSV/submitMappingData',
  async ({ importId, projectId, folderId, myFieldMappings, valueMappings }) => {
    try {
      return await postMappingData({
        importId,
        payload: {
          project_id: projectId,
          folder_id: folderId,
          field_mappings: myFieldMappings,
          value_mappings: valueMappings
        }
      });
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
    },
    setNotificationConfigForConfirmCSVImport: (state, { payload }) => {
      state.confirmCSVImportNotificationConfig = payload;
    },
    startImportingTestCasePending: (state) => {
      state.confirmCSVImportNotificationConfig.show = true;
      state.confirmCSVImportNotificationConfig.status = 'ongoing';
      state.confirmCSVImportNotificationConfig.modalData =
        ONGOING_IMPORT_MODAL_DATA;
    },
    startImportingTestCaseFulfilled: (state, { payload }) => {
      if (payload.success) {
        state.confirmCSVImportNotificationConfig.show = false;
        state.confirmCSVImportNotificationConfig.status = 'success';
      } else if (payload.code === 'ERR_BAD_REQUEST') {
        state.confirmCSVImportNotificationConfig.show = true;
        state.confirmCSVImportNotificationConfig.status = 'failed';
        state.confirmCSVImportNotificationConfig.modalData =
          FAILED_IMPORT_MODAL_DATA;
      }
    },
    startImportingTestCaseRejected: (state, { payload }) => {
      if (payload.response.status === 499) {
        state.confirmCSVImportNotificationConfig.show = false;
        state.confirmCSVImportNotificationConfig.status = '';
        state.confirmCSVImportNotificationConfig.modalData = null;
      } else {
        state.confirmCSVImportNotificationConfig.show = true;
        state.confirmCSVImportNotificationConfig.status = 'failed';
        state.confirmCSVImportNotificationConfig.modalData =
          FAILED_IMPORT_MODAL_DATA;
      }
    },
    setRetryImport: (state, { payload }) => {
      state.retryCSVImport = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.fieldsMappingData = action.payload;
      state.mapFieldsConfig.importId = action.payload.import_id;
      state.mapFieldsConfig.customFields =
        action.payload.fields_available?.custom;
      state.mapFieldsConfig.defaultFields =
        action.payload.fields_available?.default;
      state.mapFieldsConfig.importFields = action.payload.import_fields;
      state.uploadFileProceedLoading = false;
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(
        action.payload?.value_mappings
      )) {
        state.valueMappings[key] = Object.keys(value).reduce(
          (obj, nestedKey) => {
            if (value[nestedKey] === null)
              return { ...obj, [nestedKey]: { action: 'add' } };
            return { ...obj, [nestedKey]: value[nestedKey] };
          },
          {}
        );
      }

      state.currentCSVScreen = 'mapFields';
      state.importCSVSteps = initialState.importCSVSteps.map((step, idx) => {
        if (idx === 0) return { ...step, status: COMPLETE_STEP };
        if (idx === 1) return { ...step, status: CURRENT_STEP };
        return step;
      });
    });
    builder.addCase(uploadFile.rejected, (state, { payload }) => {
      state.csvUploadError = payload;
    });
    builder.addCase(uploadFile.pending, (state) => {
      state.uploadFileProceedLoading = true;
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
      if (payload?.response?.status === 400) return;
      const { field, value_mappings: valueMappings } = payload;
      state.valueMappings[field] = valueMappings;
    });
    builder.addCase(setUsers.fulfilled, (state, { payload }) => {
      const options = payload.users.map((item) => ({
        label: item.full_name,
        value: item.full_name
      }));
      state.VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN.UPDATEDBY = [
        { label: 'Add', value: 'Add' },
        ...options
      ];
      state.VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN.CREATEDBY = [
        { label: 'Add', value: 'Add' },
        ...options
      ];
    });
    builder.addCase(submitMappingData.fulfilled, (state, { payload }) => {
      state.folderName = payload.folder;
      state.previewData = payload.test_cases;
      // next screen
      state.currentCSVScreen = PREVIEW_AND_CONFIRM_IMPORT;
      state.importCSVSteps = initialState.importCSVSteps.map((step, idx) => {
        if (idx === 2) return { ...step, status: CURRENT_STEP };
        return { ...step, status: COMPLETE_STEP };
      });
    });
  }
});

export const {
  setCSVCurrentScreen,
  setCSVImportSteps,
  setCSVFormData,
  setRetryImport,
  setCSVUploadError,
  setFileConfig,
  setShowMoreFields,
  setMapFieldModalConfig,
  setFieldsMapping,
  setValueMappings,
  startImportingTestCasePending,
  startImportingTestCaseFulfilled,
  startImportingTestCaseRejected,
  setNotificationConfigForConfirmCSVImport
} = importCSVSlice.actions;
export default importCSVSlice.reducer;

export const startImportingTestCases =
  ({ importId, projectId, retryImport }) =>
  async (dispatch) => {
    dispatch(startImportingTestCasePending());
    try {
      const response = await startCSVImport({
        importId,
        retryImport,
        payload: { project_id: projectId }
      });
      dispatch(startImportingTestCaseFulfilled(response));
    } catch (err) {
      dispatch(startImportingTestCaseRejected(err));
    }
  };
