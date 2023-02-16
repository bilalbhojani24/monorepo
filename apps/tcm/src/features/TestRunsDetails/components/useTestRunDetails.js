import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTestRunDetailsAPI } from 'api/testruns.api';
import useTestRunsTable from 'features/TestRuns/components/useTestRunsTable';
import { setSelectedProject } from 'globalSlice';

import { setTestRunsDetails } from '../slices/testRunDetailsSlice';

export default function useTestRunDetails() {
  const { projectId, testRunId } = useParams();
  const { getProgressOptions } = useTestRunsTable();
  const dispatch = useDispatch();

  const testRunDetails = useSelector(
    (state) => state.testRunsDetails.fullDetails
  );

  const fetchTestRunDetails = () => {
    if (testRunDetails?.id !== parseInt(testRunId, 10))
      dispatch(setTestRunsDetails(null)); // clear in case there is a difference
    getTestRunDetailsAPI({ projectId, testRunId, isFullDetails: true }).then(
      (data) => {
        dispatch(setTestRunsDetails(data.data.test_run));
      }
    );
  };

  useEffect(() => {
    dispatch(setSelectedProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return {
    getProgressOptions,
    testRunDetails,
    projectId,
    testRunId,
    fetchTestRunDetails
  };
}
