import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { notify } from '@browserstack/bifrost';
import { logEvent } from '@browserstack/utils';
import { updateSettings } from 'api/index';
import { AGGridSettingsSaved } from 'constants/event-names';
import { getGridData } from 'features/GridConsole/slices/selector';
import { getIsApploading, getUserDetails } from 'globalSlice/selector';

const useBrowserSettings = (notifactionComponent) => {
  const allAvailableBrowsers = [
    { label: 'Chrome', value: 'Chrome' },
    { label: 'Firefox', value: 'Firefox' },
    { label: 'Edge', value: 'MicrosoftEdge' }
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
    const newValue = parseInt(e.target.value);

    setIsSaveButtonDisabled(false);
    setCpuValue(newValue);
  };

  const onMemoryLimitChangeHandler = (e) => {
    const newValue = parseInt(e.target.value);

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
    logEvent(['amplitude'], 'web_events', AGGridSettingsSaved, {
      tab_selected: 'general'
    });
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
      const allowedBrowsers = Object.keys(
        gridData.browserSettings.allowedBrowsers
      );
      const temp = allowedBrowsers.map((e) => {
        let val = e;
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
