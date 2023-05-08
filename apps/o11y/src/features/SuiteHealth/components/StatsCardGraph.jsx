import React, { memo, useMemo } from 'react';
import Chart from 'common/Chart';
import PropTypes from 'prop-types';

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
    enabled: true
  },
  plotOptions: {
    spline: {
      lineWidth: 2,
      lineWidthPlus: 0,
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
    },
    column: {
      stacking: 'normal',
      cursor: 'pointer',
      maxPointWidth: 1
    }
  },
  chart: {
    type: 'spline',
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

const StatsCardGraph = ({
  afterSetExtremes,
  series,
  yAxisLabelFormatter,
  markerColor
}) => {
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
        spline: {
          ...CHART_OPTIONS.plotOptions.spline,
          marker: {
            ...CHART_OPTIONS.plotOptions.spline.marker,
            lineColor: markerColor,
            fillColor: markerColor
          }
        }
      },
      series
    }),
    [afterSetExtremes, markerColor, series, yAxisLabelFormatter]
  );

  return <Chart options={updatedChartOptions} />;
};

StatsCardGraph.propTypes = {
  afterSetExtremes: PropTypes.func.isRequired,
  yAxisLabelFormatter: PropTypes.func.isRequired,
  series: PropTypes.arrayOf(PropTypes.shape(PropTypes.any)).isRequired,
  markerColor: PropTypes.string.isRequired
};

export default memo(StatsCardGraph);
