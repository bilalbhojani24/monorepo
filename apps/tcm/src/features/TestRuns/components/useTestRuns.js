import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addTestRun, getTestRuns } from 'api/testruns.api';
import { setSelectedProject } from 'globalSlice/globalSlice';

import {
  setAddTestRunsModalVisibility,
  updateAllTestRuns,
} from '../slices/testRunsSlice';

const useTestRunss = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const allTestRunsArray = useSelector(
    (state) => state.testRuns.allTestRunsArray,
  );
  const showAddModal = useSelector(
    (state) => state.testRuns.showAddTestRunsModal,
  );

  const addingTestRuns = () => {
    dispatch(setAddTestRunsModalVisibility(true));
  };

  const fetchAllTestRuns = () => {
    if (projectId)
      getTestRuns({ projectId }).then((data) => {
        dispatch(updateAllTestRuns(data?.testruns || []));
      });
    else dispatch(updateAllTestRuns([]));
  };

  useEffect(() => {
    dispatch(setSelectedProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return {
    allTestRunsArray,
    showAddModal,
    addingTestRuns,
    projectId,
    fetchAllTestRuns,
  };
};

export default useTestRunss;
