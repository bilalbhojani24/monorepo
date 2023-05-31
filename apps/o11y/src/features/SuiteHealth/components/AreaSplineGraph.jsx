import React, { memo, useMemo } from 'react';
import Chart from 'common/Chart';
import { TOOLTIP_STYLES } from 'constants/common';
import PropTypes from 'prop-types';

import useStatsChart from '../hooks/useStatsChart';

const CHART_OPTIONS = {
  title: {
    text: null
  },
  exporting: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  legend: {
    enabled: false
  },
  subtitle: {
    text: null
  },
  xAxis: {
    enabled: false,
    showEmpty: false,
    labels: {
      enabled: false
    },
    lineColor: 'var(--colors-base-300)',
    tickWidth: 0
  },
  yAxis: {
    gridLineWidth: 0,
    min: 0,
    labels: {
      x: -5
    },
    title: {
      text: null
    },
    lineColor: 'transparent',
    lineWidth: 1
  },
  tooltip: {
    shared: true,
    useHTML: true,
    ...TOOLTIP_STYLES,
    style: {
      width: '250px',
      whiteSpace: 'normal',
      color: '#fff'
    }
  },
  plotOptions: {
    areaspline: {
      lineWidth: 2,
      lineWidthPlus: 0,
      fillOpacity: 0.5,
      stacking: 'normal',
      marker: {
        enabled: false,
        lineColor: 'red',
        lineWidth: 1,
        radius: 1,
        symbol: 'circle',
        states: {
          hover: {
            enabled: true
          }
        }
      }
    },
    series: {
      connectNulls: true
    }
  },
  chart: {
    type: 'areaspline',
    zoomType: 'x',
    panning: true,
    panKey: 'shift',
    style: {
      fontFamily: '"Inter", sans-serif'
    },
    backgroundColor: 'transparent',
    plotBorderWidth: null,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 30,
    plotShadow: false,
    animation: false,
    borderWidth: 0,
    marginRight: 0,
    resetZoomButton: {
      position: {
        x: -5,
        y: 0
      },
      relativeTo: 'chart',
      theme: {
        fill: 'white',
        stroke: 'silver',
        r: 3,
        states: {
          hover: {
            fill: '#0067dd',
            style: {
              color: 'white'
            }
          }
        }
      }
    }
  }
};

const AreaSplineGraph = ({
  series,
  yAxisLabelFormatter,
  markerColor,
  tooltipFormatter
}) => {
  const { afterSetExtremes } = useStatsChart();
  const updatedChartOptions = useMemo(
    () => ({
      ...CHART_OPTIONS,
      xAxis: {
        ...CHART_OPTIONS.xAxis,
        events: {
          afterSetExtremes
        }
      },
      yAxis: {
        ...CHART_OPTIONS.yAxis,
        labels: {
          ...CHART_OPTIONS.yAxis.labels,

          formatter() {
            return yAxisLabelFormatter.call(this);
          }
        }
      },
      plotOptions: {
        ...CHART_OPTIONS.plotOptions,
        areaspline: {
          ...CHART_OPTIONS.plotOptions.areaspline,
          marker: {
            ...CHART_OPTIONS.plotOptions.areaspline.marker,
            lineColor: markerColor,
            fillColor: markerColor
          }
        }
      },
      tooltip: {
        ...CHART_OPTIONS.tooltip,
        formatter() {
          return tooltipFormatter.call(this);
        }
      },
      series
    }),
    [
      afterSetExtremes,
      markerColor,
      series,
      tooltipFormatter,
      yAxisLabelFormatter
    ]
  );

  return <Chart options={updatedChartOptions} />;
};

AreaSplineGraph.propTypes = {
  yAxisLabelFormatter: PropTypes.func.isRequired,
  tooltipFormatter: PropTypes.func,
  series: PropTypes.arrayOf(PropTypes.shape(PropTypes.any)).isRequired,
  markerColor: PropTypes.string.isRequired
};

AreaSplineGraph.defaultProps = {
  tooltipFormatter() {}
};

export default memo(AreaSplineGraph);
