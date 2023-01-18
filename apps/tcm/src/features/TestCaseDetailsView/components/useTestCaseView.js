import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTestCaseDetailsAPI } from 'api/testcases.api';
import AppRoute from 'const/routes';
import { routeFormatter } from 'utils/helperFunctions';

import { TABS_ARRAY } from '../const/testCaseViewConst';
import {
  setTestCaseDetails,
  setTestCaseViewVisibility,
} from '../slices/testCaseDetailsSlice';

export default function useTestCases() {
  const navigate = useNavigate();
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
    (state) => state.testCaseDetails.allData || null,
  );
  const testRunsDetails = useSelector(
    (state) => state.testCaseDetails.allData?.test_runs || null,
  );
  const testCaseIssues = useSelector(
    (state) => state.testCaseDetails.allData?.jira_tickets || null,
  );

  const currentFlow = `${selectedFolder?.name || '...'} > ${
    testCaseDetails?.name || '...'
  }`;

  const fetchTestCaseDetails = () => {
    dispatch(setTestCaseViewVisibility(true));
    if (folderId && testCaseId) {
      getTestCaseDetailsAPI({ projectId, folderId, testCaseId }).then(
        (data) => {
          dispatch(setTestCaseDetails(data?.data?.test_case || null));
        },
      );
    }
  };

  const hideTestCaseViewDrawer = () => {
    dispatch(setTestCaseViewVisibility(false));
    navigate(
      routeFormatter(AppRoute.TEST_CASES, {
        projectId,
        folderId,
      }),
    );
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
