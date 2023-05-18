import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'common/Chart';
import {
  COMMON_CHART_CONFIGS,
  COMMON_CHART_STYLES,
  SNP_PARAMS_MAPPING,
  TOOLTIP_STYLES
} from 'constants/common';
import {
  getAllTTFilters,
  getTTFilterByKey
} from 'features/TestingTrends/slices/selectors';
import { getTrendPerformanceChartData } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getProjects } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { getBaseUrl, logOllyEvent } from 'utils/common';
import { getCustomTimeStamp, milliSecondsToTime } from 'utils/dateTime';

import useChartActions from '../hooks/useChartActions';

import TrendStatesWrapper from './TrendStatesWrapper';

function getFormattedYAxisLabel() {
  return milliSecondsToTime(this.value);
}
function getFormattedTooltip(activeProject, filters) {
  const url = `${getBaseUrl()}:8081/projects/${
    activeProject.normalisedName
  }/suite_health?${SNP_PARAMS_MAPPING.snpActiveBuild}=${
    filters.buildName.value
  }&${SNP_PARAMS_MAPPING.snpDateRange}=${filters.dateRange.key}`;

  const str = this.points.reduce((s, data) => {
    let returnString = `${s}`;
    if (!isEmpty(data.point.pointRange)) {
      returnString += `<div><span class="font-sm">${getCustomTimeStamp({
        dateString: data.point.pointRange[0],
        withoutTime: true
      })} </span>`;
      returnString += ` - <span class="font-sm">${getCustomTimeStamp({
        dateString: data.point.pointRange[1],
        withoutTime: true
      })}</span></div>`;
    }

    returnString += `<div class="flex-1 mt-0.5">`;
    returnString += `<div class="flex justify-between"><div>
      <span style="color:${data.series.color}" class="font-sm">\u25CF&nbsp;</span>`;
    if (data.series.name === 'Average Duration') {
      returnString += `<span>${
        data.series.name
      }</span></div> <span><b>${milliSecondsToTime(
        data.y
      )}</b></span></div></div>`;
    } else {
      returnString += `<span>${data.series.name}</span></div> <span><b>${data.y}</b></span></div></div>`;
    }
    return returnString;
  }, '');

  return `<div class="px-2 py-1 flex flex-col bg-base-800 rounded-lg text-base-200">${str}
    <a class="text-white font-medium mt-0.5" href=${url} target="_blank">View all tests (Pro) </a></div>`;
}

const getChartOptions = ({ afterSetExtremes, activeProject, filters }) => ({
  ...COMMON_CHART_CONFIGS,
  tooltip: {
    ...TOOLTIP_STYLES,
    formatter() {
      return getFormattedTooltip.call(this, activeProject, filters);
    },
    shared: true
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
        text: 'Duration',
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
  const filters = useSelector(getAllTTFilters);
  const { afterSetExtremes } = useChartActions();

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
        filters
      }),
      series: [
        {
          type: 'column',
          data: chartData?.barData,
          name: 'Duration',
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
      filters,
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
        <div className="h-full">
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
