import { getQuickImportResult } from 'api/import.api';
import AppRoute from 'const/routes';

import { addProject } from '../../Projects/slices/projectSlice';
import { IMPORT_STATUS } from '../const/immutables';

import {
  getQuickImportResultFulfilled,
  setImportDetails,
  setImportStatus,
  setNotificationConfig,
  // setShowNotification,
  showAlertLoader
} from './importProgressSlice';

const getImportId = (state) => state.import.importId;
const getIsNotificationDismissed = (state) =>
  state.importProgress.isNotificationDismissed;
// const getImportProgress = (state) => state.importProgress.importDetails.percent;

export const setQuickImportResult = () => async (dispatch, getState) => {
  const state = getState();
  const id = getImportId(state);

  try {
    const response = await getQuickImportResult(id);
    dispatch(getQuickImportResultFulfilled(response));
  } catch (err) {
    // something on error
  }
};

export const setActualImportStatus = (data) => (dispatch) => {
  if (data?.status === IMPORT_STATUS.ONGOING)
    dispatch(setImportStatus(IMPORT_STATUS.ONGOING));
  if (data?.status === IMPORT_STATUS.COMPLETED) {
    if (data?.projects_failed > 0)
      dispatch(setImportStatus(IMPORT_STATUS.FAILURE));
    else if (data?.projects_done === data?.projects)
      dispatch(setImportStatus(IMPORT_STATUS.SUCCESS));
  }
};

const alertArtificialLoader = (dispatch) => {
  dispatch(showAlertLoader(true));
  setTimeout(() => {
    dispatch(showAlertLoader(false));
  }, 500);
};

export const parseImportDetails =
  (data, location, onRefresh = false) =>
  (dispatch, getState) => {
    const state = getState();
    const isNotificationDismissed = getIsNotificationDismissed(state);
    // const importProgress = getImportProgress(state);

    if (data?.project) dispatch(addProject(data?.project));
    if (data?.status === IMPORT_STATUS.COMPLETED)
      dispatch(setImportDetails({ ...data, percent: 100 }));
    else dispatch(setImportDetails(data));

    if (data?.percent === 100) {
      setTimeout(() => {
        if (!onRefresh) alertArtificialLoader(dispatch);

        if (data?.projects_failed > 0)
          dispatch(setImportStatus(IMPORT_STATUS.FAILURE));
        if (data?.projects_done === data?.projects)
          dispatch(setImportStatus(IMPORT_STATUS.SUCCESS));

        if (location.pathname !== AppRoute.ROOT && !isNotificationDismissed)
          dispatch(setNotificationConfig({ show: true }));
      }, 500); // REASON: when progress becomes 100% if we instantly show the alert then we do not get the right projects count.
    }
  };
