/* eslint-disable tailwindcss/no-arbitrary-value */
import React from 'react';
import { twClassNames } from '@browserstack/utils';
import classNames from 'classnames';
import {
  TMButton,
  TMCheckBox,
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

import { BULK_OPERATIONS, STATUS_OPTIONS } from '../const/immutableConst';

import AddResultModal from './AddResultModal';
import AssignTestCasesModal from './AssignTestCasesModal';
import RemoveTCModal from './RemoveTCModal';
import useBulkFunctions from './useBulkFunctions';
import useTRTCFolders from './useTRTCFolders';

const TestCasesTable = () => {
  const {
    testCaseDetails,
    testRunDetails,
    metaPage,
    isTableLoading,
    allTestCases,
    handleTestCaseViewClick,
    onResultChange
  } = useTRTCFolders();

  const {
    isAllChecked,
    isIndeterminate,
    selectedTestCaseIDs,
    selectAll,
    updateSelection,
    setBulkOperation
  } = useBulkFunctions();

  const datatableColumns = [
    {
      name: 'ID',
      key: 'identifier',
      class: 'w-[10%]',
      bodyClass: '[&>div]:w-[80px]',
      cell: (rowData) => (
        <div
          role="button"
          className="text-base-900 hover:text-brand-600 cursor-pointer"
          tabIndex={0}
          onClick={handleTestCaseViewClick(rowData, 'ID')}
          onKeyDown={handleTestCaseViewClick(rowData, 'ID')}
        >
          <TMTruncateText
            ignoreClickAndWrapText
            truncateUsingClamp={false}
            hidetooltipTriggerIcon
            isFullWidthTooltip
            headerTooltipProps={{
              delay: 500
            }}
          >
            {`${rowData?.identifier}`}
          </TMTruncateText>
        </div>
      )
      // cell: (rowData) =>
    },
    {
      name: 'TITLE',
      key: 'name',
      class: 'w-[65%]',
      bodyClass: '[&>div]:w-[calc(100vw-1030px)]',
      cell: (rowData) => (
        <div
          role="button"
          className={twClassNames(
            'text-base-900 hover:text-brand-600 cursor-pointer font-medium',
            {
              'text-brand-600':
                rowData?.test_case_id === testCaseDetails?.testCaseId
            }
          )}
          tabIndex={0}
          onClick={handleTestCaseViewClick(rowData, 'Title')}
          onKeyDown={handleTestCaseViewClick(rowData, 'Title')}
        >
          <TMTruncateText
            ignoreClickAndWrapText
            truncateUsingClamp={false}
            hidetooltipTriggerIcon
            isFullWidthTooltip
            headerTooltipProps={{
              delay: 500,
              wrapperClassName: 'break-all'
            }}
          >
            {rowData.name}
          </TMTruncateText>
        </div>
      )
    },
    {
      name: 'ASSIGNED TO',
      key: 'test_assignee',
      class: 'w-[10%]',
      bodyClass: '[&>div]:w-[90px]',
      cell: (rowData) => (
        <div className={twClassNames('text-base-500')}>
          <TMTruncateText
            truncateUsingClamp={false}
            hidetooltipTriggerIcon
            isFullWidthTooltip
            headerTooltipProps={{
              delay: 500
            }}
          >
            {rowData?.test_assignee?.full_name || 'Unassigned'}
          </TMTruncateText>
        </div>
      )
    },
    {
      name: 'STATUS',
      class: 'w-[13%] text-center',
      bodyClass: 'pl-0 [&>div]:w-[120px]',
      key: 'status',
      cell: (rowData) => {
        const value =
          rowData?.latest_status &&
          STATUS_OPTIONS.find((item) => item.value === rowData.latest_status);

        const valueMapped = value
          ? {
              label: (
                <div>
                  <div
                    className={`${value.class} m-auto mx-2 inline-block h-2 w-2 flex-1 rounded-full`}
                    style={{
                      backgroundColor: value.color ? value.color : 'auto'
                    }}
                  />
                  <span className="inline-block">{value.label}</span>
                </div>
              ),
              value: value.value
            }
          : null;

        return testRunDetails?.run_state === 'closed' ? (
          <div className="flex h-7 items-center pl-3 capitalize">
            {valueMapped?.label || '--'}
          </div>
        ) : (
          <TMSelectMenu
            placeholder="Not Started"
            checkPosition="right"
            triggerWrapperClassName={twClassNames(
              'border-none shadow-none pr-6 py-1'
            )}
            options={STATUS_OPTIONS.map((el) => ({
              label: (
                <div>
                  <div
                    className={`${el.class} m-auto mx-2 inline-block h-2 w-2 flex-1 rounded-full`}
                    style={{ backgroundColor: el.color ? el.color : 'auto' }}
                  />
                  <span className="inline-block">{el.label}</span>
                </div>
              ),
              value: el.value
            }))}
            value={valueMapped}
            onChange={(e) => onResultChange(e, rowData, true, true)}
          />
        );
      }
      // <span className="capitalize">{rowData.status}</span>,
    }
  ];

  return (
    <div
      className={twClassNames('flex-col overflow-y-auto border-none', {
        'pb-20': !(metaPage?.count > metaPage?.page_size)
      })}
    >
      <TMTable
        tableWrapperClass="w-full"
        containerWrapperClass={classNames(
          // 'max-w-[calc(100vw-40rem)]'
          'overflow-y-auto md:rounded-none'
        )}
      >
        <TMTableHead wrapperClassName="w-full rounded-xs">
          <TMTableRow wrapperClassName="relative">
            {testRunDetails?.project_id &&
              testRunDetails?.run_state !== 'closed' && (
                <td
                  className="border-base-50 text-base-500 w-[1%] p-2 [&>div]:min-w-[20px]"
                  textTransform="uppercase"
                >
                  {/* all checkbox */}
                  <TMCheckBox
                    border={false}
                    wrapperClassName="pt-0 pl-2"
                    checked={isAllChecked}
                    indeterminate={isIndeterminate}
                    onChange={selectAll}
                    disabled={!allTestCases?.length}
                  />
                </td>
              )}
            {datatableColumns?.map((col, index) => (
              <TMTableCell
                key={col.key}
                variant="body"
                wrapperClassName={classNames(
                  col?.class,
                  `test-base-500 first:pr-3 last:pl-3 px-2 py-2`,
                  col?.maxWidth,
                  {
                    'sticky bg-base-50': col.isSticky,
                    'right-0 ': col.isSticky && col.stickyPosition === 'right',
                    'left-10 ': col.isSticky && col.stickyPosition === 'left'
                  }
                )}
                textTransform="uppercase"
              >
                {col.name}
                {index === 0 && selectedTestCaseIDs.length ? (
                  <div className="absolute top-0 flex h-full items-center gap-3">
                    <TMButton
                      colors="white"
                      size="extra-small"
                      onClick={() =>
                        setBulkOperation(BULK_OPERATIONS.ADD_RESULT.option)
                      }
                    >
                      Add Result
                    </TMButton>
                    <TMButton
                      colors="white"
                      size="extra-small"
                      onClick={() =>
                        setBulkOperation(BULK_OPERATIONS.ASSIGN_TO.option)
                      }
                    >
                      Assign to
                    </TMButton>
                    <TMButton
                      colors="white"
                      size="extra-small"
                      onClick={() =>
                        setBulkOperation(BULK_OPERATIONS.REMOVE.option)
                      }
                    >
                      Remove from Run
                    </TMButton>
                  </div>
                ) : null}
              </TMTableCell>
            ))}
          </TMTableRow>
        </TMTableHead>
        <TMTableBody wrapperClassName="border-b-0">
          {!isTableLoading ? (
            <>
              {allTestCases?.map((row, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <TMTableRow isSelected key={row.id || index}>
                  {testRunDetails?.project_id && // projectID will only exist if the detail has been fetched and ready, else checkbox will be shown during load as well
                    testRunDetails?.run_state !== 'closed' && (
                      <td
                        className={twClassNames(
                          'border-base-50 test-base-500 p-2 w-[5%]'
                          // !deSelectedTestCaseIDs.includes(row.id) &&
                          //   (isAllSelected || selectedTestCaseIDs.includes(row.id))
                          //   ? 'border-l-brand-600'
                          //   : 'border-l-white'
                        )}
                        textTransform="uppercase"
                      >
                        <TMCheckBox
                          border={false}
                          wrapperClassName="pt-0 pl-2"
                          checked={
                            isAllChecked || selectedTestCaseIDs.includes(row.id)
                          }
                          onChange={(e) => updateSelection(e, row)}
                        />
                      </td>
                    )}
                  {datatableColumns?.map((column) => {
                    const value = row[column.key];
                    return (
                      <TMTableCell
                        key={column.key}
                        wrapperClassName={classNames(
                          // column?.class,
                          'first:pr-3 last:pl-3 px-2 py-1',
                          column?.bodyClass,
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
      {isTableLoading ? (
        <div className="flex w-full flex-col justify-center">
          <Loader wrapperClassName="h-96 w-full" />
        </div>
      ) : (
        <>
          {metaPage?.count > metaPage?.page_size ? (
            <TMPagination
              pageNumber={metaPage?.page || 1}
              count={metaPage?.count || 0}
              pageSize={metaPage?.page_size}
            />
          ) : (
            <div className="border-base-300 border-t" />
          )}
        </>
      )}

      {allTestCases.length ? (
        <>
          <AddResultModal />
          <AssignTestCasesModal />
          <RemoveTCModal />
        </>
      ) : null}
    </div>
  );
};

export default TestCasesTable;
