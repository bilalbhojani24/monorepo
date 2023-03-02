import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  addTestResultAPI,
  getTestResultsAPI,
  getTestRunsTestCasesAPI
} from 'api/testruns.api';
import { selectMenuValueMapper } from 'utils/helperFunctions';

import {
  addTestResultItem,
  closeAllVisibleForms,
  initAddStatusForm,
  setAllFolders,
  setAllTestCases,
  setIsLoadingProps,
  setIssuesArray,
  setIsVisibleProps,
  setSelectedFolder,
  setSelectedTestCase,
  setTestCaseDetails,
  setTestResultsArray,
  updateAddStatusForm
} from '../slices/testRunDetailsSlice';

import useTestRunDetails from './useTestRunDetails';

export default function useTRTCFolders() {
  const { projectId, testRunId } = useParams();
  const { fetchTestRunDetails } = useTestRunDetails();
  const dispatch = useDispatch();

  const isFoldersLoading = useSelector(
    (state) => state.testRunsDetails.isLoading.isFoldersLoading
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

  const handleTestCaseViewClick = (testCaseItem) => () => {
    dispatch(
      setTestCaseDetails({
        folderId: testCaseItem.test_case_folder_id,
        testCaseId: testCaseItem?.id
      })
    );

    loadTestResults(testCaseItem?.id);
  };

  const fetchTestCases = () => {
    getTestRunsTestCasesAPI({ projectId, testRunId }).then((data) => {
      dispatch(setAllTestCases(data?.test_cases || []));
      dispatch(setIsLoadingProps({ key: 'isTestCasesLoading', value: false }));
    });
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

  const addStatusSaveHelper = (testCaseId, payload, thisTestCase) => {
    addTestResultAPI({
      projectId,
      testCaseId,
      testRunId,
      payload
    }).then((data) => {
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

  const onResultChange = (selectedOption, data, isQuickUpdate) => {
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
    const payload = { ...addStatusFormData };
    if (addStatusFormData?.issues)
      payload.issues = addStatusFormData?.issues?.map((item) => item.value);

    addStatusSaveHelper(selectedTestCase?.id, payload, selectedTestCase);
  };

  return {
    testResultsArray,
    isAddIssuesModalShown,
    issuesArray,
    addStatusFormData,
    isAddStatusVisible,
    allTestCases,
    metaPage,
    isTestCasesLoading,
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
    addIssuesSaveHelper
  };
}
