import React from 'react';
import {
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger,
  MdExpandMore,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import Chart from 'common/Chart';
import CopyButton from 'common/CopyButton';
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

const frequencyOptions = [
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
];

const Overview = ({ scanOverviewData }) => {
  const {
    handleStackedFilter,
    currentRunFilter,
    handleSplineFilter,
    currentSplineRunFilter,
    getStackedChartData,
    getSplineChartData
  } = useOverview({
    scanOverviewData
  });
  return (
    <div
      className=" flex-col overflow-auto p-4"
      style={{
        height: 'calc(100vh - 227px)',
        top: '227px'
      }}
    >
      <div className="mt-4 flex items-start">
        <div className="mx-2 w-6/12 rounded-lg bg-white pt-4 shadow-md">
          <div className="mr-4 flex items-center justify-between">
            <span className="ml-6 font-semibold">Issue history</span>
            <Dropdown onClick={handleStackedFilter} id="stackedChartFilter">
              <div className="flex">
                <DropdownTrigger wrapperClassName="border-base-300 text-base-700 hover:bg-base-50 focus:ring-offset-base-100 focus:ring-brand-500 inline-flex w-full justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
                  {currentRunFilter === 4 ? 'Last 4 runs' : 'Last 8 runs'}
                  <MdExpandMore className="h-5 w-5" aria-hidden="true" />
                </DropdownTrigger>
              </div>

              <DropdownOptionGroup>
                {frequencyOptions.map((opt) => (
                  <DropdownOptionItem key={opt.id} option={opt} />
                ))}
              </DropdownOptionGroup>
            </Dropdown>
          </div>
          <div className="flex items-center justify-between">
            <div className="m-4 w-full">
              <Chart options={getStackedChartData} />
            </div>
          </div>
        </div>
        <div className="mx-2 w-6/12 rounded-lg bg-white pt-4 shadow-md">
          <div className="mr-4 flex items-center justify-between">
            <span className="ml-6 font-semibold">Scan stability</span>
            <Dropdown onClick={handleSplineFilter} id="stackedSplineFilter">
              <div className="flex">
                <DropdownTrigger wrapperClassName="border-base-300 text-base-700 hover:bg-base-50 focus:ring-offset-base-100 focus:ring-brand-500 inline-flex w-full justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
                  {currentSplineRunFilter === 4 ? 'Last 4 runs' : 'Last 8 runs'}
                  <MdExpandMore className="h-5 w-5" aria-hidden="true" />
                </DropdownTrigger>
              </div>

              <DropdownOptionGroup>
                {frequencyOptions.map((opt) => (
                  <DropdownOptionItem key={opt.id} option={opt} />
                ))}
              </DropdownOptionGroup>
            </Dropdown>
          </div>
          <div className="flex items-center justify-between">
            <div className="m-4 w-full">
              <Chart options={getSplineChartData} />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-2 my-4 w-full rounded-lg bg-white p-6 pt-4 shadow-md">
        <span className="ml-6 mt-8 font-semibold">Added pages</span>
        <div className="mt-4 shadow">
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    variant="header"
                    wrapperClassName="p-0 h-9"
                  >
                    {col.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {scanOverviewData?.data?.overview?.urlList.map((row, idx) => (
                <TableRow
                  key={idx}
                  onRowClick={() => {
                    // navigate('/site-scanner/scan-report/12');
                  }}
                >
                  <TableCell key={row} wrapperClassName="p-0 h-9">
                    {idx + 1}
                  </TableCell>
                  <TableCell key={row} wrapperClassName="p-0 h-9">
                    {row}
                  </TableCell>
                  <TableCell key={row} wrapperClassName="p-0 h-9">
                    <div className="flex justify-end">
                      <CopyButton text={row} hasBorder={false} />
                    </div>
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
