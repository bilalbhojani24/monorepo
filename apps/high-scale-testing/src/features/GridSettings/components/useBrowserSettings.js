import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { notify } from '@browserstack/bifrost';
import { updateSettings } from 'api/index';
import { getGridData } from 'features/GridConsole/slices/selector';
import { getIsApploading, getUserDetails } from 'globalSlice/selector';

const useBrowserSettings = (notifactionComponent) => {
  const allAvailableBrowsers = [
    { label: 'Chrome', value: 'Chrome' },
    { label: 'Firefox', value: 'Firefox' },
    { label: 'Edge', value: 'Edge' }
  ];

  // All Store variables:
  const fetchedGridData = useSelector(getIsApploading);
  const gridData = useSelector(getGridData);
  const userDetails = useSelector(getUserDetails);

  // All State variables:

  const [cpuValue, setCpuValue] = useState(0);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [isSavingInProgress, setIsSavingInProgress] = useState(false);
  const [memoryLimitValue, setMemoryLimitValue] = useState(0);
  const [allowedBrowsersValue, setAllowedBrowsersValue] = useState([]);

  const onCPUChangeHandler = (e) => {
    const newValue = e.target.value;

    setIsSaveButtonDisabled(false);
    setCpuValue(newValue);
  };

  const onMemoryLimitChangeHandler = (e) => {
    const newValue = e.target.value;

    setIsSaveButtonDisabled(false);
    setMemoryLimitValue(newValue);
  };

  const updateGridBrowserSettings = (settingsObj) => {
    updateSettings(userDetails.id, gridData.id, settingsObj).then((d) => {
      setIsSaveButtonDisabled(true);
      setIsSavingInProgress(false);

      if (d.data === 'OK') {
        notify(notifactionComponent, {
          position: 'top-right',
          duration: 4000
        });
      }
    });
  };

  const saveBtnClickhandler = () => {
    setIsSavingInProgress(true);
    const settingsObj = {
      browserSettings: {
        allowedBrowsers: allowedBrowsersValue.map((e) => e.value.toLowerCase()),
        resources: {
          cpu: cpuValue,
          memory: memoryLimitValue
        }
      }
    };
    updateGridBrowserSettings(settingsObj);
  };

  const allowedBrowsersChangeHandler = (e) => {
    setAllowedBrowsersValue(e);
    setIsSaveButtonDisabled(false);
  };

  useEffect(() => {
    if (Object.keys(gridData).length > 0) {
      setCpuValue(gridData.browserSettings.resources.cpu);
      setMemoryLimitValue(gridData.browserSettings.resources.memory);
      const temp = gridData.browserSettings.allowedBrowsers.map((e) => {
        let val = Object.keys(e)[0];
        val = val.charAt(0).toUpperCase() + val.slice(1);
        return {
          label: val,
          value: val
        };
      });
      setAllowedBrowsersValue(temp);
    }
  }, [gridData]);

  useEffect(() => {
    console.log('Log: fetchedGridData:', fetchedGridData);
  }, [allowedBrowsersValue, cpuValue, fetchedGridData]);

  return {
    allAvailableBrowsers,
    allowedBrowsersChangeHandler,
    allowedBrowsersValue,
    cpuValue,
    fetchedGridData,
    isSaveButtonDisabled,
    isSavingInProgress,
    memoryLimitValue,
    onCPUChangeHandler,
    onMemoryLimitChangeHandler,
    saveBtnClickhandler
  };
};

export default useBrowserSettings;
