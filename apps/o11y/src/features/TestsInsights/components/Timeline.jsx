import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBuildTimelineStats } from 'api/insights';
import { getBuildUUID } from 'features/BuildDetails/slices/selectors';
import { isEmpty } from 'lodash';
import { milliSecondsToTime } from 'utils/dateTime';

import { COMMON_CHART_STYLES, getStackedColumnChartData } from '../utils';

import WidgetLayoutCard from './WidgetLayoutCard';

function getFormattedAxisLabel() {
  return milliSecondsToTime(this.value);
}

function getFormattedTooltip() {
  return this.points.reduce(
    (s, point) => `${s}<br/>${point.series.name}: <b>${point.y}</b>`,
    `<b>${milliSecondsToTime(this.x)}</b>`
  );
}

export default function Timeline() {
  const buildId = useSelector(getBuildUUID);
  const [buildTimelineStats, setBuildTimelineStats] = useState({
    isLoading: true,
    data: {}
  });
  const mounted = React.useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    mounted.current = true;
    (async () => {
      try {
        const response = await getBuildTimelineStats(buildId);
        if (mounted.current) {
          setBuildTimelineStats({
            isLoading: false,
            data: response.data?.data
          });
        }
      } catch (err) {
        if (mounted.current) {
          setBuildTimelineStats({
            isLoading: false,
            data: {}
          });
        }
      }
    })();
    return () => {
      mounted.current = false;
    };
  }, [buildId, dispatch]);

  const chartData = useMemo(
    () =>
      getStackedColumnChartData({
        data: buildTimelineStats.data,
        seriesOptions: {
          series: {
            boostThreshold: 1000,
            stacking: 'normal',
            cropThreshold: 10000
          }
        },
        chartOptions: {
          zoomType: 'x',
          panning: true,
          panKey: 'shift',
          ...COMMON_CHART_STYLES
        },
        otherOptions: {
          tooltip: {
            shared: true,
            formatter() {
              return getFormattedTooltip.call(this);
            }
          },
          legend: { enabled: false },
          boost: {
            useGPUTranslations: true,
            // Chart-level boost when there are more than 1 series in the chart
            seriesThreshold: 1
          }
        },
        xAxisOptions: {
          labels: {
            formatter() {
              return getFormattedAxisLabel.call(this);
            }
          }
        }
      }),
    [buildTimelineStats.data]
  );

  const hasNoData = useMemo(
    () => isEmpty(buildTimelineStats?.data) && !buildTimelineStats?.isLoading,
    [buildTimelineStats?.data, buildTimelineStats?.isLoading]
  );

  return (
    <WidgetLayoutCard
      chartOptions={chartData}
      title="Timeline"
      isLoading={buildTimelineStats?.isLoading}
      showNoData={hasNoData}
    />
  );
}
