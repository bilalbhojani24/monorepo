import { useState } from 'react';
import { useSelector } from 'react-redux';
import { notify } from '@browserstack/bifrost';
import { updateSettings } from 'api/index';
import { getGridData } from 'features/GridConsole/slices/selector';
import { getUserDetails } from 'globalSlice/selector';

const useTestArtifacts = (notifactionComponent) => {
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
        notify(notifactionComponent, {
          position: 'top-right',
          duration: 4000
        });
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

  return {
    frameworkLogsChangeHandler,
    frameworkLogsValue,
    logsRetentionChangeHandler,
    logsRetentionValue,
    isSaveButtonDisabled,
    isSavingInProgress,
    saveBtnClickhandler,
    videoLogsChangeHandler,
    videoLogValue
  };
};

export default useTestArtifacts;
