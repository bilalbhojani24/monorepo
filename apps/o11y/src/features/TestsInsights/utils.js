import { TOOLTIP_STYLES } from 'constants/common';

const COMMON_CONFIG = {
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
    symbolHeight: 8,
    symbolWidth: 8,
    symbolRadius: 8,
    align: 'left',
    verticalAlign: 'top',
    x: -10,
    itemStyle: {
      color: '#333',
      fontWeight: 'normal',
      textTransform: 'capitalize'
    }
  },
  tooltip: {
    ...TOOLTIP_STYLES
  }
};
export const COMMON_CHART_STYLES = {
  resetZoomButton: {
    position: {
      x: 0,
      y: -10
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
  },
  style: {
    fontFamily: '"Inter", sans-serif'
  }
};
export const getPieChartData = ({ data, onClick, seriesOptions }) => ({
  chart: {
    type: 'pie',
    ...COMMON_CHART_STYLES
  },
  ...COMMON_CONFIG,
  plotOptions: {
    ...seriesOptions,
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false
      },
      showInLegend: false,
      events: {
        click(e) {
          if (onClick) {
            onClick(e?.point);
          }
        }
      }
    }
  },
  tooltip: {
    ...TOOLTIP_STYLES,
    formatter() {
      return `<b>${this.key}</b>: <b>${this.y}</b>`;
    }
  },
  series: [
    {
      name: null,
      data
    }
  ]
});
export const getDonutChartData = ({
  data,
  onClick,
  seriesOptions,
  chartOptions,
  otherOptions = {}
}) => ({
  chart: {
    type: 'pie',
    animation: false,
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    ...COMMON_CHART_STYLES,
    ...chartOptions
  },
  ...COMMON_CONFIG,
  plotOptions: {
    ...seriesOptions,
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false
      },
      center: ['50%', '50%'],
      size: '100%',
      events: {
        click(e) {
          if (onClick) {
            onClick(e?.point);
          }
        }
      }
    }
  },
  tooltip: {
    ...TOOLTIP_STYLES,
    formatter() {
      return `<b>${this.key}</b>: <b>${this.y}</b>`;
    }
  },
  series: [
    {
      name: null,
      colorByPoint: true,
      borderWidth: 9,
      animation: false,
      borderColor: null,
      slicedOffset: 0,
      innerSize: '98%',
      ignoreHiddenPoint: false,
      data
    }
  ],
  ...otherOptions
});
export const getStackedColumnChartData = ({
  data,
  keys,
  onClick,
  seriesOptions,
  xAxisOptions,
  yAxisOptions,
  chartOptions,
  otherOptions
}) => ({
  chart: {
    type: 'column',
    animation: false,
    ...COMMON_CHART_STYLES,
    ...chartOptions
  },
  ...COMMON_CONFIG,
  xAxis: {
    categories: keys,
    gridLineDashStyle: 'Dash',
    ...xAxisOptions
  },
  yAxis: {
    min: 0,
    title: {
      text: null
    },
    gridLineDashStyle: 'Dash',
    ...yAxisOptions
  },
  plotOptions: {
    ...seriesOptions,
    column: {
      stacking: 'normal',
      cursor: 'pointer',
      events: {
        click(e) {
          if (onClick) {
            onClick(e?.point);
          }
        }
      }
    }
  },
  series: data,
  ...otherOptions
});
export const getStackedBarChartData = ({
  data,
  keys,
  onClick,
  seriesOptions,
  xAxisOptions,
  yAxisOptions,
  chartOptions,
  otherOptions
}) => ({
  chart: {
    type: 'pie',
    zoomType: 'y',
    ...COMMON_CHART_STYLES,
    ...chartOptions
  },
  ...COMMON_CONFIG,
  xAxis: {
    categories: keys,
    ...xAxisOptions
  },
  yAxis: {
    min: 0,
    title: {
      text: null
    },
    ...yAxisOptions
  },
  plotOptions: {
    ...seriesOptions,
    bar: {
      stacking: 'normal',
      cursor: 'pointer',
      events: {
        click(e) {
          if (onClick) {
            onClick(e?.point);
          }
        }
      }
    }
  },
  series: data,
  ...otherOptions
});
export const getBarChartData = ({ data, keys, onClick, otherOptions }) => ({
  chart: {
    type: 'bar',
    ...COMMON_CHART_STYLES
  },
  ...COMMON_CONFIG,
  xAxis: {
    categories: keys
  },
  yAxis: {
    min: 0,
    title: {
      text: null
    }
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      cursor: 'pointer',
      events: {
        click(e) {
          if (onClick) {
            onClick(e?.point);
          }
        }
      }
    }
  },
  tooltip: {
    ...TOOLTIP_STYLES,
    formatter() {
      return `<b>${this.key}</b>: <b>${this.y}</b>`;
    }
  },
  series: [
    {
      name: null,
      data
    }
  ],
  ...otherOptions
});
export const getLineChartData = ({
  data,
  keys,
  median,
  xAxisOptions,
  yAxisOptions,
  chartOptions,
  otherOptions
}) => ({
  chart: {
    zoomType: 'x',
    ...COMMON_CHART_STYLES,
    ...chartOptions
  },
  ...COMMON_CONFIG,
  xAxis: {
    categories: keys,
    gridLineWidth: 1,
    gridZIndex: 0,
    gridLineDashStyle: 'Dash',
    ...xAxisOptions
  },
  yAxis: {
    gridLineWidth: 1,
    gridZIndex: 0,
    gridLineDashStyle: 'Dash',
    title: {
      text: null
    },
    plotLines: [
      {
        color: '#E68D47',
        width: 2,
        value: median || null,
        dashStyle: 'Dash'
      }
    ],
    ...yAxisOptions
  },
  series: [
    {
      ...data
    }
  ],
  ...otherOptions
});
