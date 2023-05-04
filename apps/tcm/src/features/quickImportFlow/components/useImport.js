import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  checkTestManagementConnection,
  getLatestQuickImportConfig,
  importProjects
} from 'api/import.api';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import {
  COMPLETE_STEP,
  CONFIGURE_DATA,
  CONFIGURE_TOOL,
  CONFIRM_IMPORT,
  CURRENT_STEP,
  SCREEN_1,
  SCREEN_2,
  SCREEN_3,
  UPCOMING_STEP
} from '../const/importSteps';
import {
  setBeginImportLoading,
  setCheckImportStatusClicked,
  setConfigureToolPageLoading,
  setConfigureToolProceeded,
  setConfigureToolProceedLoading,
  setConfigureToolTestConnectionLoading,
  setConnectionStatusMap,
  setCurrentScreen,
  setCurrentTestManagementTool,
  setErrorForConfigureData,
  setImportIdBeforeImport,
  setImportStarted,
  setImportStatusOngoing,
  setImportSteps,
  setJiraConfigurationStatus,
  setLatestImportTool,
  setProjectForTestManagementImport,
  setRetryImport,
  setSelectedRadioIdMap,
  setTestRailsCred,
  setTestRailsCredTouched,
  setZephyrCred,
  setZephyrCredTouched
} from '../slices/importSlice';

