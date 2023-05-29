import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow
} from '@browserstack/bifrost';
import { HistoricalReportLoadingModal } from 'features/TestHistory';

import { recentTestsColumns } from '../utils/recentTestsColumns';

import useRecentTests from './useRecentTests';

const TestHistory = () => {
  const { navigateToTestHistory, recentTestRows, sessionSelected } =
    useRecentTests();

  return (
    <>
      <div className="border-base-200 flex items-center justify-between border-b pb-2">
        <div className="text-lg font-medium leading-6">Recent Tests</div>

        <Button
          modifier="primary"
          colors="white"
          onClick={navigateToTestHistory}
        >
          View All Tests
        </Button>
      </div>

      <Table containerWrapperClass="w-full bg-transparent ring-0 shadow-none md:rounded-none border-b border-base-200">
        <TableBody>
          {recentTestRows.map((row) => (
            <TableRow
              key={row?.uuid}
              onRowClick={() => {
                sessionSelected(row);
              }}
            >
              {recentTestsColumns.map((column) => (
                <TableCell
                  key={column.key + column.id}
                  wrapperClassName={column.classOverrides}
                >
                  {column.cell(row, sessionSelected)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <HistoricalReportLoadingModal />
    </>
  );
};

TestHistory.propTypes = {};

TestHistory.defaultProps = {};

export default TestHistory;
