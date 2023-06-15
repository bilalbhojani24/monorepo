import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ADV_FILTER_TYPES } from 'features/FilterSkeleton/constants';
import { setAppliedFilter } from 'features/FilterSkeleton/slices/filterSlice';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';
import { logOllyEvent } from 'utils/common';
import {
  getDateInFormat,
  getUnixEndOfDay,
  getUnixStartOfDay
} from 'utils/dateTime';

import { useSuiteHealthContext } from '../context';

const useStatsChart = ({ eventName, chart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const { filterSliceFunction } = useSuiteHealthContext();

  const o11yMetricsEvent = useCallback(
    ({ interaction }) => {
      logOllyEvent({
        event: eventName,
        data: {
          project_name: activeProject.name,
          project_id: activeProject.id,
          chart,
          interaction
        }
      });
    },
    [activeProject.id, activeProject.name, chart, eventName]
  );

  const afterSetExtremes = useCallback(
    (e) => {
      if (e.trigger) {
        o11yMetricsEvent({ interaction: 'zoomed' });
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
    [
      activeProject?.normalisedName,
      dispatch,
      filterSliceFunction,
      navigate,
      o11yMetricsEvent
    ]
  );
  return { afterSetExtremes };
};

useStatsChart.propTypes = {
  eventName: PropTypes.string.isRequired,
  chart: PropTypes.string.isRequired
};

export default useStatsChart;
