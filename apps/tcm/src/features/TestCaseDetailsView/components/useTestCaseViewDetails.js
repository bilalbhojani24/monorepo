import { useState } from 'react';
import { useSelector } from 'react-redux';

import { TABS_ARRAY } from '../const/testCaseViewConst';

export default function useTestCaseViewDetails() {
  const [selectedTab, setTab] = useState(TABS_ARRAY[0]);
  const [imageLink, setImageLink] = useState(null);
  const [showImagePreview, setImagePreviewVisibility] = useState(false);

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

  const handleTabChange = (value) => {
    setTab(value);
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
    isTestCaseViewVisible,
    handleTabChange,
    onAttachmentClick,
    closePreview
  };
}
