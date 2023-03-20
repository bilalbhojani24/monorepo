import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
  fetchConnectedDevices,
  triggerSession
} from '../slices/newPerformanceSessionThunks';

const getDefaultAutoGenerateName = (selectedDevice, selectedApp) =>
  `${selectedApp?.name} v${selectedApp?.version} on ${selectedDevice?.model} ${selectedDevice?.os} ${selectedDevice?.osVersion}`;

const useDependencyChecker = (generateDeviceOptions, generateAppOptions) => {
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

  const [deviceOptionList, setDeviceOptionList] = useState([]);
  const [applicationOptionList, setApplicationOptionList] = useState([]);

  const dispatch = useDispatch();

  const navigateToPath = useNavigate();

  const deviceSelected = (selection) => {
    const ogDeviceObj = listOfDevices.find(
      (device) => selection?.value === device?.deviceId
    );

    dispatch(setSelectedDevice(ogDeviceObj));
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

  const refetchDevicesAndApps = useCallback(() => {
    dispatch(fetchConnectedDevices());
  }, [dispatch]);

  useEffect(() => {
    setDeviceOptionList(generateDeviceOptions(listOfDevices));
  }, [generateDeviceOptions, listOfDevices]);

  useEffect(() => {
    if (lisOfApplications) {
      setApplicationOptionList(generateAppOptions(lisOfApplications));
    }
  }, [generateAppOptions, lisOfApplications]);

  useEffect(() => {
    refetchDevicesAndApps();
  }, [refetchDevicesAndApps]);

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
    refetchDevicesAndApps
  };
};

export default useDependencyChecker;
