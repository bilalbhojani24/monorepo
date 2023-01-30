import { useDispatch, useSelector } from 'react-redux';

import {
  setBulkAllSelected,
  setBulkDeSelectedtestCaseIDs,
  setBulkSelectedtestCaseIDs,
  setBulkUpdateProgress,
  setDeleteTestCaseModalVisibility
} from '../slices/repositorySlice';

const useTestCasesTable = () => {
  const dispatch = useDispatch();

  const setSelectedTestCaseIDs = (data) => {
    dispatch(setBulkSelectedtestCaseIDs(data));
  };
  const setDeSelectedTestCaseIDs = (data) => {
    dispatch(setBulkDeSelectedtestCaseIDs(data));
  };
  const setBulkAll = (data) => {
    dispatch(setBulkAllSelected(data));
  };
  const setBulkStatus = (data) => {
    dispatch(setBulkUpdateProgress(data));
  };

  const selectedTestCaseIDs = useSelector(
    (state) => state.repository.bulkSelection.selected_ids
  );
  const deSelectedTestCaseIDs = useSelector(
    (state) => state.repository.bulkSelection.deselected_ids
  );
  const isAllSelected = useSelector(
    (state) => state.repository.bulkSelection.select_all
  );

  const updateSelection = (e, listItem) => {
    if (e.currentTarget.checked) {
      setSelectedTestCaseIDs([...selectedTestCaseIDs, listItem.id]);
      setDeSelectedTestCaseIDs(
        deSelectedTestCaseIDs.filter((item) => item !== listItem.id)
      );
    } else {
      const deselectedUpdates = [...deSelectedTestCaseIDs, listItem.id];
      //   if (deselectedUpdates.length === rows.length) {
      //     // everything deselected
      //     setBulkAll(false);
      //   }
      setDeSelectedTestCaseIDs(deselectedUpdates);
      setSelectedTestCaseIDs(
        selectedTestCaseIDs.filter((item) => item !== listItem.id)
      );
    }
  };

  const selectAll = (e) => {
    if (e.currentTarget.checked) {
      setBulkAll(true);
      setDeSelectedTestCaseIDs([]);
    } else {
      setBulkAll(false);
      setSelectedTestCaseIDs([]);
      setDeSelectedTestCaseIDs([]);
    }
  };

  const initBulkMove = () => {};
  const initBulkLink = () => {};
  const initBulkEdit = () => {};
  const initBulkDelete = () => {
    dispatch(setDeleteTestCaseModalVisibility(true));
    setBulkStatus(true);
  };

  const hideDeleteTestCaseBulkModal = () => {};

  return {
    isAllSelected,
    selectedTestCaseIDs,
    deSelectedTestCaseIDs,
    selectAll,
    updateSelection,
    initBulkMove,
    initBulkEdit,
    initBulkLink,
    initBulkDelete,
    hideDeleteTestCaseBulkModal
  };
};
export default useTestCasesTable;
