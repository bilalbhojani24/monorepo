import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTestCaseDetailsAPI } from 'api/testcases.api';
import useTestCasesTable from 'features/Repository/components/useTestCasesTable';

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
    hideTestCaseViewDrawer();
    onDropDownChange(e, selectedOption, testCaseDetails);
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
