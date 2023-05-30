import React from 'react';
import {
  Button,
  InputField,
  InputGroupAddOn,
  Switch
} from '@browserstack/bifrost';

const TestArtifactsSettings = () => (
  <div className="grow bg-white ">
    <div className="p-6">
      <p className="text-base-900 text-lg font-medium">
        Test Artifacts Settings
      </p>
      <p className="text-base-500 text-sm">
        Configure different types of logs that can be generated for the tests
        run on this grid.
      </p>

      {/* --- --- Video Logs --- --- */}
      <div className="flex justify-between pt-6">
        <div>
          <p className="font-medium">Video Logs</p>
          <p className="text-base-500 text-sm">
            Enable or Disable the toggle to configure if video logs should be
            generated or not. It is enabled by default.
          </p>
        </div>

        <div className="mt-3 w-1/12">
          <Switch />
        </div>
      </div>
      {/* --- X --- Video Logs --- X --- */}

      {/* --- --- Framework Logs --- --- */}
      <div className="flex justify-between pt-6">
        <div>
          <p className="font-medium">Framework Logs</p>
          <p className="text-base-500 text-sm">
            Enable or Disable the toggle to configure if framework
            (Selenium/Playwright) logs should be generated or not. It is enabled
            by default.
          </p>
        </div>
        <div className="mt-3 w-1/12">
          <Switch />
        </div>
      </div>
      {/* --- X --- Framework Logs --- X --- */}

      {/* --- --- Log Retention --- --- */}
      <div className="pt-6">
        <p className="font-medium">Log Retention</p>
        <p className="text-base-500 text-sm">
          Set the retention policy in days to change the retention period of
          logs stored for this grid. It is set to 7 days by default.
        </p>

        <div className="mt-3 max-w-xs">
          <InputField
            addOnAfter={<InputGroupAddOn position="end">days</InputGroupAddOn>}
            id="test-id"
            onBlur={null}
            onChange={null}
            onFocus={null}
            onKeyDown={null}
            placeholder="7"
          />
        </div>
      </div>
      {/* --- X --- Log Retention --- X --- */}
    </div>
    <div className="bg-base-50 px-6 py-3">
      <Button> Save Changes </Button>
    </div>
  </div>
);

export default TestArtifactsSettings;
