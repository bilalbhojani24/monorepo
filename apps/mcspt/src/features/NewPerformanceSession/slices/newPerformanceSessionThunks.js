import {
  getDeviceApplications,
  getDevices,
  startSession
} from '../../../api/newPerformanceSession';

import {
  setAreApplicationsStillLoading,
  setAreDevicesStillLoading,
  setIsSessionApiLoading
} from './loadingStateForNewPerformanceSession';
import {
  setListOfApplications,
  setListOfDevices,
  setSessionDetails
} from './newPerformanceSessionSlice';

export const fetchConnectedDevices = () => async (dispatch) => {
  let resultSet = [];

  try {
    dispatch(setAreDevicesStillLoading(true));

    const responseAndroid = await getDevices('android');

    resultSet = resultSet.concat(responseAndroid);

    const responseIos = await getDevices('ios');

    resultSet = resultSet.concat(responseIos);
  } catch (error) {
    if (error?.response?.status !== 460) {
      throw error;
    }
  } finally {
    dispatch(setListOfDevices(resultSet));
    dispatch(setAreDevicesStillLoading(false));
  }
};

export const fetchApplicationsFromSelectedDevice =
  () => async (dispatch, getState) => {
    try {
      const selectedDevice = getState()?.newPerformanceSession?.selectedDevice;

      dispatch(setAreApplicationsStillLoading(true));

      const response = await getDeviceApplications(
        selectedDevice?.os,
        selectedDevice?.deviceId
      );

      dispatch(setListOfApplications(response?.apps));
    } catch (error) {
      if (error?.response?.status !== 461) {
        throw error;
      }
    } finally {
      dispatch(setAreApplicationsStillLoading(false));
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
        deviceID: selectedDevice.deviceId
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
