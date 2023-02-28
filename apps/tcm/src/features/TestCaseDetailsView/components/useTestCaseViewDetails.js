import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editTestCaseAPI } from 'api/testcases.api';

import { TABS_ARRAY } from '../const/testCaseViewConst';
import { setTestCaseDetails } from '../slices/testCaseDetailsSlice';

export default function useTestCaseViewDetails() {
  const detailsRef = useRef();
  const { projectId, folderId } = useParams();
  const dispatch = useDispatch();
  const [selectedTab, setTab] = useState(TABS_ARRAY[0]);
  const [imageLink, setImageLink] = useState(null);
  const [isShowAddIssuesModal, setIsShowAddIssuesModal] = useState(false);
  const [showImagePreview, setImagePreviewVisibility] = useState(false);

  const isTestCaseViewVisible = useSelector(
    (state) => state.testCaseDetails.isTestCaseViewVisible
  );
  const testCaseDetails = useSelector(
    (state) => state.testCaseDetails.allData || null
  );
  const testRunsDetails = useSelector(
    (state) => state.testCaseDetails.allData?.test_run_results || null
  );
  const testCaseIssues = useSelector(
    (state) => state.testCaseDetails.allData?.test_run_issues || null
  );
  const testRunsCount = useSelector(
    (state) => state.testCaseDetails.allData?.test_run_results_count || null
  );
  const testResultsArray = useSelector(
    (state) => state.testCaseDetails.testResultsArray || []
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

  const showAddIssuesModal = () => {
    setIsShowAddIssuesModal(true);
  };
  const hideAddIssuesModal = () => {
    setIsShowAddIssuesModal(false);
  };

  const saveAddIssesModal = (newIssuesArray) => {
    const newTestCaseDetails = { ...testCaseDetails };
    const updatedIssuesArray = [
      ...newTestCaseDetails.issues,
      ...newIssuesArray
    ];
    newTestCaseDetails.issues = updatedIssuesArray;
    editTestCaseAPI({
      projectId,
      folderId,
      testCaseId: newTestCaseDetails.id,
      payload: { test_case: newTestCaseDetails }
    }).then((data) => {
      dispatch(setTestCaseDetails(data?.data?.test_case));
      hideAddIssuesModal();
    });
  };

  const imageClickOpener = (e) => {
    const imageURL = e?.currentTarget?.getAttribute('src');
    if (imageURL) {
      setImageLink(imageURL);
      setImagePreviewVisibility(true);
    }
  };

  useEffect(() => {
    if (detailsRef.current) {
      const imageElements = detailsRef.current.querySelectorAll('img');
      if (imageElements) {
        imageElements.forEach((item) => {
          item.addEventListener('click', imageClickOpener);
          // eslint-disable-next-line no-param-reassign
          item.style.cursor = 'pointer';
        });
      }
    }
  }, [detailsRef]);

  return {
    detailsRef,
    testResultsArray,
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
    closePreview,
    isShowAddIssuesModal,
    showAddIssuesModal,
    hideAddIssuesModal,
    saveAddIssesModal
  };
}
