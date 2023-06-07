import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { notify } from '@browserstack/bifrost';
import { logEvent } from '@browserstack/utils';
import { updateSettings } from 'api/index';
import { AGGridSettingsSaved } from 'constants/event-names';
import { getGridData } from 'features/GridConsole/slices/selector';
import { getUserDetails } from 'globalSlice/selector';

const useTimeoutSettings = (notifactionComponent) => {
  // All Store variables:
  const gridData = useSelector(getGridData);
  const userDetails = useSelector(getUserDetails);

  // All State variables:
  const [idleTimeOutValue, setIdleTimeOutValue] = useState(0);
  const [queueRetryIntervalValue, setQueueRetryIntervalValue] = useState(0);
  const [queueTimeoutValue, setQueueTimeoutValue] = useState(0);
  const [testTimeoutValue, setTestTimeoutValue] = useState(0);

  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [isSavingInProgress, setIsSavingInProgress] = useState(false);

  const idleTimeoutInputChangeHandler = (e) => {
    const newValue = e.target.value;

    setIsSaveButtonDisabled(false);
    setIdleTimeOutValue(newValue);
  };

  const queueRetryIntervalChangeHandler = (e) => {
    const newValue = e.target.value;

    setIsSaveButtonDisabled(false);
    setQueueRetryIntervalValue(newValue);
  };

  const queueTimeoutChangeHandler = (e) => {
    const newValue = e.target.value;

    setIsSaveButtonDisabled(false);
    setQueueTimeoutValue(newValue);
  };

  const testTimeoutChangeHandler = (e) => {
    const newValue = e.target.value;

    setIsSaveButtonDisabled(false);
    setTestTimeoutValue(newValue);
  };

  const updateGridTimeoutSettings = (settingsObj) => {
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
      testSettings: {
        idleTimeout: idleTimeOutValue,
        queueTimeout: queueTimeoutValue,
        queueRetryInterval: queueRetryIntervalValue,
        testTimeout: testTimeoutValue
      }
    };
    updateGridTimeoutSettings(settingsObj);
  };

  useEffect(() => {
    if (Object.keys(gridData).length > 0) {
      setIdleTimeOutValue(gridData.testSettings.idleTimeout);
      setQueueRetryIntervalValue(gridData.testSettings.queueRetryInterval);
      setQueueTimeoutValue(gridData.testSettings.queueTimeout);
      setTestTimeoutValue(gridData.testSettings.testTimeout);
    }
  }, [gridData]);

  return {
    idleTimeoutInputChangeHandler,
    idleTimeOutValue,
    isSaveButtonDisabled,
    isSavingInProgress,
    saveBtnClickhandler,
    testTimeoutChangeHandler,
    testTimeoutValue,
    queueRetryIntervalChangeHandler,
    queueRetryIntervalValue,
    queueTimeoutChangeHandler,
    queueTimeoutValue
  };
};

export default useTimeoutSettings;
