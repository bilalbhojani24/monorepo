import { getQuickImportResultAPI } from 'api/import.api';
import AppRoute from 'const/routes';
import { addProject } from 'features/Projects/slices/projectSlice';
import { addGlobalProject } from 'globalSlice';

import { IMPORT_STATUS, IS_CANCELLED } from '../const/immutables';

import {
  getQuickImportResultFulfilled,
  setImportDetails,
  setImportStatus,
  setNotificationConfig,
  setViewReportLoading,
  showAlertLoader
} from './importProgressSlice';

const DELAY = 500;
const getImportId = (state) => state.import.importId;
const getIsNotificationDismissed = (state) =>
  state.importProgress.isNotificationDismissed;

export const setQuickImportResult = () => async (dispatch, getState) => {
  const state = getState();
  const id = getImportId(state);

  dispatch(setViewReportLoading(true));
  try {
    const response = await getQuickImportResultAPI(id);
    dispatch(getQuickImportResultFulfilled(response));
  } catch (err) {
    dispatch(setViewReportLoading(false));
  }
};

export const setActualImportStatus = (data) => (dispatch) => {
  if (data?.status === IMPORT_STATUS.ONGOING)
    dispatch(setImportStatus(IMPORT_STATUS.ONGOING));
  if (data?.status === IMPORT_STATUS.COMPLETED) {
    if (data?.projects_done === data?.projects)
      dispatch(setImportStatus(IMPORT_STATUS.SUCCESS));
    else if (data?.projects_failed > 0)
      dispatch(setImportStatus(IMPORT_STATUS.FAILURE));
  }
};

const alertArtificialLoader = (dispatch) => {
  dispatch(showAlertLoader(true));
  setTimeout(() => {
    dispatch(showAlertLoader(false));
  }, DELAY);
};

export const parseImportDetails =
  (data, location, onRefresh = false, fromCancel = false) =>
  // eslint-disable-next-line sonarjs/cognitive-complexity
  (dispatch, getState) => {
    const state = getState();
    const isNotificationDismissed = getIsNotificationDismissed(state);

    if (localStorage.getItem(IS_CANCELLED) && !onRefresh) return;

    if (fromCancel) localStorage.setItem(IS_CANCELLED, '1');
    if (data?.project) {
      dispatch(addProject(data?.project));
      dispatch(
        addGlobalProject({
          id: data?.project.id,
          identifier: data?.project.identifier,
          import_id: data?.project.import_id,
          name: data?.project.name
        })
      );
    }
    if (data?.status === IMPORT_STATUS.COMPLETED)
      dispatch(setImportDetails({ ...data, percent: 100 }));
    else dispatch(setImportDetails(data));

    if (data?.percent === 100) {
      setTimeout(() => {
        if (!onRefresh) alertArtificialLoader(dispatch);

        if (data?.projects_done === data?.projects)
          dispatch(setImportStatus(IMPORT_STATUS.SUCCESS));
        else dispatch(setImportStatus(IMPORT_STATUS.FAILURE));

        if (
          location.pathname !== AppRoute.ROOT &&
          !isNotificationDismissed &&
          !fromCancel &&
          !onRefresh
        ) {
          dispatch(setNotificationConfig({ show: true }));
        }
      }, DELAY); // REASON: when progress becomes 100% if we instantly show the alert then we do not get the right projects count.
    }
  };
