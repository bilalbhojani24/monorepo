import {
  getCSVConfigurations,
  getFieldMapping,
  getSystemTags,
  getUsers,
  postCSV,
  postMappingData,
  startCSVImport
} from '../../../api/importCSV.api';
import { DEFAULT_MODAL_DROPDOWN_OPTIONS } from '../const/importCSVConstants';

import {
  setCSVConfigurationsFulfilled,
  setErrorLabelInMapFields,
  setFieldsMapping,
  setMapFieldsError,
  setShowSelectMenuErrorInMapFields,
  setSystemTags,
  setSystemUsers,
  setValueMappingThunkFulfilled,
  startImportingTestCaseFulfilled,
  startImportingTestCasePending,
  startImportingTestCaseRejected,
  submitMappingDataFulfilled,
  submitMappingDataPending,
  submitMappingDataRejected,
  uploadFileFulfilled,
  uploadFilePending,
  uploadFileRejected
} from './importCSVSlice';

const removeIgnoredValues = (valueMappings) =>
  Object.keys(valueMappings).reduce((obj, key) => {
    if (typeof valueMappings[key] === 'object' && !valueMappings[key].action)
      return { ...obj, [key]: removeIgnoredValues(valueMappings[key]) };

    if (valueMappings[key]?.action === 'ignore') {
      return { ...obj };
    }
    return { ...obj, [key]: valueMappings[key] };
  }, {});

export const setCSVConfigurations = () => async (dispatch) => {
  try {
    const response = await getCSVConfigurations();
    dispatch(setCSVConfigurationsFulfilled(response));
  } catch (err) {
    // dispatch(setCSVConfigurationsRejected(err));
  }
};

export const uploadFile = (payload) => async (dispatch) => {
  dispatch(uploadFilePending());
  try {
    const response = await postCSV(payload);
    dispatch(uploadFileFulfilled(response));
  } catch (err) {
    dispatch(uploadFileRejected(err));
  }
};

export const setFieldsMappingThunk = (payload) => (dispatch, getState) => {
  const { fieldsMapping } = getState().importCSV;
  const allKeysInFieldsMapping = Object.keys(fieldsMapping);
  let duplicateValuesFound = false;
  for (let i = 0; i < allKeysInFieldsMapping.length; i += 1) {
    if (
      // this is to handle the click on selected item.
      allKeysInFieldsMapping[i] === payload.key &&
      fieldsMapping[allKeysInFieldsMapping[i]] === payload.value
    )
      break;

    if (payload.value === fieldsMapping[allKeysInFieldsMapping[i]]) {
      duplicateValuesFound = true;
      dispatch(setErrorLabelInMapFields(payload.label));
    }
  }

  if (!duplicateValuesFound) {
    dispatch(setMapFieldsError(''));
    dispatch(setErrorLabelInMapFields(''));
    dispatch(setShowSelectMenuErrorInMapFields(false));
  }
  dispatch(
    setFieldsMapping({
      key: payload.key,
      value: payload.value
    })
  );
};

export const setValueMappingsThunk =
  ({ importId, field, projectId, mapped_field }) =>
  async (dispatch) => {
    try {
      const response = await getFieldMapping({
        importId,
        field,
        projectId,
        mapped_field
      });
      dispatch(setValueMappingThunkFulfilled({ field, ...response }));
    } catch (err) {
      //   dispatch(setValueMappingsThunkRejected(err));
    }
  };

export const submitMappingData =
  ({ importId, projectId, folderId, myFieldMappings, valueMappings }) =>
  async (dispatch) => {
    dispatch(submitMappingDataPending());
    const filteredValueMappings = removeIgnoredValues(valueMappings);

    try {
      const response = await postMappingData({
        importId,
        payload: {
          project_id: projectId,
          folder_id: folderId,
          field_mappings: myFieldMappings,
          value_mappings: filteredValueMappings
        }
      });
      dispatch(submitMappingDataFulfilled(response));
    } catch (err) {
      dispatch(submitMappingDataRejected(err));
    }
  };

export const setTags = (projectId) => async (dispatch) => {
  try {
    const response = await getSystemTags(projectId);
    const options = response.tags.map((item) => ({
      label: item,
      value: item
    }));
    const allOptions = [...DEFAULT_MODAL_DROPDOWN_OPTIONS, ...options];
    dispatch(setSystemTags(allOptions));
  } catch (err) {
    dispatch(setSystemTags(DEFAULT_MODAL_DROPDOWN_OPTIONS));
  }
};

export const setUsers = (projectId) => async (dispatch) => {
  try {
    const response = await getUsers(projectId);
    const options = response.users.map((item) => ({
      label: item.full_name,
      value: item.full_name
    }));
    const allOptions = [...DEFAULT_MODAL_DROPDOWN_OPTIONS, ...options];
    dispatch(setSystemUsers(allOptions));
  } catch (err) {
    dispatch(setSystemUsers(DEFAULT_MODAL_DROPDOWN_OPTIONS));
  }
};

export const startImportingTestCases =
  ({ importId, projectId, folderId, retryImport }) =>
  async (dispatch) => {
    dispatch(startImportingTestCasePending());
    try {
      const response = await startCSVImport({
        importId,
        retryImport,
        payload: { project_id: projectId, folder_id: folderId }
      });
      dispatch(startImportingTestCaseFulfilled(response));
    } catch (err) {
      dispatch(startImportingTestCaseRejected(err));
    }
  };
