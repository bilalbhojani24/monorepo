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
      class: 'w-[7.2%] max-w-[50px]',
      cell: (rowData) => (
        <div
          role="button"
          className="text-base-900 hover:text-brand-600 cursor-pointer"
          tabIndex={0}
          onClick={handleTestCaseViewClick(rowData, 'ID')}
          onKeyDown={handleTestCaseViewClick(rowData, 'ID')}
        >
          <TMTruncateText
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
      class: 'w-[75%]',
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
            truncateUsingClamp={false}
            hidetooltipTriggerIcon
            isFullWidthTooltip
            headerTooltipProps={{
              delay: 500
            }}
          >
            {rowData.name}
          </TMTruncateText>
        </div>
      ),
      maxWidth: 'max-w-[40%]'
    },
    {
      name: 'STATUS',
      class: 'w-[13%]',
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
          <div className="flex h-9 items-center pl-3 capitalize">
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
      },
      // <span className="capitalize">{rowData.status}</span>,
      maxWidth: 'max-w-[80px]'
    }
  ];

  return (
    <div className="flex-col overflow-y-auto border-none">
      <TMTable
        tableWrapperClass="table-fixed w-full"
        containerWrapperClass={classNames(
          // 'max-w-[calc(100vw-40rem)]'
          'overflow-y-auto md:rounded-none'
        )}
      >
        <TMTableHead wrapperClassName="w-full rounded-xs">
          <TMTableRow wrapperClassName="relative">
            <td
              className="border-base-50 text-base-500 w-[3%]  p-2"
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
            {datatableColumns?.map((col, index) => (
              <TMTableCell
                key={col.key}
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
                {index === 0 && selectedTestCaseIDs.length ? (
                  <div className="bg-base-50 border-base-300 absolute top-0 flex h-full items-center gap-3 border-b">
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
                  {datatableColumns?.map((column) => {
                    const value = row[column.key];
                    return (
                      <TMTableCell
                        key={column.key}
                        wrapperClassName={classNames(
                          column?.class,
                          'first:pr-3 last:pl-3 px-2 py-1',
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
