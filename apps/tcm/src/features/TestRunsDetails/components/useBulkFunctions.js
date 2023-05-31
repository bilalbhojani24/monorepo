import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { getUsersOfProjectAPI } from 'api/projects.api';
import {
  addResultTCBulkAPI,
  assignToTCBulkAPI,
  removeTCFromTRBulkAPI
} from 'api/testruns.api';
import { addNotificaton } from 'globalSlice';
import { capitalizeString, selectMenuValueMapper } from 'utils/helperFunctions';
import { logEventHelper } from 'utils/logEvent';

import { BULK_OPERATIONS } from '../const/immutableConst';
import {
  resetResultForm,
  resetTestCaseDetails,
  setAllTestCases,
  setBulkSelectedtestCaseIDs,
  setIsLoadingProps,
  setLoadedDataProjectId,
  setMetaPage,
  setResultIssuesArray,
  setUsers,
  updateAssignee,
  updateBulkOperation,
  updateResultForm
} from '../slices/testRunDetailsSlice';

import useTestRunDetails from './useTestRunDetails';

const useBulkFunctions = () => {
  const MYSELF_TEXT = ' (Myself)';
  const { projectId, testRunId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isShowAddIssuesModal, setIsShowAddIssuesModal] = useState(false);
  const [isAllChecked, setAllChecked] = useState(false); // for the current page alone
  const [isIndeterminate, setIndeterminate] = useState(false); // for the current page alone
  const dispatch = useDispatch();
  const { fetchTestRunDetails } = useTestRunDetails();
  const currentPage = searchParams.get('p') || '1';

  const testRunDetails = useSelector(
    (state) => state.testRunsDetails.fullDetails
  );
  const allTestCases = useSelector(
    (state) => state.testRunsDetails.allTestCases
  );
  const assignee = useSelector((state) => state.testRunsDetails.assignee);
  const resultForm = useSelector((state) => state.testRunsDetails.resultForm);
  const selectedTestCaseIDs = useSelector(
    (state) => state.testRunsDetails.bulkSelection.ids
  );
  const bulkOperationSelected = useSelector(
    (state) => state.testRunsDetails.bulkOperation
  );
  const usersArray = useSelector((state) => state.testRunsDetails.usersArray);
  const resultIssuesArray = useSelector(
    (state) => state.testRunsDetails.resultIssuesArray
  );
  const isBulkRemoveInProgress = useSelector(
    (state) => state.testRunsDetails.isLoading.bulkRemoveInProgress
  );
  const isBulkAssignInProgress = useSelector(
    (state) => state.testRunsDetails.isLoading.bulkAssignInProgress
  );
  const isBulkAddResultInProgress = useSelector(
    (state) => state.testRunsDetails.isLoading.bulkAddResultInProgress
  );
  const isUsersArrayLoading = useSelector(
    (state) => state.testRunsDetails.isLoading.usersArray
  );
  const loadedDataProjectId = useSelector(
    (state) => state.testRunsDetails.loadedDataProjectId
  );

  const setSelectedTestCaseIDs = (data) => {
    dispatch(setBulkSelectedtestCaseIDs(data));
  };

  const resetBulkOperation = (_event, clearSelections) => {
    dispatch(updateBulkOperation(null));
    dispatch(updateAssignee(null));
    dispatch(resetTestCaseDetails());
    dispatch(resetResultForm());
    dispatch(setIsLoadingProps({ key: 'bulkRemoveInProgress', value: false }));
    dispatch(setIsLoadingProps({ key: 'bulkAssignInProgress', value: false }));
    dispatch(
      setIsLoadingProps({ key: 'bulkAddResultInProgress', value: false })
    );

    if (clearSelections) {
      setSelectedTestCaseIDs([]);
    }
  };

  const fetchUsers = () => {
    getUsersOfProjectAPI(projectId).then((data) => {
      dispatch(
        setUsers(
          [
            {
              full_name: `${data.myself.full_name}${MYSELF_TEXT}`,
              id: data.myself.id
            },
            ...data.users.filter((item) => item.id !== data.myself.id)
          ].map((item) => ({ label: item.full_name, value: item.id }))
        )
      );

      dispatch(setLoadedDataProjectId(projectId));
    });
  };

  const initSharedDetails = () => {
    if (loadedDataProjectId !== projectId) {
      fetchUsers();
    }
  };

  const setBulkOperation = (operation) => {
    switch (operation) {
      case BULK_OPERATIONS.ADD_RESULT.option:
        dispatch(
          logEventHelper('TM_BulkAddResultBtnClickedTrTc', {
            project_id: projectId,
            testrun_id: testRunId
          })
        );
        break;
      case BULK_OPERATIONS.ASSIGN_TO.option:
        initSharedDetails();
        dispatch(
          logEventHelper('TM_BulkAssignToBtnClickedTrTc', {
            project_id: projectId,
            testrun_id: testRunId
          })
        );
        break;
      case BULK_OPERATIONS.REMOVE.option:
        dispatch(
          logEventHelper('TM_BulkRemoveBtnClickedTrTc', {
            project_id: projectId,
            testrun_id: testRunId
          })
        );
        break;
      default:
    }
    dispatch(updateBulkOperation(operation));
  };

  const selectAll = (e) => {
    if (e.currentTarget.checked) {
      setSelectedTestCaseIDs([
        ...new Set([
          ...selectedTestCaseIDs,
          ...allTestCases.map((item) => item.id)
        ])
      ]);
    } else {
      const thisPageTCIDs = allTestCases.map((item) => item.id);
      setSelectedTestCaseIDs(
        selectedTestCaseIDs.filter((item) => !thisPageTCIDs.includes(item))
      );
    }
  };

  const updateSelection = (e, listItem) => {
    if (e.currentTarget.checked) {
      setSelectedTestCaseIDs([...selectedTestCaseIDs, listItem.id]);
    } else {
      setSelectedTestCaseIDs(
        selectedTestCaseIDs.filter((item) => item !== listItem.id)
      );
    }
  };

  const onBulkActionComplete = (res) => {
    if (currentPage !== `${res.info.page}`)
      setSearchParams({ p: res.info.page });

    dispatch(setAllTestCases(res?.test_cases || []));
    dispatch(setMetaPage(res?.info));
  };

  const onRemoveHandler = () => {
    if (selectedTestCaseIDs.length && testRunDetails?.id) {
      dispatch(
        logEventHelper('TM_BulkRemoveCtaClickedTrTc', {
          project_id: projectId,
          testrun_id: testRunId,
          testcase_id: selectedTestCaseIDs.join(',')
        })
      );
      dispatch(setIsLoadingProps({ key: 'bulkRemoveInProgress', value: true }));
      removeTCFromTRBulkAPI({
        projectId,
        ids: selectedTestCaseIDs,
        testRunId: testRunDetails.id,
        page: currentPage
      }).then((res) => {
        onBulkActionComplete(res);
        fetchTestRunDetails();
        dispatch(
          addNotificaton({
            id: `test_cases_removed_${testRunDetails?.id}`,
            title: `${selectedTestCaseIDs?.length || 0} Test Cases removed.`,
            description: null,
            variant: 'success'
          })
        );
        resetBulkOperation(null, true);
      });
    }
  };

  const onAddResultHandler = () => {
    if (selectedTestCaseIDs.length && testRunDetails?.id) {
      dispatch(
        logEventHelper('TM_BulkAddResultCtaClickedTrTc', {
          project_id: projectId,
          testrun_id: testRunId,
          testcase_id: selectedTestCaseIDs.join(','),
          status: resultForm?.status,
          jira_issues: resultForm?.jiraIssues.join(',')
        })
      );
      dispatch(
        setIsLoadingProps({ key: 'bulkAddResultInProgress', value: true })
      );
      addResultTCBulkAPI({
        projectId,
        ids: selectedTestCaseIDs,
        testRunId: testRunDetails.id,
        status: resultForm?.status,
        issues: resultForm?.jiraIssues,
        page: currentPage
      }).then((res) => {
        onBulkActionComplete(res);
        fetchTestRunDetails(true, true);

        dispatch(
          addNotificaton({
            id: `test_cases_updated_${testRunDetails?.id}`,
            title: `${
              selectedTestCaseIDs?.length || 0
            } Test Cases marked as ${capitalizeString(
              resultForm?.status || ''
            )}.`,
            description: null,
            variant: 'success'
          })
        );
        resetBulkOperation(null, true);
      });
    }
  };

  const onAssignHandler = () => {
    if (selectedTestCaseIDs.length && testRunDetails?.id && assignee) {
      dispatch(
        logEventHelper('TM_BulkAssignToCtaClickedTrTc', {
          project_id: projectId,
          testrun_id: testRunId,
          testcase_id: selectedTestCaseIDs.join(','),
          assignee: assignee?.value
        })
      );
      dispatch(setIsLoadingProps({ key: 'bulkAssignInProgress', value: true }));
      assignToTCBulkAPI({
        projectId,
        ids: selectedTestCaseIDs,
        testRunId: testRunDetails.id,
        assigneeId: assignee?.value,
        page: currentPage
      }).then((res) => {
        onBulkActionComplete(res);

        dispatch(
          addNotificaton({
            id: `assigness_updates${testRunDetails?.id}`,
            title: `${
              selectedTestCaseIDs?.length || 0
            } Test Cases assigned to ${assignee?.label.replace(
              MYSELF_TEXT,
              ''
            )}.`,
            description: null,
            variant: 'success'
          })
        );
        resetBulkOperation(null, true);
      });
    }
  };

  const setAssignee = (data) => {
    dispatch(updateAssignee(data));
  };

  const onResultChange = (key, value) => {
    if (key === 'status') {
      dispatch(
        logEventHelper('TM_BulkAddResultStatusDropdownClickedTrTc', {
          project_id: projectId,
          testrun_id: testRunId,
          status: value
        })
      );
    }
    dispatch(updateResultForm({ key, value }));
  };

  const showAddIssuesModal = () => {
    setIsShowAddIssuesModal(true);
  };
  const hideAddIssuesModal = () => {
    setIsShowAddIssuesModal(false);
  };

  const saveAddIssesModal = (newIssuesArray) => {
    let value = [...resultForm.jiraIssues];
    value = [...value, ...newIssuesArray];

    dispatch(updateResultForm({ key: 'jiraIssues', value }));
    dispatch(
      setResultIssuesArray(
        selectMenuValueMapper([
          ...new Set([
            ...resultIssuesArray.map((item) => item.value),
            ...newIssuesArray
          ])
        ])
      )
    );
    hideAddIssuesModal();
  };

  const handleMenuOpen = (isMenuOpened) => {
    if (!resultIssuesArray?.length && isMenuOpened) showAddIssuesModal();
  };

  useEffect(() => {
    if (allTestCases?.length) {
      const checkedItems = allTestCases
        .map((item) => item.id)
        .filter((item) => selectedTestCaseIDs.includes(item));

      setAllChecked(checkedItems.length === allTestCases.length);

      setIndeterminate(
        checkedItems.length === allTestCases.length || !checkedItems.length
          ? false
          : checkedItems.length !== allTestCases.length
      );
    }
  }, [allTestCases, selectedTestCaseIDs]);

  return {
    handleMenuOpen,
    showAddIssuesModal,
    isShowAddIssuesModal,
    hideAddIssuesModal,
    saveAddIssesModal,
    resultIssuesArray,
    resultForm,
    isBulkAddResultInProgress,
    isBulkAssignInProgress,
    assignee,
    isUsersArrayLoading,
    usersArray,
    isBulkRemoveInProgress,
    bulkOperationSelected,
    isAllChecked,
    isIndeterminate,
    selectedTestCaseIDs,
    selectAll,
    updateSelection,
    setBulkOperation,
    resetBulkOperation,
    onRemoveHandler,
    onAddResultHandler,
    onAssignHandler,
    setAssignee,
    onResultChange
  };
};

export default useBulkFunctions;
