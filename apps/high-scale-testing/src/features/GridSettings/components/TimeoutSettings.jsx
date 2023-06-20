import React from 'react';
import {
  Button,
  InputField,
  InputGroupAddOn,
  Notifications,
  notify
} from '@browserstack/bifrost';

import useTimeoutSettings from './useTimeoutSettings';

const TimeoutSettings = () => {
  const notifactionComponent = (
    <Notifications
      description="Settings were updated successfully"
      title="Settings updated!"
      isCondensed
      handleClose={(toastData) => {
        notify.remove(toastData.id);
      }}
    />
  );

  const {
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
  } = useTimeoutSettings(notifactionComponent);

  return (
    <>
      <div className="overflow-auto p-6">
        <p className="text-lg font-medium text-base-900">Timeout Settings</p>
        <p className="text-sm text-base-500">
          Configure different timeouts as per your testing requirement.
        </p>

        {/* --- --- Idle Timeout --- --- */}
        <div className="pt-6">
          <p className="text-sm font-medium">Idle Timeout</p>
          <p className="text-sm text-base-500">
            Set the timeout in seconds to detect the inactivity between the
            commands during the session. It is set at 90 seconds by default.
          </p>

          <div className="mt-3 max-w-xs">
            <InputField
              addOnAfter={
                <InputGroupAddOn position="end">seconds</InputGroupAddOn>
              }
              value={idleTimeOutValue}
              disabled={isSavingInProgress}
              errorText={idleTimeOutError}
              id="test-id"
              onChange={idleTimeoutInputChangeHandler}
              onKeyDown={null}
              type="number"
            />
          </div>
        </div>
        {/* --- X --- Idle Timeout--- X --- */}

        {/* --- --- Queue Timeout --- --- */}
        <div className="pt-6">
          <p className="text-sm font-medium">Queue Timeout</p>
          <p className="text-sm text-base-500">
            Set the timeout in seconds to detect the drop the requests waiting
            in queue. It is set at 900 seconds by default.
          </p>

          <div className="mt-3 max-w-xs">
            <InputField
              addOnAfter={
                <InputGroupAddOn position="end">seconds</InputGroupAddOn>
              }
              errorText={queueTimeoutError}
              value={queueTimeoutValue}
              disabled={isSavingInProgress}
              id="test-id"
              onChange={queueTimeoutChangeHandler}
              onKeyDown={null}
              type="number"
            />
          </div>
        </div>
        {/* --- X --- Queue Timeout --- X --- */}

        {/* --- --- Queue Retry Interval --- --- */}
        <div className="pt-6">
          <p className="text-sm font-medium">Queue Retry Interval</p>
          <p className="text-sm text-base-500">
            Set the interval in seconds to configure the amount of time after
            which Hub will retry the requests waiting in queue for. It is set at
            10 seconds by default.
          </p>

          <div className="mt-3 max-w-xs">
            <InputField
              addOnAfter={
                <InputGroupAddOn position="end">seconds</InputGroupAddOn>
              }
              value={queueRetryIntervalValue}
              disabled={isSavingInProgress}
              id="test-id"
              onChange={queueRetryIntervalChangeHandler}
              placeholder="10"
              type="number"
            />
          </div>
        </div>
        {/* --- X --- Queue Retry Interval --- X --- */}

        {/* --- --- Test Timeout --- --- */}
        <div className="pt-6">
          <p className="text-sm font-medium">Test Timeout</p>
          <p className="text-sm text-base-500">
            Set the timeout in hours to stop the test and drop the subsequent
            commands sent for the test. It is set at 2 hours by default.
          </p>

          <div className="mt-3 max-w-xs">
            <InputField
              addOnAfter={
                <InputGroupAddOn position="end">hours</InputGroupAddOn>
              }
              errorText={testTimeoutError}
              value={testTimeoutValue}
              disabled={isSavingInProgress}
              id="test-id"
              onChange={testTimeoutChangeHandler}
              placeholder="2"
              type="number"
            />
          </div>
        </div>
        {/* --- X --- Test Timeout --- X --- */}
      </div>
      <div className="flex flex-row-reverse bg-base-50 px-6 py-3">
        <Button
          disabled={isSaveButtonDisabled}
          loading={isSavingInProgress}
          onClick={saveBtnClickhandler}
        >
          Save Changes
        </Button>
      </div>
    </>
  );
};

export default TimeoutSettings;
