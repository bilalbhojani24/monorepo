import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { ADV_FILTER_TYPES } from 'features/FilterSkeleton/constants';
import { setAppliedFilter } from 'features/FilterSkeleton/slices/filterSlice';
import {
  getDateInFormat,
  getUnixEndOfDay,
  getUnixStartOfDay
} from 'utils/dateTime';

const useStatsChart = () => {
  const dispatch = useDispatch();

  const afterSetExtremes = useCallback(
    (e) => {
      if (e.trigger) {
        const lower = Math.round(e.min);
        const upper = Math.round(e.max);
        const fromTime = getUnixStartOfDay(lower) * 1000;
        const toTime = getUnixEndOfDay(upper) * 1000;

        const formattedText = `${getDateInFormat(fromTime)} - ${getDateInFormat(
          toTime
        )}`;
        dispatch(
          setAppliedFilter({
            type: ADV_FILTER_TYPES.dateRange.key,
            id: 'custom',
            operationType: 'addOperation',
            text: formattedText,
            value: {
              upperBound: toTime,
              lowerBound: fromTime
            },
            isApplied: true
          })
        );
      }
    },
    [dispatch]
  );
  return { afterSetExtremes };
};

export default useStatsChart;
