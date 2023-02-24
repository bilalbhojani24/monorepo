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
    try {
      const response = await postMappingData({
        importId,
        payload: {
          project_id: projectId,
          folder_id: folderId,
          field_mappings: myFieldMappings,
          value_mappings: valueMappings
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
