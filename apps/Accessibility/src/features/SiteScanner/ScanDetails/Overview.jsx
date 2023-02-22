import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  MdContentCopy,
  MdOutlineContentCopy,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import Chart from 'common/Chart';
import PropTypes from 'prop-types';

import useOverview from './useOverview';

const chartOptionStacked = {
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

const chartOptionsSpline = {
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
    pointFormat: '{point.x} km:8o {point.y}°C'
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

const columns = [
  {
    name: '#',
    key: 'index'
  },
  {
    name: 'URL',
    key: 'url'
  },
  {
    name: '',
    key: 'copy'
  }
];

const rows = [
  {
    index: 1,
    url: 'www.browserstack.com/',
    copy: <MdContentCopy />
  }
];

const Overview = ({ scanOverviewData }) => {
  const {
    stackedChartData,
    handleStackedFilter,
    currentRunFilter,
    splineChartOptions,
    handleSplineFilter,
    currentSplineRunFilter
  } = useOverview({
    scanOverviewData
  });
  return (
    <div
      className=" flex-col overflow-auto p-4"
      style={{
        height: 'calc(100vh - 227px)',
        top: '227px'
        // width: isSidebarCollapsed ? '100vw' : 'calc(100vw - 256px)'
      }}
    >
      <div className="mt-4 flex items-start">
        <div className="mx-2 w-6/12 rounded-lg bg-white pt-4 shadow-md">
          <div className="mr-4 flex items-center justify-between">
            <span className="ml-6 font-semibold">Issue History</span>
            <Dropdown
              trigger={
                <DropdownTrigger>
                  {currentRunFilter === 4 ? 'Last 4 runs' : 'Last 8 runs'}
                </DropdownTrigger>
              }
              options={[
                {
                  id: 4,
                  value: 4,
                  body: 'Last 4 runs'
                },
                {
                  id: 8,
                  value: 8,
                  body: 'Last 8 runs'
                }
              ]}
              onClick={handleStackedFilter}
              id="stackedChartFilter"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="m-4 w-full">
              <Chart options={stackedChartData} />
            </div>
          </div>
        </div>
        <div className="mx-2 w-6/12 rounded-lg bg-white pt-4 shadow-md">
          <div className="mr-4 flex items-center justify-between">
            <span className="ml-6 font-semibold">Scan Stability</span>
            <Dropdown
              trigger={
                <DropdownTrigger>
                  {currentSplineRunFilter === 4 ? 'Last 4 runs' : 'Last 8 runs'}
                </DropdownTrigger>
              }
              options={[
                {
                  id: 4,
                  value: 4,
                  body: 'Last 4 runs'
                },
                {
                  id: 8,
                  value: 8,
                  body: 'Last 8 runs'
                }
              ]}
              onClick={handleSplineFilter}
              id="splineChartFilter"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="m-4 w-full">
              <Chart options={splineChartOptions} />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-2 my-4 w-full rounded-lg bg-white p-6 pt-4 shadow-md">
        <span className="ml-6 mt-8 font-semibold">Added Pages</span>
        <div className="mt-4">
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    variant="header"
                    wrapperClass="first:pr-3 last:pl-3 px-2"
                  >
                    {col.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {scanOverviewData?.overview?.urlList.map((row, idx) => (
                <TableRow
                  key={idx}
                  onRowClick={() => {
                    // navigate('/site-scanner/scan-report/12');
                  }}
                  tabIndex="0"
                >
                  <TableCell key={row} wrapperClass="first:pr-3 last:pl-3 p-5">
                    {idx + 1}
                  </TableCell>
                  <TableCell key={row} wrapperClass="first:pr-3 last:pl-3 p-5">
                    {row}
                  </TableCell>
                  <TableCell
                    key={row}
                    wrapperClass="flex justify-end cursor-pointer"
                  >
                    <MdOutlineContentCopy />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

Overview.defaultProps = {
  scanOverviewData: {}
};

Overview.propTypes = {
  scanOverviewData: PropTypes.instanceOf(Object)
};

export default Overview;
