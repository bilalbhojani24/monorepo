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
      title="Settings updated!"
      isCondensed
      handleClose={(toastData) => {
        notify.remove(toastData.id);
      }}
    />
  );

  const {
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
  } = useTimeoutSettings(notifactionComponent);

  return (
    <>
      {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
      <div className="h-[calc(100vh-64px-134px-48px-62px)] overflow-auto p-6">
        <p className="text-base-900 text-lg font-medium">Timeout Settings</p>
        <p className="text-base-500 text-sm">
          Configure different timeouts as per your testing requirement.
        </p>

        {/* --- --- Idle Timeout --- --- */}
        <div className="pt-6">
          <p className="font-medium text-sm">Idle Timeout</p>
          <p className="text-base-500 text-sm">
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
          <p className="font-medium text-sm">Queue Timeout</p>
          <p className="text-base-500 text-sm">
            Set the timeout in seconds to detect the drop the requests waiting
            in queue. It is set at 900 seconds by default.
          </p>

          <div className="mt-3 max-w-xs">
            <InputField
              addOnAfter={
                <InputGroupAddOn position="end">seconds</InputGroupAddOn>
              }
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
          <p className="font-medium text-sm">Queue Retry Interval</p>
          <p className="text-base-500 text-sm">
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
          <p className="font-medium text-sm">Test Timeout</p>
          <p className="text-base-500 text-sm">
            Set the timeout in hours to stop the test and drop the subsequent
            commands sent for the test. It is set at 2 hours by default.
          </p>

          <div className="mt-3 max-w-xs">
            <InputField
              addOnAfter={
                <InputGroupAddOn position="end">hours</InputGroupAddOn>
              }
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
      <div className="bg-base-50 flex flex-row-reverse px-6 py-3">
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
