import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUsersOfProjectAPI } from 'api/projects.api';
import { removeTCFromTRBulkAPI } from 'api/testruns.api';

import { BULK_OPERATIONS } from '../const/immutableConst';
import {
  setBulkSelectedtestCaseIDs,
  setIsLoadingProps,
  setLoadedDataProjectId,
  setUsers,
  updateBulkOperation
} from '../slices/testRunDetailsSlice';

import useTRTCFolders from './useTRTCFolders';

const useBulkFunctions = () => {
  const { projectId } = useParams();
  const [isAllChecked, setAllChecked] = useState(false); // for the current page alone
  const [isIndeterminate, setIndeterminate] = useState(false); // for the current page alone
  const dispatch = useDispatch();
  const { fetchTestCases } = useTRTCFolders();

  const testRunDetails = useSelector(
    (state) => state.testRunsDetails.fullDetails
  );
  const allTestCases = useSelector(
    (state) => state.testRunsDetails.allTestCases
  );
  const selectedTestCaseIDs = useSelector(
    (state) => state.testRunsDetails.bulkSelection.ids
  );
  const bulkOperationSelected = useSelector(
    (state) => state.testRunsDetails.bulkOperation
  );
  const isBulkRemoveInProgress = useSelector(
    (state) => state.testRunsDetails.isLoading.bulkRemoveInProgress
  );
  const loadedDataProjectId = useSelector(
    (state) => state.testRunsDetails.loadedDataProjectId
  );

  const setSelectedTestCaseIDs = (data) => {
    dispatch(setBulkSelectedtestCaseIDs(data));
  };

  const resetBulkOperation = () => {
    dispatch(updateBulkOperation(null));
    dispatch(setIsLoadingProps({ key: 'bulkRemoveInProgress', value: false }));
  };

  const fetchUsers = () => {
    getUsersOfProjectAPI(projectId).then((data) => {
      dispatch(
        setUsers([
          { full_name: 'Myself', id: data.myself.id },
          ...data.users.filter((item) => item.id !== data.myself.id)
        ])
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
        resetBulkOperation();
      });
    }
  };

  const onAddResultHandler = () => {
    // TODO remove API
    resetBulkOperation();
  };

  const onAssignHandler = () => {
    // TODO remove API
    resetBulkOperation();
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
    onAssignHandler
  };
};

export default useBulkFunctions;
