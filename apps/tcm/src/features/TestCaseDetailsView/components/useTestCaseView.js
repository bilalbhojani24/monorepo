import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTestCaseDetailsAPI } from 'api/testcases.api';
import AppRoute from 'const/routes';
import useTestCasesTable from 'features/Repository/components/useTestCasesTable';
import { routeFormatter } from 'utils/helperFunctions';

import { TABS_ARRAY } from '../const/testCaseViewConst';
import {
  setTestCaseDetails,
  setTestCaseViewVisibility
} from '../slices/testCaseDetailsSlice';

export default function useTestCasesView() {
  const navigate = useNavigate();
  const { onDropDownChange } = useTestCasesTable();
  const [selectedTab, setTab] = useState(TABS_ARRAY[0]);
  const [imageLink, setImageLink] = useState(null);
  const [showImagePreview, setImagePreviewVisibility] = useState(false);
  const { projectId, folderId, testCaseId } = useParams();
  const dispatch = useDispatch();

  const isTestCaseViewVisible = useSelector(
    (state) => state.testCaseDetails.isTestCaseViewVisible
  );
  const testCaseDetails = useSelector(
    (state) => state.testCaseDetails.allData || null
  );
  const testRunsDetails = useSelector(
    (state) => state.testCaseDetails.allData?.test_runs || null
  );
  const testCaseIssues = useSelector(
    (state) => state.testCaseDetails.allData?.test_run_issues || null
  );
  const testRunsCount = useSelector(
    (state) => state.testCaseDetails.allData?.test_runs_count || null
  );

  const fetchTestCaseDetails = () => {
    dispatch(setTestCaseViewVisibility(true));
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
    if (folderId)
      navigate(
        `${routeFormatter(
          AppRoute.TEST_CASES,
          {
            projectId,
            folderId
          },
          true
        )}`,
        {
          replace: true
        }
      );
  };

  const handleTabChange = (value) => {
    setTab(value);
  };

  const actionHandler = (e) => {
    hideTestCaseViewDrawer();
    onDropDownChange(e, testCaseDetails);
  };

  const onAttachmentClick = (item) => {
    if (item?.url) {
      if (item.content_type.includes('image/')) {
        setImageLink(item.url);
        setImagePreviewVisibility(true);
      } else window.open(item.url);
    }
  };

  const closePreview = () => {
    setImagePreviewVisibility(false);
    setTimeout(() => {
      setImageLink(null);
    }, 400);
  };

  return {
    showImagePreview,
    imageLink,
    testRunsCount,
    selectedTab,
    testCaseIssues,
    testCaseId,
    testCaseDetails,
    testRunsDetails,
    hideTestCaseViewDrawer,
    isTestCaseViewVisible,
    fetchTestCaseDetails,
    handleTabChange,
    actionHandler,
    onAttachmentClick,
    closePreview
  };
}
