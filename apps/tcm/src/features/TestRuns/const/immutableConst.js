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
    margin: [0, 0, 0, 0],
    plotAreaHeight: 100,
    events: {
      load(event) {
        event.target.reflow();
      }
    }
  },
  title: {
    text: ''
  },
  xAxis: {
    minPadding: 0,
    maxPadding: 0,
    lineWidth: 0,
    categories: ['Test Cases'],
    labels: {
      enabled: false
    },
    width: 20
    // height: 40
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
    }
  },
  legend: {
    enabled: false
  },
  plotOptions: {
    series: {
      animation: false,
      borderWidth: 0,
      stacking: 'percent',
      dataLabels: {
        enabled: false
      },
      states: {
        inactive: {
          opacity: 1
        }
      }
    },
    bar: {
      pointWidth: 20
    }
    // bar: {
    //   grouping: true,
    //   borderRadius: 6
    // }
  },
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
    },
    hideDelay: 1,
    borderWidth: 0
    // positioner(labelWidth, labelHeight, point) {
    //   return {
    //     x: point.plotX - labelWidth + 20,
    //     y: point.plotY + labelHeight / 2
    //   };
    // }
  }
};

export const TR_DROP_OPTIONS = [
  {
    id: 'edit_details',
    body: 'Edit Test Run'
  },
  {
    id: 'assign',
    body: 'Assign Run',
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

export const PROGRESS_COLOR_MAP = {
  untested: '#4B5563',
  passed: '#059669',
  failed: '#F87171',
  retest: '#FBBF24',
  blocked: '#818CF8',
  skipped: '#E5E7EB'
};
