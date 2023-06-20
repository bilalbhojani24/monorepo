import {
  COMMON_CHART_CONFIGS,
  SNP_PARAMS_MAPPING,
  TOOLTIP_STYLES
} from 'constants/common';
import isEmpty from 'lodash/isEmpty';
import { getBaseUrl } from 'utils/common';
import { getCustomTimeStamp } from 'utils/dateTime';

function getFormattedTooltip(
  fixedToTwoDigits,
  activeProject,
  filters,
  seriesOptions
) {
  const url = `${getBaseUrl()}:8081/projects/${
    activeProject.normalisedName
  }/suite_health?${SNP_PARAMS_MAPPING.snpActiveBuild}=${
    filters.buildName.value
  }&${SNP_PARAMS_MAPPING.snpDateRange}=${filters.dateRange.key}`;

  const str = this.points.reduce((s, data) => {
    let returnString = `${s}`;
    let seriesValue = '';
    // eslint-disable-next-line sonarjs/no-small-switch
    switch (seriesOptions.id) {
      case 'stabilityChart':
        seriesValue = `${fixedToTwoDigits ? data.y?.toFixed(2) : data.y}%`;
        break;
      default:
        seriesValue = fixedToTwoDigits ? data.y?.toFixed(2) : data.y;
    }

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
      <span style="color:${data.series.color}" class="font-sm">\u25CF&nbsp;</span>
      <span class="font-sm">${data.series.name}</span></div>
      <span>
        <b>${seriesValue}</b>
      </span>
    </div>
    </div>`;
    return returnString;
  }, ``);
  return `<div class="px-2 py-1 flex flex-col bg-base-800 rounded-lg text-base-200">${str}
  <a class="text-white font-medium mt-0.5" href=${url} target="_blank">View all tests (Pro) <MdOpenInNew /> </a></div>`;
}

export const getCommonChartOptions = (data = {}) => {
  const {
    activeProject,
    afterSetExtremes,
    filters,
    fixedToTwoDigits,
    median,
    seriesOptions,
    showTrendLine,
    tooltipFormatter
  } = data;
  const chartData = {
    ...COMMON_CHART_CONFIGS,
    tooltip: {
      ...TOOLTIP_STYLES,
      shared: true,
      useHTML: true,
      outside: true,
      formatter() {
        return getFormattedTooltip.call(
          this,
          fixedToTwoDigits,
          activeProject,
          filters,
          seriesOptions
        );
      },
      style: {
        pointerEvents: 'auto',
        ...TOOLTIP_STYLES.style
      },
      positioner(labelWidth, labelHeight, point) {
        const tooltipX = point.plotX + 20;
        const tooltipY = point.plotY - 30;
        return {
          x: tooltipX,
          y: tooltipY
        };
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
      min: 0,
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
        connectNulls: true,
        marker: {
          radius: 3
        },
        point: {
          events: {
            click: (e) => {
              if (
                data?.pointClickCb &&
                typeof data.pointClickCb === 'function'
              ) {
                data?.pointClickCb(e);
              }
            }
          }
        },
        areaspline: {
          connectNulls: true
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
