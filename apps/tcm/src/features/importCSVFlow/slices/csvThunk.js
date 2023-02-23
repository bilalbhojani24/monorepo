import {
  getSystemTags,
  getUsers,
  startCSVImport
} from '../../../api/importCSV.api';
import { DEFAULT_MODAL_DROPDOWN_OPTIONS } from '../const/importCSVConstants';

import {
  setSystemTags,
  setSystemUsers,
  startImportingTestCaseFulfilled,
  startImportingTestCasePending,
  startImportingTestCaseRejected
} from './importCSVSlice';

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
