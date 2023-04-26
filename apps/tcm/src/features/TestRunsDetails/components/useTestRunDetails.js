import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';
import { getTestRunDetailsAPI } from 'api/testruns.api';
import AppRoute from 'const/routes';
import useTestRunsTable from 'features/TestRuns/components/useTestRunsTable';
import { TABS_ARRAY } from 'features/TestRuns/const/immutableConst';
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
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { projectId, testRunId } = useParams();
  const { getProgressOptions } = useTestRunsTable();
  const dispatch = useDispatch();
  const sourceTab = location.state?.sourceTab;
  const testRunPageQuery =
    sourceTab === TABS_ARRAY[1].name
      ? `?${new URLSearchParams({ closed: true }).toString()}`
      : '';

  const testRunDetails = useSelector(
    (state) => state.testRunsDetails.fullDetails
  );
  const isTestRunDetailsLoading = useSelector(
    (state) => state.testRunsDetails.isLoading.testRunDetails
  );
  const testCaseDetails = useSelector(
    (state) => state.testRunsDetails.testCaseDetails
  );

  const automationTooltipClicked = () => {
    dispatch(logEventHelper('TM_QiViewReportLinkClicked', {}));
  };

  const fetchAndSetStateTRDetails = () => {
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
  };

  const fetchTestRunDetails = (forceRefetch = true, noLoader = false) => {
    if (testRunDetails?.id !== parseInt(testRunId, 10))
      dispatch(setTestRunsDetails({ id: testRunId })); // clear in case there is a difference

    if (forceRefetch || testRunDetails?.id !== parseInt(testRunId, 10)) {
      dispatch(setIsLoadingProps({ key: 'testRunDetails', value: !noLoader }));
      fetchAndSetStateTRDetails();
    } else {
      // incase data already exists in the redux state then set laoding to false and move forward
      dispatch(setIsLoadingProps({ key: 'testRunDetails', value: false }));
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

  const setTestRunDetailsLoading = () => {
    dispatch(setIsLoadingProps({ key: 'testRunDetails', value: true }));
  };

  const sendPageLoadingLog = () => {
    dispatch(
      logEventHelper('TM_TrDetailPageLoaded', {
        project_id: projectId,
        testrun_id: testRunId
      })
    );
  };

  useEffect(() => {
    resetTestCaseDetailsMeta();
    dispatch(setSelectedProject(projectId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  return {
    sourceTab,
    testRunPageQuery,
    showIssuesHandler,
    isTestRunDetailsLoading,
    testCaseDetails,
    getProgressOptions,
    testRunDetails,
    projectId,
    testRunId,
    fetchTestRunDetails,
    onDropDownChange,
    sendPageLoadingLog,
    resetTestCaseDetailsMeta,
    setTestRunDetailsLoading,
    automationTooltipClicked
  };
}
