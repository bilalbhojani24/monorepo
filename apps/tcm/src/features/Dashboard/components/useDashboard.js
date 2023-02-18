import { useSelector } from 'react-redux';

export default function useDashboard() {
  const activeTestRuns = useSelector((state) => state.dashboard.activeTestRuns);

  const series = activeTestRuns?.chart_data?.series;
  let pieChartOption;

  if (series[0]?.data) {
    pieChartOption = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        height: '260px'
      },
      exporting: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      // title: {
      //   text: `<p class="chart__title-count">${issueCount}</p><p class="chart__title">Issues</p>`,
      //   verticalAlign: 'middle',
      //   y: 5,
      //   useHTML: true
      // },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          center: ['50%', '50%'],
          size: '100%'
        }
      },
      series: [
        {
          name: 'Issue by impact',
          colorByPoint: true,
          borderWidth: 9,
          borderColor: null,
          slicedOffset: 0,
          innerSize: '60%',
          ignoreHiddenPoint: false,
          // point: {
          //   events: {
          //     click: (value) => {
          //       onRowClick('impact', value?.point?.options?.name.toLowerCase());
          //     },
          //     mouseOver: (value) => {
          //       logEvent('OnADReportView', {
          //         actionType: events.INTERACT_WITH_CHART,
          //         chartType: 'Issue summary',
          //         severity: value?.target?.options?.name
          //       });
          //     }
          //   }
          // },
          data: [
            {
              name: 'Untested',
              y: series[0]?.data[0]?.y,
              sliced: true,
              color: 'text-base-600',
              selected: true
            },
            // {
            //   visible: false,
            //   // NOTE: This define the empty space between pie chart,
            //   // Increase the ↑1.7 to increase the space and to decrease the space, vice versa
            //   y: (issueCount * 1.7) / 100
            // },
            {
              name: 'Passed',
              y: series[0]?.data[1]?.y,
              sliced: true,
              color: 'text-success-600'
            },
            // {
            //   visible: false,
            //   y: (issueCount * 1.7) / 100
            // },
            {
              name: 'Failed',
              y: series[0]?.data[2]?.y,
              sliced: true,
              color: 'text-error-400'
            },
            // {
            //   visible: false,
            //   y: (issueCount * 1.7) / 100
            // },
            {
              name: 'Retest',
              y: series[0]?.data[3]?.y,
              sliced: true,
              color: 'text-warning-400'
            },
            // {
            //   visible: false,
            //   y: (issueCount * 1.7) / 100
            // }
            {
              name: 'Blocked',
              y: series[0]?.data[4]?.y,
              sliced: true,
              color: 'text-brand-400'
            },
            {
              name: 'Skipped',
              y: series[0]?.data[5]?.y,
              sliced: true,
              color: 'text-base-200'
            }
          ]
        }
      ]
    };
  }

  return {
    activeTestRuns,
    pieChartOption
  };
}

// const chartOption = {
//     chart: {
//       plotBackgroundColor: null,
//       plotBorderWidth: null,
//       plotShadow: false,
//       type: 'pie',
//       height: '260px'
//     },
//     exporting: {
//       enabled: false
//     },
//     credits: {
//       enabled: false
//     },
//     title: {
//       text: `<p class="chart__title-count">${issueCount}</p><p class="chart__title">Issues</p>`,
//       verticalAlign: 'middle',
//       y: 5,
//       useHTML: true
//     },
//     plotOptions: {
//       pie: {
//         allowPointSelect: true,
//         cursor: 'pointer',
//         dataLabels: {
//           enabled: false
//         },
//         center: ['50%', '50%'],
//         size: '100%'
//       }
//     },
//     series: [
//       {
//         name: 'Issue by impact',
//         colorByPoint: true,
//         borderWidth: 9,
//         borderColor: null,
//         slicedOffset: 0,
//         innerSize: '98%',
//         ignoreHiddenPoint: false,
//         point: {
//           events: {
//             click: (value) => {
//               onRowClick('impact', value?.point?.options?.name.toLowerCase());
//             },
//             mouseOver: (value) => {
//               logEvent('OnADReportView', {
//                 actionType: events.INTERACT_WITH_CHART,
//                 chartType: 'Issue summary',
//                 severity: value?.target?.options?.name
//               });
//             }
//           }
//         },
//         data: [
//           {
//             name: 'Critical',
//             y: critical,
//             sliced: true,
//             color: '#F95D6A',
//             selected: true
//           },
//           {
//             visible: false,
//             // NOTE: This define the empty space between pie chart,
//             // Increase the ↑1.7 to increase the space and to decrease the space, vice versa
//             y: (issueCount * 1.7) / 100
//           },
//           {
//             name: 'Serious',
//             y: serious,
//             sliced: true,
//             color: '#FF9933'
//           },
//           {
//             visible: false,
//             y: (issueCount * 1.7) / 100
//           },
//           {
//             name: 'Moderate',
//             y: moderate,
//             sliced: true,
//             color: '#E3C500'
//           },
//           {
//             visible: false,
//             y: (issueCount * 1.7) / 100
//           },
//           {
//             name: 'Minor',
//             y: minor,
//             sliced: true,
//             color: '#C5D1D8'
//           },
//           {
//             visible: false,
//             y: (issueCount * 1.7) / 100
//           }
//         ]
//       }
