import { useDispatch, useSelector } from 'react-redux';

import {
  setBulkAllSelected,
  setBulkDeSelectedtestCaseIDs,
  setBulkSelectedtestCaseIDs
} from '../slices/repositorySlice';

const useTestCasesTable = ({ rows }) => {
  const dispatch = useDispatch();

  const setSelectedTestCaseIDs = (data) => {
    dispatch(setBulkSelectedtestCaseIDs(data));
  };
  const setDeSelectedTestCaseIDs = (data) => {
    dispatch(setBulkDeSelectedtestCaseIDs(data));
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
      setDeSelectedTestCaseIDs([...deSelectedTestCaseIDs, listItem.id]);
      setSelectedTestCaseIDs(
        selectedTestCaseIDs.filter((item) => item !== listItem.id)
      );
    }
  };

  const selectAll = (e) => {
    if (e.currentTarget.checked) {
      dispatch(setBulkAllSelected(true));
      setDeSelectedTestCaseIDs([]);
    } else {
      dispatch(setBulkAllSelected(false));
      setSelectedTestCaseIDs([]);
      setDeSelectedTestCaseIDs([]);
    }
  };

  const initBulkMove = () => {};
  const initBulkLink = () => {};
  const initBulkEdit = () => {};
  const initBulkDelete = () => {};

  return {
    isAllSelected,
    selectedTestCaseIDs,
    selectAll,
    updateSelection,
    initBulkMove,
    initBulkEdit,
    initBulkLink,
    initBulkDelete
  };
};
export default useTestCasesTable;
