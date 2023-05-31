import React, { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { ADV_FILTER_TYPES } from 'features/FilterSkeleton/constants';
import { findAppliedFilterByType } from 'features/FilterSkeleton/slices/selectors';
import Highcharts from 'highcharts/highstock';
import PropTypes from 'prop-types';
import { getCustomTimeStamp } from 'utils/dateTime';

import { getDateRangeSubTitles, getNumberFormattedYAxisLabel } from '../utils';

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

const TotalImpactedExecutionsMetric = ({ isLoading, data, metric }) => {
  const appliedDateRange = useSelector(
    findAppliedFilterByType(ADV_FILTER_TYPES.dateRange.key)
  );
  const seriesData = useMemo(() => {
    if (isLoading) {
      return [];
    }
    return [
      {
        name: 'Total Impacted Tests',
        lineColor: 'var(--colors-danger-500)',
        borderColor: 'black',
        color: 'transparent',
        data: data?.totalImpactedTests
      }
    ];
  }, [data?.totalImpactedTests, isLoading]);

  return (
    <StatsCard
      title="Total Impacted Tests"
      stat={metric?.value}
      subText={getDateRangeSubTitles(appliedDateRange)}
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

TotalImpactedExecutionsMetric.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  metric: PropTypes.shape({
    meta: PropTypes.string,
    metric: PropTypes.string,
    value: PropTypes.string
  }).isRequired
};

export default memo(TotalImpactedExecutionsMetric);
