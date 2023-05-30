import React, { memo, useMemo } from 'react';
import Highcharts from 'highcharts/highstock';
import PropTypes from 'prop-types';
import { getCustomTimeStamp } from 'utils/dateTime';

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

const TotalFailuresMetric = ({ isLoading, data, metric }) => {
  const seriesData = useMemo(() => {
    if (isLoading) {
      return [];
    }
    return [
      {
        name: 'Total Failures',
        lineColor: 'var(--colors-danger-500)',
        borderColor: 'black',
        color: 'transparent',
        data: data?.totalFailures
      },
      {
        name: 'Total Executions',
        lineColor: 'var(--colors-base-300)',
        borderColor: 'black',
        color: 'transparent',
        data: data?.totalExecutions
      }
    ];
  }, [data?.totalExecutions, data?.totalFailures, isLoading]);

  return (
    <StatsCard
      title="Failures"
      stat={metric?.value}
      subText={metric?.meta}
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

TotalFailuresMetric.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  metric: PropTypes.shape({
    meta: PropTypes.string,
    metric: PropTypes.string,
    value: PropTypes.string
  }).isRequired
};

export default memo(TotalFailuresMetric);
