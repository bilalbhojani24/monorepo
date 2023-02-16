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
import { setTestRunsDetails } from '../slices/testRunDetailsSlice';

export default function useTestRunDetails() {
  const navigate = useNavigate();
  const { projectId, testRunId } = useParams();
  const { getProgressOptions } = useTestRunsTable();
  const dispatch = useDispatch();

  const testRunDetails = useSelector(
    (state) => state.testRunsDetails.fullDetails
  );

  const fetchTestRunDetails = () => {
    if (testRunDetails?.id !== parseInt(testRunId, 10))
      dispatch(setTestRunsDetails(null)); // clear in case there is a difference
    getTestRunDetailsAPI({ projectId, testRunId }).then((data) => {
      dispatch(setTestRunsDetails(data.data.test_run));
    });
  };

  const onDropDownChange = (e, selectedItem) => {
    // dispatch(setSelectedTestRun(testRunDetails));
    switch (e.currentTarget.textContent) {
      case TR_DROP_OPTIONS[0].body: // close
        dispatch(
          setIsVisibleProps({ key: 'closeRunTestRunModal', value: true })
        );
        break;
      case TR_DROP_OPTIONS[1].body: // edit
        navigate(
          routeFormatter(AppRoute.TEST_RUNS_EDIT, {
            projectId,
            testRunId: testRunDetails?.id
          })
        );
        break;
      case TR_DROP_OPTIONS[2].body: // delete
        dispatch(setIsVisibleProps({ key: 'deleteTestRunModal', value: true }));
        break;
      default:
        break;
    }
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
    fetchTestRunDetails,
    onDropDownChange
  };
}
