/* eslint-disable tailwindcss/no-arbitrary-value */
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
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { routeFormatter } from 'utils/helperFunctions';

import { TABS_ARRAY, TR_DROP_OPTIONS } from '../const/immutableConst';

import AssignTestRun from './AssignTestRun';
import CloseTestRun from './CloseTestRun';
import DeleteTestRun from './DeleteTestRun';
import useTestRunsTable from './useTestRunsTable';

const TestRunsTable = () => {
  const {
    currentTab,
    projectId,
    allTestRuns,
    isTestRunsLoading,
    metaPage,
    getProgressOptions,
    onDropDownChange
  } = useTestRunsTable();

  const tableColumns = [
    {
      name: 'ID',
      key: 'identifier',
      class: 'w-[10%]'
    },
    {
      name: 'TITLE',
      key: 'name',
      class: 'w-[50%]',
      cell: (rowData) => (
        <Link
          className="text-base-900 hover:text-brand-600 cursor-pointer font-medium"
          to={routeFormatter(AppRoute.TEST_RUN_DETAILS, {
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
      key: 'test_cases_count',
      class: 'w-[13%]'
    },
    // {
    //   name: 'CREATED DATE',
    //   key: 'created_at',
    //   cell: (rowData) => formatTime(rowData.created_at)
    // },
    {
      name: 'ASSIGNED TO',
      key: 'owner',
      cell: (rowData) => rowData.assignee?.full_name || 'Unassigned',
      class: 'w-[15%]'
    },
    {
      name: 'OVERALL PROGRESS',
      key: '',
      cell: (rowData) => {
        const totalValue = Object.values(rowData.overall_progress).reduce(
          (total, num) => total + num,
          0
        );
        const untestedPerc =
          100 - (rowData.overall_progress.untested / totalValue) * 100;
        return (
          <div className="flex w-full items-center">
            <div className="w-full max-w-[calc(100%-30px)]">
              <HighchartsReact
                highcharts={Highcharts}
                options={getProgressOptions(rowData)}
              />
            </div>
            <span className="text-base-500 ml-0.5 w-7">
              {untestedPerc.toFixed(0)}%
            </span>
          </div>
        );
      },
      class: 'w-[20%]'
    },
    {
      name: '',
      key: '',
      cell: (data) => (
        <TMDropdown
          triggerVariant="meatball-button"
          dividerRequired
          options={
            currentTab === TABS_ARRAY[0].name
              ? TR_DROP_OPTIONS
              : [TR_DROP_OPTIONS[3]] // only delete
          }
          onClick={(e) => onDropDownChange(e, data)}
        />
      ),
      class: 'w-[5%]'
    }
  ];

  return (
    <div className="flex flex-1 flex-col  justify-start">
      <TMTable
        tableWrapperClass="table-fixed w-full"
        containerWrapperClass={classNames(
          'overflow-y-auto shadow-none border-none'
        )}
      >
        <TMTableHead wrapperClassName="w-full rounded-xs">
          <TMTableRow wrapperClassName="relative">
            {tableColumns?.map((col, index) => (
              <TMTableCell
                key={col.key || index}
                variant="body"
                wrapperClassName={classNames('test-base-500', col?.class, {
                  'first:pr-3 last:pl-3 px-2 py-2': false, // isCondensed
                  'flex-1 w-9/12': index === 1,
                  // 'min-w-[50%]': index === 2,
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
                  {tableColumns?.map((column, colIdx) => {
                    const value = row[column.key];
                    return (
                      <td
                        key={column.id || colIdx}
                        className={classNames(
                          'px-3 text-base-500 whitespace-nowrap text-sm text-left inherit py-4 first:pl-4 sm:first:pl-6 last:pr-4 sm:last:pr-6 py-4',
                          {
                            'first:pr-3 last:pl-3 px-2 py-2': false, // isCondensed,
                            'sticky bg-white': column.isSticky,
                            'right-0 ':
                              column.isSticky &&
                              column.stickyPosition === 'right',
                            'left-10 ':
                              column.isSticky &&
                              column.stickyPosition === 'left'
                          }
                        )}
                      >
                        {column.cell ? <>{column.cell(row)}</> : value}
                      </td>
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

      <DeleteTestRun />
      <CloseTestRun />
      <AssignTestRun />
    </div>
  );
};

TestRunsTable.propTypes = {};

TestRunsTable.defaultProps = {};

export default TestRunsTable;
