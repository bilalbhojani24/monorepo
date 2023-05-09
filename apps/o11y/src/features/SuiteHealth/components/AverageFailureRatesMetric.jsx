import React, { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAppliedFilters } from 'features/FilterSkeleton/slices/selectors';
import { getActiveProject } from 'globalSlice/selectors';
import Highcharts from 'highcharts/highstock';
import { getCustomTimeStamp } from 'utils/dateTime';

import { getSnPTestsAverageFailureRatesMetricsData } from '../slices/uiSlice';

import StatsCard from './StatsCard';
import StatsCardGraph from './StatsCardGraph';

function getFormattedYAxisLabel() {
  return `${Highcharts.numberFormat(this.value * 100, 0)}%`;
}

function getFormattedTooltip() {
  return this.points.reduce(
    (s, data) =>
      `${s}<br/><span>${data.series.name}: <b>${Highcharts.numberFormat(
        data.y * 100,
        0
      )}%</b></span>`,
    `<span>${getCustomTimeStamp({
      dateString: this.x
    })}</span>`
  );
}

const AverageFailureRatesMetric = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const [chartPoints, setChartPoints] = useState([]);
  const [metricInfo, setMetricInfo] = useState({});
  const appliedFilters = useSelector(getAllAppliedFilters);

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      getSnPTestsAverageFailureRatesMetricsData({
        normalisedName: activeProject?.normalisedName
      })
    )
      .unwrap()
      .then((res) => {
        setChartPoints(res.data.averageFailureRates);
        setMetricInfo(res.insights);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activeProject?.normalisedName, dispatch, appliedFilters]);

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
          yAxisLabelFormatter={getFormattedYAxisLabel}
          series={seriesData}
          markerColor="var(--colors-danger-500)"
          tooltipFormatter={getFormattedTooltip}
        />
      }
    />
  );
};

export default memo(AverageFailureRatesMetric);
