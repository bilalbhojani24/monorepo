import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { notify } from '@browserstack/bifrost';
import { logEvent } from '@browserstack/utils';
import { updateSettings } from 'api/index';
import { AGGridSettingsSaved } from 'constants/event-names';
import {
  MAX_IDLE_TIMEOUT,
  MAX_QUEUE_TIMEOUT,
  MAX_TEST_TIMEOUT
} from 'constants/index';
import { getGridData } from 'features/GridConsole/slices/selector';
import { getUserDetails } from 'globalSlice/selector';

const useTimeoutSettings = (notifactionComponent) => {
  // All Store variables:
  const gridData = useSelector(getGridData);
  const userDetails = useSelector(getUserDetails);

  const ERROR_MESSAGE_IDLE_TIMEOUT = `Idle timeout must be less than ${MAX_IDLE_TIMEOUT} seconds`;
  const ERROR_MESSAGE_QUEUE_TIMEOUT = `Queue timeout must be less than ${MAX_QUEUE_TIMEOUT} seconds`;
  const ERROR_MESSAGE_TEST_TIMEOUT = `Test timeout must be less than ${MAX_TEST_TIMEOUT} seconds`;

  // All State variables:
  const [idleTimeOutError, setIdleTimeOutError] = useState(null);
  const [idleTimeOutValue, setIdleTimeOutValue] = useState(0);
  const [queueRetryIntervalValue, setQueueRetryIntervalValue] = useState(0);
  const [queueTimeoutError, setQueueTimeoutError] = useState(null);
  const [queueTimeoutValue, setQueueTimeoutValue] = useState(0);
  const [testTimeoutError, setTestTimeoutError] = useState(null);
  const [testTimeoutValue, setTestTimeoutValue] = useState(0);

  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [isSavingInProgress, setIsSavingInProgress] = useState(false);

  const idleTimeoutInputChangeHandler = (e) => {
    const newValue = parseInt(e.target.value);

    setIdleTimeOutValue(newValue);

    if (newValue > MAX_IDLE_TIMEOUT) {
      setIdleTimeOutError(ERROR_MESSAGE_IDLE_TIMEOUT);
      setIsSaveButtonDisabled(true);
    } else {
      setIdleTimeOutError(null);
      setIsSaveButtonDisabled(false);
    }
  };

  const queueRetryIntervalChangeHandler = (e) => {
    const newValue = parseInt(e.target.value);

    setIsSaveButtonDisabled(false);
    setQueueRetryIntervalValue(newValue);
  };

  const queueTimeoutChangeHandler = (e) => {
    const newValue = parseInt(e.target.value);

    setQueueTimeoutValue(newValue);
    if (newValue > MAX_QUEUE_TIMEOUT) {
      setQueueTimeoutError(ERROR_MESSAGE_QUEUE_TIMEOUT);
      setIsSaveButtonDisabled(true);
    } else {
      setIsSaveButtonDisabled(false);
    }
  };

  const testTimeoutChangeHandler = (e) => {
    const newValue = parseInt(e.target.value);

    setTestTimeoutValue(newValue);

    if (newValue > MAX_TEST_TIMEOUT) {
      setTestTimeoutError(ERROR_MESSAGE_TEST_TIMEOUT);
      setIsSaveButtonDisabled(true);
    } else {
      setIsSaveButtonDisabled(false);
    }
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
    idleTimeOutError,
    idleTimeOutValue,
    isSaveButtonDisabled,
    isSavingInProgress,
    saveBtnClickhandler,
    testTimeoutChangeHandler,
    testTimeoutError,
    testTimeoutValue,
    queueRetryIntervalChangeHandler,
    queueRetryIntervalValue,
    queueTimeoutChangeHandler,
    queueTimeoutError,
    queueTimeoutValue
  };
};

export default useTimeoutSettings;
