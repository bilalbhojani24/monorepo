import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { notify } from '@browserstack/bifrost';
import { updateSettings } from 'api/index';
import { AGGridSettingsSaved } from 'constants/event-names';
import { getGridsData } from 'features/GridConsole/slices/selector';
import { getIsApploading, getUserDetails } from 'globalSlice/selector';
import { logHSTEvent } from 'utils/logger';

const useBrowserSettings = (notifactionComponent) => {
  const allAvailableBrowsers = [
    { label: 'Chrome', value: 'Chrome' },
    { label: 'Firefox', value: 'Firefox' },
    { label: 'Edge', value: 'MicrosoftEdge' }
  ];

  // All Store variables:
  const fetchedGridData = useSelector(getIsApploading);
  const gridData = useSelector(getGridsData);
  const userDetails = useSelector(getUserDetails);

  // All State variables:

  const [cpuErrorText, setCPUErrorText] = useState('');
  const [cpuValue, setCpuValue] = useState(0);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [isSavingInProgress, setIsSavingInProgress] = useState(false);
  const [memoryErrorText, setMemoryErrorText] = useState('');
  const [memoryLimitValue, setMemoryLimitValue] = useState(0);
  const [allowedBrowsersValue, setAllowedBrowsersValue] = useState([]);

  const onCPUChangeHandler = (e) => {
    const newValue = parseInt(e.target.value);
    setCpuValue(newValue);

    if (newValue < 250 || newValue > 2500) {
      setCPUErrorText('CPU limit should be between 250 and 2500');
      setIsSaveButtonDisabled(true);
    } else {
      setCPUErrorText('');
      setIsSaveButtonDisabled(false);
    }
  };

  const onMemoryLimitChangeHandler = (e) => {
    const newValue = parseInt(e.target.value);

    setMemoryLimitValue(newValue);

    if (newValue < 250 || newValue > 2500) {
      setMemoryErrorText('Memory limit should be between 250 and 2500');
      setIsSaveButtonDisabled(true);
    } else {
      setMemoryErrorText('');
      setIsSaveButtonDisabled(false);
    }
  };

  const updateGridBrowserSettings = (settingsObj) => {
    updateSettings(userDetails.id, gridData.id, settingsObj).then((d) => {
      setIsSaveButtonDisabled(true);
      setIsSavingInProgress(false);

      if (d.status === 200) {
        notify(notifactionComponent, {
          position: 'top-right',
          duration: 4000
        });
      }
    });
  };

  const saveBtnClickhandler = () => {
    logHSTEvent(['amplitude'], 'web_events', AGGridSettingsSaved, {
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

  return {
    allAvailableBrowsers,
    allowedBrowsersChangeHandler,
    allowedBrowsersValue,
    cpuErrorText,
    cpuValue,
    fetchedGridData,
    isSaveButtonDisabled,
    isSavingInProgress,
    memoryErrorText,
    memoryLimitValue,
    onCPUChangeHandler,
    onMemoryLimitChangeHandler,
    saveBtnClickhandler
  };
};

export default useBrowserSettings;
