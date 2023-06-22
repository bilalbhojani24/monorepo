import React from 'react';
import {
  Button,
  InputField,
  InputGroupAddOn,
  Notifications,
  notify,
  Switch
} from '@browserstack/bifrost';

import useTestArtifacts from './useTestArtifacts';

const TestArtifactsSettings = () => {
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
    frameworkLogsChangeHandler,
    frameworkLogsValue,
    logsRetentionChangeHandler,
    logsRetentionValue,
    isSaveButtonDisabled,
    isSavingInProgress,
    saveBtnClickhandler,
    videoLogsChangeHandler,
    videoLogValue
  } = useTestArtifacts(notifactionComponent);

  return (
    <>
      <div className="overflow-auto p-6">
        <p className="text-lg font-medium text-base-900">
          Test Artifacts Settings
        </p>
        <p className="text-sm text-base-500">
          Configure different types of logs that can be generated for the tests
          run on this grid.
        </p>

        {/* --- --- Video Logs --- --- */}
        <div className="flex flex-col pt-6">
          <p className="font-medium">Video Logs</p>
          <div className="flex justify-between">
            <p className="text-sm text-base-500">
              Enable or Disable the toggle to configure if video logs should be
              generated or not. It is enabled by default.
            </p>
            <div className="w-1/12">
              <Switch
                checked={videoLogValue}
                onChange={videoLogsChangeHandler}
              />
            </div>
          </div>
        </div>
        {/* --- X --- Video Logs --- X --- */}

        {/* --- --- Framework Logs --- --- */}

        <div className="flex flex-col">
          <p className="font-medium">Framework Logs</p>
          <div className="flex justify-between">
            <p className="text-sm text-base-500">
              Enable or Disable the toggle to configure if framework
              (Selenium/Playwright) logs should be generated or not. It is
              enabled by default.
            </p>
            <div className="w-1/12">
              <Switch
                checked={frameworkLogsValue}
                onChange={frameworkLogsChangeHandler}
              />
            </div>
          </div>
        </div>
        {/* --- X --- Framework Logs --- X --- */}

        {/* --- --- Log Retention --- --- */}
        <div className="pt-6">
          <p className="font-medium">Log Retention</p>
          <p className="text-sm text-base-500">
            Set the retention policy in days to change the retention period of
            logs stored for this grid. It is set to 7 days by default.
          </p>

          <div className="mt-3 w-32">
            <InputField
              addOnAfter={
                <InputGroupAddOn position="end">days</InputGroupAddOn>
              }
              id="test-id"
              onBlur={null}
              onChange={logsRetentionChangeHandler}
              onFocus={null}
              onKeyDown={null}
              placeholder="7"
              type="number"
              value={logsRetentionValue}
            />
          </div>
        </div>
        {/* --- X --- Log Retention --- X --- */}
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

export default TestArtifactsSettings;
