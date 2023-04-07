import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getBuildUUID } from 'features/BuildDetails/slices/selectors';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import { getStackedColumnChartData } from 'features/TestsInsights/utils';
import isEmpty from 'lodash/isEmpty';
import { getBuildPath } from 'utils/routeUtils';

import { getBuildHistoryStats } from '../slices/selectors';
import { getBuildHistoryData } from '../slices/testInsightsSlice';

import WidgetLayoutCard from './WidgetLayoutCard';

function chartLoad(cb) {
  const axis = this.xAxis[0];
  const { ticks } = axis;
  const { points } = this.series[0];

  points.forEach((point, i) => {
    if (ticks[i]) {
      const label = ticks[i].label.element;

      label.onclick = function () {
        cb(point);
      };
    }
  });
}

export default function BuildHistory() {
  const { logInsightsInteractionEvent } = useContext(TestInsightsContext);
  const buildId = useSelector(getBuildUUID);
  const buildHistoryStats = useSelector(getBuildHistoryStats);
  const params = useParams();
  const buildNormalizedData = {
    projectNormalisedName: encodeURI(params.projectNormalisedName),
    buildNormalisedName: encodeURI(params.buildNormalisedName),
    buildSerialId: params.buildSerialId
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getBuildHistoryData({ buildId }));
  }, [buildId, dispatch]);

  const handleAxisClick = useCallback(
    (data) => {
      if (data?.category) {
        logInsightsInteractionEvent({
          interaction: 'build_history_other_run_clicked'
        });

        window.scroll(0, 0);
        navigate(
          `${getBuildPath(
            buildNormalizedData.projectNormalisedName,
            buildNormalizedData.buildNormalisedName,
            data.category
          )}?tab=tests`
        );
      }
    },
    [
      buildNormalizedData.buildNormalisedName,
      buildNormalizedData.projectNormalisedName,
      navigate,
      logInsightsInteractionEvent
    ]
  );

  const handleChartClick = useCallback(
    (data) => {
      if (data?.category && data?.series?.name) {
        logInsightsInteractionEvent({
          interaction: 'build_history_other_run_clicked'
        });

        window.scroll(0, 0);
        navigate(
          `${getBuildPath(
            buildNormalizedData.projectNormalisedName,
            buildNormalizedData.buildNormalisedName,
            data.category
          )}?tab=tests&status=${data.series.name}`
        );
      }
    },
    [
      buildNormalizedData.buildNormalisedName,
      buildNormalizedData.projectNormalisedName,
      navigate,
      logInsightsInteractionEvent
    ]
  );

  const chartData = useMemo(
    () =>
      getStackedColumnChartData({
        ...buildHistoryStats,
        onClick: handleChartClick,
        xAxisOptions: {
          labels: {
            format: '#{text}',
            style: {
              cursor: 'pointer'
            }
          }
        },
        chartOptions: {
          events: {
            load() {
              chartLoad.call(this, handleAxisClick);
            }
          }
        },
        seriesOptions: {
          series: {
            animation: false,
            maxPointWidth: 12,
            borderRadiusTopLeft: 3,
            borderRadiusTopRight: 3
          }
        }
      }),
    [buildHistoryStats, handleAxisClick, handleChartClick]
  );

  const hasNoData = useMemo(
    () => isEmpty(buildHistoryStats?.data) && !buildHistoryStats?.isLoading,
    [buildHistoryStats?.data, buildHistoryStats?.isLoading]
  );
  return (
    <WidgetLayoutCard
      chartOptions={chartData}
      isLoading={buildHistoryStats?.isLoading}
      showNoData={hasNoData}
      hasNetworkError={buildHistoryStats.hasNetworkError}
      placeholderConfig={{
        onClickCTA: () => dispatch(getBuildHistoryData({ buildId }))
      }}
    />
  );
}
