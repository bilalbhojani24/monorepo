import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getLatestQuickImportConfig } from 'api/import.api';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import { ZEPHYR } from '../const/importSteps';
import {
  setConfigureToolPageLoading,
  setCurrentScreen,
  setCurrentTestManagementTool,
  setShowLoggedInScreen
} from '../slices/importSlice';
import { retryQuickImport, startImport } from '../slices/quickImportThunk';

const useImport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isFromOnboarding = location?.state?.isFromOnboarding;
  // global selector
  const getUserEmail = useSelector((state) => state.global.user?.email);

  const hasProjects = useSelector((state) => state.onboarding.hasProjects);
  const testRailsCred = useSelector((state) => state.import.testRailsCred);
  const zephyrCred = useSelector((state) => state.import.zephyrCred);
  const testManagementProjects = useSelector(
    (state) => state.import.projectsForTestManagementImport
  );
  const currentScreen = useSelector((state) => state.import.currentScreen);
  const connectionStatusMap = useSelector(
    (state) => state.import.connectionStatusMap
  );
  const currentTestManagementTool = useSelector(
    (state) => state.import.currentTestManagementTool
  );
  const importStatus = useSelector((state) => state.import.importStatus);
  const configureToolPageLoading = useSelector(
    (state) => state.import.configureToolPageLoading
  );

  const testRailsCredTouched = useSelector(
    (state) => state.import.testRailsCredTouched
  );
  const zephyrCredTouched = useSelector(
    (state) => state.import.zephyrCredTouched
  );

  const configureToolTestConnectionLoading = useSelector(
    (state) => state.import.configureToolTestConnectionLoading
  );
  const configureToolProceedLoading = useSelector(
    (state) => state.import.configureToolProceedLoading
  );
  const configureToolProceed = useSelector(
    (state) => state.import.configureToolProceed
  );
  const showErrorForConfigData = useSelector(
    (state) => state.import.showErrorForConfigData
  );
  const beginImportLoading = useSelector(
    (state) => state.import.beginImportLoading
  );
  const topImportInfoSteps = useSelector(
    (state) => state.import.topImportInfoSteps
  );
  const loggedInScreen = useSelector((state) => state.import.loggedInScreen);
  const loggedInForTool = useSelector((state) => state.import.loggedInForTool);
  const showArtificialLoader = useSelector(
    (state) => state.import.showArtificialLoader
  );

  const handleBeginImport = () => {
    dispatch(startImport(navigate));
  };

  const setTestManagementTool = (tool) => {
    dispatch(
      logEventHelper('TM_QiToolSelected', {
        tool_selected: tool
      })
    );
    dispatch(setCurrentTestManagementTool(tool));
  };

  const onCancelClickHandler = () => {
    // global cancel on header
    dispatch(
      logEventHelper('TM_QiCancelClicked', {
        tool_selected: currentTestManagementTool
      })
    );
    if (isFromOnboarding) {
      navigate(
        hasProjects
          ? AppRoute.ROOT
          : routeFormatter(AppRoute.TEST_CASES, { projectId: 'new' }),
        {
          replace: true
        }
      );
    } else navigate(-1);
  };

  const populateQuickImportCredentials = () => {
    dispatch(setConfigureToolPageLoading(true));

    getLatestQuickImportConfig()
      .then((response) => {
        const testTool = response.import_type.split('_')[0];
        dispatch(setCurrentTestManagementTool(testTool));
        dispatch(retryQuickImport(true));
      })
      .catch(() => {
        dispatch(setConfigureToolPageLoading(false));
      });
  };

  const handleChangeSetup = () => {
    dispatch(
      logEventHelper('TM_QiChangeSetupClicked', {
        tool_selected: currentTestManagementTool
      })
    );
  };

  const handleTopSectionCtaClick = (redirectTo) => {
    dispatch(setCurrentScreen(redirectTo));
    dispatch(setShowLoggedInScreen(true));
  };

  return {
    beginImportLoading,
    configureToolPageLoading,
    configureToolProceed,
    configureToolProceedLoading,
    configureToolTestConnectionLoading,
    connectionStatusMap,
    currentScreen,
    currentTestManagementTool,
    getUserEmail,
    loggedInScreen,
    loggedInForTool,
    showArtificialLoader,
    handleChangeSetup,
    handleBeginImport,
    handleTopSectionCtaClick,
    importStatus,
    isFromOnboarding,
    onCancelClickHandler,
    populateQuickImportCredentials,
    setTestManagementTool,
    showErrorForConfigData,
    testManagementProjects,
    testRailsCred,
    testRailsCredTouched,
    topImportInfoSteps,
    zephyrCred,
    zephyrCredTouched,
    currentEmail:
      currentTestManagementTool === ZEPHYR
        ? zephyrCred?.email
        : testRailsCred?.email
  };
};

export default useImport;
