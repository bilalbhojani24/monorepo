import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger,
  MdExpandMore,
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
    isCopied,
    setIsCopied,
    getStackedChartData,
    getSplineChartData
  } = useOverview({
    scanOverviewData
  });
  console.log(getStackedChartData);
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
            <span className="ml-6 font-semibold">Scan Stability</span>
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
              {scanOverviewData?.data?.overview?.urlList.map((row, idx) => (
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
                    wrapperClass="flex justify-end cursor-pointer text-right"
                  >
                    <div className="flex justify-end">
                      <CopyToClipboard
                        onCopy={() => {
                          setIsCopied(true);
                          setTimeout(() => {
                            setIsCopied(false);
                          }, 2500);
                        }}
                        text={row}
                      >
                        <MdOutlineContentCopy />
                      </CopyToClipboard>
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
