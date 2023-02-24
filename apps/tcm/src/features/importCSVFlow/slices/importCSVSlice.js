import { createSlice } from '@reduxjs/toolkit';

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
  mappingFieldsError: '',
  showCSVFields: false,
  fieldsMapping: {},
  valueMappings: {},
  mapFieldModalConfig: { show: false, field: '', mapped_field: '' },
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
  },
  totalImportedProjectsInPreview: null,
  mapFieldsProceedLoading: false
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
    setMapFieldsError: (state, { payload }) => {
      state.mappingFieldsError = payload;
    },
    setFileConfig: (state, { payload }) => {
      state.fileConfig = payload;
      state.csvUploadError = '';
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
      if (payload.value === 'delete') {
        delete state.valueMappings[payload.key];
        // let { [payload.key], ...res } = state.valueMappings;
      } else state.valueMappings[payload.key] = payload.value;
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
    setCSVConfigurationsFulfilled: (state, { payload }) => {
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
    },
    uploadFilePending: (state) => {
      state.uploadFileProceedLoading = true;
    },
    uploadFileFulfilled: (state, { payload }) => {
      state.fieldsMappingData = payload;
      state.mapFieldsConfig.importId = payload.import_id;
      state.mapFieldsConfig.customFields = payload.fields_available?.custom;
      state.mapFieldsConfig.defaultFields = payload.fields_available?.default;
      state.mapFieldsConfig.importFields = payload.import_fields;
      state.uploadFileProceedLoading = false;
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(payload?.value_mappings)) {
        state.valueMappings[key] = Object.keys(value).reduce(
          (obj, nestedKey) => {
            if (value[nestedKey] === null)
              return { ...obj, [nestedKey]: { action: 'add' } };
            return { ...obj, [nestedKey]: value[nestedKey] };
          },
          {}
        );
      }

      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(payload?.field_mappings)) {
        state.fieldsMapping[key] = value;
      }

      state.currentCSVScreen = 'mapFields';
      state.importCSVSteps = initialState.importCSVSteps.map((step, idx) => {
        if (idx === 0) return { ...step, status: COMPLETE_STEP };
        if (idx === 1) return { ...step, status: CURRENT_STEP };
        return step;
      });
    },
    uploadFileRejected: (state, { payload }) => {
      state.csvUploadError = payload.response.data.message;
      state.uploadFileProceedLoading = false;
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
    setValueMappingThunkFulfilled: (state, { payload }) => {
      const { field, value_mappings: valueMappings } = payload;

      const newValueMappings = Object.keys(valueMappings).reduce(
        (obj, item) => {
          if (valueMappings[item] === null)
            return { ...obj, [item]: { action: 'add' } };
          return { ...obj, [item]: valueMappings[item] };
        },
        {}
      );
      state.valueMappings[field] = newValueMappings;
    },
    submitMappingDataPending: (state) => {
      state.mapFieldsProceedLoading = true;
    },
    submitMappingDataFulfilled: (state, { payload }) => {
      state.totalImportedProjectsInPreview = payload.cases_count;
      state.folderName = payload.folder;
      state.previewData = payload.test_cases;
      // next screen
      state.currentCSVScreen = PREVIEW_AND_CONFIRM_IMPORT;
      state.importCSVSteps = initialState.importCSVSteps.map((step, idx) => {
        if (idx === 2) return { ...step, status: CURRENT_STEP };
        return { ...step, status: COMPLETE_STEP };
      });
    },
    submitMappingDataRejected: (state, { payload }) => {
      state.mappingFieldsError = payload.response.data.message;
    },
    setRetryImport: (state, { payload }) => {
      state.retryCSVImport = payload;
    },
    setSystemTags: (state, { payload }) => {
      state.VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN.TAGS = payload;
    },
    setSystemUsers: (state, { payload }) => {
      state.VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN.UPDATEDBY = payload;
      state.VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN.CREATEDBY = payload;
      state.VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN.OWNER = payload;
    }
  }
});

export const {
  setCSVCurrentScreen,
  setCSVImportSteps,
  setCSVFormData,
  setRetryImport,
  setCSVUploadError,
  setMapFieldsError,
  setFileConfig,
  setShowMoreFields,
  setMapFieldModalConfig,
  setFieldsMapping,
  setValueMappings,
  setSystemTags,
  setSystemUsers,
  uploadFilePending,
  uploadFileFulfilled,
  uploadFileRejected,
  setCSVConfigurationsFulfilled,
  startImportingTestCasePending,
  startImportingTestCaseFulfilled,
  startImportingTestCaseRejected,
  setValueMappingThunkFulfilled,
  submitMappingDataPending,
  submitMappingDataFulfilled,
  submitMappingDataRejected,
  setNotificationConfigForConfirmCSVImport
} = importCSVSlice.actions;
export default importCSVSlice.reducer;
