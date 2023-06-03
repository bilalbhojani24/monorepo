import React, { memo, useMemo } from 'react';
import Highcharts from 'highcharts/highstock';
import PropTypes from 'prop-types';
import { getCustomTimeStamp } from 'utils/dateTime';

import { getNumberFormattedYAxisLabel } from '../utils';

import AreaSplineGraph from './AreaSplineGraph';
import StatsCard from './StatsCard';

function getFormattedTooltip() {
  return this.points.reduce(
    (s, data) =>
      `${s}<br/><span>${data.series.name}: <b>${Highcharts.numberFormat(
        data.y,
        0
      )}</b></span>`,
    `<span>${getCustomTimeStamp({
      dateString: this.x,
      withoutTime: true
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
        name: 'Total Executions',
        lineColor: 'var(--colors-brand-300)',
        borderColor: 'black',
        color: 'transparent',
        fillColor: 'var(--colors-brand-100)',
        data: data?.totalExecutions
      },
      {
        name: 'Failed Executions',
        lineColor: 'var(--colors-danger-500)',
        borderColor: 'black',
        color: 'transparent',
        fillColor: 'var(--colors-danger-200)',
        data: data?.totalFailures
      }
    ];
  }, [data?.totalExecutions, data?.totalFailures, isLoading]);

  // #TODO => check with Dinesh, if metric meta text also changed or not
  return (
    <StatsCard
      title="Failed Execution Count"
      stat={metric?.value}
      subText={metric?.meta}
      isLoading={isLoading}
      graph={
        <AreaSplineGraph
          yAxisLabelFormatter={getNumberFormattedYAxisLabel}
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
