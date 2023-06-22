import { FILTER_OPERATION_TYPE } from 'features/FilterSkeleton/constants';
import { setAppliedFilter } from 'features/FilterSkeleton/slices/filterSlice';

export const dispatchAppliedFilter = ({
  dispatch,
  type,
  value,
  customOperation
}) => {
  dispatch(
    setAppliedFilter({
      type,
      id: type,
      text: value,
      value,
      operationType: FILTER_OPERATION_TYPE.REMOVE_OPERATION,
      ...(customOperation ? { customOperation } : {})
    })
  );
};
