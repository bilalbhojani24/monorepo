import { useState } from 'react';
import { useSelector } from 'react-redux';
import { notify } from '@browserstack/bifrost';
import { updateSettings } from 'api/index';
import { getGridData } from 'features/GridConsole/slices/selector';
import { getUserDetails } from 'globalSlice/selector';

const useTimeoutSettings = (notifactionComponent) => {
  // All Store variables:
  const gridData = useSelector(getGridData);
  const userDetails = useSelector(getUserDetails);

  // All State variables:
  const [idleTimeOutValue, setIdleTimeOutValue] = useState(
    gridData.testSettings.idleTimeout
  );
  const [queueRetryIntervalValue, setQueueRetryIntervalValue] = useState(
    gridData.testSettings.queueRetryInterval
  );
  const [queueTimeoutValue, setQueueTimeoutValue] = useState(
    gridData.testSettings.queueTimeout
  );
  const [testTimeoutValue, setTestTimeoutValue] = useState(
    gridData.testSettings.testTimeout
  );

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
