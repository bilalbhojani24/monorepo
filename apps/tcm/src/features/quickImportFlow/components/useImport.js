import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkTestManagementConnection, importProjects } from 'api/import.api';

import {
  importCleanUp,
  setCheckImportStatusClicked,
  setConnectionStatusMap,
  setCurrentScreen,
  setCurrentTestManagementTool,
  setImportStarted,
  setImportSteps,
  setJiraConfigurationStatus,
  setProjectForTestManagementImport,
  setSelectedRadioIdMap,
  setTestRailsCred,
  setTestRailsCredTouched,
  setZephyrCred,
  setZephyrCredTouched
} from '../slices/importSlice';

const useImport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserEmail = useSelector((state) => {
    if (!state.global.user.email) return 'procurement@browserstack.com';
    return state.global.user?.email;
  });

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

  const handleInputFieldChange = (key) => (e) => {
    const { value } = e.target;
    if (currentTestManagementTool === 'testrails') {
      dispatch(setTestRailsCred({ key, value }));
      dispatch(setTestRailsCredTouched({ key, value: true }));
    } else if (currentTestManagementTool === 'zephyr')
      dispatch(setZephyrCred({ key, value }));
  };

  const setConnectionStatus = ({ key, value }) => {
    dispatch(setConnectionStatusMap({ key, value }));
  };

  const handleTestConnection = (decider) => {
    if (currentTestManagementTool === 'testrails') {
      checkTestManagementConnection('testrail', testRailsCred)
        .then((data) => {
          // show the success banners
          if (decider === 'proceed') {
            dispatch(
              setProjectForTestManagementImport(
                data.projects.map((project) => ({ ...project, checked: true }))
              )
            );
            // set connection status
            setConnectionStatus({ key: 'testrails', value: '' }); // proceed button click
          } else setConnectionStatus({ key: 'testrails', value: 'success' });
        })
        .catch(() => {
          // show failure banner
          if (decider === 'proceed')
            setConnectionStatus({ key: 'testrails', value: '' });
          else setConnectionStatus({ key: 'testrails', value: 'error' });
        });
    } else if (currentTestManagementTool === 'zephyr') {
      checkTestManagementConnection('zephyr', zephyrCred)
        .then((data) => {
          if (decider === 'proceed') {
            dispatch(
              setProjectForTestManagementImport(
                data.projects.map((project) => ({ ...project, checked: true }))
              )
            );
            setConnectionStatus({ key: 'zephyr', value: '' });
          } else {
            setConnectionStatus({ key: 'zephyr', value: 'success' });
          }
        })
        .catch(() => {
          // show failure banner
          if (decider === 'proceed')
            setConnectionStatus({ key: 'zephyr', value: '' });
          else setConnectionStatus({ key: 'zephyr', value: 'error' });
        });
    }
    // set first step as current step and all other as upcoming.
    if (decider === 'proceed') {
      dispatch(
        setImportSteps(
          allImportSteps.map((step, idx) =>
            idx === 0
              ? { ...step, status: 'current' }
              : { ...step, status: 'upcoming' }
          )
        )
      );
    }
  };

  const handleStepChange = (prevStep, currentStep) =>
    allImportSteps.map((step) => {
      if (step.name.toLowerCase() === prevStep)
        return { ...step, status: 'complete' };
      if (step.name.toLowerCase() === currentStep)
        return { ...step, status: 'current' };
      if (step.name.toLowerCase() === 'confirm import')
        return { ...step, status: 'upcoming' };
      return step;
    });

  const commonProceedFlow = () => {
    handleTestConnection('proceed');

    dispatch(
      setImportSteps(handleStepChange('configure tool', 'configure data'))
    );
    dispatch(setCurrentScreen('configureData'));
  };

  const handleProceed = () => {
    if (currentTestManagementTool === 'testrails') {
      if (testRailsCred.key && testRailsCred.host && testRailsCred.email)
        commonProceedFlow();
      else
        Object.keys(testRailsCredTouched).forEach((key) => {
          dispatch(setTestRailsCredTouched({ key, value: true }));
        });
    } else if (currentTestManagementTool === 'zephyr') {
      if (
        (zephyrCred.jira_key && zephyrCred.host && zephyrCred.email,
        zephyrCred.zephyr_key)
      )
        commonProceedFlow();
      else
        Object.keys(zephyrCredTouched).forEach((key) => {
          dispatch(setZephyrCredTouched({ key, value: true }));
        });
    }
  };

  const handleConfigureDataProceed = () => {
    const noProjectSelected = testManagementProjects
      .map((project) => project.checked)
      .every((checked) => checked === false);

    if (!noProjectSelected) {
      dispatch(
        setImportSteps(handleStepChange('configure data', 'confirm import'))
      );
      dispatch(setCurrentScreen('confirmImport'));
    }
  };

  const handleConfirmImport = () => {
    if (currentTestManagementTool === 'testrails') {
      importProjects('testrail', {
        ...testRailsCred,
        testrail_projects: testManagementProjects
          .map((project) => (project.checked ? project : null))
          .filter((project) => project !== null)
      }).then(() => {
        // console.log('done successfully');
        // set first screen as configure tool
        // clean up all the states
      });
    } else if (currentTestManagementTool === 'zephyr') {
      importProjects('zephyr', {
        ...zephyrCred,
        projects: testManagementProjects
          .map((project) => (project.checked ? project : null))
          .filter((project) => project !== null)
      }).then(() => {
        // console.log('done successfully');
      });
    }
    dispatch(importCleanUp());
    dispatch(setImportStarted(true));
    dispatch(setCheckImportStatusClicked(false));
    navigate('/');
  };

  const isJiraConfiguredForZephyr = () => {
    dispatch(setJiraConfigurationStatus());
  };

  const setTestManagementTool = (tool) => {
    dispatch(setCurrentTestManagementTool(tool));
  };

  const handleRadioGroupChange = (testManagementTool) => (_, id) => {
    dispatch(setSelectedRadioIdMap({ key: testManagementTool, value: id }));
  };

  return {
    allImportSteps,
    importStatus,
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
    zephyrCred,
    zephyrCredTouched
  };
};

export default useImport;
