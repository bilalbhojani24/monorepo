import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getIsUserLoggedIn,
  getTotalAllowedSessions,
  getTotalCompletedSessions
} from 'features/Dashboard/slices/dashboardSlice';
import { mcpAnalyticsEvent } from 'utils/analyticsUtils';

import {
  getAreApplicationsStillLoading,
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
  triggerSession
} from '../slices/newPerformanceSessionThunks';
import {
  generateAppOptions,
  generateDeviceOptions,
  getDefaultAutoGenerateName,
  INCOMPATIBLE_DEVICE_MSG
} from '../utils/dependencyUtils';

const useTestTriggerPanel = () => {
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

      mcpAnalyticsEvent('mcspDeviceSelected', {
        selMobDeviceProperties: {
          ...ogDeviceObj
        }
      });
    }
  };

  const applicationSelected = (selection) => {
    const ogAppObj = lisOfApplications.find(
      (app) => app?.packageName === selection?.value
    );

    dispatch(setSelectedApplication(ogAppObj));

    mcpAnalyticsEvent('mcspAppSelected', {
      selAppProperties: {
        ...ogAppObj
      }
    });
  };

  const startTestSession = () => {
    dispatch(
      triggerSession(
        navigateToPath,
        getDefaultAutoGenerateName(selectedDevice, selectedApplication)
      )
    );

    mcpAnalyticsEvent('mcspTestStarted', {
      testMetadata: {
        ...selectedDevice,
        ...selectedApplication
      }
    });
  };

  const searchApplications = (event) => {
    if (lisOfApplications) {
      let searchResults = [];

      if (event?.target?.value?.length > 0) {
        searchResults = lisOfApplications?.filter?.(
          (app) =>
            app?.name
              ?.toLowerCase()
              ?.indexOf(event?.target?.value?.toLowerCase()) !== -1
        );
      } else {
        searchResults = lisOfApplications;
      }

      setApplicationOptionList(generateAppOptions(searchResults));
    }
  };

  useEffect(() => {
    setDeviceOptionList(generateDeviceOptions(listOfDevices));
  }, [listOfDevices]);

  useEffect(() => {
    if (lisOfApplications) {
      setApplicationOptionList(generateAppOptions(lisOfApplications));
    }
  }, [lisOfApplications]);

  useEffect(() => {
    if (selectedDevice?.deviceId) {
      dispatch(fetchApplicationsFromSelectedDevice());
    }
  }, [dispatch, selectedDevice.deviceId]);

  useEffect(
    () => () => {
      dispatch(setSelectedDevice({}));
    },
    [dispatch]
  );

  return {
    areApplicationsStillLoading,
    errorOnApplicationFetch,
    listOfDevices,
    lisOfApplications,
    deviceSelected,
    applicationSelected,
    deviceOptionList,
    applicationOptionList,
    selectedDevice,
    selectedApplication,
    startTestSession,
    isSessionApiLoading,
    deviceSelectionError,
    searchApplications,
    disableTestTrigger:
      (!isUserLoggedIn && totalAllowedSessions === totalCompletedSessions) ||
      areApplicationsStillLoading
  };
};

export default useTestTriggerPanel;
