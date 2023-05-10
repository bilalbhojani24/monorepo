import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'common/Chart';
import {
  COMMON_CHART_CONFIGS,
  COMMON_CHART_STYLES,
  TOOLTIP_STYLES
} from 'constants/common';
import TrendStatesWrapper from 'features/TestingTrends/components/TrendStatesWrapper';
import useChartActions from 'features/TestingTrends/hooks/useChartActions';
import {
  getAllTTFilters,
  getTTFilterByKey
} from 'features/TestingTrends/slices/selectors';
import { getTrendFailureCategoriesData } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getProjects } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import { logOllyEvent } from 'utils/common';
import { getCustomTimeStamp } from 'utils/dateTime';

function getFormattedTooltip() {
  return this.points.reduce((s, data) => {
    let returnString = `${s}<br/><span style="color:${data.series.color}">\u25CF&nbsp;</span>`;
    returnString += `<span>${data.series.name}: <b>${data.y}</b></span>`;
    return returnString;
  }, `<span class="tt-small-text" style="margin-bottom:6px">${getCustomTimeStamp({ dateString: this.x })}</span>`);
}

function getChartOptions({ afterSetExtremes, activeProject }) {
  return {
    ...COMMON_CHART_CONFIGS,
    tooltip: {
      ...TOOLTIP_STYLES,
      shared: true,
      formatter() {
        return getFormattedTooltip.call(this);
      }
    },
    chart: {
      type: 'area',
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
      type: 'datetime',
      gridLineWidth: 1,
      gridZIndex: 0,
      gridLineDashStyle: 'Dash',
      minRange: 24 * 60 * 60 * 1000,
      events: {
        afterSetExtremes
      }
    },
    yAxis: {
      gridLineWidth: 1,
      gridZIndex: 0,
      gridLineDashStyle: 'Dash',
      title: {
        text: null
      },
      labels: {
        format: '{value}%'
      }
    },
    plotOptions: {
      series: {
        color: '#1b8bff',
        animation: false,
        connectNulls: null,
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
                  interaction: 'failure_category_clicked'
                }
              });
            }
          }
        }
      },
      area: {
        stacking: 'percent',
        marker: {
          enabled: false
        }
      }
    }
  };
}

export default function FailureCategoryTrend() {
  const filters = useSelector(getAllTTFilters);
  const activeDateRange = useSelector((state) =>
    getTTFilterByKey(state, 'dateRange')
  );
  const [chartData, setChartData] = useState({});
  const dispatch = useDispatch();
  const projects = useSelector(getProjects);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { afterSetExtremes } = useChartActions();

  const fetchData = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
    dispatch(
      getTrendFailureCategoriesData({
        normalisedName: projects.active?.normalisedName,
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
  }, [dispatch, projects.active?.normalisedName, filters]);

  useEffect(() => {
    if (projects.active?.normalisedName) {
      fetchData();
    }
  }, [fetchData, projects.active?.normalisedName]);

  const options = useMemo(
    () => ({
      ...getChartOptions({ afterSetExtremes, activeProject: projects.active }),
      series: chartData?.data || []
    }),
    [afterSetExtremes, chartData?.data, projects.active]
  );

  return (
    <TrendStatesWrapper
      isLoading={isLoading}
      isEmpty={isEmpty(chartData?.data)}
      hasError={hasError}
      onClickCTA={fetchData}
    >
      {!isLoading && (
        <div className="flex h-full flex-col">
          {chartData?.percentage !== undefined && (
            <p className="">{chartData?.percentage}%</p>
          )}
          <div className="h-full flex-1">
            <Chart
              options={options}
              key={`${activeDateRange?.key}-${activeDateRange?.upperBound}-${activeDateRange?.lowerBound}`}
            />
          </div>
        </div>
      )}
    </TrendStatesWrapper>
  );
}
