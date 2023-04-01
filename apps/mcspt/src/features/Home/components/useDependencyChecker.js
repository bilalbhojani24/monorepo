import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalCompletedSessions } from 'features/Dashboard/slices/dashboardSlice';
import { getIsTestHistoryLoading } from 'features/TestHistory';
import { mcpAnalyticsEvent } from 'utils/analyticsUtils';

import { getAreDevicesStillLoading } from '../slices/loadingStateForNewPerformanceSession';
import {
  getListOfDevices,
  setSelectedDevice
} from '../slices/newPerformanceSessionSlice';
import { fetchConnectedDevices } from '../slices/newPerformanceSessionThunks';

const useDependencyChecker = () => {
  const areDevicesStillLoading = useSelector(getAreDevicesStillLoading);
  const isTestHistoryLoading = useSelector(getIsTestHistoryLoading);

  const totalCompletedSessions = useSelector(getTotalCompletedSessions);

  const listOfDevices = useSelector(getListOfDevices);

  const dispatch = useDispatch();

  const refetchDevices = useCallback(() => {
    mcpAnalyticsEvent('csptRefreshButtonClicked', {
      num_devices_connected: listOfDevices.length
    });

    // with this, it will refetch applications as well at the time of refresh.
    dispatch(setSelectedDevice({}));

    dispatch(fetchConnectedDevices());
  }, [dispatch, listOfDevices.length]);

  return {
    areDependenciesStillLoading: isTestHistoryLoading || areDevicesStillLoading,
    listOfDevices,
    refetchDevices,
    totalCompletedSessions
  };
};

export default useDependencyChecker;
