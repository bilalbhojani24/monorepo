import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getTestCaseDetailsAPI,
  getTestRunDetailsOfTestCaseAPI
} from 'api/testcases.api';
import AppRoute from 'const/routes';
import useTestCasesTable from 'features/Repository/components/useTestCasesTable';
import { routeFormatter } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import { TR_DROP_OPTIONS } from '../const/testCaseViewConst';
import {
  setMetaIds,
  setTestCaseDetails,
  setTestCaseViewVisibility,
  setTestObservabilityUrl,
  setTestResultsArray,
  setTestRunsTestCaseDetails
} from '../slices/testCaseDetailsSlice';

export default function useTestCaseView({
  projectId,
  folderId,
  testRunId,
  isFromTestRun,
  testCaseId,
  onDetailsClose,
  testResultsArray
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { onDropDownChange } = useTestCasesTable();

  const isTestCaseViewVisible = useSelector(
    (state) => state.testCaseDetails.isTestCaseViewVisible
  );
  const testCaseDetails = useSelector(
    (state) => state.testCaseDetails.allData || null
  );

  const initTestCaseDetails = () => {
    dispatch(setTestCaseViewVisibility(true));
    dispatch(setMetaIds({ projectId, folderId, testCaseId }));
    if (folderId && testCaseId) {
      dispatch(
        logEventHelper('TM_TcDetailViewLoaded', {
          project_id: projectId,
          testcase_id: testCaseId
        })
      );
      if (isFromTestRun) {
        getTestRunDetailsOfTestCaseAPI({
          projectId,
          testRunId,
          testCaseId
        }).then((data) => {
          dispatch(setTestCaseDetails(data?.data?.test_case || null));
          dispatch(
            setTestObservabilityUrl(data?.data?.test?.observability_url)
          );

          dispatch(setTestRunsTestCaseDetails(data?.data?.test));
        });
      } else {
        getTestCaseDetailsAPI({ projectId, folderId, testCaseId }).then(
          (data) => {
            dispatch(setTestCaseDetails(data?.data?.test_case || null));
          }
        );
      }
    }
  };

  const hideTestCaseViewDrawer = (isSilentClose, isOnCloseIcon) => {
    if (!isTestCaseViewVisible) return;
    dispatch(setTestCaseViewVisibility(false));
    onDetailsClose?.(isSilentClose);

    if (isOnCloseIcon) {
      dispatch(
        logEventHelper('TM_TcDetailViewCrossIconClicked', {
          project_id: projectId,
          testcase_id: testCaseDetails?.id
        })
      );
    }
  };

  const actionHandler = (selectedOption) => {
    hideTestCaseViewDrawer();
    if (selectedOption?.id === TR_DROP_OPTIONS[0]?.id) {
      // if view test case
      navigate(
        routeFormatter(AppRoute.TEST_CASES, {
          projectId: testCaseDetails?.project_id,
          folderId: testCaseDetails?.test_case_folder_id,
          testCaseId: testCaseDetails?.id
        }),
        {
          replace: true
        }
      );
    } else onDropDownChange(selectedOption, testCaseDetails);
  };

  useEffect(() => {
    // getting this from parent component as there are updates happening inside the parent component
    dispatch(setTestResultsArray(testResultsArray));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testResultsArray]);

  return {
    testCaseDetails,
    isTestCaseViewVisible,
    hideTestCaseViewDrawer,
    initTestCaseDetails,
    actionHandler
  };
}
