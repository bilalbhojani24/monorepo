import { createSlice } from '@reduxjs/toolkit';

import {
  DEFAULT_MODAL_DROPDOWN_OPTIONS,
  FAILED_IMPORT_MODAL_DATA,
  FIRST_SCREEN,
  ONGOING_IMPORT_MODAL_DATA,
  SECOND_SCREEN,
  THIRD_SCREEN
} from '../const/importCSVConstants';

import { calcValueMappings } from './helper';

const initialState = {
  fileConfig: { file: '', fileName: '' },
  currentCSVScreen: FIRST_SCREEN,
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
  errorLabelInMapFields: new Set(),
  mapFieldsConfig: {
    importId: null,
    customFields: [],
    defaultFields: [],
    importFields: []
  },
  VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN: {},
  previewData: [],
  retryCSVImport: false,
  uploadFileProceedLoading: false,
  confirmCSVImportNotificationConfig: {
    show: false,
    status: 'ongoing',
    progress: 0,
    modalData: ONGOING_IMPORT_MODAL_DATA,
    csvImportProjectId: null,
    csvImportFolderId: null
  },
  totalImportedProjectsInPreview: null,
  mapFieldsProceedLoading: false,
  showSelectMenuErrorInMapFields: false,
  topInfoSteps: [],
  showMappings: true,
  currentFieldValueMapping: {},
  selectedFolderLocation: '/',
  showChangeFolderModal: false,
  priorityIntNameAndValueMapCSV: {},
  priorityNameAndValueMapCSV: {}
};

