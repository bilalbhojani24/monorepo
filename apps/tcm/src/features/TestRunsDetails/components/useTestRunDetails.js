import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTestRunDetailsAPI } from 'api/testruns.api';
import AppRoute from 'const/routes';
import useTestRunsTable from 'features/TestRuns/components/useTestRunsTable';
import { setIsVisibleProps } from 'features/TestRuns/slices/testRunsSlice';
import { setSelectedProject } from 'globalSlice';
import { routeFormatter } from 'utils/helperFunctions';

import { TR_DROP_OPTIONS } from '../const/immutableConst';
import {
  resetTestCaseDetails,
  setTestRunsDetails
} from '../slices/testRunDetailsSlice';

export default function useTestRunDetails() {
  const navigate = useNavigate();
  const { projectId, testRunId } = useParams();
  const { getProgressOptions } = useTestRunsTable();
  const dispatch = useDispatch();

  const testRunDetails = useSelector(
    (state) => state.testRunsDetails.fullDetails
  );
  const testCaseDetails = useSelector(
    (state) => state.testRunsDetails.testCaseDetails
  );

  const fetchTestRunDetails = () => {
    if (testRunDetails?.id !== parseInt(testRunId, 10))
      dispatch(setTestRunsDetails(null)); // clear in case there is a difference
    getTestRunDetailsAPI({ projectId, testRunId }).then((data) => {
      dispatch(setTestRunsDetails(data.data.test_run));
    });
  };

  const onDropDownChange = (e, selectedOption) => {
    // dispatch(setSelectedTestRun(testRunDetails));
    switch (selectedOption?.id) {
      case TR_DROP_OPTIONS[0].id: // close
        dispatch(
          setIsVisibleProps({ key: 'closeRunTestRunModal', value: true })
        );
        break;
      case TR_DROP_OPTIONS[1].id: // edit
        navigate(
          routeFormatter(AppRoute.TEST_RUNS_EDIT, {
            projectId,
            testRunId: testRunDetails?.id
          }),
          {
            state: { isFromTRDetails: true }
          }
        );
        break;
      case TR_DROP_OPTIONS[2].id: // delete
        dispatch(setIsVisibleProps({ key: 'deleteTestRunModal', value: true }));
        break;
      default:
        break;
    }
  };

  const resetTestCaseDetailsMeta = () => {
    dispatch(resetTestCaseDetails());
  };

  useEffect(() => {
    dispatch(setSelectedProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return {
    testCaseDetails,
    getProgressOptions,
    testRunDetails,
    projectId,
    testRunId,
    fetchTestRunDetails,
    onDropDownChange,
    resetTestCaseDetailsMeta
  };
}
