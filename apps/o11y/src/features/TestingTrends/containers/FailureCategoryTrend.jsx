import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yTooltip } from 'common/bifrostProxy';
import Chart from 'common/Chart';
import {
  COMMON_CHART_CONFIGS,
  COMMON_CHART_STYLES,
  SNP_PARAMS_MAPPING,
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
import { getBaseUrl, logOllyEvent } from 'utils/common';
import { getCustomTimeStamp } from 'utils/dateTime';

import CustomChartTooltip from '../components/CustomChartTooltip';

function getFormattedTooltip(activeProject, filters) {
  const url = `${getBaseUrl()}:8081/projects/${
    activeProject.normalisedName
  }/suite_health?${SNP_PARAMS_MAPPING.snpActiveBuild}=${
    filters.buildName.value
  }&${SNP_PARAMS_MAPPING.snpDateRange}=${filters.dateRange.key}`;

  const str = `${this.points.reduce((s, data) => {
    let returnString = `<div class="flex-1 mt-0.5">`;
    returnString += `<div class="flex justify-between"><div>
      <span style="color:${data.series.color}" class="font-sm">\u25CF&nbsp;</span>
      <span class="font-sm">${data.series.name}</span></div>
      <span>
        <b>${data.y}</b>
      </span>
    </div>
    </div>`;
    return returnString;
  }, '')}`;
  return `<div class="px-2 py-1 flex flex-col bg-base-800 rounded-lg text-base-200">
  <span class="font-sm mb-1.5" style="margin-bottom:6px">${getCustomTimeStamp({
    dateString: this.x
  })}</span>${str}<a class="text-white font-medium mt-0.5" href=${url} target="_blank">View all tests (Pro) </a></div>`;
}

function getChartOptions({
  afterSetExtremes,
  activeProject,
  handleTooltipData
}) {
  return {
    ...COMMON_CHART_CONFIGS,
    tooltip: {
      enabled: false
      // ...TOOLTIP_STYLES,
      // useHTML: true,
      // // outside: true,
      // shared: true,
      // formatter() {
      //   return getFormattedTooltip.call(this, activeProject, filters);
      // },
      // style: {
      //   pointerEvents: 'auto',
      //   ...TOOLTIP_STYLES.style
      // },
      // positioner(labelWidth, labelHeight, point) {
      //   const tooltipX = point.plotX + 20;
      //   const tooltipY = point.plotY - 30;
      //   return {
      //     x: tooltipX,
      //     y: tooltipY
      //   };
      // }
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
                  interaction: 'failure_category_clicked'
                }
              });
            },
            mouseOver(e) {
              const { plotX, plotY, pointRange: pointRangeOptions } = e.target;

              const seriesData = this.series.chart.series.map(
                (res) => ({
                  ...res,
                  index: this.index,
                  y: res.data[this.index]?.y,
                  pointRangeOptions
                }),
                this
              );

              handleTooltipData({
                options: [...seriesData],
                styles: {
                  top: plotY + 50,
                  left: plotX + 40,
                  width: 24,
                  height: 24
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
  const [tooltipData, setTooltipData] = useState({});
  const { afterSetExtremes } = useChartActions();

  const handleTooltipData = useCallback((tooltipRes) => {
    setTooltipData(tooltipRes);
  }, []);

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
      ...getChartOptions({
        afterSetExtremes,
        activeProject: projects.active,
        handleTooltipData
      }),
      series: chartData?.data || []
    }),
    [afterSetExtremes, chartData?.data, handleTooltipData, projects.active]
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
            <div
              className="bg-danger-500 absolute z-10 rounded-sm"
              key={tooltipData?.options?.id}
              style={{
                ...tooltipData?.styles
                // cursor: tooltipData?.options?.drillId ? 'pointer' : 'default'
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
                    tooltipData={tooltipData.options || {}}
                    activeProject={projects.active}
                    filters={filters}
                  />
                }
              >
                <div
                  className="bg-brand-500 h-full w-full"
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
        </div>
      )}
    </TrendStatesWrapper>
  );
}
