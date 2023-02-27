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
