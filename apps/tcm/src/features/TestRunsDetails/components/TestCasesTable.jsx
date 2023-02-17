import React from 'react';
import classNames from 'classnames';
import {
  TMPagination,
  TMSelectMenu,
  TMTable,
  TMTableBody,
  TMTableCell,
  TMTableHead,
  TMTableRow,
  TMTruncateText
} from 'common/bifrostProxy';
import Loader from 'common/Loader';

import { STATUS_OPTIONS } from '../const/immutableConst';

import useTRTCFolders from './useTRTCFolders';

const TestCasesTable = () => {
  const {
    metaPage,
    isTestCasesLoading,
    allTestCases,
    onPaginationClick,
    handleTestCaseViewClick,
    onResultChange
  } = useTRTCFolders();

  const datatableColumns = [
    {
      name: 'ID',
      key: 'identifier',
      class: 'w-[5%]',
      cell: (rowData) => (
        <div
          role="button"
          className="hover:text-brand-600 cursor-pointer"
          tabIndex={0}
          onClick={handleTestCaseViewClick(rowData)}
          onKeyDown={handleTestCaseViewClick(rowData)}
        >
          {`${rowData?.identifier}`}
        </div>
      )
      // cell: (rowData) =>
    },
    {
      name: 'HEADING',
      key: 'name',
      class: 'w-[80%]',
      cell: (rowData) => (
        <div
          role="button"
          className="text-base-900 hover:text-brand-600 cursor-pointer font-medium"
          tabIndex={0}
          onClick={handleTestCaseViewClick(rowData)}
          onKeyDown={handleTestCaseViewClick(rowData)}
        >
          <TMTruncateText>{rowData.name}</TMTruncateText>
        </div>
      ),
      maxWidth: 'max-w-[40%]'
    },
    {
      name: 'STATUS',
      class: 'w-[6%]',
      key: 'status',
      cell: (rowData) => (
        <TMSelectMenu
          options={STATUS_OPTIONS}
          value={
            rowData?.latest_status &&
            STATUS_OPTIONS.find((item) => item.value === rowData.latest_status)
          }
          onChange={(e) => onResultChange(e, rowData)}
        />
      ),
      // <span className="capitalize">{rowData.status}</span>,
      maxWidth: 'max-w-[10%]'
    }
  ];

  return (
    <div className=" border-base-300   flex-col overflow-y-auto border-b">
      <TMTable
        tableWrapperClass="table-fixed w-full"
        containerWrapperClass={classNames(
          // 'max-w-[calc(100vw-40rem)]'
          'overflow-y-auto'
        )}
      >
        <TMTableHead wrapperClassName="w-full rounded-xs">
          <TMTableRow wrapperClassName="relative">
            {/* <TMTableCell
            variant="body"
            wrapperClassName=" border-l-2 border-base-50 w-12 test-base-500 flex items-center px-0 py-2.5 sm:first:pl-0"
            textTransform="uppercase"
          >
            <TMCheckBox
              border={false}
              wrapperClassName="pt-0"
            />
          </TMTableCell> */}
            {datatableColumns?.map((col, index) => (
              <TMTableCell
                key={col.key || index}
                variant="body"
                wrapperClassName={classNames(
                  col?.class,
                  `test-base-500 first:pr-3 last:pl-3 px-2 py-2`,
                  col?.maxWidth,
                  {
                    'flex-1 w-9/12': index === 1,
                    'min-w-[50%]': index === 2,
                    'sticky bg-base-50': col.isSticky,
                    'right-0 ': col.isSticky && col.stickyPosition === 'right',
                    'left-10 ': col.isSticky && col.stickyPosition === 'left'
                  }
                )}
                textTransform="uppercase"
              >
                {col.name}
              </TMTableCell>
            ))}
          </TMTableRow>
        </TMTableHead>
        <TMTableBody>
          {!isTestCasesLoading ? (
            <>
              {allTestCases?.map((row, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <TMTableRow isSelected key={row.id || index}>
                  {datatableColumns?.map((column) => {
                    const value = row[column.key];
                    return (
                      <TMTableCell
                        key={column.id}
                        wrapperClassName={classNames(
                          column?.class,
                          'first:pr-3 last:pl-3 px-2 py-2',
                          column?.maxWidth,
                          {
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
                      </TMTableCell>
                    );
                  })}
                </TMTableRow>
              ))}
            </>
          ) : null}
        </TMTableBody>
      </TMTable>
      {isTestCasesLoading ? (
        <div className="flex w-full flex-col justify-center">
          <Loader wrapperClassName="h-96 w-full" />
        </div>
      ) : null}
      {metaPage?.count > metaPage?.page_size && (
        <TMPagination
          pageNumber={metaPage?.page || 1}
          count={metaPage?.count || 0}
          pageSize={metaPage?.page_size}
          onActionClick={onPaginationClick}
        />
      )}
    </div>
  );
};

export default TestCasesTable;
