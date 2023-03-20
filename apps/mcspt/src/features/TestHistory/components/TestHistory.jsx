import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';

import { testHistoryTableColumns } from './testHistoryTableColumns';
import useTestHistory from './useTestHistory';

const TestHistory = () => {
  const { tableRows, sortRows, currentSortDir, sessionSelected } =
    useTestHistory();

  return (
    <div className="relative w-full">
      <Table containerWrapperClass="w-full md:rounded-none ring-0 absolute">
        <TableHead>
          <TableRow>
            {testHistoryTableColumns.map((col) => (
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
              {testHistoryTableColumns.map((column) => {
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
