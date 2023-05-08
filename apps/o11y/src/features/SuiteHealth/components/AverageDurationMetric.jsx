import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveProject } from 'globalSlice/selectors';
import {
  getCustomTimeStamp,
  getUnixEndOfDay,
  getUnixStartOfDay,
  milliSecondsToTime
} from 'utils/dateTime';

import { getSnPTestsAvergeDurationMetricsData } from '../slices/uiSlice';

import StatsCard from './StatsCard';
import StatsCardGraph from './StatsCardGraph';

function getFormattedYAxisLabel() {
  return milliSecondsToTime(this.value);
}

function getFormattedTooltip() {
  return this.points.reduce(
    (s, data) =>
      `${s}<br/><span>${data.series.name}: <b>${milliSecondsToTime(
        data.y
      )}</b></span>`,
    `<span>${getCustomTimeStamp({
      dateString: this.x
    })}</span>`
  );
}

const AverageDurationMetric = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const [chartPoints, setChartPoints] = useState([]);
  const [metricInfo, setMetricInfo] = useState({});

  useEffect(() => {
    setIsLoading(true);
    dispatch(
      getSnPTestsAvergeDurationMetricsData({
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
        lineColor: 'var(--colors-brand-500)',
        borderColor: 'black',
        color: 'transparent',
        data: chartPoints
      }
    ],
    [chartPoints]
  );

  return (
    <StatsCard
      title="Average Duration"
      stat={metricInfo.value}
      subText={metricInfo.subText}
      isLoading={isLoading}
      graph={
        <StatsCardGraph
          afterSetExtremes={afterSetExtremes}
          yAxisLabelFormatter={getFormattedYAxisLabel}
          series={seriesData}
          markerColor="var(--colors-brand-500)"
          tooltipFormatter={getFormattedTooltip}
        />
      }
    />
  );
};

export default memo(AverageDurationMetric);
