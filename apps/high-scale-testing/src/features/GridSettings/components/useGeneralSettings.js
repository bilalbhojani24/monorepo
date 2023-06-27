import { useState } from 'react';
import { useSelector } from 'react-redux';
import { notify } from '@browserstack/bifrost';
import { updateSettings } from 'api/index';
import { AGGridSettingsSaved } from 'constants/event-names';
import { DEFAULT_GRID_CONCURRENCY } from 'constants/index';
import { getGridsData } from 'features/GridConsole/slices/selector';
import { getUserDetails } from 'globalSlice/selector';
import { logHSTEvent } from 'utils/logger';

const useGeneralSettings = (notifactionComponent) => {
  // All Store variables:
  const gridData = useSelector(getGridsData);
  const userDetails = useSelector(getUserDetails);

  const currentConcurrencyValue =
    gridData.concurrency || DEFAULT_GRID_CONCURRENCY;

  // All State variables:
  const [concurrencyValue, setConcurrencyValue] = useState(
    currentConcurrencyValue
  );
  const [concurrencyErrorText, setConcurrencyErrorText] = useState('');
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [isSavingInProgress, setIsSavingInProgress] = useState(false);

  const inputChangeHandler = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setConcurrencyValue(newValue);

    if (newValue < 0 || newValue > 1000) {
      setConcurrencyErrorText('Concurrency value must be between 0 and 1000');
      setIsSaveButtonDisabled(true);
    } else {
      setConcurrencyErrorText('');
      setIsSaveButtonDisabled(false);
    }
  };

  const updateGridGeneralSettings = (settingsObj) => {
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
      concurrency: concurrencyValue
    };

    updateGridGeneralSettings(settingsObj);
  };

  return {
    concurrencyErrorText,
    currentConcurrencyValue,
    inputChangeHandler,
    isSaveButtonDisabled,
    isSavingInProgress,
    saveBtnClickhandler
  };
};

export default useGeneralSettings;
