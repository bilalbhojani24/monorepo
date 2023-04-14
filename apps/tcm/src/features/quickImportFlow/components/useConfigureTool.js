import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logEventHelper } from 'utils/logEvent';

import {
  setCurrentTestManagementTool,
  setJiraConfigurationStatus,
  setSelectedRadioIdMap,
  setShowLoggedInScreen,
  setTestRailsCred,
  setTestRailsCredTouched,
  setZephyrCred
} from '../slices/importSlice';

const useConfigureTool = () => {
  const dispatch = useDispatch();
  const [showConnectNewAccountModal, setShowConnectNewAccountModal] =
    useState(false);

  const jiraConfiguredForZephyr = useSelector(
    (state) => state.import.isJiraConfiguredForZephyr
  );
  const currentTestManagementTool = useSelector(
    (state) => state.import.currentTestManagementTool
  );
  const selectedRadioIdMap = useSelector(
    (state) => state.import.selectedRadioIdMap
  );
  const configureToolProceed = useSelector(
    (state) => state.import.configureToolProceed
  );
  const loggedInScreen = useSelector((state) => state.import.loggedInScreen);
  const loggedInForTool = useSelector((state) => state.import.loggedInForTool);
  const testRailsCred = useSelector((state) => state.import.testRailsCred);
  const zephyrCred = useSelector((state) => state.import.zephyrCred);
  const connectionStatusMap = useSelector(
    (state) => state.import.connectionStatusMap
  );
  const testRailsCredTouched = useSelector(
    (state) => state.import.testRailsCredTouched
  );
  const zephyrCredTouched = useSelector(
    (state) => state.import.zephyrCredTouched
  );
  const isJiraConfiguredForZephyr = () => {
    dispatch(setJiraConfigurationStatus());
  };

  const setTestManagementTool = (tool) => {
    dispatch(
      logEventHelper('TM_QiToolSelected', {
        tool_selected: tool
      })
    );
    dispatch(setCurrentTestManagementTool(tool));
  };

  const handleInputFieldChange = (key) => (e) => {
    const { value } = e.target;
    if (currentTestManagementTool === 'testrails') {
      dispatch(setTestRailsCred({ key, value }));
      dispatch(setTestRailsCredTouched({ key, value: true }));
    } else if (currentTestManagementTool === 'zephyr')
      dispatch(setZephyrCred({ key, value }));
  };

  const handleRadioGroupChange = (testManagementTool) => (_, id) => {
    dispatch(setSelectedRadioIdMap({ key: testManagementTool, value: id }));
  };

  const handleConnectNewAccount = () => {
    setShowConnectNewAccountModal(true);
  };
  const handleDisconnectAccount = () => {
    dispatch(setShowLoggedInScreen(false));
    setShowConnectNewAccountModal(false);
  };

  return {
    connectionStatusMap,
    configureToolProceed,
    jiraConfiguredForZephyr,
    handleInputFieldChange,
    isJiraConfiguredForZephyr,
    setTestManagementTool,
    currentTestManagementTool,
    handleRadioGroupChange,
    selectedRadioIdMap,
    handleConnectNewAccount,
    loggedInScreen,
    loggedInForTool,
    showConnectNewAccountModal,
    setShowConnectNewAccountModal,
    handleDisconnectAccount,
    currentEmail:
      currentTestManagementTool === 'zephyr'
        ? zephyrCred?.email
        : testRailsCred?.email,
    testRailsCred,
    zephyrCred,
    testRailsCredTouched,
    zephyrCredTouched
  };
};

export default useConfigureTool;
