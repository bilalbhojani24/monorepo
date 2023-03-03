import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getTestRunDetailsAPI } from 'api/testruns.api';
import AppRoute from 'const/routes';
import useTestRunsTable from 'features/TestRuns/components/useTestRunsTable';
import {
  setIsVisibleProps,
  setSelectedTestRun
} from 'features/TestRuns/slices/testRunsSlice';
import { setSelectedProject } from 'globalSlice';
import { routeFormatter } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import { TR_DROP_OPTIONS } from '../const/immutableConst';
import {
  resetTestCaseDetails,
  setAllTestCases,
  setIsLoadingProps,
  setMetaPage,
  setTestRunsDetails
} from '../slices/testRunDetailsSlice';

export default function useTestRunDetails() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { projectId, testRunId } = useParams();
  const { getProgressOptions } = useTestRunsTable();
  const dispatch = useDispatch();

  const testRunDetails = useSelector(
    (state) => state.testRunsDetails.fullDetails
  );
  const isTestRunDetailsLoading = useSelector(
    (state) => state.testRunsDetails.isLoading.testRunDetails
  );
  const testCaseDetails = useSelector(
    (state) => state.testRunsDetails.testCaseDetails
  );

  const fetchTestRunDetails = (forceRefetch = true) => {
    if (testRunDetails?.id !== parseInt(testRunId, 10))
      dispatch(setTestRunsDetails({ id: testRunId })); // clear in case there is a difference

    if (forceRefetch || testRunDetails?.id !== parseInt(testRunId, 10)) {
      getTestRunDetailsAPI({ projectId, testRunId }).then((data) => {
        dispatch(setTestRunsDetails(data.data.test_run));
        dispatch(setIsLoadingProps({ key: 'testRunDetails', value: false }));

        if (!searchParams.get('p')) {
          // if not paginated set this data else the test cases will query in a different API
          dispatch(setAllTestCases(data.data.test_run.test_cases || []));
          dispatch(setMetaPage(data.data.test_run.links.info));
          dispatch(
            setIsLoadingProps({ key: 'isTestCasesLoading', value: false })
          );
        }
      });
    }
  };

  const onDropDownChange = (selectedOption) => {
    switch (selectedOption?.id) {
      case TR_DROP_OPTIONS[0].id: // close
        dispatch(setSelectedTestRun(testRunDetails));
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
        dispatch(setSelectedTestRun(testRunDetails));
        dispatch(setIsVisibleProps({ key: 'deleteTestRunModal', value: true }));
        break;
      default:
        break;
    }
  };

  const showIssuesHandler = () => {
    dispatch(
      logEventHelper('TM_TrPageIssuesTabClicked', {
        project_id: projectId,
        testrun_id: testRunId
      })
    );
  };

  const resetTestCaseDetailsMeta = () => {
    dispatch(resetTestCaseDetails());
  };

  useEffect(() => {
    resetTestCaseDetailsMeta();
    dispatch(setSelectedProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return {
    showIssuesHandler,
    isTestRunDetailsLoading,
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
