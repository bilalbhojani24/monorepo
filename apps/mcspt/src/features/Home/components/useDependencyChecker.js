import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalCompletedSessions } from 'features/Dashboard/slices/dashboardSlice';

import { getAreDevicesStillLoading } from '../slices/loadingStateForNewPerformanceSession';
import { getListOfDevices } from '../slices/newPerformanceSessionSlice';
import { fetchConnectedDevices } from '../slices/newPerformanceSessionThunks';

const useDependencyChecker = () => {
  const areDevicesStillLoading = useSelector(getAreDevicesStillLoading);
  const totalCompletedSessions = useSelector(getTotalCompletedSessions);

  const listOfDevices = useSelector(getListOfDevices);

  const dispatch = useDispatch();

  const refetchDevices = useCallback(() => {
    dispatch(fetchConnectedDevices());
  }, [dispatch]);

  return {
    areDevicesStillLoading,
    listOfDevices,
    refetchDevices,
    totalCompletedSessions
  };
};

export default useDependencyChecker;
