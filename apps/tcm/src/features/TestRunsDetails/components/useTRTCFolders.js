import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  addTestResultAPI,
  getTestResultsAPI,
  getTestRunsTestCasesAPI
} from 'api/testruns.api';
import { selectMenuValueMapper } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import {
  addTestResultItem,
  closeAllVisibleForms,
  initAddStatusForm,
  setAllFolders,
  setAllTestCases,
  setIsLoadingProps,
  setIssuesArray,
  setIsVisibleProps,
  setMetaPage,
  setSelectedFolder,
  setSelectedTestCase,
  setTestCaseDetails,
  setTestResultsArray,
  updateAddStatusForm
} from '../slices/testRunDetailsSlice';

import useTestRunDetails from './useTestRunDetails';

export default function useTRTCFolders() {
  const { projectId, testRunId } = useParams();
  const [searchParams] = useSearchParams();
  const [statusError, setStatusError] = useState(false);
  const { fetchTestRunDetails } = useTestRunDetails();
  const dispatch = useDispatch();
  const page = searchParams.get('p');

  const testRunDetails = useSelector(
    (state) => state.testRunsDetails.fullDetails
  );
  const isFoldersLoading = useSelector(
    (state) => state.testRunsDetails.isLoading.isFoldersLoading
  );
  const isTestRunDetailsLoading = useSelector(
    (state) => state.testRunsDetails.isLoading.testRunDetails
  );
  const isTestCasesLoading = useSelector(
    (state) => state.testRunsDetails.isLoading.isTestCasesLoading
  );
  const selectedFolder = useSelector(
    (state) => state.testRunsDetails.selectedFolder
  );
  const isAddStatusVisible = useSelector(
    (state) => state.testRunsDetails.isVisible.addStatus
  );
  const isAddIssuesModalShown = useSelector(
    (state) => state.testRunsDetails.isVisible.addIssues
  );
  const addStatusFormData = useSelector(
    (state) => state.testRunsDetails.addStatusForm
  );
  const selectedTestCase = useSelector(
    (state) => state.testRunsDetails.selectedTestCase
  );
  const testResultsArray = useSelector(
    (state) => state.testRunsDetails.testResultsArray
  );
  const allFolders = useSelector((state) => state.testRunsDetails.allFolders);
  const issuesArray = useSelector((state) => state.testRunsDetails.issuesArray);
  const metaPage = useSelector((state) => state.testRunsDetails.metaPage);

  const allTestCases = useSelector(
    (state) => state.testRunsDetails.allTestCases
  );

  const closeAll = () => {
    dispatch(closeAllVisibleForms());
  };

  const showAddIssueModal = () => {
    dispatch(setIsVisibleProps({ key: 'addIssues', value: true }));
  };

  const hideAddIssueModal = () => {
    dispatch(setIsVisibleProps({ key: 'addIssues', value: false }));
  };

  const loadTestResults = (testCaseId) => {
    getTestResultsAPI({ projectId, testRunId, testCaseId }).then((data) => {
      dispatch(setTestResultsArray(data?.['test-results']));
    });
  };

  const handleTestCaseViewClick = (testCaseItem, tableCol) => () => {
    dispatch(
      logEventHelper(`TM_${tableCol}ClickedTrTc`, {
        project_id: projectId,
        testrun_id: testRunId
      })
    );
    dispatch(
      logEventHelper('TM_TrDetailsViewTrTc', {
        project_id: projectId,
        testrun_id: testRunId,
        testcase_id: testCaseItem?.id
      })
    );
    dispatch(
      setTestCaseDetails({
        folderId: testCaseItem.test_case_folder_id,
        testCaseId: testCaseItem?.id
      })
    );

    loadTestResults(testCaseItem?.id);
  };

  const fetchTestCases = () => {
    if (page || !isTestRunDetailsLoading) {
      dispatch(setIsLoadingProps({ key: 'isTestCasesLoading', value: true }));
      getTestRunsTestCasesAPI({ projectId, testRunId, page }).then((data) => {
        dispatch(setAllTestCases(data?.test_cases || []));
        dispatch(setMetaPage(data?.info));
        dispatch(
          setIsLoadingProps({ key: 'isTestCasesLoading', value: false })
        );
      });
    }
  };

  const onFolderClick = (thisFolder) => {
    dispatch(setSelectedFolder(thisFolder));
  };

  const onFoldersUpdate = (data) => {
    dispatch(setIsLoadingProps({ key: 'isFoldersLoading', value: false }));
    if (data?.length) {
      onFolderClick(data[0]);
      dispatch(setAllFolders(data));
    }
  };

  const statusFormChangeHandler = (key, value) => {
    dispatch(updateAddStatusForm({ key, value }));
  };

  const addIssuesSaveHelper = (newIssuesArray) => {
    hideAddIssueModal();
    const updatedAllIssues = selectMenuValueMapper([
      ...new Set([...issuesArray.map((item) => item.value), ...newIssuesArray])
    ]);
    const selectedIssues = addStatusFormData?.issues
      ? [
          ...new Set([
            ...newIssuesArray,
            ...addStatusFormData?.issues?.map((item) => item.value)
          ])
        ]
      : newIssuesArray;
    const combinedIssues = updatedAllIssues.filter((item) =>
      selectedIssues.includes(item.value)
    );

    dispatch(setIssuesArray(updatedAllIssues));
    statusFormChangeHandler('issues', combinedIssues);
  };

  const addStatusSaveHelper = (testCaseId, payload, thisTestCase, logEvent) => {
    addTestResultAPI({
      projectId,
      testCaseId,
      testRunId,
      payload
    }).then((data) => {
      if (logEvent)
        dispatch(
          logEventHelper('TM_AddResultCtaClicked', {
            project_id: projectId,
            testrun_id: testRunId,
            testcase_id: selectedTestCase?.id,
            result_id: data?.data?.['test-result']?.id
          })
        );

      dispatch(
        setAllTestCases(
          allTestCases.map((item) =>
            item.id === thisTestCase.id
              ? { ...item, latest_status: payload.status }
              : item
          )
        )
      );
      dispatch(setSelectedTestCase(null));
      dispatch(addTestResultItem(data.data['test-result']));
      fetchTestRunDetails();
      closeAll();
    });
  };

  const onResultChange = (selectedOption, data, isQuickUpdate, isFromTable) => {
    const eventName = isQuickUpdate
      ? 'TM_AddQuickResultBtnClickedTrTc'
      : 'TM_AddResultBtnClickedTrTc';

    dispatch(
      logEventHelper(isFromTable ? 'TM_TrTcStatusClicked' : eventName, {
        project_id: projectId,
        testrun_id: testRunId,
        testcase_id: data.id
      })
    );

    dispatch(setSelectedTestCase(data));
    if (isQuickUpdate) {
      addStatusSaveHelper(
        data?.id,
        {
          status: selectedOption?.value
        },
        data
      );
    } else {
      dispatch(initAddStatusForm(selectedOption?.value || null));
      dispatch(setIsVisibleProps({ key: 'addStatus', value: true }));
    }
  };

  const addStatusOkHandler = () => {
    if (addStatusFormData?.status === '') {
      setStatusError(true);
      return;
    }
    const payload = { ...addStatusFormData };
    if (addStatusFormData?.issues)
      payload.issues = addStatusFormData?.issues?.map((item) => item.value);

    addStatusSaveHelper(selectedTestCase?.id, payload, selectedTestCase, true);
  };

  return {
    isTableLoading: isTestCasesLoading || isTestRunDetailsLoading,
    page,
    testRunDetails,
    statusError,
    testResultsArray,
    isAddIssuesModalShown,
    issuesArray,
    addStatusFormData,
    isAddStatusVisible,
    allTestCases,
    metaPage,
    isTestCasesLoading,
    isTestRunDetailsLoading,
    allFolders,
    selectedFolder,
    isFoldersLoading,
    projectId,
    testRunId,
    onFoldersUpdate,
    fetchTestCases,
    handleTestCaseViewClick,
    onFolderClick,
    onResultChange,
    addStatusOkHandler,
    closeAll,
    statusFormChangeHandler,
    showAddIssueModal,
    hideAddIssueModal,
    addIssuesSaveHelper,
    setStatusError
  };
}
