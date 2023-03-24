import {
  fetchDeviceApplications,
  fetchDevices,
  startSession
} from 'api/newPerformanceSession';

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
        dispatch(setSelectedApplication(response?.apps[0]));
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

export const fetchConnectedDevices = () => async (dispatch) => {
  try {
    dispatch(setAreDevicesStillLoading(true));

    // with this, it will refetch applications as well at the time of refresh.
    dispatch(setSelectedDevice({}));

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
