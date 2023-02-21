export const chartOptionStacked = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'column'
  },
  exporting: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  legend: {
    layout: 'horizontal',
    align: 'left',
    verticalAlign: 'top',
    itemMarginTop: 10,
    itemMarginBottom: 10
  },
  title: {
    text: `<div style="font-family: Inter, Avenir, Helvetica, Arial, sans-serif"><p class="text-xl font-bold text-center mb-2 text-base-800">${''}</p><p class="text-xs text-base-500"></p></div>`,
    verticalAlign: 'middle',
    useHTML: true
  },
  xAxis: {
    categories: ['Jan 3', 'Jan 10', 'Jan 17', 'Jan 24', 'Jan 31', 'Feb 7']
  },
  yAxis: {
    gridLineDashStyle: 'longdash',
    min: 0,
    title: {
      text: ''
    }
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      minPointLength: 0
    },
    series: {
      innerSize: '60%',
      allowPointSelect: true,
      cursor: 'pointer',
      stacking: 'vertical',
      minPointLength: -10,
      dataLabels: {
        enabled: false
      }
    }
  },
  series: [
    {
      name: 'Minor',
      data: [10, 2, 6, 3],
      borderWidth: 0,
      color: '#DFE7E8',
      pointWidth: 12,
      borderRadiusTopLeft: '10px',
      borderRadiusTopRight: '10px'
    },
    {
      name: 'Moderate',
      data: [0, 2, 6, 3],
      borderWidth: 0,
      color: '#EAB308',
      pointWidth: 12
    },
    {
      name: 'Severe',
      data: [14, 8, 8, 12],
      borderWidth: 0,
      color: '#F97316',
      pointWidth: 12
    },
    {
      name: 'Critical',
      data: [3, 5, 1, 13],
      color: '#DC2626',
      pointWidth: 12,
      borderWidth: 0
    }
  ]
};

export const chartOptionsSpline = {
  chart: {
    type: 'spline',
    inverted: false
  },
  title: {
    text: ''
  },
  credits: {
    enabled: false
  },
  xAxis: {
    reversed: false,
    title: {
      enabled: true,
      text: ''
    },
    categories: ['Jan 3', 'Jan 10', 'Jan 17', 'Jan 24', 'Jan 31', 'Feb 7'],
    maxPadding: 0.05,
    showLastLabel: false
  },
  yAxis: {
    title: {
      text: ''
    },
    labels: {
      format: '{value}'
    },
    lineWidth: 2
  },
  legend: {
    enabled: true,
    layout: 'horizontal',
    align: 'left',
    verticalAlign: 'top',
    itemMarginTop: 10,
    itemMarginBottom: 10
  },
  tooltip: {
    headerFormat: '<b>{series.name}</b><br/>',
    pointFormat: '{point.x} {point.y}'
  },
  navigation: {
    buttonOptions: {
      enabled: false
    }
  },
  plotOptions: {
    spline: {
      marker: {
        enable: false
      }
    },
    series: {
      marker: {
        enabled: false
      }
    }
  },
  series: [
    {
      name: 'Success',
      data: [10, 45, 35, 33, 40, 14, 53],
      color: '#22C55E'
    },
    {
      name: 'Failure',
      data: [5, 43, 45, 57, 53, 50, 24],
      color: '#F59E0B'
    },
    {
      name: 'Redirects',
      data: [0, 4, 21, 30, 34, 25, 13],
      color: '#EF4444'
    }
  ]
};
