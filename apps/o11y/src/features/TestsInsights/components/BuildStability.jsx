import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { setTestRuns } from 'testops/TestList/slices/dataSlice';
// import {
//   getBuildNormalizedData
// } from 'testops/TestList/slices/selectors';
import { getBuildUUID } from 'features/BuildDetails/slices/selectors';
import { TestInsightsContext } from 'features/TestsInsights/TestInsightsContext';
import { isEmpty } from 'lodash';
import { getBuildPath } from 'utils/routeUtils';

import { getBuildStabilityStats } from '../slices/selectors';
import { getBuildStabilityData } from '../slices/testInsightsSlice';
import { getLineChartData } from '../utils';

import WidgetLayoutCard from './WidgetLayoutCard';

const P10_ID = 'P10';

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

export default function BuildStability() {
  const { logInsightsInteractionEvent } = useContext(TestInsightsContext);
  const buildStabilityStats = useSelector(getBuildStabilityStats);
  const buildNormalizedData = {}; // useSelector(getBuildNormalizedData);
  const buildId = useSelector(getBuildUUID);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBuildStabilityData({ buildId }));
  }, [buildId, dispatch]);

  const handleRedirectToBuild = useCallback(
    (data) => {
      if (data?.category) {
        logInsightsInteractionEvent({
          interaction: 'stability_other_build_clicked'
        });

        // Clearing test runs before landing on test listing to fetch new tests based on applied filter
        // dispatch(setTestRuns([]));
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

  const chartData = useMemo(
    () =>
      getLineChartData({
        keys: buildStabilityStats.data?.keys,
        median: buildStabilityStats.data?.median,
        xAxisOptions: {
          labels: {
            format: '#{text}',
            style: {
              cursor: 'pointer'
            }
          }
        },
        yAxisOptions: {
          // max: 100,
          plotLines: [
            {
              id: P10_ID,
              color: '#D65444',
              width: 1,
              value: buildStabilityStats.data?.median || 0,
              dashStyle: 'Dash'
            }
          ]
        },
        chartOptions: {
          animation: false,
          type: 'spline',
          zoomType: 'xy',
          panning: true,
          panKey: 'shift',
          events: {
            load() {
              chartLoad.call(this, handleRedirectToBuild);
            }
          }
        },
        otherOptions: {
          legend: {
            align: 'left',
            verticalAlign: 'top',
            x: -10,
            itemStyle: {
              color: '#333',
              fontWeight: 'normal',
              textTransform: 'capitalize'
            }
          },
          plotOptions: {
            series: {
              color: '#4F95E4',
              animation: false,
              threshold: buildStabilityStats.data?.median,
              negativeColor: '#D65444',
              marker: {
                radius: 3
              },
              point: {
                events: {
                  click: (e) => {
                    if (e?.point?.category) {
                      handleRedirectToBuild(e.point);
                    }
                  }
                }
              }
            },
            trendline: {
              color: '#CBD7E5',
              negativeColor: '#CBD7E5',
              dashStyle: 'Solid',
              lineWidth: 1,
              showInLegend: true,
              marker: {
                enabled: false
              }
            }
          },
          series: [
            {
              id: 'stabilityChart',
              data: buildStabilityStats.data?.data,
              name: 'Stability'
            },
            {
              name: 'Trend',
              type: 'trendline',
              linkedTo: 'stabilityChart'
            },
            {
              id: P10_ID,
              color: '#D65444',
              name: 'P10',
              dashStyle: 'Dash',
              marker: {
                enabled: false
              }
            }
          ]
        }
      }),
    [
      buildStabilityStats.data?.data,
      buildStabilityStats.data?.keys,
      buildStabilityStats.data?.median,
      handleRedirectToBuild
    ]
  );

  const hasNoData = useMemo(
    () => isEmpty(buildStabilityStats?.data) && !buildStabilityStats?.isLoading,
    [buildStabilityStats?.data, buildStabilityStats?.isLoading]
  );
  return (
    <WidgetLayoutCard
      height={60}
      chartOptions={chartData}
      title="Build Stability"
      isLoading={buildStabilityStats?.isLoading}
      bigNumberData={buildStabilityStats?.data?.overview}
      bigNumberConfig={{ noHover: true }}
      showNoData={hasNoData}
      hasNetworkError={buildStabilityStats.hasNetworkError}
      placeholderConfig={{
        onClickCTA: () => dispatch(getBuildStabilityData({ buildId }))
      }}
    />
  );
}
