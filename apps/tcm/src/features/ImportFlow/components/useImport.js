import { useDispatch, useSelector } from 'react-redux';

import { testConnection } from '../../../api/import.api';
import {
  setCurrentScreen,
  setProjectForTestRailsImport,
  setTestRailsCred,
} from '../slices/importSlice';

const useImport = () => {
  const dispatch = useDispatch();

  const getUserEmail = useSelector((state) => {
    if (!state.global.user.email) return 'procurement@browserstack.com';
    return state.global.user?.email;
  });

  const testRailsCred = useSelector((state) => state.import.testRailsCred);
  const testRailProjects = useSelector(
    (state) => state.import.projectsForTestRailImport,
  );
  const currentScreen = useSelector((state) => state.import.currentScreen);

  const handleInputFieldChange = (key) => (e) => {
    const { value } = e.target;
    dispatch(setTestRailsCred({ key, value }));
  };

  const handleTestConnection = () => {
    // make the api call
    testConnection(testRailsCred)
      .then((data) => {
        // show the success banner
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

  return {
    getUserEmail,
    testRailProjects,
    handleInputFieldChange,
    handleTestConnection,
    handleProceed,
    currentScreen,
  };
};

export default useImport;
