import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yTooltip } from 'common/bifrostProxy';
import Chart from 'common/Chart';
import { COMMON_CHART_CONFIGS, COMMON_CHART_STYLES } from 'constants/common';
import {
  getAllTTFilters,
  getTTFilterByKey
} from 'features/TestingTrends/slices/selectors';
import { getTrendPerformanceChartData } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getProjects } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { logOllyEvent } from 'utils/common';
import { milliSecondsToTime } from 'utils/dateTime';

import useChartActions from '../hooks/useChartActions';

import CustomChartTooltip from './CustomChartTooltip';
import TrendStatesWrapper from './TrendStatesWrapper';

function getFormattedYAxisLabel() {
  return milliSecondsToTime(this.value);
}

const getChartOptions = ({
  afterSetExtremes,
  activeProject,
  handleTooltipData
}) => ({
  ...COMMON_CHART_CONFIGS,
  tooltip: {
    enabled: false
  },
  chart: {
    zoomType: 'x',
    animation: false,
    ...COMMON_CHART_STYLES,
    events: {
      render() {
        this.resetZoomButton?.hide();
      }
    }
  },
  xAxis: {
    gridLineWidth: 1,
    gridZIndex: 0,
    gridLineDashStyle: 'Dash',
    type: 'datetime',
    minRange: 24 * 60 * 60 * 1000,
    events: {
      afterSetExtremes
    }
  },
  yAxis: [
    {
      gridLineWidth: 1,
      gridZIndex: 0,
      gridLineDashStyle: 'Dash',
      title: {
        text: 'Test Cases',
        style: {
          color: '#376D98'
        }
      },
      labels: {
        style: {
          color: '#376D98'
        }
      }
    },
    {
      gridLineWidth: 1,
      gridZIndex: 0,
      gridLineDashStyle: 'Dash',
      title: {
        text: 'Average Duration',
        style: {
          color: '#49837C'
        }
      },
      labels: {
        style: {
          color: '#49837C'
        },
        formatter() {
          return getFormattedYAxisLabel.call(this);
        }
      },
      opposite: true
    }
  ],
  plotOptions: {
    series: {
      color: '#376D98',
      animation: false,
      connectNulls: true,
      marker: {
        radius: 3
      },
      point: {
        events: {
          click: () => {
            logOllyEvent({
              event: 'O11yTestingTrendsInteracted',
              data: {
                project_name: activeProject.name,
                project_id: activeProject.id,
                interaction: 'performance_clicked'
              }
            });
          },
          mouseOver(e) {
            const { plotX, plotY, index } = e.target;
            const seriesData = e.target.series.chart.series.map((res) => ({
              ...res,
              index,
              y: res.data[index]?.y,
              pointRangeOptions: res.data[index]?.pointRange
            }));

            const { plotBox } = e.target.series.chart;
            const { spacingBox } = e.target.series.chart;

            handleTooltipData({
              options: [...seriesData],
              styles: {
                top: e.target?.dlBox?.y
                  ? plotBox.y + e.target?.dlBox?.y
                  : plotY + plotBox.y - spacingBox.y,
                left: e.target?.dlBox?.x
                  ? plotBox.x + e.target?.dlBox?.x
                  : plotX + plotBox.x - spacingBox.x,
                width: e.target?.dlBox?.width || 16,
                height: e.target?.dlBox?.height || 16
              }
            });
          }
        }
      }
    },
    column: {
      stacking: 'normal',
      cursor: 'pointer',
      maxPointWidth: 12
    }
  }
});

export default function PerformanceGraph({ buildName }) {
  const [chartData, setChartData] = useState({});
  const activeDateRange = useSelector((state) =>
    getTTFilterByKey(state, 'dateRange')
  );
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [tooltipData, setTooltipData] = useState({});

  const filters = useSelector(getAllTTFilters);
  const { afterSetExtremes } = useChartActions();

  const handleTooltipData = useCallback((tooltipRes) => {
    setTooltipData(tooltipRes);
  }, []);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    dispatch(
      getTrendPerformanceChartData({
        normalisedName: projects.active?.normalisedName,
        buildName,
        filters
      })
    )
      .unwrap()
      .then((res) => {
        setChartData(res);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [buildName, dispatch, projects.active?.normalisedName, filters]);

  useEffect(() => {
    if (projects.active?.normalisedName && buildName) {
      fetchData();
    }
  }, [buildName, projects.active?.normalisedName, fetchData]);

  const options = useMemo(
    () => ({
      ...getChartOptions({
        afterSetExtremes,
        activeProject: projects.active,
        handleTooltipData
      }),
      series: [
        {
          type: 'column',
          data: chartData?.barData,
          name: 'Average Duration',
          yAxis: 1,
          color: '#9DD0CA',
          borderRadiusTopLeft: 3,
          borderRadiusTopRight: 3
        },
        {
          type: 'spline',
          data: chartData?.lineData,
          name: 'Test Cases'
        }
      ]
    }),
    [
      afterSetExtremes,
      chartData?.barData,
      chartData?.lineData,
      handleTooltipData,
      projects.active
    ]
  );

  return (
    <TrendStatesWrapper
      isLoading={isLoading}
      isEmpty={isEmpty(chartData?.lineData) && isEmpty(chartData?.barData)}
      hasError={hasError}
      onClickCTA={fetchData}
    >
      {!isLoading && (
        <div className="relative h-full">
          <div
            className="absolute z-10 rounded-sm"
            key={tooltipData?.options?.id}
            style={{
              ...tooltipData?.styles
            }}
            onClick={() => {}}
            role="presentation"
          >
            <O11yTooltip
              theme="dark"
              wrapperClassName="py-2"
              placementSide="top"
              placementAlign="center"
              triggerAsChild
              content={
                <CustomChartTooltip
                  tooltipData={tooltipData.options || []}
                  activeProject={projects.active}
                  filters={filters}
                />
              }
            >
              <div
                className="h-full w-full"
                style={{
                  ...tooltipData?.styles
                }}
              />
            </O11yTooltip>
          </div>
          <Chart
            options={options}
            key={`${activeDateRange?.key}-${activeDateRange?.upperBound}-${activeDateRange?.lowerBound}`}
          />
        </div>
      )}
    </TrendStatesWrapper>
  );
}

PerformanceGraph.propTypes = {
  buildName: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
PerformanceGraph.defaultProps = {
  buildName: ''
};
