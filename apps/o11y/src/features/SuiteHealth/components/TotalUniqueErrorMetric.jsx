import React, { memo, useMemo } from 'react';
import Highcharts from 'highcharts/highstock';
import PropTypes from 'prop-types';
import { getCustomTimeStamp } from 'utils/dateTime';

import { getNumberFormattedYAxisLabel } from '../utils';

import StatsCard from './StatsCard';
import StatsCardGraph from './StatsCardGraph';

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

const TotalUniqueErrorMetric = ({ isLoading, data, metric }) => {
  const seriesData = useMemo(() => {
    if (isLoading) {
      return [];
    }
    return [
      {
        name: 'Total Unique Errors',
        lineColor: 'var(--colors-danger-500)',
        borderColor: 'black',
        color: 'transparent',
        data: data?.totalUniqueErrors
      }
    ];
  }, [data?.totalUniqueErrors, isLoading]);

  return (
    <StatsCard
      title="Total Unique Errors"
      stat={metric?.value}
      subText={metric?.meta}
      isLoading={isLoading}
      graph={
        <StatsCardGraph
          yAxisLabelFormatter={getNumberFormattedYAxisLabel}
          series={seriesData}
          markerColor="var(--colors-danger-500)"
          tooltipFormatter={getFormattedTooltip}
        />
      }
    />
  );
};

TotalUniqueErrorMetric.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  metric: PropTypes.shape({
    meta: PropTypes.string,
    metric: PropTypes.string,
    value: PropTypes.string
  }).isRequired
};

export default memo(TotalUniqueErrorMetric);
