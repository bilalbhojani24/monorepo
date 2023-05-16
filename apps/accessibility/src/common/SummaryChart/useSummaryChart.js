import { logEvent } from 'utils/logEvent';

export default function useSummaryChart({
  actionType,
  eventName,
  summary,
  chartTitle,
  totalCount,
  onRowClick
}) {
  const chartOption = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      height: '312px'
    },
    exporting: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    title: {
      text: `<div style="font-family: Inter, Avenir, Helvetica, Arial, sans-serif"><p class="text-xl font-bold text-center mb-2 text-base-800">${totalCount}</p><p class="text-xs text-base-500">${chartTitle}</p></div>`,
      verticalAlign: 'middle',
      useHTML: true
    },
    plotOptions: {
      pie: {
        innerSize: '70%',
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        }
      }
    },
    series: [
      {
        name: 'Issue by impact',
        point: {
          events: {
            click: (value) => {
              const impactFilterObj = {
                label: value?.point?.options?.name,
                value: value?.point?.options?.name.toLowerCase()
              };
              onRowClick('impact', impactFilterObj);
            },
            mouseOver: (value) => {
              if (eventName) {
                logEvent(eventName, {
                  actionType,
                  chartType: 'Issue summary',
                  severity: value?.target?.options?.name
                });
              }
            }
          }
        },
        data: summary
      }
    ]
  };

  return {
    chartOption
  };
}
