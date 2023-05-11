import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { logEventHelper } from 'utils/logEvent';

import { SCREEN_1 } from '../const/importSteps';
import {
  setCurrentTestManagementTool,
  setJiraConfigurationStatus,
  setSelectedRadioIdMap,
  setShowLoggedInScreen
} from '../slices/importSlice';
import { requestTestConnection } from '../slices/quickImportThunk';

const useConfigureTool = () => {
  const dispatch = useDispatch();
  const [showConnectNewAccountModal, setShowConnectNewAccountModal] =
    useState(false);
  const { projectId } = useParams();

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
  const configureToolTestConnectionLoading = useSelector(
    (state) => state.import.configureToolTestConnectionLoading
  );
  const configureToolProceedLoading = useSelector(
    (state) => state.import.configureToolProceedLoading
  );
  const currentScreen = useSelector((state) => state.import.currentScreen);
  const loggedInScreen = useSelector((state) => state.import.loggedInScreen);
  const loggedInForTool = useSelector((state) => state.import.loggedInForTool);
  const testRailsCred = useSelector((state) => state.import.testRailsCred);
  const zephyrCred = useSelector((state) => state.import.zephyrCred);
  const connectionStatusMap = useSelector(
    (state) => state.import.connectionStatusMap
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

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const handleTestConnection = (logEvent = true) => {
    dispatch(requestTestConnection());
    if (logEvent && currentScreen === SCREEN_1) {
      dispatch(
        logEventHelper('TM_QiStep1TestConnectionBtnClicked', {
          project_id: projectId,
          tool_selected: currentTestManagementTool
        })
      );
    }
  };

  const handleProceed = () => {
    dispatch(requestTestConnection(true));
  };

  return {
    connectionStatusMap,
    configureToolProceed,
    jiraConfiguredForZephyr,
    handleProceed,
    handleTestConnection,
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
    configureToolTestConnectionLoading,
    configureToolProceedLoading,
    currentEmail:
      currentTestManagementTool === 'zephyr'
        ? zephyrCred?.email
        : testRailsCred?.email,
    testRailsCred,
    zephyrCred
  };
};

export default useConfigureTool;
