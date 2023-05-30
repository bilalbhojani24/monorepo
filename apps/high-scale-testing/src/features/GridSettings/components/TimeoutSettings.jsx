import React from 'react';
import { Button, InputField, InputGroupAddOn } from '@browserstack/bifrost';

const TimeoutSettings = () => (
  <>
    {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
    <div className="h-[calc(100vh-64px-134px-48px-62px)] overflow-auto p-6">
      <p className="text-base-900 text-lg font-medium">Timeout Settings</p>
      <p className="text-base-500 text-sm">
        Configure different timeouts as per your testing requirement.
      </p>

      {/* --- --- Idle Timeout --- --- */}
      <div className="pt-6">
        <p className="font-medium">Idle Timeout</p>
        <p className="text-base-500 text-sm">
          Set the timeout in seconds to detect the inactivity between the
          commands during the session. It is set at 90 seconds by default.
        </p>

        <div className="mt-3 max-w-xs">
          <InputField
            addOnAfter={
              <InputGroupAddOn position="end">seconds</InputGroupAddOn>
            }
            id="test-id"
            onBlur={null}
            onChange={null}
            onFocus={null}
            onKeyDown={null}
            placeholder="90"
          />
        </div>
      </div>
      {/* --- X --- Idle Timeout--- X --- */}

      {/* --- --- Queue Timeout --- --- */}
      <div className="pt-6">
        <p className="font-medium">Queue Timeout</p>
        <p className="text-base-500 text-sm">
          Set the timeout in seconds to detect the drop the requests waiting in
          queue. It is set at 900 seconds by default.
        </p>

        <div className="mt-3 max-w-xs">
          <InputField
            addOnAfter={
              <InputGroupAddOn position="end">seconds</InputGroupAddOn>
            }
            id="test-id"
            onBlur={null}
            onChange={null}
            onFocus={null}
            onKeyDown={null}
            placeholder="900"
          />
        </div>
      </div>
      {/* --- X --- Queue Timeout --- X --- */}

      {/* --- --- Queue Retry Interval --- --- */}
      <div className="pt-6">
        <p className="font-medium">Queue Retry Interval</p>
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
            id="test-id"
            onBlur={null}
            onChange={null}
            onFocus={null}
            onKeyDown={null}
            placeholder="10"
          />
        </div>
      </div>
      {/* --- X --- Queue Retry Interval --- X --- */}

      {/* --- --- Test Timeout --- --- */}
      <div className="pt-6">
        <p className="font-medium">Test Timeout</p>
        <p className="text-base-500 text-sm">
          Set the timeout in hours to stop the test and drop the subsequent
          commands sent for the test. It is set at 2 hours by default.
        </p>

        <div className="mt-3 max-w-xs">
          <InputField
            addOnAfter={<InputGroupAddOn position="end">hours</InputGroupAddOn>}
            id="test-id"
            onBlur={null}
            onChange={null}
            onFocus={null}
            onKeyDown={null}
            placeholder="2"
          />
        </div>
      </div>
      {/* --- X --- Test Timeout --- X --- */}
    </div>
    <div className="bg-base-50 flex flex-row-reverse px-6 py-3">
      <Button> Save Changes </Button>
    </div>
  </>
);

export default TimeoutSettings;
