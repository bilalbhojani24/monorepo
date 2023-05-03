import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getJIRAConfigAPI } from 'api/common.api';
import { editTestCaseAPI } from 'api/testcases.api';
import { setUserConfig } from 'globalSlice';
import { logEventHelper } from 'utils/logEvent';

import { TABS_ARRAY } from '../const/testCaseViewConst';
import { setTestCaseDetails } from '../slices/testCaseDetailsSlice';

export default function useTestCaseViewDetails() {
  const detailsRef = useRef();
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [selectedTab, setTab] = useState(TABS_ARRAY[0]);
  const [imageViewData, setImageViewData] = useState(null);
  const [isShowAddIssuesModal, setIsShowAddIssuesModal] = useState(false);
  const [showImagePreview, setImagePreviewVisibility] = useState(false);
  const jiraConfig = useSelector((state) => state.global.userConfig?.jira);

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
  const testObservabilityUrl = useSelector(
    (state) => state.testCaseDetails.testObservabilityUrl
  );
  const testRunsTestCaseDetails = useSelector(
    (state) => state.testCaseDetails.testRunsTestCaseDetails
  );

  const handleTabChange = (value, isFromTestRun, testRunId) => {
    if (isFromTestRun) {
      dispatch(
        logEventHelper(
          value.name === TABS_ARRAY[1].name
            ? 'TM_TcIssuesTabClickedTrTc'
            : 'TM_TcResultsTabClickedTrTc',
          {
            project_id: projectId,
            testcase_id: testCaseDetails?.id,
            testrun_id: testRunId
          }
        )
      );
    } else
      dispatch(
        logEventHelper(
          value.name === TABS_ARRAY[1].name
            ? 'TM_TcDetailIssuesTabClicked'
            : 'TM_TcDetailResultsTabClicked',
          {
            project_id: projectId,
            testcase_id: testCaseDetails?.id
          }
        )
      );
    setTab(value);
  };

  const setJiraConfig = useCallback(
    (value) => {
      dispatch(setUserConfig({ key: 'jira', value }));
    },
    [dispatch]
  );

  const onAttachmentClick = (item) => {
    if (item?.url) {
      if (item.content_type.includes('image/')) {
        setImageViewData({
          link: item.url,
          name: item.name
        });
        setImagePreviewVisibility(true);
      } else window.open(item.url);
    }
  };

  const closePreview = () => {
    setImagePreviewVisibility(false);
    setTimeout(() => {
      setImageViewData(null);
    }, 400);
  };

  const showAddIssuesModal = () => {
    dispatch(
      logEventHelper('TM_TcDetailLinkToJiraBtnClicked', {
        project_id: projectId,
        testcase_id: testCaseDetails?.id
      })
    );
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
      projectId: newTestCaseDetails.project_id,
      folderId: newTestCaseDetails.test_case_folder_id,
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
      setImageViewData({ link: imageURL });
      setImagePreviewVisibility(true);
    }
  };

  const onJiraButtonClick = (jiraID) => {
    window.open(`${jiraConfig?.data?.host}/browse/${jiraID}`);
  };

  const testRunButtonClick = (testRunID) => {
    window.open(
      `${window.location.href
        .split('/')
        .splice(0, 5)
        .join('/')}/test-runs/${testRunID}`
    );
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
  }, [detailsRef, testCaseDetails]);

  useEffect(() => {
    if (!jiraConfig) {
      getJIRAConfigAPI().then((e) => {
        setJiraConfig(e?.success ? e : null);
      });
    }
  }, [jiraConfig, setJiraConfig]);

  return {
    projectId,
    detailsRef,
    testResultsArray,
    testCaseId: metaIds?.testCaseId,
    showImagePreview,
    imageViewData,
    testRunsCount,
    selectedTab,
    testCaseIssues,
    testCaseDetails,
    testRunsDetails,
    isTestCaseViewVisible,
    testObservabilityUrl,
    handleTabChange,
    onAttachmentClick,
    closePreview,
    isShowAddIssuesModal,
    showAddIssuesModal,
    hideAddIssuesModal,
    saveAddIssesModal,
    onJiraButtonClick,
    testRunButtonClick,
    testRunsTestCaseDetails
  };
}
