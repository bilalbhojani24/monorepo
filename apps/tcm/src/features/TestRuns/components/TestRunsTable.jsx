import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {
  TMDropdown,
  TMPagination,
  TMTable,
  TMTableBody,
  TMTableCell,
  TMTableHead,
  TMTableRow
} from 'common/bifrostProxy';
import AppRoute from 'const/routes';
import { formatTime, routeFormatter } from 'utils/helperFunctions';

import useTestRunsTable from './useTestRunsTable';

const TestRunsTable = () => {
  const { projectId, allTestRuns, currentTab, isTestRunsLoading, metaPage } =
    useTestRunsTable();

  const tableColumns = [
    {
      name: 'ID',
      key: 'identifier'
    },
    {
      name: 'TITLE',
      key: 'name',
      cell: (rowData) => (
        <Link
          to={routeFormatter(AppRoute.TEST_RUNS_DETAILS, {
            projectId,
            testRunId: rowData?.id
          })}
        >
          {rowData.name}
        </Link>
      )
    },
    {
      name: 'NO. OF TESTS',
      key: 'test_cases_count'
    },
    {
      name: 'CREATED DATE',
      key: 'created_at',
      cell: (rowData) => formatTime(rowData.created_at)
    },
    {
      name: 'ASSIGNED TO',
      key: 'owner',
      cell: (rowData) => rowData.owner || 'Unassigned'
    },
    {
      name: 'OVERALL PROGRESS',
      key: '',
      cell: () => <div />
    },
    {
      name: '',
      key: '',
      cell: () => (
        <TMDropdown
          triggerVariant="meatball-button"
          dividerRequired
          options={[]}
        />
      )
    }
  ];

  return (
    <div className="flex flex-1 flex-col  justify-start">
      <TMTable
        containerWrapperClass={classNames(
          // 'max-w-[calc(100vw-40rem)]'
          'overflow-y-auto shadow-none border-none'
        )}
      >
        <TMTableHead wrapperClassName="w-full rounded-xs">
          <TMTableRow wrapperClassName="relative">
            {tableColumns?.map((col, index) => (
              <TMTableCell
                key={col.key || index}
                variant="body"
                wrapperClassName={classNames('test-base-500', {
                  'first:pr-3 last:pl-3 px-2 py-2': false, // isCondensed
                  'flex-1 w-9/12': index === 1,
                  'min-w-[50%]': index === 2,
                  'sticky bg-base-50': col.isSticky,
                  'right-0 ': col.isSticky && col.stickyPosition === 'right',
                  'left-10 ': col.isSticky && col.stickyPosition === 'left'
                })}
                textTransform="uppercase"
              >
                {col.name}
              </TMTableCell>
            ))}
          </TMTableRow>
        </TMTableHead>
        <TMTableBody>
          {!isTestRunsLoading ? (
            <>
              {allTestRuns?.map((row, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <TMTableRow isSelected key={row.id || index}>
                  {tableColumns?.map((column) => {
                    const value = row[column.key];
                    return (
                      <TMTableCell
                        key={column.id}
                        wrapperClassName={classNames({
                          'first:pr-3 last:pl-3 px-2 py-2': false, // isCondensed,
                          'sticky bg-white': column.isSticky,
                          'right-0 ':
                            column.isSticky &&
                            column.stickyPosition === 'right',
                          'left-10 ':
                            column.isSticky && column.stickyPosition === 'left'
                        })}
                      >
                        {column.cell ? <>{column.cell(row)}</> : value}
                      </TMTableCell>
                    );
                  })}
                </TMTableRow>
              ))}
            </>
          ) : null}
        </TMTableBody>
      </TMTable>

      {metaPage?.count > metaPage?.page_size && (
        <TMPagination
          pageNumber={metaPage?.page || 1}
          count={metaPage?.count || 0}
          pageSize={metaPage?.page_size}
        />
      )}
    </div>
  );
};

TestRunsTable.propTypes = {};

TestRunsTable.defaultProps = {};

export default TestRunsTable;
