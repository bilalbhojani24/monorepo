export const getDefaultChartOptions = () => ({
  chart: {},
  title: {
    text: ''
  },
  subtitle: {
    text: ''
  },
  xAxis: {
    reversed: false,
    title: {
      enabled: false
    },
    labels: {
      enabled: false
    },
    gridLineWidth: 1,
    showLastLabel: true,
    endOnTick: true,
    tickLength: 0,
    tickInterval: 1,
    min: 0
  },
  yAxis: {
    title: {
      enabled: false
    },
    labels: {
      format: '{value}'
    },
    lineWidth: 1
  },
  legend: {
    enabled: true,
    margin: 0
  },
  responsive: {
    rules: []
  },
  tooltip: {},
  plotOptions: {},
  series: [],
  credits: {
    enabled: false
  }
});
