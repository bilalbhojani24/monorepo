import React from 'react';
import { MdContentCopy } from '@browserstack/bifrost';
import Chart from 'common/Chart';
import {
  ASTable,
  ASTableBody,
  ASTableCell,
  ASTableHead,
  ASTableRow
} from 'middleware/bifrost';

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
    // stackLabels: {
    //   enabled: false,
    //   verticalAlign: 'top',
    //   style: {
    //     fontWeight: 'bold',
    //     color: 'gray',
    //     textOutline: 'none'
    //   }
    // }
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
    showLastLabel: true
  },
  yAxis: {
    title: {
      text: ''
    },
    labels: {
      format: '{value}°'
    },
    lineWidth: 2
  },
  legend: {
    enabled: true
  },
  tooltip: {
    headerFormat: '<b>{series.name}</b><br/>',
    pointFormat: '{point.x} km: {point.y}°C'
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
    }
  },
  series: [
    {
      name: 'Success',
      data: [
        [0, 15],
        [10, -50],
        [20, -56.5],
        [30, -46.5],
        [40, -22.1],
        [50, -2.5],
        [60, -27.7],
        [70, -55.7],
        [80, -76.5]
      ],
      color: '#22C55E'
    },
    {
      name: 'Failure',
      data: [
        [0, 15],
        [0, -50],
        [20, 56.5],
        [30, -46.5],
        [40, -22.1],
        [50, -2.5],
        [60, -27.7],
        [70, -55.7],
        [80, -76.5]
      ],
      color: '#F59E0B'
    },
    {
      name: 'Redirects',
      data: [
        [0, 15],
        [15, 50],
        [20, 56.5],
        [30, 46.5],
        [40, -22.1],
        [50, -2.5],
        [60, 27.7],
        [70, -55.7],
        [80, -76.5]
      ],
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

const Overview = () => (
  <div className="flex-col p-4">
    <div className="mt-4 flex items-start">
      <div className="mx-2 w-6/12 rounded-lg bg-white pt-4 shadow-md">
        <span className="m-6 mt-8 font-semibold">Issue History</span>
        <div className="flex items-center justify-between">
          <div className="m-4 w-full">
            <Chart options={chartOptionStacked} />
          </div>
        </div>
      </div>
      <div className="mx-2 w-6/12 rounded-lg bg-white pt-4 shadow-md">
        <span className="m-6 mt-8 font-semibold">Scan Stability</span>
        <div className="flex items-center justify-between">
          <div className="m-4 w-full">
            <Chart options={chartOptionsSpline} />
          </div>
        </div>
      </div>
    </div>
    <div className="mx-2 my-4 w-full rounded-lg bg-white p-6 pt-4 shadow-md">
      <span className="m-6 mt-8 font-semibold">Added Pages</span>
      <ASTable>
        <ASTableHead>
          <ASTableRow>
            {columns.map((col) => (
              <ASTableCell
                key={col.key}
                variant="header"
                wrapperClass="first:pr-3 last:pl-3 px-2"
              >
                {col.name}
              </ASTableCell>
            ))}
          </ASTableRow>
        </ASTableHead>
        <ASTableBody>
          {rows.map((row, idx) => (
            <ASTableRow
              key={idx}
              onRowClick={() => {
                // navigate('/site-scanner/scan-report/12');
              }}
              tabIndex="0"
            >
              {columns.map((column, colIdx) => {
                const value = row[column.key];
                return (
                  <ASTableCell
                    key={column.id}
                    wrapperClass={`
                    ${colIdx === 0 ? 'font-medium text-base-900' : ''}
                   first:pr-3 last:pl-3 p-5`}
                  >
                    {column.cell ? <>{column.cell()}</> : value}
                  </ASTableCell>
                );
              })}
            </ASTableRow>
          ))}
        </ASTableBody>
      </ASTable>
    </div>
  </div>
);

export default Overview;
