import {
  fetchDeviceApplications,
  fetchDevices,
  startSession
} from 'api/newPerformanceSession';

import {
  setAreApplicationsStillLoading,
  setAreDevicesStillLoading,
  setIsSessionApiLoading
} from './loadingStateForNewPerformanceSession';
import {
  setListOfApplications,
  setListOfDevices,
  setSelectedApplication,
  setSelectedDevice,
  setSessionDetails
} from './newPerformanceSessionSlice';

export const fetchApplicationsFromSelectedDevice =
  () => async (dispatch, getState) => {
    try {
      const selectedDevice = getState()?.newPerformanceSession?.selectedDevice;

      dispatch(setAreApplicationsStillLoading(true));

      const response = await fetchDeviceApplications(
        selectedDevice?.os,
        selectedDevice?.deviceId
      );

      dispatch(setListOfApplications(response?.apps));

      if (response?.apps?.length > 0) {
        dispatch(setSelectedApplication(response?.apps[0]));
      }
    } catch (error) {
      if (error?.response?.status !== 461) {
        throw error;
      }
    } finally {
      dispatch(setAreApplicationsStillLoading(false));
    }
  };

export const fetchConnectedDevices = () => async (dispatch) => {
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
      dispatch(setSelectedDevice(resultSet[0]));
    }

    dispatch(setListOfDevices(resultSet));
    dispatch(fetchApplicationsFromSelectedDevice());
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
      if (error?.response?.status !== 461) {
        throw error;
      }
    } finally {
      dispatch(setIsSessionApiLoading(false));
    }
  };
