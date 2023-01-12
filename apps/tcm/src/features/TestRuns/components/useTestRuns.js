import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTestRuns } from 'api/testruns.api';
import { setSelectedProject } from 'globalSlice/globalSlice';

import { setAddTestRun, setTestRuns } from '../slices/testRunsSlice';

const useTestRuns = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const activeTestRuns = useSelector((state) => state.testRuns.activeTestRuns);
  const addTestRun = useSelector((state) => state.testRuns.addTestRun);

  const addingTestRuns = () => {
    dispatch(setAddTestRun(true));
  };

  useEffect(() => {
    getTestRuns({ projectId }).then((data) => {
      dispatch(setTestRuns(data.testruns));
    });
    dispatch(setSelectedProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return {
    activeTestRuns,
    addTestRun,
    addingTestRuns,
  };
};

export default useTestRuns;
