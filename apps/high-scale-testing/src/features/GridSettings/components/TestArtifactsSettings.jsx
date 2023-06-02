import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  InputField,
  InputGroupAddOn,
  Notifications,
  notify,
  Switch
} from '@browserstack/bifrost';
import { updateSettings } from 'api/index';
import { getGridData } from 'features/GridConsole/slices/selector';
import { getUserDetails } from 'globalSlice/selector';

const TestArtifactsSettings = () => {
  // All Store variables:
  const gridData = useSelector(getGridData);
  const userDetails = useSelector(getUserDetails);

  // All State variables:
  const [frameworkLogsValue, setFrameworkLogsValue] = useState(
    gridData.testArtifacts.frameworkLogs
  );
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [isSavingInProgress, setIsSavingInProgress] = useState(false);
  const [logsRetentionValue, setLogsRetentionValue] = useState(
    gridData.testArtifacts.logsRetention
  );
  const [videoLogValue, setVideoLogsValue] = useState(
    gridData.testArtifacts.videoLogs
  );

  const updateGridGeneralSettings = (settingsObj) => {
    updateSettings(userDetails.id, gridData.id, settingsObj).then((d) => {
      setIsSaveButtonDisabled(true);
      setIsSavingInProgress(false);

      if (d.data === 'OK') {
        notify(
          <Notifications
            title="Settings updated!"
            isCondensed
            handleClose={(toastData) => {
              notify.remove(toastData.id);
            }}
          />,
          {
            position: 'top-right',
            duration: 4000
          }
        );
      }
    });
  };

  const frameworkLogsChangeHandler = (e) => {
    setFrameworkLogsValue(e);

    setIsSaveButtonDisabled(false);
  };

  const logsRetentionChangeHandler = (e) => {
    setLogsRetentionValue(e.target.value);
    setIsSaveButtonDisabled(false);
  };

  const saveBtnClickhandler = () => {
    setIsSavingInProgress(true);
    const settingsObj = {
      testArtifacts: {
        videoLogs: videoLogValue,
        frameworkLog: frameworkLogsValue,
        logsRetention: logsRetentionValue
      }
    };

    updateGridGeneralSettings(settingsObj);
  };

  const videoLogsChangeHandler = (e) => {
    setVideoLogsValue(e);
    setIsSaveButtonDisabled(false);
  };

  return (
    <>
      {/* eslint-disable-next-line tailwindcss/no-arbitrary-value */}
      <div className="h-[calc(100vh-64px-134px-48px-62px)]  overflow-auto p-6">
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
            <Switch checked={videoLogValue} onChange={videoLogsChangeHandler} />
          </div>
        </div>
        {/* --- X --- Video Logs --- X --- */}

        {/* --- --- Framework Logs --- --- */}
        <div className="flex justify-between pt-6">
          <div>
            <p className="font-medium">Framework Logs</p>
            <p className="text-base-500 text-sm">
              Enable or Disable the toggle to configure if framework
              (Selenium/Playwright) logs should be generated or not. It is
              enabled by default.
            </p>
          </div>
          <div className="mt-3 w-1/12">
            <Switch
              checked={frameworkLogsValue}
              onChange={frameworkLogsChangeHandler}
            />
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

      <div className="bg-base-50 flex flex-row-reverse px-6 py-3">
        <Button
          disabled={isSaveButtonDisabled}
          loading={isSavingInProgress}
          onClick={saveBtnClickhandler}
        >
          {' '}
          Save Changes{' '}
        </Button>
      </div>
    </>
  );
};

export default TestArtifactsSettings;
