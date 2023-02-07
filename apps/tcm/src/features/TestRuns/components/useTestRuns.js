import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTestRuns } from 'api/testruns.api';
import { setSelectedProject } from 'globalSlice';

import {
  setAllTestRuns,
  setCurrentTab,
  setLoader
} from '../slices/testRunsSlice';

const useTestRuns = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const allTestRuns = useSelector((state) => state.testRuns.allTestRuns);
  const currentTab = useSelector((state) => state.testRuns.currentTab);

  const isAddTestRunsFormVisible = useSelector(
    (state) => state.testRuns.isVisible.addTestRunsForm
  );

  const setTestRunsLoader = (isLoading) => {
    dispatch(setLoader('testRuns', isLoading));
  };

  const fetchAllTestRuns = () => {
    if (projectId) {
      setTestRunsLoader(true);
      dispatch(setSelectedProject(projectId));
      getTestRuns({ projectId }).then((data) => {
        dispatch(setAllTestRuns(data?.testruns || []));
        setTestRunsLoader(false);
      });
    } else dispatch(setAllTestRuns([]));
  };

  const handleTabChange = (tabName) => {
    dispatch(setCurrentTab(tabName.name));
  };

  return {
    currentTab,
    allTestRuns,
    projectId,
    isAddTestRunsFormVisible,
    fetchAllTestRuns,
    handleTabChange
  };
};

export default useTestRuns;
