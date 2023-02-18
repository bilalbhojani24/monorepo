import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTestCaseDetailsAPI } from 'api/testcases.api';
import AppRoute from 'const/routes';
import useTestCasesTable from 'features/Repository/components/useTestCasesTable';
import { routeFormatter } from 'utils/helperFunctions';

import { TR_DROP_OPTIONS } from '../const/testCaseViewConst';
import {
  setMetaIds,
  setTestCaseDetails,
  setTestCaseViewVisibility,
  setTestResultsArray
} from '../slices/testCaseDetailsSlice';

export default function useTestCaseView({
  projectId,
  folderId,
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
      getTestCaseDetailsAPI({ projectId, folderId, testCaseId }).then(
        (data) => {
          dispatch(setTestCaseDetails(data?.data?.test_case || null));
        }
      );
    }
  };

  const hideTestCaseViewDrawer = () => {
    dispatch(setTestCaseViewVisibility(false));
    onDetailsClose?.();
  };

  const actionHandler = (e, selectedOption) => {
    // hideTestCaseViewDrawer();
    if (selectedOption?.id === TR_DROP_OPTIONS[0]?.id) {
      // if view test case
      navigate(
        routeFormatter(AppRoute.TEST_CASES, {
          projectId: testCaseDetails?.project_id,
          folderId: testCaseDetails?.test_case_folder_id,
          testCaseId: testCaseDetails?.id
        })
      );
    } else onDropDownChange(e, selectedOption, testCaseDetails);
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
