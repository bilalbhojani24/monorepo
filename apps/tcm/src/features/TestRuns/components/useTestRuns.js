import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addTestRun, getTestRuns } from 'api/testruns.api';
import { setSelectedProject } from 'globalSlice/globalSlice';

import {
  setAddTestRunsModalVisibility,
  updateAllTestRuns,
} from '../slices/testRunsSlice';

const useTestRuns = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const allTestRunsArray = useSelector(
    (state) => state.testRuns.allTestRunsArray,
  );
  const showAddTestRunsForm = useSelector(
    (state) => state.testRuns.showAddTestRunsForm,
  );

  const showTestRunAddForm = () => {
    dispatch(setAddTestRunsModalVisibility(true));
  };

  const fetchAllTestRuns = () => {
    if (projectId)
      getTestRuns({ projectId }).then((data) => {
        dispatch(updateAllTestRuns(data?.testruns || []));
      });
    else dispatch(updateAllTestRuns([]));
  };

  return {
    allTestRunsArray,
    showAddTestRunsForm,
    showTestRunAddForm,
    projectId,
    fetchAllTestRuns,
  };
};

export default useTestRuns;
