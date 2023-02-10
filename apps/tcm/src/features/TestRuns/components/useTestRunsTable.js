import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { setAllTestRuns, setMetaPage } from '../slices/testRunsSlice';

const useTestRuns = () => {
  const dispatch = useDispatch();
  const { projectId } = useParams();

  const isTestRunsLoading = useSelector(
    (state) => state.testRuns.isLoading.testRuns
  );
  const metaPage = useSelector((state) => state.testRuns.metaPage);
  const allTestRuns = useSelector((state) => state.testRuns.allTestRuns);
  const currentTab = useSelector((state) => state.testRuns.currentTab);

  const isAddTestRunsFormVisible = useSelector(
    (state) => state.testRuns.isVisible.addTestRunsForm
  );

  return {
    metaPage,
    isTestRunsLoading,
    currentTab,
    allTestRuns,
    projectId,
    isAddTestRunsFormVisible
  };
};

export default useTestRuns;