const useImport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { projectId } = useParams();

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
  const allImportSteps = useSelector((state) => state.import.importSteps);
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
  const selectedRadioIdMap = useSelector(
    (state) => state.import.selectedRadioIdMap
  );
  const testRailsCredTouched = useSelector(
    (state) => state.import.testRailsCredTouched
  );
  const zephyrCredTouched = useSelector(
    (state) => state.import.zephyrCredTouched
  );
  const jiraConfiguredForZephyr = useSelector(
    (state) => state.import.isJiraConfiguredForZephyr
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
  const importIdBeforeImport = useSelector(
    (state) => state.import.importIdBeforeImport
  );

  const handleInputFieldChange = (key) => (e) => {
    e?.preventDefault();
    const { value } = e.target;
    if (currentTestManagementTool === 'testrails') {
      dispatch(setTestRailsCred({ key, value }));
      dispatch(setTestRailsCredTouched({ key, value: true }));
    } else if (currentTestManagementTool === 'zephyr')
      dispatch(setZephyrCred({ key, value }));
    dispatch(setZephyrCredTouched({ key, value: true }));
  };

  const setConnectionStatus = ({ key, value }) => {
    dispatch(setConnectionStatusMap({ key, value }));
  };

  const handleStepChange = (prevStep, currentStep) =>
    allImportSteps.map((step) => {
      if (step.name === prevStep) return { ...step, status: COMPLETE_STEP };
      if (step.name === currentStep) return { ...step, status: CURRENT_STEP };
      if (step.name === CONFIRM_IMPORT)
        return { ...step, status: UPCOMING_STEP };
      return step;
    });

  const trimSpacesTestRails = () => {
    Object.entries(testRailsCred).forEach(([key, value]) => {
      dispatch(setTestRailsCred({ key, value: value?.trim() }));
    });
  };

  const trimSpacesZephyr = () => {
    Object.entries(zephyrCred).forEach(([key, value]) => {
      dispatch(setZephyrCred({ key, value: value?.trim() }));
    });
  };

  const connectionSuccessful = (data) => {
    dispatch(
      setProjectForTestManagementImport(
        data.projects.map((project) => ({
          ...project,
          checked: true
        }))
      )
    );
    if (data?.import_id) dispatch(setImportIdBeforeImport(data?.import_id));
    dispatch(setConfigureToolProceeded(true));
    dispatch(setImportSteps(handleStepChange(CONFIGURE_TOOL, CONFIGURE_DATA)));
    dispatch(setCurrentScreen(SCREEN_2));
    dispatch(setConfigureToolProceedLoading(false));
  };

  const connectionFailed = (decider) => {
    if (decider === 'proceed') dispatch(setConfigureToolProceedLoading(false));
    else dispatch(setConfigureToolTestConnectionLoading(false));
  };

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const handleTestConnection = (decider, logEvent = true) => {
    if (logEvent && currentScreen === SCREEN_1) {
      dispatch(
        logEventHelper('TM_QiStep1TestConnectionBtnClicked', {
          project_id: projectId,
          tool_selected: currentTestManagementTool
        })
      );
    }
    if (
      (currentTestManagementTool === 'testrails' &&
        testRailsCred.key?.trim() &&
        testRailsCred.host?.trim() &&
        testRailsCred.email?.trim()) ||
      (currentTestManagementTool === 'zephyr' &&
        zephyrCred.jira_key?.trim() &&
        zephyrCred.host?.trim() &&
        zephyrCred.email?.trim() &&
        zephyrCred.zephyr_key?.trim())
    ) {
      if (decider === 'proceed') {
        dispatch(setConfigureToolProceedLoading(true));
      } else {
        dispatch(setConfigureToolTestConnectionLoading(true));
      }

      if (currentTestManagementTool === 'testrails') {
        checkTestManagementConnection('testrail', testRailsCred)
          .then((data) => {
            // show the success banners
            if (decider === 'proceed') {
              connectionSuccessful(data);
              // set connection status
              setConnectionStatus({ key: 'testrails', value: '' }); // proceed button click
            } else {
              setConnectionStatus({ key: 'testrails', value: 'success' });
              dispatch(setConfigureToolTestConnectionLoading(false));
            }
            trimSpacesTestRails();
          })
          .catch(() => {
            // show failure banner
            trimSpacesTestRails();
            connectionFailed(decider);
            setConnectionStatus({ key: 'testrails', value: 'error' });
          });
      } else if (currentTestManagementTool === 'zephyr') {
        checkTestManagementConnection('zephyr', zephyrCred)
          .then((data) => {
            if (decider === 'proceed') {
              connectionSuccessful(data);
              setConnectionStatus({ key: 'zephyr', value: '' });
            } else {
              setConnectionStatus({ key: 'zephyr', value: 'success' });
              dispatch(setConfigureToolTestConnectionLoading(false));
            }
            trimSpacesZephyr();
          })
          .catch(() => {
            // show failure banner
            trimSpacesZephyr();
            connectionFailed(decider);
            setConnectionStatus({ key: 'zephyr', value: 'error' });
          });
      }
    } else if (currentTestManagementTool === 'testrails') {
      Object.keys(testRailsCredTouched).forEach((key) => {
        dispatch(setTestRailsCredTouched({ key, value: true }));
      });
      trimSpacesTestRails();
    } else if (currentTestManagementTool === 'zephyr') {
      Object.keys(zephyrCredTouched).forEach((key) => {
        dispatch(setZephyrCredTouched({ key, value: true }));
      });
      trimSpacesZephyr();
    }
  };

  const proceedActionEventName = () => {
    let stepNumber = -1;
    if (currentScreen === SCREEN_1) stepNumber = 1;
    if (currentScreen === SCREEN_2) stepNumber = 2;
    if (currentScreen === SCREEN_3) stepNumber = 3;
    return `TM_QiStep${stepNumber}ProceedBtnClicked`;
  };

  const handleProceed = () => {
    dispatch(
      logEventHelper(proceedActionEventName(), {
        tool_selected: currentTestManagementTool
      })
    );
    if (currentTestManagementTool === 'testrails') {
      if (testRailsCred.key && testRailsCred.host && testRailsCred.email)
        handleTestConnection('proceed', false);
      else {
        Object.keys(testRailsCredTouched).forEach((key) => {
          dispatch(setTestRailsCredTouched({ key, value: true }));
        });
      }
    } else if (currentTestManagementTool === 'zephyr') {
      if (
        (zephyrCred.jira_key && zephyrCred.host && zephyrCred.email,
        zephyrCred.zephyr_key)
      )
        handleTestConnection('proceed', false);
      else {
        Object.keys(zephyrCredTouched).forEach((key) => {
          dispatch(setZephyrCredTouched({ key, value: true }));
        });
      }
    }
  };

  const handleConfigureDataProceed = () => {
    dispatch(logEventHelper(proceedActionEventName(), {}));
    const noProjectSelected = testManagementProjects
      .map((project) => project.checked)
      .every((checked) => checked === false);

    if (!noProjectSelected) {
      dispatch(
        setImportSteps(handleStepChange(CONFIGURE_DATA, CONFIRM_IMPORT))
      );
      dispatch(setCurrentScreen(SCREEN_3));
    } else {
      dispatch(setErrorForConfigureData(true));
    }
  };

  const beginImportSuccessful = () => {
    dispatch(setBeginImportLoading(false));
    navigate(AppRoute.ROOT);
    dispatch(setImportStarted(true));
    dispatch(setCheckImportStatusClicked(false));
    dispatch(setImportStatusOngoing());
  };

  const handleConfirmImport = () => {
    dispatch(logEventHelper(proceedActionEventName(), {}));
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

  const onCancelClickHandler = () => {
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

  return {
    isFromOnboarding,
    allImportSteps,
    beginImportLoading,
    importStatus,
    configureToolProceed,
    currentTestManagementTool,
    getUserEmail,
    isJiraConfiguredForZephyr,
    jiraConfiguredForZephyr,
    testManagementProjects,
    testRailsCred,
    testRailsCredTouched,
    connectionStatusMap,
    handleInputFieldChange,
    handleTestConnection,
    handleProceed,
    currentScreen,
    setTestManagementTool,
    selectedRadioIdMap,
    handleConfigureDataProceed,
    handleConfirmImport,
    handleRadioGroupChange,
    showErrorForConfigData,
    zephyrCred,
    zephyrCredTouched,
    configureToolTestConnectionLoading,
    configureToolProceedLoading,
    configureToolPageLoading,
    onCancelClickHandler,
    handleChangeSetup,
    populateQuickImportCredentials
  };
};

export default useImport;
