import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TT_PARAMS_MAPPING } from 'features/TestingTrends/constants';
import { setTTFilters } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getActiveProject } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';
import { getUnixEndOfDay, getUnixStartOfDay } from 'utils/dateTime';

const useChartActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeProject = useSelector(getActiveProject);
  const afterSetExtremes = useCallback(
    (e) => {
      if (e.trigger) {
        const lower = Math.round(e.min);
        const upper = Math.round(e.max);
        const toTime = getUnixEndOfDay(upper) * 1000;
        const fromTime = getUnixStartOfDay(lower) * 1000;
        const searchParams = new URLSearchParams(window?.location?.search);
        searchParams.set(TT_PARAMS_MAPPING.ttDateRange, 'custom');
        searchParams.set(TT_PARAMS_MAPPING.ttToDate, toTime);
        searchParams.set(TT_PARAMS_MAPPING.ttFromDate, fromTime);
        navigate({ search: searchParams.toString() });
        dispatch(
          setTTFilters({
            dateRange: {
              key: 'custom',
              upperBound: toTime,
              lowerBound: fromTime
            }
          })
        );
        logOllyEvent({
          event: 'O11yTestingTrendsInteracted',
          data: {
            project_name: activeProject.name,
            project_id: activeProject.id,
            interaction: 'chart_zoomed'
          }
        });
      }
    },
    [activeProject.id, activeProject.name, dispatch, navigate]
  );

  return {
    afterSetExtremes
  };
};

export default useChartActions;