const importCSVSlice = createSlice({
  name: 'importCSV',
  initialState,
  reducers: {
    setCSVCurrentScreen: (state, { payload }) => {
      if (payload === SECOND_SCREEN)
        state.topInfoSteps = [
          {
            title: `Uploaded CSV: ${state.fileConfig?.fileName}`,
            description: `${
              state.selectedFolderLocation === null
                ? '/'
                : state.selectedFolderLocation
            }`,
            ctaText: 'Update File',
            redirectTo: FIRST_SCREEN,
            showPreText: true
          }
        ];
      else if (payload === THIRD_SCREEN)
        state.topInfoSteps = [
          ...state.topInfoSteps,
          {
            title: 'Mapped Fields',
            description: 'All fields and values are mapped',
            ctaText: 'Update Mapping',
            redirectTo: SECOND_SCREEN
          }
        ];
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
    setErrorLabelInMapFields: (state, { payload }) => {
      state.errorLabelInMapFields = payload;
    },
    setShowSelectMenuErrorInMapFields: (state, { payload }) => {
      state.showSelectMenuErrorInMapFields = payload;
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
      state.confirmCSVImportNotificationConfig.progress = 0;
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
      state.selectedFolderLocation = payload.folder;
      const priorityDropdownOptions = payload?.priority.map((item) => ({
        label: item.name,
        value: item.value
      }));
      const automationStatusOptions = payload?.automation_status.map(
        (item) => ({
          label: item.name,
          value: item.value
        })
      );
      const statusDropdownOptions = payload?.status.map((item) => ({
        label: item.name,
        value: item.value
      }));
      const testCaseTypeDropdownOptions = payload?.case_type.map((item) => ({
        label: item.name,
        value: item.value
      }));
      state.VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN.PRIORITY = [
        ...DEFAULT_MODAL_DROPDOWN_OPTIONS,
        ...priorityDropdownOptions
      ];
      state.VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN.AUTOMATIONSTATUS = [
        ...DEFAULT_MODAL_DROPDOWN_OPTIONS,
        ...automationStatusOptions
      ];
      state.VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN.STATE = [
        ...DEFAULT_MODAL_DROPDOWN_OPTIONS,
        ...statusDropdownOptions
      ];
      state.VALUE_MAPPING_OPTIONS_MODAL_DROPDOWN.TESTCASETYPE = [
        ...DEFAULT_MODAL_DROPDOWN_OPTIONS,
        ...testCaseTypeDropdownOptions
      ];
      state.priorityIntNameAndValueMapCSV = payload?.priority.reduce(
        (obj, item) => ({ ...obj, [item.value]: item.internal_name }),
        {}
      );
      state.priorityNameAndValueMapCSV = payload?.priority.reduce(
        (obj, item) => ({ ...obj, [item.value]: item.name }),
        {}
      );
    },
    uploadFilePending: (state) => {
      state.uploadFileProceedLoading = true;
    },
    uploadFileFulfilled: (state, { payload }) => {
      state.fieldsMapping = {};
      state.valueMappings = {};
      state.fieldsMappingData = payload;
      state.mapFieldsConfig.importId = payload.import_id;
      state.mapFieldsConfig.customFields = payload.fields_available?.custom;
      state.mapFieldsConfig.defaultFields = payload.fields_available?.default;
      state.mapFieldsConfig.importFields = payload.import_fields;
      state.uploadFileProceedLoading = false;
      // eslint-disable-next-line no-restricted-syntax

      state.valueMappings = calcValueMappings(
        payload.value_mappings,
        payload.import_fields,
        payload?.field_mappings,
        payload.fields_available?.default
      );
      state.fieldsMapping = { ...state.valueMappings };
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(payload?.field_mappings)) {
        state.fieldsMapping[key] = value;
      }
      state.showMappings = true;
      // removing all errors from 1st and 2nd screen
      state.csvUploadError = '';
      state.mappingFieldsError = '';
      state.showSelectMenuErrorInMapFields = false;
      state.errorLabelInMapFields = new Set();
    },
    uploadFileRejected: (state, { payload }) => {
      state.csvUploadError = payload.response.data.message;
      state.uploadFileProceedLoading = false;
    },
    startImportingTestCaseFulfilled: (state, { payload }) => {
      // if (payload.success) {
      state.confirmCSVImportNotificationConfig.show = false;
      state.confirmCSVImportNotificationConfig.status = 'success';
      state.confirmCSVImportNotificationConfig.progress = 100;
      state.confirmCSVImportNotificationConfig.csvImportProjectId =
        payload.project_id;
      state.confirmCSVImportNotificationConfig.csvImportFolderId =
        payload.folder_id;
      // }
    },
    startImportingTestCaseRejected: (state, { payload }) => {
      if (payload.response.status === 499) {
        // failure
        state.confirmCSVImportNotificationConfig.show = false;
        state.confirmCSVImportNotificationConfig.status = '';
        state.confirmCSVImportNotificationConfig.modalData = null;
        state.confirmCSVImportNotificationConfig.progress = 0;
      } else {
        // retry importing?
        state.confirmCSVImportNotificationConfig.show = true;
        state.confirmCSVImportNotificationConfig.status = 'failed';
        state.confirmCSVImportNotificationConfig.modalData =
          FAILED_IMPORT_MODAL_DATA;
        state.confirmCSVImportNotificationConfig.progress = 0;
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
      state.previewData = payload.test_cases;
      state.mapFieldsProceedLoading = false;
      state.showSelectMenuErrorInMapFields = false;
      state.errorLabelInMapFields = new Set();
    },
    submitMappingDataRejected: (state, { payload }) => {
      state.mappingFieldsError = payload.response.data.message;
      state.mapFieldsProceedLoading = false;
      state.showSelectMenuErrorInMapFields = true;
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
    },
    importCSVCleanUp: (state, { payload }) => {
      const {
        totalImportedProjectsInPreview,
        confirmCSVImportNotificationConfig,
        ...restInitialState
      } = initialState;

      return {
        totalImportedProjectsInPreview: payload?.totalImportedProjectsInPreview,
        confirmCSVImportNotificationConfig:
          payload?.confirmCSVImportNotificationConfig,
        ...restInitialState
      };
    },
    clearNotificationConfig: (state) => {
      state.confirmCSVImportNotificationConfig =
        initialState.confirmCSVImportNotificationConfig;
    },
    setShowMappings: (state, { payload }) => {
      state.showMappings = payload;
    },
    setSingleFieldValueMapping: (state, { payload }) => {
      state.currentFieldValueMapping = payload;
    },
    updateSingleFieldValueMapping: (state, { payload }) => {
      state.currentFieldValueMapping[payload.key] = payload.value;
    },
    setShowChangeFolderModal: (state, { payload }) => {
      state.showChangeFolderModal = payload;
    },
    setFoldersForCSV: (state, { payload }) => {
      state.foldersForCSV = payload;
    },
    updateImportProgress: (state, { payload }) => {
      state.confirmCSVImportNotificationConfig.progress = payload;
    },
    setFirstButtonLoading: (state, { payload }) => {
      state.confirmCSVImportNotificationConfig.modalData.isButtonLoading =
        payload;
    }
  }
});

export const {
  setCSVCurrentScreen,
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
  importCSVCleanUp,
  setErrorLabelInMapFields,
  setShowSelectMenuErrorInMapFields,
  setCSVConfigurationsFulfilled,
  startImportingTestCasePending,
  startImportingTestCaseFulfilled,
  startImportingTestCaseRejected,
  setValueMappingThunkFulfilled,
  submitMappingDataPending,
  submitMappingDataFulfilled,
  submitMappingDataRejected,
  setShowMappings,
  setSingleFieldValueMapping,
  updateSingleFieldValueMapping,
  setNotificationConfigForConfirmCSVImport,
  setShowChangeFolderModal,
  setFoldersForCSV,
  updateImportProgress,
  clearNotificationConfig,
  setFirstButtonLoading
} = importCSVSlice.actions;
export default importCSVSlice.reducer;
