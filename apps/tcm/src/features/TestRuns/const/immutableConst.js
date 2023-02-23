export const TABS_ARRAY = [
  { name: 'Active Runs', id: 'active' },
  { name: 'Closed Runs', id: 'closed' }
];

export const CHART_OPTIONS = {
  chart: {
    type: 'bar',
    height: 20,
    spacingTop: 0,
    spacingRight: 0,
    spacingBottom: 0,
    spacingLeft: 0,
    plotBorderWidth: 0,
    margin: [0, 0, 0, 0]
    // width: 125
  },
  title: {
    text: ''
  },
  xAxis: {
    minPadding: 0,
    lineWidth: 0,
    categories: ['Test Cases'],
    labels: {
      enabled: false
    }
  },
  yAxis: {
    minPadding: 0,
    min: 0,
    gridLineWidth: 0,
    title: {
      text: ''
    },
    labels: {
      enabled: false
    },
    max: 100
  },
  legend: {
    enabled: false
  },
  plotOptions: {
    series: {
      animation: false,
      borderWidth: 0,
      stacking: 'normal',
      dataLabels: {
        enabled: false
      }
    }
    // bar: {
    //   grouping: true,
    //   borderRadius: 6
    // }
  },
  colors: ['#E5E7EB', '#F87171', '#10B981'],
  series: [],
  credits: {
    enabled: false
  },
  tooltip: {
    useHTML: true,
    outside: true,
    enabled: true,
    backgroundColor: '#00335D',
    borderColor: '#00335D',
    style: {
      color: '#fff'
    }
  }
};

export const TR_DROP_OPTIONS = [
  {
    id: 'edit_details',
    body: 'Edit Details'
  },
  {
    id: 'assign',
    body: 'Assign',
    divider: false
  },
  {
    id: 'close_run',
    body: 'Close Run'
  },
  {
    id: 'delete',
    body: 'Delete',
    divider: true
  }
];
