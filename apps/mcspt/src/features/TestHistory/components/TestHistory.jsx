import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import { formatReportTime } from 'utils/dateUtils';

import useTestHistory from './useTestHistory';

const columns = [
  {
    name: 'Test Session Name',
    key: 'testSessionName',
    isSortable: true,
    cell: (row) => (
      <>
        <div className="text-sm font-medium leading-5">{row.name}</div>
      </>
    )
  },

  {
    name: 'Test Conducted',
    key: 'testStartDate',
    cell: (row) => (
      <div className="flex flex-col">
        <div className="text-base-900 text-sm font-medium leading-5">
          {formatReportTime(row?.startTime, 'dddd, MMMM, D, YYYY')}
        </div>
        <div className="text-base-500 text-sm font-normal leading-5">
          {formatReportTime(row?.startTime, 'h:mma')}
        </div>
      </div>
    )
  },
  {
    name: 'Application',
    key: 'application',
    cell: (row) => (
      <div className="flex flex-col">
        <div className="text-base-900 text-sm font-medium leading-5">
          {row?.package?.name}
        </div>
        <div className="text-base-500 text-sm font-normal leading-5">
          {`${row?.package?.bundleId} ∙ v${row?.package?.version}`}
        </div>
      </div>
    )
  },
  {
    name: 'Device',
    key: 'device',
    cell: (row) => (
      <>
        <div className="text-base-900 text-sm font-medium leading-5 ">
          {row?.device?.name}
        </div>
        <div className="text-base-500 text-sm font-normal leading-5 ">
          {`${row?.device?.os} ${row?.device?.osVersion}`}
        </div>
      </>
    )
  }
];

const TestHistory = () => {
  const { tableRows, sortRows, currentSortDir, sessionSelected } =
    useTestHistory();

  return (
    <div className="w-full">
      <Table containerWrapperClass="w-full md:rounded-none ring-0">
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                key={col.key}
                wrapperClassName="text-xs leading-4 font-medium tracking-wider uppercase text-base-500"
                variant="header"
                sortable={col.isSortable}
                onSort={sortRows}
                sortDirection={currentSortDir}
              >
                {col.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((row) => (
            <TableRow
              key={row?.name}
              onRowClick={() => {
                sessionSelected(row);
              }}
            >
              {columns.map((column) => {
                const value = row[column.key];
                return (
                  <TableCell
                    key={column.key + column.id}
                    wrapperClassName="text-base-900"
                  >
                    {column.cell ? <>{column.cell(row)}</> : value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

TestHistory.propTypes = {};

TestHistory.defaultProps = {};

export default TestHistory;
