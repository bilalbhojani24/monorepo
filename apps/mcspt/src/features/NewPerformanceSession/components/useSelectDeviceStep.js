import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getSelectedDevice,
  setCurrentSetupStep,
  setSelectedDevice
} from '../slices/newPerformanceSessionSlice';

const listOfDevices = [
  {
    deviceId: '192.168.29.140:5555',
    model: 'Google Pixel 7 Pro',
    manufacturer: 'Google',
    os: 'Android 11'
  },
  {
    deviceId: '192.168.29.140:5556',
    model: 'iPhone 14 Pro Max',
    manufacturer: 'OnePlus',
    os: 'iOS 14'
  },
  {
    deviceId: '192.168.29.140:5557',
    model: 'Google Pixel 6 Pro',
    manufacturer: 'Google',
    os: 'Android 12'
  }
];

const useSelectDeviceStep = () => {
  const [areDevicesStillLoading, setAreDevicesStillLoading] = useState(true);

  const selectedDevice = useSelector(getSelectedDevice);

  const dispatch = useDispatch();

  const deviceSelected = (x) => {
    dispatch(setSelectedDevice(x));
  };

  const navigateToNext = () => {
    dispatch(setCurrentSetupStep(2));
  };

  useEffect(() => {
    setTimeout(() => {
      setAreDevicesStillLoading(false);
    }, 2000);
  }, []);

  return {
    areDevicesStillLoading,
    listOfDevices,
    selectedDevice,
    deviceSelected,
    navigateToNext
  };
};

export default useSelectDeviceStep;
