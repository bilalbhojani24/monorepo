import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setSelectedProject } from 'globalSlice/globalSlice';

import { setAddTestRunsModalVisibility } from '../slices/testRunsSlice';

const useTestRunss = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const activeTestRunss = [];
  const showAddModal = useSelector(
    (state) => state.testRuns.showAddTestRunsModal,
  );

  const addingTestRuns = () => {
    dispatch(setAddTestRunsModalVisibility(true));
  };
  useEffect(() => {
    dispatch(setSelectedProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return {
    activeTestRunss,
    showAddModal,
    addingTestRuns,
  };
};

export default useTestRunss;
