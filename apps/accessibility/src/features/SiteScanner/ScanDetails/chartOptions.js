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
  tooltip: {
    headerFormat: '',
    pointFormat: '<b>{series.name} : {point.y} / {point.stackTotal}</b><br/>'
  },
  title: {
    text: `<div stySle="font-family: Inter, Avenir, Helvetica, Arial, sans-serif"><p class="text-xl font-bold text-center mb-2 text-base-800">${''}</p><p class="text-xs text-base-500"></p></div>`,
    verticalAlign: 'middle',
    useHTML: true
  },
  xAxis: {
    categories: []
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
  }
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
    categories: [],
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
    headerFormat: '<b>{series.name} : {point.y}</b><br/>',
    pointFormat: ''
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
      data: [],
      color: '#22C55E'
    },
    {
      name: 'Failure',
      data: [],
      color: '#F59E0B'
    },
    {
      name: 'Redirects',
      data: [],
      color: '#EF4444'
    }
  ]
};
