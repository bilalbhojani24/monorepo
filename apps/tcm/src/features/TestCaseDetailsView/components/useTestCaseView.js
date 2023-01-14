import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTestCaseDetails } from 'api/testcases.api';

import { TABS_ARRAY } from '../const/testCaseViewConst';
import {
  setTestCaseDetails,
  setTestCaseViewVisibility,
} from '../slices/testCaseDetailsSlice';

export default function useTestCases() {
  const [selectedTab, setTab] = useState(TABS_ARRAY[0]);
  // const [inputError, setInputError] = useState(false);
  const { projectId, folderId, testCaseId } = useParams();
  const dispatch = useDispatch();

  const selectedFolder = useSelector(
    (state) => state.repository.selectedFolder,
  );

  const isTestCaseViewVisible = useSelector(
    (state) => state.testCaseDetails.isTestCaseViewVisible,
  );
  const testCaseDetails = useSelector(
    (state) => state.testCaseDetails.testCaseDetails?.test_case || null,
  );
  const testRunsDetails = useSelector(
    (state) => state.testCaseDetails.testCaseDetails?.test_runs || null,
  );
  const testCaseIssues = useSelector(
    (state) =>
      state.testCaseDetails.testCaseDetails?.test_case?.jira_tickets || null,
  );

  const currentFlow = `${selectedFolder?.name || '...'} > ${
    testCaseDetails?.name || '...'
  }`;

  const fetchTestCaseDetails = () => {
    dispatch(setTestCaseViewVisibility(true));
    if (folderId && testCaseId) {
      getTestCaseDetails({ projectId, folderId, testCaseId }).then((data) => {
        dispatch(setTestCaseDetails(data || null));
      });
    }
  };

  const hideTestCaseViewDrawer = () => {
    dispatch(setTestCaseViewVisibility(false));
  };

  const handleTabChange = (value) => {
    setTab(value);
  };

  return {
    selectedTab,
    currentFlow,
    testCaseIssues,
    testCaseId,
    testCaseDetails,
    testRunsDetails,
    hideTestCaseViewDrawer,
    isTestCaseViewVisible,
    fetchTestCaseDetails,
    handleTabChange,
  };
}
