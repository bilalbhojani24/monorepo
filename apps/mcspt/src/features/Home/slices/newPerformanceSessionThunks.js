import {
  fetchDeviceApplications,
  fetchDevices,
  startSession
} from 'api/newPerformanceSession';
import { getPreviousUserSessions } from 'features/TestHistory';
import { mcpAnalyticsEvent } from 'utils/analyticsUtils';

import {
  setAreApplicationsStillLoading,
  setAreDevicesStillLoading,
  setErrorOnApplicationFetch,
  setIsSessionApiLoading
} from './loadingStateForNewPerformanceSession';
import {
  getSelectedDevice,
  setListOfApplications,
  setListOfDevices,
  setSelectedApplication,
  setSelectedDevice,
  setSessionDetails,
  setStartTestError
} from './newPerformanceSessionSlice';

export const fetchApplicationsFromSelectedDevice =
  () => async (dispatch, getState) => {
    try {
      const selectedDevice = getSelectedDevice(getState());

      dispatch(setAreApplicationsStillLoading(true));

      const response = await fetchDeviceApplications(
        selectedDevice?.os,
        selectedDevice?.deviceId
      );

      dispatch(setListOfApplications(response?.apps));

      if (response?.apps?.length > 0) {
        const previousUserSessions = getPreviousUserSessions(getState());

        const lastSessionSelectedAppId =
          previousUserSessions?.[0]?.package?.bundleId;

        const lastSessionDevice =
          response.apps.find(
            (app) => app.packageName === lastSessionSelectedAppId
          ) || response.apps[0];

        dispatch(setSelectedApplication(lastSessionDevice));
      }
    } catch (error) {
      if (error?.response?.status !== 460) {
        throw error;
      } else {
        dispatch(setErrorOnApplicationFetch(error?.response?.data?.status));
      }
    } finally {
      dispatch(setAreApplicationsStillLoading(false));
    }
  };

export const fetchConnectedDevices = () => async (dispatch, getState) => {
  try {
    dispatch(setAreDevicesStillLoading(true));

    const allDeviceResponses = await Promise.allSettled([
      fetchDevices('android'),
      fetchDevices('ios')
    ]);

    const resultSet = allDeviceResponses
      .filter((apiRes) => apiRes.status === 'fulfilled')
      .map((promiseWrapper) => promiseWrapper?.value)
      .flat();

    if (resultSet.length > 0) {
      const previousUserSessions = getPreviousUserSessions(getState());

      const lastSessionSelectedDeviceId =
        previousUserSessions?.[0]?.device?.deviceId;

      const lastSessionDevice =
        resultSet.find(
          (device) => device.deviceId === lastSessionSelectedDeviceId
        ) || resultSet[0];

      dispatch(setSelectedDevice(lastSessionDevice));
    } else {
      mcpAnalyticsEvent('csptNoDeviceConnected');
    }

    dispatch(setListOfDevices(resultSet));
  } catch (error) {
    if (error?.response?.status !== 460) {
      throw error;
    }
  } finally {
    dispatch(setAreDevicesStillLoading(false));
  }
};

export const triggerSession =
  (navigatorCallback, sessionName) => async (dispatch, getState) => {
    try {
      dispatch(setIsSessionApiLoading(true));

      dispatch(setStartTestError(null));

      dispatch(setSessionDetails({ sessionName }));

      const selectedDevice = getState()?.newPerformanceSession?.selectedDevice;
      const selectedApplication =
        getState()?.newPerformanceSession?.selectedApplication;

      const response = await startSession({
        appID: selectedApplication.packageName,
        deviceID: selectedDevice.deviceId,
        sessionName
      });

      dispatch(setSessionDetails(response));

      navigatorCallback('/generate');
    } catch (error) {
      if (error?.response?.status === 466) {
        dispatch(setStartTestError(error?.response?.data));
      } else {
        dispatch(setStartTestError({ type: 'UNHANDLED_BY_BE' }));
      }
    } finally {
      dispatch(setIsSessionApiLoading(false));
    }
  };
