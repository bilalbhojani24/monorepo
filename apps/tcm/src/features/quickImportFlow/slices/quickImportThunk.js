import {
  checkTestManagementConnection,
  importProjects,
  retryImport
} from 'api/import.api';
import AppRoute from 'const/routes';
import { setImportDetails } from '../../ImportProgress/slices/importProgressSlice';

import { SCREEN_2, TESTRAIL, ZEPHYR } from '../const/importSteps';

import {
  quickImportCleanUp,
  retryQuickImportFulfilled,
  setBeginImportLoading,
  setConfigureToolProceedLoading,
  setConfigureToolTestConnectionLoading,
  setCurrentScreen,
  setImportId,
  setImportStarted,
  setProceedFailed,
  setProceedFulfilled,
  setShowArtificialLoader,
  setTestConnectionFailed,
  setTestConnectionFulfilled,
  setTestRailsCred,
  setZephyrCred
} from './importSlice';

const getImportIdBeforeImport = (state) => state.import.importIdBeforeImport;
const getProjects = (state) => state.import.projectsForTestManagementImport;
const getCurrentUsedTool = (state) => state.import.currentTestManagementTool;
const getTestRailsCred = (state) => state.import.testRailsCred;
const getZephyrCred = (state) => state.import.zephyrCred;
const getImportId = (state) => state.import.importId;
const getQuickImportProjectId = (state) => state.import.quickImportProjectId;

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

const getFirstProjectNameAndTotalCount = (projects) => {
  const obj = { firstName: null, totalCount: 0 };
  projects.forEach((item, idx) => {
    if (!obj.firstName && item.checked) {
      obj.firstName = item?.name;
      obj.totalCount += 1;
    } else if (item.checked) obj.totalCount += 1;
  });
  return obj;
};

export const startImport = (navigate) => async (dispatch, getState) => {
  const state = getState();
  const tool = getCurrentUsedTool(state);
  const testRailsCred = getTestRailsCred(state);
  const zephyrCred = getZephyrCred(state);
  const importIdBeforeImport = getImportIdBeforeImport(state);
  const projects = getProjects(state);

  const { firstName, totalCount } = getFirstProjectNameAndTotalCount(projects);

  const creds = tool === ZEPHYR ? zephyrCred : testRailsCred;
  dispatch(setImportId(importIdBeforeImport));
  dispatch(setBeginImportLoading(true));
  try {
    await importProjects(tool, {
      ...creds,
      import_id: importIdBeforeImport,
      [`${tool === TESTRAIL ? 'testrail_p' : 'p'}rojects`]: projects
        .map((project) => (project.checked ? project : null))
        .filter((project) => project !== null)
    });
    dispatch(
      setImportDetails({ current_project: firstName, projects: totalCount })
    );
    dispatch(setImportStarted(true));
    dispatch(setBeginImportLoading(false));
    navigate(AppRoute.ROOT);
  } catch (err) {
    dispatch(setBeginImportLoading(false));
  }
};

export const retryQuickImport =
  (jusFetchCreds, navigate) => async (dispatch, getState) => {
    const state = getState();
    const id = getImportId(state);
    const testTool = getCurrentUsedTool(state);
    const quickImportProjectId = getQuickImportProjectId(state);

    try {
      const response = await retryImport(id, testTool);
      dispatch(
        retryQuickImportFulfilled({
          justFetchCreds: jusFetchCreds,
          ...response
        })
      );
      if (!jusFetchCreds) {
        if (quickImportProjectId)
          navigate(`/projects/${quickImportProjectId}/quick-import`);
        else navigate(AppRoute.IMPORT);
      }
    } catch (err) {
      // return err;
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
