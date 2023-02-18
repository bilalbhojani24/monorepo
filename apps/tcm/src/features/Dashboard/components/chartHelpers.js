// eslint-disable-next-line no-unused-vars
export const donutOptionCreator = ({ chartData, title, subtitle }) => ({
  chart: {
    type: 'pie'
    // renderTo: 'container'
  },
  legend: {
    enabled: true,
    align: 'right',
    verticalAlign: 'top',
    layout: 'vertical',
    x: 0,
    y: 100
  },
  title: {
    verticalAlign: 'middle',
    floating: true,
    text: title || ''
  },
  subtitle: {
    verticalAlign: 'middle',
    floating: true,
    text: subtitle || '',
    y: 30,
    x: 0
  },
  plotOptions: {
    pie: {
      innerSize: '75%'
    }
  },
  series: [
    {
      data: chartData || [
        ['Firefox', 44.2],
        ['IE7', 26.6],
        ['IE6', 20],
        ['Chrome', 3.1],
        ['Other', 5.4]
      ]
    }
  ],
  credits: {
    enabled: false
  }
});

export const lineOptionsCreator = ({ chartData, showLegend, title }) => ({
  title: {
    text: title || ''
  },
  legend: {
    enabled: showLegend,
    layout: 'vertical',
    align: 'center',
    verticalAlign: 'top',
    floating: false,
    backgroundColor: '#FFFFFF'
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
      pointStart: 2010
    }
  },
  yAxis: {
    title: {
      text: null
    }
  },
  series: chartData || [
    {
      name: 'Installation & Developers',
      data: [
        43934, 48656, 65165, 81827, 112143, 142383, 171533, 165174, 155157,
        161454, 154610
      ]
    }
  ],
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }
    ]
  },
  credits: {
    enabled: false
  }
});

export const barOptionsCreator = ({ chartData, showLegend, title }) => ({
  chart: {
    type: 'column'
  },
  title: {
    text: title || ''
  },
  legend: {
    enabled: showLegend
  },
  xAxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    crosshair: false
  },
  yAxis: {
    title: {
      text: null
    }
  },
  tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat:
      '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
      '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
  },
  plotOptions: {
    column: {
      pointPadding: 0.2,
      borderWidth: 0
    }
  },
  series: chartData || [
    {
      name: 'Tokyo',
      data: [
        49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1,
        95.6, 54.4
      ]
    }
  ],
  credits: {
    enabled: false
  }
});

export const stackedBarOptionsCreator = ({ chartData, showLegend, title }) => ({
  chart: {
    type: 'column'
  },
  title: {
    text: title || ''
  },
  xAxis: {
    categories: ['2021/22', '2020/21', '2019/20', '2018/19', '2017/18']
  },
  legend: {
    enabled: showLegend,
    align: 'right',
    verticalAlign: 'top',
    layout: 'vertical',
    x: 0,
    y: 100
  },
  yAxis: {
    min: 0,
    title: {
      text: ''
    }
  },
  plotOptions: {
    column: {
      stacking: 'percent'
    }
  },
  series: chartData || [
    {
      name: 'Kevin De Bruyne',
      data: [4, 4, 2, 4, 4]
    },
    {
      name: 'Joshua Kimmich',
      data: [0, 4, 3, 2, 3]
    },
    {
      name: 'Sadio Mané',
      data: [1, 2, 2, 1, 2]
    }
  ],
  credits: {
    enabled: false
  }
});
