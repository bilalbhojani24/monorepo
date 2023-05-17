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
  title: false,
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
