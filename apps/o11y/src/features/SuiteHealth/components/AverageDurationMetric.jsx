import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { getCustomTimeStamp, milliSecondsToTime } from 'utils/dateTime';

import SplineGraph from './SplineGraph';
import StatsCard from './StatsCard';

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
      dateString: this.x,
      withoutTime: true
    })}</span>`
  );
}

const AverageDurationMetric = ({ isLoading, data, metric }) => {
  const seriesData = useMemo(() => {
    if (isLoading) {
      return [];
    }
    return [
      {
        name: 'Average Duration',
        lineColor: 'var(--colors-brand-500)',
        borderColor: 'black',
        color: 'transparent',
        data: data?.averageDuration
      }
    ];
  }, [data?.averageDuration, isLoading]);

  return (
    <StatsCard
      title="Average Duration"
      stat={metric?.value}
      subText=""
      isLoading={isLoading}
      graph={
        <SplineGraph
          yAxisLabelFormatter={getFormattedYAxisLabel}
          series={seriesData}
          markerColor="var(--colors-brand-500)"
          tooltipFormatter={getFormattedTooltip}
          eventName="O11ySuiteHealthTestsChartInteracted"
          chart="avg_duration"
        />
      }
    />
  );
};

AverageDurationMetric.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  metric: PropTypes.shape({
    meta: PropTypes.string,
    metric: PropTypes.string,
    value: PropTypes.string
  }).isRequired
};

export default memo(AverageDurationMetric);
