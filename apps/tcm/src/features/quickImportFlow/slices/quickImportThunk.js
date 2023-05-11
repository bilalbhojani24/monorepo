import { checkTestManagementConnection } from '../../../api/import.api';
import { SCREEN_2 } from '../const/importSteps';

import {
  quickImportCleanUp,
  setConfigureToolProceedLoading,
  setConfigureToolTestConnectionLoading,
  setCurrentScreen,
  setProceedFailed,
  setProceedFulfilled,
  setShowArtificialLoader,
  setTestConnectionFailed,
  setTestConnectionFulfilled,
  setTestRailsCred,
  setZephyrCred
} from './importSlice';

const getCurrentUsedTool = (state) => state.import.currentTestManagementTool;
const getTestRailsCred = (state) => state.import.testRailsCred;
const getZephyrCred = (state) => state.import.zephyrCred;

export const handleArtificialLoader = (delay) => (dispatch) => {
  dispatch(setShowArtificialLoader(true));
  setTimeout(() => {
    dispatch(setShowArtificialLoader(false));
  }, delay);
};

const apiTestConnection = async (tool, creds, dispatch, isFromProceed) => {
  if (isFromProceed) dispatch(setConfigureToolProceedLoading(true));
  else dispatch(setConfigureToolTestConnectionLoading(true));

  try {
    const response = await checkTestManagementConnection(tool, creds);
    if (isFromProceed) {
      dispatch(setProceedFulfilled(response));
      dispatch(handleArtificialLoader(2000));
      dispatch(setCurrentScreen(SCREEN_2));
    } else dispatch(setTestConnectionFulfilled());
  } catch (err) {
    if (isFromProceed) dispatch(setProceedFailed());
    dispatch(setTestConnectionFailed());
  }
};

const trimSpaces = (tool, creds, dispatch) => {
  Object.entries(creds).forEach(([key, value]) => {
    if (tool === 'zephyr')
      dispatch(setZephyrCred({ key, value: value?.trim() }));
    else dispatch(setTestRailsCred({ key, value: value?.trim() }));
  });
};

const connectionPossible = (creds) => {
  const valuesArray = Object.values(creds);
  for (let i = 0; i < valuesArray.length; i += 1) {
    if (!valuesArray[i].trim()) return false;
  }

  return true;
};

export const requestTestConnection =
  (isFromProceed = false) =>
  (dispatch, getState) => {
    const state = getState();
    const currentUsedTool = getCurrentUsedTool(state);
    const testRailsCred = getTestRailsCred(state);
    const zephyrCred = getZephyrCred(state);

    const creds = currentUsedTool === 'zephyr' ? zephyrCred : testRailsCred;
    if (connectionPossible(creds)) {
      trimSpaces(currentUsedTool, creds, dispatch);
      apiTestConnection(currentUsedTool, creds, dispatch, isFromProceed);
    } else {
      trimSpaces(currentUsedTool, creds, dispatch);
    }
  };

export const resetQuickImport = () => (dispatch, getState) => {
  // reset everything except related to notification and modal
  const {
    importId,
    importStatus,
    isDismissed,
    importStarted,
    notificationData,
    notificationProjectConfig,
    showNotificationModal,
    checkImportStatusClicked,
    quickImportProjectId,
    currentTestManagementTool
  } = getState().import;

  dispatch(
    quickImportCleanUp({
      importId,
      importStatus,
      isDismissed,
      importStarted,
      notificationData,
      notificationProjectConfig,
      showNotificationModal,
      checkImportStatusClicked,
      quickImportProjectId,
      currentTestManagementTool
    })
  );
};
