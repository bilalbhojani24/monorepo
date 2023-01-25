import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  checkTestManagementConnection,
  getJiraConfigStatus,
  importProjects
} from 'api/import.api';

import {
  setConnectionStatusMap,
  setCurrentScreen,
  setCurrentTestManagementTool,
  setImportSteps,
  setProjectForTestManagementImport,
  setSelectedRadioIdMap,
  setTestRailsCred,
  setZephyrCred
} from '../slices/importSlice';

const useImport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jiraConfigured, setJiraConfigured] = useState(false);

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
  const selectedRadioIdMap = useSelector(
    (state) => state.import.selectedRadioIdMap
  );

  const handleInputFieldChange = (key) => (e) => {
    const { value } = e.target;
    if (currentTestManagementTool === 'testrails')
      dispatch(setTestRailsCred({ key, value }));
    else if (currentTestManagementTool === 'zephyr')
      dispatch(setZephyrCred({ key, value }));
  };

  const handleTestConnection = (decider) => {
    if (currentTestManagementTool === 'testrails') {
      checkTestManagementConnection('testrail', testRailsCred)
        .then((data) => {
          // show the success banners
          dispatch(
            setConnectionStatusMap({ key: 'testrails', value: 'success' })
          );
          if (decider === 'proceed')
            dispatch(
              setProjectForTestManagementImport(
                data.projects.map((project) => ({ ...project, checked: true }))
              )
            );
        })
        .catch(() => {
          // show failure banner
          dispatch(
            setConnectionStatusMap({ key: 'testrails', value: 'error' })
          );
        });
    } else if (currentTestManagementTool === 'zephyr') {
      checkTestManagementConnection('zephyr', zephyrCred)
        .then((data) => {
          dispatch(setConnectionStatusMap({ key: 'zephyr', value: 'success' }));
          if (decider === 'proceed')
            dispatch(
              setProjectForTestManagementImport(
                data.projects.map((project) => ({ ...project, checked: true }))
              )
            );
        })
        .catch(() => {
          // show failure banner
          dispatch(setConnectionStatusMap({ key: 'zephyr', value: 'error' }));
        });
    }
    // set first step as current step and all other as upcoming.
    dispatch(
      setImportSteps(
        allImportSteps.map((step, idx) =>
          idx === 0
            ? { ...step, status: 'current' }
            : { ...step, status: 'upcoming' }
        )
      )
    );
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

  const handleProceed = () => {
    handleTestConnection('proceed');

    dispatch(
      setImportSteps(handleStepChange('configure tool', 'configure data'))
    );
    dispatch(setCurrentScreen('configureData'));
  };

  const handleConfigureDataProceed = () => {
    dispatch(
      setImportSteps(handleStepChange('configure data', 'confirm import'))
    );
    dispatch(setCurrentScreen('confirmImport'));
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
    navigate('/');
  };

  const isJiraConfiguredForZephyr = () => {
    getJiraConfigStatus()
      .then(() => {
        setJiraConfigured(true);
      })
      .catch(() => setJiraConfigured(false));
  };

  const setTestManagementTool = (tool) => {
    dispatch(setCurrentTestManagementTool(tool));
  };

  const handleRadioGroupChange = (testManagementTool) => (_, id) => {
    dispatch(setSelectedRadioIdMap({ key: testManagementTool, value: id }));
  };

  return {
    allImportSteps,
    currentTestManagementTool,
    getUserEmail,
    isJiraConfiguredForZephyr,
    jiraConfigured,
    testManagementProjects,
    testRailsCred,
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
    zephyrCred
  };
};

export default useImport;
