import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import { STATUS_OPTIONS } from '../const/immutableConst';
import {
  setBulkSelectedtestCaseIDs,
  updateBulkOperation
} from '../slices/testRunDetailsSlice';

const useBulkFunctions = () => {
  const [isAllChecked, setAllChecked] = useState(false); // for the current page alone
  const [isIndeterminate, setIndeterminate] = useState(false); // for the current page alone
  const dispatch = useDispatch();

  const allTestCases = useSelector(
    (state) => state.testRunsDetails.allTestCases
  );
  const selectedTestCaseIDs = useSelector(
    (state) => state.testRunsDetails.bulkSelection.ids
  );
  const bulkOperationSelected = useSelector(
    (state) => state.testRunsDetails.bulkOperation
  );

  const setSelectedTestCaseIDs = (data) => {
    dispatch(setBulkSelectedtestCaseIDs(data));
  };

  const setBulkOperation = (data) => {
    dispatch(updateBulkOperation(data));
  };

  const resetBulkOperation = () => {
    dispatch(updateBulkOperation(null));
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
    bulkOperationSelected,
    isAllChecked,
    isIndeterminate,
    selectedTestCaseIDs,
    selectAll,
    updateSelection,
    setBulkOperation,
    resetBulkOperation,
    onRemoveHandler
  };
};

export default useBulkFunctions;
