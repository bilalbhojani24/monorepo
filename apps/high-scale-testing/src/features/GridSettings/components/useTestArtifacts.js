import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { notify } from '@browserstack/bifrost';
import { updateSettings } from 'api/index';
import { AGGridSettingsSaved } from 'constants/event-names';
import { getSelectedGridData } from 'features/GridConsole/slices/selector';
import { getUserDetails } from 'globalSlice/selector';
import { logHSTEvent } from 'utils/logger';

const useTestArtifacts = (notifactionComponent) => {
  // All Store variables:
  const selectedGridData = useSelector(getSelectedGridData);
  const userDetails = useSelector(getUserDetails);

  // All State variables:
  const [frameworkLogsValue, setFrameworkLogsValue] = useState(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);
  const [isSavingInProgress, setIsSavingInProgress] = useState(false);
  const [logsRetentionValue, setLogsRetentionValue] = useState(false);
  const [videoLogValue, setVideoLogsValue] = useState(false);

  const isTrialGrid = selectedGridData.isTrialGrid || false;

  const updateGridGeneralSettings = (settingsObj) => {
    updateSettings(userDetails.id, selectedGridData.id, settingsObj).then(
      (d) => {
        setIsSaveButtonDisabled(true);
        setIsSavingInProgress(false);

        if (d.status === 200) {
          notify(notifactionComponent, {
            position: 'top-right',
            duration: 4000
          });
        }
      }
    );
  };

  const frameworkLogsChangeHandler = (e) => {
    setFrameworkLogsValue(e);

    setIsSaveButtonDisabled(false);
  };

  const logsRetentionChangeHandler = (e) => {
    setLogsRetentionValue(parseInt(e.target.value, 10));
    setIsSaveButtonDisabled(false);
  };

  const saveBtnClickhandler = () => {
    logHSTEvent(['amplitude'], 'web_events', AGGridSettingsSaved, {
      tab_selected: 'general'
    });
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

  useEffect(() => {
    if (Object.keys(selectedGridData).length > 0) {
      setFrameworkLogsValue(selectedGridData.testArtifacts.frameworkLogs);
      setLogsRetentionValue(selectedGridData.testArtifacts.logsRetention);
      setVideoLogsValue(selectedGridData.testArtifacts.videoLogs);
    }
  }, [selectedGridData]);

  return {
    frameworkLogsChangeHandler,
    frameworkLogsValue,
    logsRetentionChangeHandler,
    logsRetentionValue,
    isSaveButtonDisabled,
    isSavingInProgress,
    isTrialGrid,
    saveBtnClickhandler,
    videoLogsChangeHandler,
    videoLogValue
  };
};

export default useTestArtifacts;
