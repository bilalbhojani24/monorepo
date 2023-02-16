import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getTestCaseDetailsAPI } from 'api/testcases.api';
import AppRoute from 'const/routes';
import useTestCasesTable from 'features/Repository/components/useTestCasesTable';
import { routeFormatter } from 'utils/helperFunctions';

import { TABS_ARRAY } from '../const/testCaseViewConst';
import {
  setMetaIds,
  setTestCaseDetails,
  setTestCaseViewVisibility
} from '../slices/testCaseDetailsSlice';

export default function useTestCaseView(prop) {
  const navigate = useNavigate();
  const { onDropDownChange } = useTestCasesTable();
  const [selectedTab, setTab] = useState(TABS_ARRAY[0]);
  const [imageLink, setImageLink] = useState(null);
  const [showImagePreview, setImagePreviewVisibility] = useState(false);
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
  const metaIds = useSelector((state) => state.testCaseDetails.metaIds);

  const initTestCaseDetails = () => {
    dispatch(setTestCaseViewVisibility(true));
    dispatch(setMetaIds(prop));
    if (prop?.folderId && prop?.testCaseId) {
      getTestCaseDetailsAPI(prop).then((data) => {
        dispatch(setTestCaseDetails(data?.data?.test_case || null));
      });
    }
  };

  const hideTestCaseViewDrawer = () => {
    dispatch(setTestCaseViewVisibility(false));
    if (prop?.folderId)
      navigate(
        `${routeFormatter(
          AppRoute.TEST_CASES,
          {
            projectId: prop?.projectId,
            folderId: prop?.folderId
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
    testCaseId: metaIds?.testCaseId,
    showImagePreview,
    imageLink,
    testRunsCount,
    selectedTab,
    testCaseIssues,
    testCaseDetails,
    testRunsDetails,
    hideTestCaseViewDrawer,
    isTestCaseViewVisible,
    initTestCaseDetails,
    handleTabChange,
    actionHandler,
    onAttachmentClick,
    closePreview
  };
}
