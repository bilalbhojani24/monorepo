import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import dependencyLoader from 'assets/tripleDots.gif';

import HistoricalReportLoadingModal from './HistoricalReportLoadingModal';
import { testHistoryTableColumns } from './testHistoryTableColumns';
import useTestHistory from './useTestHistory';

const TestHistory = () => {
  const {
    tableRows,
    sortRows,
    currentSortDir,
    sessionSelected,
    isHistoryLoading
  } = useTestHistory();

  return (
    <div className="relative flex w-full flex-1">
      {!isHistoryLoading && (
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
                key={row?.uuid}
                onRowClick={() => {
                  sessionSelected(row);
                }}
              >
                {testHistoryTableColumns.map((column) => (
                  <TableCell
                    key={column.key + row.uuid}
                    wrapperClassName="text-base-900"
                  >
                    {column.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {isHistoryLoading && (
        <div className="flex flex-1 flex-col items-center justify-center p-14">
          <img src={dependencyLoader} alt="loading..." className="w-24" />
          <div className="text-2xl font-bold leading-7">
            Loading Test History
          </div>
        </div>
      )}

      <HistoricalReportLoadingModal />
    </div>
  );
};

TestHistory.propTypes = {};

TestHistory.defaultProps = {};

export default TestHistory;
