export const chartOptionStacked = {
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'column',
    height: '350px',
    style: {
      fontFamily: 'Inter'
    }
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
    verticalAlign: 'top'
  },
  tooltip: {
    headerFormat: '',
    pointFormat: '<b>{series.name} : {point.y} / {point.stackTotal}</b><br/>'
  },
  title: false,
  xAxis: {
    categories: [],
    label: {
      style: {
        fontSize: 14
      }
    }
  },
  yAxis: {
    gridLineDashStyle: 'longdash',
    min: 0,
    title: '',
    label: {
      style: {
        fontSize: 14
      }
    }
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      minPointLength: 0,
      cornerRadiusTopLeft: 10,
      cornerRadiusTopRight: 10
    },
    series: {
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
