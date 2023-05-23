import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUsersOfProjectAPI } from 'api/projects.api';
import {
  addResultTCBulkAPI,
  assignToTCBulkAPI,
  removeTCFromTRBulkAPI
} from 'api/testruns.api';
import { addNotificaton } from 'globalSlice';

import { BULK_OPERATIONS } from '../const/immutableConst';
import {
  resetResultForm,
  resetTestCaseDetails,
  setBulkSelectedtestCaseIDs,
  setIsLoadingProps,
  setLoadedDataProjectId,
  setUsers,
  updateAssignee,
  updateBulkOperation,
  updateResultForm
} from '../slices/testRunDetailsSlice';

import useTestRunDetails from './useTestRunDetails';
import useTRTCFolders from './useTRTCFolders';

const useBulkFunctions = () => {
  const { projectId } = useParams();
  const [isAllChecked, setAllChecked] = useState(false); // for the current page alone
  const [isIndeterminate, setIndeterminate] = useState(false); // for the current page alone
  const dispatch = useDispatch();
  const { fetchTestCases } = useTRTCFolders();
  const { fetchTestRunDetails } = useTestRunDetails();

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
              full_name: `${data.myself.full_name} (Myself)`,
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
    if (operation === BULK_OPERATIONS.ASSIGN_TO.option) {
      initSharedDetails();
    }
    dispatch(updateBulkOperation(operation));
  };

  const selectAll = (e) => {
    if (e.currentTarget.checked) {
      // setBulkAll(true);
      setSelectedTestCaseIDs([
        ...new Set([
          ...selectedTestCaseIDs,
          ...allTestCases.map((item) => item.id)
        ])
      ]);
    } else {
      // setBulkAll(false);
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

  const onRemoveHandler = () => {
    if (selectedTestCaseIDs.length && testRunDetails?.id) {
      dispatch(setIsLoadingProps({ key: 'bulkRemoveInProgress', value: true }));
      removeTCFromTRBulkAPI({
        projectId,
        ids: selectedTestCaseIDs,
        testRunId: testRunDetails.id
      }).then(() => {
        // TODO happy flow edge cases
        fetchTestCases();

        dispatch(
          addNotificaton({
            id: `test_cases_removed_${testRunDetails?.id}`,
            title: `Test Cases Removed`,
            description: `${selectedTestCaseIDs.length} Test Cases have been removed from this test run.`,
            variant: 'success'
          })
        );
        resetBulkOperation();
      });
    }
  };

  const onAddResultHandler = () => {
    if (selectedTestCaseIDs.length && testRunDetails?.id) {
      dispatch(
        setIsLoadingProps({ key: 'bulkAddResultInProgress', value: true })
      );
      addResultTCBulkAPI({
        projectId,
        ids: selectedTestCaseIDs,
        testRunId: testRunDetails.id,
        status: resultForm?.status
      }).then(() => {
        // TODO happy flow edge cases
        fetchTestCases();
        fetchTestRunDetails(true, true);

        dispatch(
          addNotificaton({
            id: `test_cases_updated_${testRunDetails?.id}`,
            title: `Test Cases Updated`,
            description: `${selectedTestCaseIDs.length} Test Cases have been updated.`,
            variant: 'success'
          })
        );
        resetBulkOperation();
      });
    }
  };

  const onAssignHandler = () => {
    if (selectedTestCaseIDs.length && testRunDetails?.id && assignee) {
      dispatch(setIsLoadingProps({ key: 'bulkAssignInProgress', value: true }));
      assignToTCBulkAPI({
        projectId,
        ids: selectedTestCaseIDs,
        testRunId: testRunDetails.id,
        assigneeId: assignee?.value
      }).then(() => {
        dispatch(
          addNotificaton({
            id: `assigness_updates${testRunDetails?.id}`,
            title: `Test Cases Assigned`,
            description: `${selectedTestCaseIDs.length} Test Cases have been assigned to ${assignee?.label}.`,
            variant: 'success'
          })
        );
        resetBulkOperation();
      });
    }
  };

  const setAssignee = (data) => {
    dispatch(updateAssignee(data));
  };

  const onResultChange = (key, value) => {
    dispatch(updateResultForm({ key, value }));
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
