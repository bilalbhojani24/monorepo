import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  // checkTestManagementConnection,
  getLatestQuickImportConfig,
  importProjects
} from 'api/import.api';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import { SCREEN_3 } from '../const/importSteps';
import {
  setBeginImportLoading,
  setCheckImportStatusClicked,
  setConfigureToolPageLoading,
  setCurrentScreen,
  setCurrentTestManagementTool,
  setErrorForConfigureData,
  setImportId,
  setImportStarted,
  setImportStatusOngoing,
  setLatestImportTool,
  setRetryImport,
  setShowLoggedInScreen
} from '../slices/importSlice';
// import { handleArtificialLoader } from '../slices/quickImportThunk';

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
  const importIdBeforeImport = useSelector(
    (state) => state.import.importIdBeforeImport
  );

  const handleConfigureDataProceed = () => {
    // dispatch(logEventHelper(proceedActionEventName(), {}));
    const noProjectSelected = testManagementProjects
      .map((project) => project.checked)
      .every((checked) => checked === false);

    if (!noProjectSelected) {
      dispatch(setCurrentScreen(SCREEN_3));
    } else {
      dispatch(setErrorForConfigureData(true));
    }
  };

  const beginImportSuccessful = () => {
    dispatch(setBeginImportLoading(false));
    dispatch(setImportId(importIdBeforeImport));
    navigate(AppRoute.ROOT);
    dispatch(setImportStarted(true));
    dispatch(setCheckImportStatusClicked(false));
    dispatch(setImportStatusOngoing());
  };

  const handleConfirmImport = () => {
    // dispatch(logEventHelper(proceedActionEventName(), {}));
    dispatch(setBeginImportLoading(true));
    if (currentTestManagementTool === 'testrails') {
      importProjects('testrail', {
        ...testRailsCred,
        import_id: importIdBeforeImport,
        testrail_projects: testManagementProjects
          .map((project) => (project.checked ? project : null))
          .filter((project) => project !== null)
      })
        .then(() => {
          beginImportSuccessful();
        })
        .catch(() => {
          dispatch(setBeginImportLoading(false));
        });
    } else if (currentTestManagementTool === 'zephyr') {
      importProjects('zephyr', {
        ...zephyrCred,
        import_id: importIdBeforeImport,
        projects: testManagementProjects
          .map((project) => (project.checked ? project : null))
          .filter((project) => project !== null)
      })
        .then(() => {
          beginImportSuccessful();
        })
        .catch(() => {
          dispatch(setBeginImportLoading(false));
        });
    }
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
        dispatch(
          setLatestImportTool(testTool === 'testrail' ? 'testrails' : testTool)
        );
        dispatch(
          setCurrentTestManagementTool(
            testTool === 'testrail' ? 'testrails' : testTool
          )
        );
        dispatch(setRetryImport({ id: response.import_id, testTool }));
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
    handleConfigureDataProceed,
    handleConfirmImport,
    // handleProceed,
    // handleTestConnection,
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
      currentTestManagementTool === 'zephyr'
        ? zephyrCred?.email
        : testRailsCred?.email
  };
};

export default useImport;
