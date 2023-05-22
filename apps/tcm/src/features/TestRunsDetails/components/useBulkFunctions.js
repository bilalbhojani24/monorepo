import { useDispatch, useSelector } from 'react-redux';
import { STATUS_OPTIONS } from '../const/immutableConst';
import {
  resetBulkSelection,
  setBulkSelectedtestCaseIDs,
  updateBulkOperation
} from '../slices/testRunDetailsSlice';

const useBulkFunctions = () => {
  const dispatch = useDispatch();

  const testCaseDetails = useSelector(
    (state) => state.testRunsDetails.testCaseDetails
  );

  const selectAll = () => {};
  const updateSelection = () => {};

  return {
    selectAll,
    updateSelection
  };
};

export default useBulkFunctions;
