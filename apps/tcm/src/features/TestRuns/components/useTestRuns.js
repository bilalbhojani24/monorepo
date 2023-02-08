import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTestRuns } from 'api/testruns.api';
import { setSelectedProject } from 'globalSlice';

import { TABS_ARRAY } from '../const/immutableConst';
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
  const isTestRunsLoading = useSelector(
    (state) => state.testRuns.isLoading.testRuns
  );

  const isAddTestRunsFormVisible = useSelector(
    (state) => state.testRuns.isVisible.addTestRunsForm
  );

  const setTestRunsLoader = (value) => {
    dispatch(setLoader({ key: 'testRuns', value }));
  };

  const fetchAllTestRuns = () => {
    if (projectId) {
      dispatch(setSelectedProject(projectId));
      setTestRunsLoader(true);
      const isClosed = currentTab === TABS_ARRAY[1]?.name;
      getTestRuns({ projectId, isClosed }).then((data) => {
        dispatch(setAllTestRuns(data?.testruns || []));
        setTestRunsLoader(false);
      });
    } else dispatch(setAllTestRuns([]));
  };

  const handleTabChange = (tabName) => {
    dispatch(setCurrentTab(tabName.name));
  };

  useEffect(() => {
    fetchAllTestRuns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, currentTab]);

  return {
    isTestRunsLoading,
    currentTab,
    allTestRuns,
    projectId,
    isAddTestRunsFormVisible,
    fetchAllTestRuns,
    handleTabChange
  };
};

export default useTestRuns;
