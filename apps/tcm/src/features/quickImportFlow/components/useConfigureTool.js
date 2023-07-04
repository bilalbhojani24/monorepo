import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logEventHelper } from 'utils/logEvent';

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
    (state) => state.import.loader.configureToolTestConnectionLoading
  );
  const configureToolProceedLoading = useSelector(
    (state) => state.import.loader.configureToolProceedLoading
  );

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

  const handleRadioGroupChange = (value, testManagementTool) => {
    dispatch(setSelectedRadioIdMap({ key: testManagementTool, value }));
  };

  const handleConnectNewAccount = () => {
    setShowConnectNewAccountModal(true);
    dispatch(logEventHelper('TM_QiConnectAccountPopupLoaded', {}));
  };
  const handleDisconnectAccount = () => {
    dispatch(setShowLoggedInScreen(false));
    setShowConnectNewAccountModal(false);
    dispatch(logEventHelper('TM_QiConnectAccountConfirmCtaClicked', {}));
  };

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const handleTestConnection = () => {
    dispatch(requestTestConnection());
  };

  const handleProceed = () => {
    dispatch(requestTestConnection(true));
    dispatch(logEventHelper('TM_QiConnectionProceedCtaClicked', {}));
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
