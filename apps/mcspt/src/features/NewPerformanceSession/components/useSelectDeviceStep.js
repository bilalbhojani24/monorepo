import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getAreDevicesStillLoading,
  getListOfDevices,
  getSelectedDevice,
  setCurrentSetupStep,
  setSelectedDevice
} from '../slices/newPerformanceSessionSlice';
import { fetchConnectedDevices } from '../slices/newPerformanceSessionThunks';

const useSelectDeviceStep = () => {
  const areDevicesStillLoading = useSelector(getAreDevicesStillLoading);
  const listOfDevices = useSelector(getListOfDevices);
  const selectedDevice = useSelector(getSelectedDevice);

  const dispatch = useDispatch();

  const deviceSelected = (x) => {
    dispatch(setSelectedDevice(x));
  };

  const navigateToNext = () => {
    dispatch(setCurrentSetupStep(2));
  };

  useEffect(() => {
    dispatch(fetchConnectedDevices());
  }, [dispatch]);

  return {
    areDevicesStillLoading,
    listOfDevices,
    selectedDevice,
    deviceSelected,
    navigateToNext
  };
};

export default useSelectDeviceStep;
