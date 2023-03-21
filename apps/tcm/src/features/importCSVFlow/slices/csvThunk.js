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
  importCSVCleanUp,
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
    // if (typeof valueMappings[key] === 'object' && !valueMappings[key].action)
    //   return { ...obj, [key]: removeIgnoredValues(valueMappings[key]) }; // [NOTE: no need of doing this recursively as this is handled on BE]

    if (valueMappings[key]?.action === 'ignore') {
      return { ...obj };
    }
    return { ...obj, [key]: valueMappings[key] };
  }, {});

const removeAddValues = (valueMappings) =>
  Object.keys(valueMappings).reduce((obj, key) => {
    if (valueMappings[key]?.action === 'add') {
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
  const { mapper } = payload;
  dispatch(
    setFieldsMapping({
      key: payload.key,
      value: payload.value
    })
  );
  const { fieldsMapping } = getState().importCSV;
  const allKeysInFieldsMapping = Object.keys(fieldsMapping);
  const valueCountMap = new Map();
  const duplicateLabels = new Set();
  let duplicateValuesFound = false;
  for (let i = 0; i < allKeysInFieldsMapping.length; i += 1) {
    const value = fieldsMapping[allKeysInFieldsMapping[i]];
    if (valueCountMap.get(value) === undefined) {
      valueCountMap.set(value, 1);
    } else valueCountMap.set(value, valueCountMap.get(value) + 1);
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of valueCountMap.entries()) {
    if (value > 1) {
      duplicateLabels.add(mapper[key]);
      duplicateValuesFound = true;
    }
  }

  if (duplicateValuesFound) {
    dispatch(setErrorLabelInMapFields(duplicateLabels));
  }
  if (!duplicateValuesFound) {
    dispatch(setMapFieldsError(''));
    dispatch(setErrorLabelInMapFields(new Set()));
    dispatch(setShowSelectMenuErrorInMapFields(false));
  }
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
    const filteredFieldMappings = removeIgnoredValues(myFieldMappings);
    const filteredValueMappings = removeIgnoredValues(valueMappings);
    const overFilteredValueMappings = removeAddValues(filteredValueMappings); // remove Add Values.

    try {
      const response = await postMappingData({
        importId,
        payload: {
          project_id: projectId,
          folder_id: folderId,
          field_mappings: filteredFieldMappings,
          value_mappings: overFilteredValueMappings
        }
      });
      dispatch(submitMappingDataFulfilled(response));
    } catch (err) {
      dispatch(submitMappingDataRejected(err));
    }
  };

export const setTags = (projectId) => async (dispatch) => {
  try {
    let response;
    if (projectId && projectId !== 'new')
      response = await getSystemTags(projectId);
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
    let response;
    if (projectId && projectId !== 'new') response = await getUsers(projectId);
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
    const payload = {};
    if (projectId && projectId !== 'new') payload.project_id = projectId;
    if (folderId) payload.folder_id = folderId;
    try {
      const response = await startCSVImport({
        importId,
        retryImport,
        payload
      });

      dispatch(startImportingTestCaseFulfilled(response));
    } catch (err) {
      dispatch(startImportingTestCaseRejected(err));
    }
  };

export const resetImportCSVState = () => (dispatch, getState) => {
  const { totalImportedProjectsInPreview, confirmCSVImportNotificationConfig } =
    getState().importCSV;

  dispatch(
    importCSVCleanUp({
      totalImportedProjectsInPreview,
      confirmCSVImportNotificationConfig
    })
  );
};
