import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ADV_FILTER_TYPES } from 'features/FilterSkeleton/constants';
import { setAppliedFilter } from 'features/FilterSkeleton/slices/filterSlice';
import { getActiveProject } from 'globalSlice/selectors';
import {
  getDateInFormat,
  getUnixEndOfDay,
  getUnixStartOfDay
} from 'utils/dateTime';

import { useSuiteHealthContext } from '../context';

const useStatsChart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const { filterSliceFunction } = useSuiteHealthContext();

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
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('daterangetype', 'custom');

        searchParams.set('dateRange', `${fromTime},${toTime}`);

        navigate({ search: searchParams.toString() });
        dispatch(
          filterSliceFunction({
            normalisedName: activeProject?.normalisedName
          })
        );
      }
    },
    [activeProject?.normalisedName, dispatch, filterSliceFunction, navigate]
  );
  return { afterSetExtremes };
};

export default useStatsChart;
