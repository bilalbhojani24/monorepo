// eslint-disable-next-line no-unused-vars

export const donutOptionCreator = ({ chartData, colors, addOns }) => ({
  colors,
  chart: {
    style: {
      fontFamily: '"Inter", sans-serif'
    },
    type: 'pie',
    renderTo: 'container'
  },
  legend: {
    enabled: true,
    align: 'right',
    verticalAlign: 'top',
    layout: 'vertical',
    x: 0,
    y: 100,
    useHTML: true,
    width: '40%',
    itemMarginBottom: 15,
    labelFormatter() {
      return `<div class="width:100%;display: flex; justify-content: space-between;"><span style="">${
        this.name
      }: </span><b>${this.y} (${this.percentage.toFixed(1)}%)<br/></div>`;
    }
  },
  title: {
    verticalAlign: 'middle',
    // floating: true,
    text: '',
    y: 0,
    x: -65
  },
  tooltip: {
    backgroundColor: '#00335D',
    borderColor: '#00335D',
    style: {
      color: '#fff'
    }
  },
  subtitle: {
    verticalAlign: 'middle',
    floating: true,
    text: '',
    y: 20,
    x: -65
  },
  plotOptions: {
    series: {
      point: {
        events: {
          legendItemClick() {
            return false; // <== returning false will cancel the default action
          }
        }
      }
    },
    pie: {
      innerSize: '75%',
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false
      },
      showInLegend: true
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
  },
  ...addOns
});

export const lineOptionsCreator = ({
  chartData,
  showLegend,
  title,
  xAxis,
  addOns
}) => ({
  chart: {
    style: {
      fontFamily: '"Inter", sans-serif'
    },
    type: 'spline'
  },
  tooltip: {
    backgroundColor: '#00335D',
    borderColor: '#00335D',
    style: {
      color: '#fff'
    }
  },
  title: {
    text: title || ''
  },
  legend: {
    enabled: showLegend,
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'top',
    floating: false,
    backgroundColor: 'transparent',
    itemMarginBottom: 15
  },
  plotOptions: {
    series: {
      color: '#0891B2',
      label: {
        connectorAllowed: false
      },
      events: {
        legendItemClick() {
          return false; // <== returning false will cancel the default action
        }
      }
    }
  },
  yAxis: {
    title: {
      text: null
    },
    gridLineWidth: 1,
    gridLineDashStyle: 'Dash',
    gridZIndex: 0
  },
  xAxis: {
    categories: xAxis,
    gridLineWidth: 1,
    gridZIndex: 0,
    gridLineDashStyle: 'Dash'
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
  },
  ...addOns
});

export const barOptionsCreator = ({
  chartData,
  showLegend,
  title,
  xAxis,
  addOns
}) => ({
  chart: {
    style: {
      fontFamily: '"Inter", sans-serif'
    },
    type: 'column'
  },
  title: {
    text: title || ''
  },
  legend: {
    enabled: showLegend,
    itemMarginBottom: 15
  },
  xAxis: {
    categories: xAxis,
    crosshair: false,
    gridLineWidth: 1,
    gridZIndex: 0,
    gridLineDashStyle: 'Dash'
  },
  yAxis: {
    gridLineWidth: 1,
    gridZIndex: 0,
    gridLineDashStyle: 'Dash',
    title: {
      text: null
    }
  },
  tooltip: {
    backgroundColor: '#00335D',
    borderColor: '#00335D',
    style: {
      color: '#fff'
    }
  },
  // tooltip: {
  //   headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
  //   pointFormat:
  //     '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
  //     '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
  //   footerFormat: '</table>',
  //   shared: true,
  //   useHTML: true
  // },
  plotOptions: {
    series: {
      color: '#465FA3'
    },
    column: {
      // pointPadding: 0.2,
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
  },
  ...addOns
});

export const stackedBarOptionsCreator = ({
  chartData,
  showLegend,
  title,
  xAxis,
  addOns
}) => ({
  chart: {
    style: {
      fontFamily: '"Inter", sans-serif'
    },
    type: 'column'
  },
  title: {
    text: title || ''
  },
  tooltip: {
    backgroundColor: '#00335D',
    borderColor: '#00335D',
    style: {
      color: '#fff'
    }
  },
  xAxis: {
    categories: xAxis || [],
    gridLineWidth: 0,
    gridZIndex: 0,
    gridLineDashStyle: 'Dash'
  },
  legend: {
    enabled: showLegend,
    symbolHeight: 8,
    symbolWidth: 8,
    symbolRadius: 8,
    align: 'right',
    verticalAlign: 'top',
    layout: 'vertical',
    itemMarginBottom: 15,
    x: 0,
    y: 100,
    itemStyle: {
      color: '#333',
      fontWeight: 'normal',
      textTransform: 'capitalize'
    }
  },
  yAxis: {
    gridLineWidth: 1,
    gridZIndex: 0,
    gridLineDashStyle: 'Dash',
    min: 0,
    title: {
      text: ''
    }
  },
  plotOptions: {
    column: {
      stacking: 'normal',
      events: {
        legendItemClick() {
          return false; // <== returning false will cancel the default action
        }
      }
    }
  },
  series: chartData || [],
  credits: {
    enabled: false
  },
  ...addOns
});
