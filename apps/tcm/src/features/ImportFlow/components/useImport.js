import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { insertProjects, testConnection } from 'api/import.api';

import {
  setConfigureDataTestRails,
  setCurrentScreen,
  setProjectForTestRailsImport,
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

  const handleInputFieldChange = (key) => (e) => {
    const { value } = e.target;
    dispatch(setTestRailsCred({ key, value }));
  };

  const handleTestConnection = () => {
    // make the api call
    testConnection(testRailsCred)
      .then((data) => {
        // show the success banners
        dispatch(setProjectForTestRailsImport(data.projects));
      })
      .catch(() => {
        // show failure banner
      });
  };

  const handleProceed = () => {
    if (testRailProjects.length === 0) handleTestConnection();
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
      // console.log(filteredArray);
      dispatch(setConfigureDataTestRails(filteredArray));
    }
  };

  const handleConfigureDataProceed = () => {
    dispatch(setCurrentScreen('confirmImport'));
  };

  const handleConfirmImport = () => {
    insertProjects({
      ...testRailsCred,
      testrail_projects: selectedTestRailsProjects,
    }).then(() => {
      // console.log('done successfully');
    });
    navigate(-1);
  };

  return {
    getUserEmail,
    testRailProjects,
    testRailsCred,
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
