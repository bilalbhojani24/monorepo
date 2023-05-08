import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveProject } from 'globalSlice/selectors';
import Highcharts from 'highcharts/highstock';
import { getUnixEndOfDay, getUnixStartOfDay } from 'utils/dateTime';

import { getSnPTestsAverageFailureRatesMetricsData } from '../slices/uiSlice';

import StatsCard from './StatsCard';
import StatsCardGraph from './StatsCardGraph';

function getFormattedYAxisLabel() {
  return `${Highcharts.numberFormat(this.value * 100, 0)}%`;
}

const AverageFailureRatesMetric = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const [chartPoints, setChartPoints] = useState([]);
  const [metricInfo, setMetricInfo] = useState({});

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      getSnPTestsAverageFailureRatesMetricsData({
        normalisedName: activeProject?.normalisedName
      })
    )
      .unwrap()
      .then((res) => {
        setChartPoints(res.data);
        setMetricInfo(res.insights);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activeProject?.normalisedName, dispatch]);

  const afterSetExtremes = useCallback((e) => {
    if (e.trigger) {
      const lower = Math.round(e.min);
      const upper = Math.round(e.max);
      const toTime = getUnixEndOfDay(upper) * 1000;
      const fromTime = getUnixStartOfDay(lower) * 1000;

      // eslint-disable-next-line no-console
      console.log(toTime, fromTime);
    }
  }, []);

  const seriesData = useMemo(
    () => [
      {
        name: 'Average Duration',
        lineColor: 'var(--colors-danger-500)',
        borderColor: 'black',
        color: 'transparent',
        data: chartPoints
      }
    ],
    [chartPoints]
  );

  return (
    <StatsCard
      title="Avg. Failure Rate"
      stat={metricInfo.value}
      subText={metricInfo.subText}
      isLoading={isLoading}
      graph={
        <StatsCardGraph
          afterSetExtremes={afterSetExtremes}
          yAxisLabelFormatter={getFormattedYAxisLabel}
          series={seriesData}
          markerColor="var(--colors-danger-500)"
        />
      }
    />
  );
};

export default memo(AverageFailureRatesMetric);
