import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getIsUserLoggedIn,
  getTotalAllowedSessions,
  getTotalCompletedSessions
} from 'features/Dashboard/slices/dashboardSlice';

import {
  getAreApplicationsStillLoading,
  getAreDevicesStillLoading,
  getErrorOnApplicationFetch,
  getIsSessionApiLoading
} from '../slices/loadingStateForNewPerformanceSession';
import {
  getListOfApplications,
  getListOfDevices,
  getSelectedApplication,
  getSelectedDevice,
  setSelectedApplication,
  setSelectedDevice
} from '../slices/newPerformanceSessionSlice';
import {
  fetchApplicationsFromSelectedDevice,
  fetchConnectedDevices,
  triggerSession
} from '../slices/newPerformanceSessionThunks';
import {
  generateAppOptions,
  generateDeviceOptions,
  getDefaultAutoGenerateName,
  INCOMPATIBLE_DEVICE_MSG
} from '../utils/dependencyUtils';

const useDependencyChecker = () => {
  const areDevicesStillLoading = useSelector(getAreDevicesStillLoading);
  const areApplicationsStillLoading = useSelector(
    getAreApplicationsStillLoading
  );

  const isSessionApiLoading = useSelector(getIsSessionApiLoading);

  const listOfDevices = useSelector(getListOfDevices);
  const selectedDevice = useSelector(getSelectedDevice);
  const lisOfApplications = useSelector(getListOfApplications);
  const selectedApplication = useSelector(getSelectedApplication);
  const errorOnApplicationFetch = useSelector(getErrorOnApplicationFetch);
  const totalAllowedSessions = useSelector(getTotalAllowedSessions);
  const totalCompletedSessions = useSelector(getTotalCompletedSessions);
  const isUserLoggedIn = useSelector(getIsUserLoggedIn);

  const [deviceOptionList, setDeviceOptionList] = useState([]);
  const [applicationOptionList, setApplicationOptionList] = useState([]);

  const [deviceSelectionError, setDeviceSelectionError] = useState('');

  const dispatch = useDispatch();

  const navigateToPath = useNavigate();

  const deviceSelected = (selection) => {
    const ogDeviceObj = listOfDevices.find(
      (device) => selection?.value === device?.deviceId
    );

    if (!ogDeviceObj?.compatible) {
      setDeviceSelectionError(INCOMPATIBLE_DEVICE_MSG);
    } else {
      setDeviceSelectionError('');

      dispatch(setSelectedDevice(ogDeviceObj));
    }
  };

  const applicationSelected = (selection) => {
    const ogAppObj = lisOfApplications.find(
      (app) => app?.packageName === selection?.value
    );

    dispatch(setSelectedApplication(ogAppObj));
  };

  const startTestSession = () => {
    dispatch(
      triggerSession(
        navigateToPath,
        getDefaultAutoGenerateName(selectedDevice, selectedApplication)
      )
    );
  };

  const refetchDevices = useCallback(() => {
    dispatch(fetchConnectedDevices());
  }, [dispatch]);

  useEffect(() => {
    setDeviceOptionList(generateDeviceOptions(listOfDevices));
  }, [listOfDevices]);

  useEffect(() => {
    if (lisOfApplications) {
      setApplicationOptionList(generateAppOptions(lisOfApplications));
    }
  }, [lisOfApplications]);

  useEffect(() => {
    if (selectedDevice.deviceId) {
      dispatch(fetchApplicationsFromSelectedDevice());
    }
  }, [dispatch, selectedDevice.deviceId]);

  useEffect(() => {
    refetchDevices();
  }, [refetchDevices]);

  return {
    areDevicesStillLoading,
    areApplicationsStillLoading,
    errorOnApplicationFetch,
    deviceSelected,
    applicationSelected,
    deviceOptionList,
    applicationOptionList,
    selectedDevice,
    selectedApplication,
    startTestSession,
    isSessionApiLoading,
    refetchDevices,
    deviceSelectionError,
    disableTestTrigger:
      !isUserLoggedIn && totalAllowedSessions === totalCompletedSessions
  };
};

export default useDependencyChecker;
