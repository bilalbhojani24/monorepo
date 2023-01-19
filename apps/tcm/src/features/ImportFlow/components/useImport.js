import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { insertProjects, testConnection } from 'api/import.api';

import {
  setConfigureDataTestRails,
  setCurrentScreen,
  setImportSteps,
  setProjectForTestRailsImport,
  setTestRailsConnectionState,
  setTestRailsCred,
} from '../slices/importSlice';

const useImport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserEmail = useSelector((state) => {
    if (!state.global.user.email) return 'procurement@browserstack.com';
    return state.global.user?.email;
  });

  const testRailsCred = useSelector((state) => state.import.testRailsCred);
  const testRailProjects = useSelector(
    (state) => state.import.projectsForTestRailImport,
  );
  const currentScreen = useSelector((state) => state.import.currentScreen);
  const selectedTestRailsProjects = useSelector(
    (state) => state.import.selectedProjectsTestRailImport,
  );
  const allImportSteps = useSelector((state) => state.import.importSteps);
  const testRailsConnectionStatus = useSelector(
    (state) => state.import.testRailsConnectionEst,
  );

  const handleInputFieldChange = (key) => (e) => {
    const { value } = e.target;
    dispatch(setTestRailsCred({ key, value }));
  };

  const handleTestConnection = () => {
    testConnection(testRailsCred)
      .then((data) => {
        // show the success banners
        dispatch(setTestRailsConnectionState('success'));
        dispatch(setProjectForTestRailsImport(data.projects));
      })
      .catch(() => {
        // show failure banner
        dispatch(setTestRailsConnectionState('error'));
      });
  };

  const handleStepChange = (prevStep, currentStep) =>
    allImportSteps.map((step) => {
      if (step.name.toLowerCase() === prevStep)
        return { ...step, status: 'complete' };
      if (step.name.toLowerCase() === currentStep)
        return { ...step, status: 'current' };
      return step;
    });

  const handleProceed = () => {
    if (testRailProjects.length === 0) handleTestConnection();

    dispatch(
      setImportSteps(handleStepChange('configure tool', 'configure data')),
    );
    dispatch(setCurrentScreen('configureData'));
  };

  const setSelectedProjects = (projectsArray) => {
    if (projectsArray.length === 0) dispatch(setConfigureDataTestRails([]));
    else {
      const onlyChecked = projectsArray.map((project) => {
        if (project.checked) {
          const { checked, ...rest } = project;
          return rest;
        }
        return null;
      });
      const filteredArray = onlyChecked.filter((item) => item);
      dispatch(setConfigureDataTestRails(filteredArray));
    }
  };

  const handleConfigureDataProceed = () => {
    dispatch(
      setImportSteps(handleStepChange('configure data', 'confirm import')),
    );
    dispatch(setCurrentScreen('confirmImport'));
  };

  const handleConfirmImport = () => {
    insertProjects({
      ...testRailsCred,
      testrail_projects: selectedTestRailsProjects,
    }).then(() => {
      // console.log('done successfully');
    });
    navigate('/');
  };

  return {
    allImportSteps,
    getUserEmail,
    testRailProjects,
    testRailsCred,
    testRailsConnectionStatus,
    handleInputFieldChange,
    handleTestConnection,
    handleProceed,
    currentScreen,
    setSelectedProjects,
    selectedTestRailsProjects,
    handleConfigureDataProceed,
    handleConfirmImport,
  };
};

export default useImport;
