import { COMMON_CHART_CONFIGS, TOOLTIP_STYLES } from 'constants/common';
import { isEmpty } from 'lodash';
import { getCustomTimeStamp } from 'utils/dateTime';

function getFormattedTooltip(fixedToTwoDigits) {
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
    returnString += `<span>${data.series.name}: <b>${
      fixedToTwoDigits ? data.y?.toFixed(2) : data.y
    }</b></span>`;
    return returnString;
  }, ``);
}

export const getCommonChartOptions = (data = {}) => {
  const {
    median,
    showTrendLine,
    tooltipFormatter,
    fixedToTwoDigits,
    afterSetExtremes
  } = data;
  const chartData = {
    ...COMMON_CHART_CONFIGS,
    tooltip: {
      ...TOOLTIP_STYLES,
      shared: true,
      useHTML: true,
      formatter() {
        return getFormattedTooltip.call(this, fixedToTwoDigits);
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
    yAxis: {
      gridLineWidth: 1,
      gridZIndex: 0,
      gridLineDashStyle: 'Dash',
      title: {
        text: null
      },
      plotLines: [
        {
          color: '#DA7FA0',
          width: 2,
          value: median || null,
          dashStyle: 'Dash'
        }
      ]
    },
    plotOptions: {
      series: {
        color: '#1b8bff',
        animation: false,
        marker: {
          radius: 3
        }
      }
    }
  };
  if (showTrendLine) {
    chartData.plotOptions.trendline = {
      color: '#CBD7E5',
      // negativeColor: '#CBD7E5',
      dashStyle: 'Solid',
      lineWidth: 1,
      showInLegend: true,
      marker: {
        enabled: false
      }
    };
  }
  if (tooltipFormatter) {
    chartData.tooltip = {
      ...TOOLTIP_STYLES,
      shared: true,
      formatter() {
        return tooltipFormatter.call(this);
      }
    };
  }
  return chartData;
};
