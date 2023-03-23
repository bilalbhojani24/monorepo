import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from 'common/Chart';
import {
  COMMON_CHART_CONFIGS,
  COMMON_CHART_STYLES,
  TOOLTIP_STYLES
} from 'constants/common';
import {
  getAllTTFilters,
  getTTFilterByKey
} from 'features/TestingTrends/slices/selectors';
import { getTrendPerformanceChartData } from 'features/TestingTrends/slices/testingTrendsSlice';
import { getProjects } from 'globalSlice/selectors';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { logOllyEvent } from 'utils/common';
import { getCustomTimeStamp, milliSecondsToTime } from 'utils/dateTime';

import useChartActions from '../hooks/useChartActions';

import TrendStatesWrapper from './TrendStatesWrapper';

function getFormattedYAxisLabel() {
  return milliSecondsToTime(this.value);
}
function getFormattedTooltip() {
  return this.points.reduce((s, data) => {
    let returnString = `${s}`;
    if (!isEmpty(data.point.pointRange)) {
      returnString += `<span class="tt-small-text">${getCustomTimeStamp({
        dateString: data.point.pointRange[0],
        withoutTime: true
      })} </span>`;
      returnString += ` - <span class="tt-small-text">${getCustomTimeStamp({
        dateString: data.point.pointRange[1],
        withoutTime: true
      })}</span>`;
    }
    if (returnString) {
      returnString += `<br/>`;
    }
    returnString += `<span style="color:${data.series.color}">\u25CF&nbsp;</span>`;
    if (data.series.name === 'Duration') {
      returnString += `<span>${data.series.name}: <b>${milliSecondsToTime(
        data.y
      )}</b></span>`;
    } else {
      returnString += `<span>${data.series.name}: <b>${data.y}</b></span>`;
    }
    return returnString;
  }, ``);
}

const getChartOptions = ({ afterSetExtremes, activeProject }) => ({
  ...COMMON_CHART_CONFIGS,
  tooltip: {
    ...TOOLTIP_STYLES,
    formatter() {
      return getFormattedTooltip.call(this);
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

export default function PerformanceGraph({ buildId }) {
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
        buildId,
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
  }, [buildId, dispatch, projects.active?.normalisedName, filters]);

  useEffect(() => {
    if (projects.active?.normalisedName && buildId) {
      fetchData();
    }
  }, [buildId, projects.active?.normalisedName, fetchData]);

  const options = useMemo(
    () => ({
      ...getChartOptions({ afterSetExtremes, activeProject: projects.active }),
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
    [afterSetExtremes, chartData?.barData, chartData?.lineData, projects.active]
  );

  return (
    <TrendStatesWrapper
      isLoading={isLoading}
      isEmpty={isEmpty(chartData?.lineData) && isEmpty(chartData?.barData)}
      hasError={hasError}
      onClickCTA={fetchData}
    >
      {!isLoading && (
        <div className="h-96">
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
  buildId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
PerformanceGraph.defaultProps = {
  buildId: ''
};
