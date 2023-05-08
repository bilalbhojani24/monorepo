import React, { memo, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAppliedFilters } from 'features/FilterSkeleton/slices/selectors';
import { getActiveProject } from 'globalSlice/selectors';
import Highcharts from 'highcharts/highstock';
import { getCustomTimeStamp } from 'utils/dateTime';

import { getSnPTestsFailuresMetricsData } from '../slices/uiSlice';

import StatsCard from './StatsCard';
import StatsCardGraph from './StatsCardGraph';

const suffixes = ['', 'k', 'M', 'B', 'T'];

function getFormattedYAxisLabel() {
  const { value } = this;
  let absValue = Math.abs(value);
  let i = 0;
  while (absValue >= 1000 && i < suffixes.length - 1) {
    absValue /= 1000;
    i += 1;
  }
  const formattedValue = Highcharts.numberFormat(absValue, 0) + suffixes[i];
  return value >= 0 ? formattedValue : `-${formattedValue}`;
}

function getFormattedTooltip() {
  return this.points.reduce(
    (s, data) =>
      `${s}<br/><span>${data.series.name}: <b>${Highcharts.numberFormat(
        data.y,
        0
      )}%</b></span>`,
    `<span>${getCustomTimeStamp({
      dateString: this.x
    })}</span>`
  );
}

const TotalFailuresMetric = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const [totalFailuresPoints, setTotalFailuresPoints] = useState([]);
  const [totalExecutionPoints, setTotalExecutionPoints] = useState([]);
  const [metricInfo, setMetricInfo] = useState({});
  const appliedFilters = useSelector(getAllAppliedFilters);

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      getSnPTestsFailuresMetricsData({
        normalisedName: activeProject?.normalisedName
      })
    )
      .unwrap()
      .then((res) => {
        setTotalFailuresPoints(res.data.totalFailures);
        setTotalExecutionPoints(res.data.totalExecutions);
        setMetricInfo(res.insights);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activeProject?.normalisedName, dispatch, appliedFilters]);

  const seriesData = useMemo(
    () => [
      {
        name: 'Total Failures',
        lineColor: 'var(--colors-danger-500)',
        borderColor: 'black',
        color: 'transparent',
        data: totalFailuresPoints
      },
      {
        name: 'Total Executions',
        lineColor: 'var(--colors-base-300)',
        borderColor: 'black',
        color: 'transparent',
        data: totalExecutionPoints
      }
    ],
    [totalExecutionPoints, totalFailuresPoints]
  );

  return (
    <StatsCard
      title="Failures"
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

export default memo(TotalFailuresMetric);
