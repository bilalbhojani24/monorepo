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
  plotOptions: {
    series: {
      connectNulls: true
    }
  },
  series: [],
  credits: {
    enabled: false
  }
});

export const getDefaultReportChartOptions = () => {
  const defOps = getDefaultChartOptions();

  defOps.xAxis.crosshair = {
    enabled: true,
    snap: false,
    color: '#9CA3AF',
    dashStyle: 'LongDash'
  };

  defOps.xAxis.plotLines = [
    {
      id: 'videoSeekHandle',
      color: '#9CA3AF',
      width: 2,
      value: 0
    }
  ];

  return defOps;
};

export const getDefaultRealtimeChartOptions = () => {
  const defOps = getDefaultChartOptions();

  defOps.xAxis.labels.enabled = true;

  defOps.tooltip = {
    headerFormat: '<b>{series.name}</b><br/>',
    pointFormat: '<b>Time:</b> {point.x}s</br><b>Value:</b> {point.y:.2f}'
  };

  defOps.legend = {
    enabled: false,
    marginTop: 16,
    marginBottom: 0
  };

  return defOps;
};
