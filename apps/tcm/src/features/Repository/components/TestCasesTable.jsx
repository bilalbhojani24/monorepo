import React from 'react';
import {
  ArrowDownwardOutlinedIcon,
  ArrowUpwardOutlinedIcon,
  KeyboardDoubleArrowUpOutlinedIcon,
  RemoveOutlinedIcon
} from 'assets/icons';
import classNames from 'classnames';
import {
  TMBadge,
  TMButton,
  TMCheckBox,
  TMDropdown,
  TMPagination,
  TMTable,
  TMTableBody,
  TMTableCell,
  TMTableHead,
  TMTableRow
} from 'common/bifrostProxy';
import Loader from 'common/Loader';
import PropTypes from 'prop-types';

import { dropDownOptions } from '../const/testCaseConst';

import FolderExplorerModal from './FolderExplorerModal';
import useTestCasesTable from './useTestCasesTable';

const TestCasesTable = ({
  rows,
  onPaginationClick,
  containerWrapperClass,
  isCondensed,
  isLoading,
  isSearchFilterView,
  metaPage,
  isMini,
  onItemSelectionCb,
  selectedTestCases
}) => {
  const {
    showMoveModal,
    selectedTestCaseIDs,
    deSelectedTestCaseIDs,
    isAllSelected,
    updateSelection,
    selectAll,
    initBulkMove,
    initBulkEdit,
    initBulkDelete,
    hideFolderModal,
    moveTestCasesHandler,
    onDropDownChange,
    handleTestCaseViewClick
  } = useTestCasesTable({
    rows,
    onItemSelectionCb,
    selectedTestCases,
    isMini
  });

  const formatPriority = (priority) => {
    switch (priority) {
      case 'high':
        return <ArrowUpwardOutlinedIcon className="text-danger-500 mr-2" />;
      case 'low':
        return <ArrowDownwardOutlinedIcon className="text-success-500 mr-2" />;
      case 'critical':
        return (
          <KeyboardDoubleArrowUpOutlinedIcon className="text-danger-700 mr-2" />
        );
      case 'medium':
        return <RemoveOutlinedIcon className="text-brand-500 mr-2" />;
      default:
        return '';
    }
  };

  const datatableColumnsFull = [
    {
      name: 'ID',
      key: 'identifier',
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
      ),
      maxWidth: 'max-w-[10%]'
      // cell: (rowData) =>
    },
    {
      name: 'TITLE',
      key: 'name',
      cell: (rowData) => (
        <div
          role="button"
          className="text-base-900 hover:text-brand-600 cursor-pointer font-medium"
          tabIndex={0}
          onClick={handleTestCaseViewClick(rowData)}
          onKeyDown={handleTestCaseViewClick(rowData)}
        >
          {isSearchFilterView ? (
            <>
              <div className="text-base-900 hover:text-brand-600 font-medium ">
                {rowData.name}
              </div>
              <div className="text-base-400 font-normal">
                {rowData?.folders?.map((item) => item.name)?.join('  >  ')}
              </div>
            </>
          ) : (
            rowData.name
          )}
        </div>
      ),
      maxWidth: 'max-w-[40%]'
    },
    {
      name: 'PRIORITY',
      key: 'priority',
      cell: (rowData) => (
        <span className="capitalize">
          {formatPriority(rowData.priority)}
          {rowData.priority}
        </span>
      ),
      maxWidth: 'max-w-[10%]'
    },
    {
      name: 'OWNER',
      key: 'owner',
      cell: (rowData) => (
        <span>{rowData.assignee ? rowData.assignee.full_name : '--'}</span>
      ),
      maxWidth: 'max-w-[10%]'
    },
    {
      name: 'Tags',
      key: 'tags',
      cell: (rowData) => (
        <span>
          {rowData.tags.length > 0 ? (
            <div className="mt-1 flex gap-1">
              {rowData.tags.map((item) => (
                <TMBadge text={item} size="large" key={item} />
              ))}
            </div>
          ) : (
            '--'
          )}
        </span>
      ),
      maxWidth: 'max-w-[10%]'
    },
    {
      name: '',
      key: 'action',
      isSticky: true,
      stickyPosition: 'right',
      cell: (data) => (
        <TMDropdown
          options={dropDownOptions}
          triggerVariant="meatball-button"
          onClick={(e) => onDropDownChange(e, data)}
        />
      ),
      maxWidth: 'max-w-[10%]'
    }
  ];

  const datatableColumns = isMini
    ? datatableColumnsFull.filter((item, index) => index < 3)
    : datatableColumnsFull;

  return (
    <>
      <TMTable
        tableWrapperClass="table-fixe w-full"
        containerWrapperClass={classNames(
          containerWrapperClass,
          // 'max-w-[calc(100vw-40rem)]'
          'overflow-y-auto'
        )}
      >
        <TMTableHead wrapperClassName="w-full rounded-xs">
          <TMTableRow wrapperClassName="relative">
            <TMTableCell
              variant="body"
              wrapperClassName=" border-l-2 border-base-50 w-12 test-base-500 flex items-center px-0 py-2.5 sm:first:pl-0"
              textTransform="uppercase"
            >
              {/* all checkbox */}
              <TMCheckBox
                border={false}
                wrapperClassName="pt-0"
                checked={
                  (isAllSelected && !deSelectedTestCaseIDs.length) ||
                  (rows.length !== 0 &&
                    selectedTestCaseIDs.length === rows.length)
                }
                indeterminate={
                  !!(
                    (isAllSelected && deSelectedTestCaseIDs.length) ||
                    (selectedTestCaseIDs.length &&
                      selectedTestCaseIDs.length !== rows.length)
                  )
                }
                onChange={selectAll}
              />
            </TMTableCell>
            {datatableColumns?.map((col, index) => (
              <TMTableCell
                key={col.key || index}
                variant="body"
                wrapperClassName={classNames(`test-base-500`, col?.maxWidth, {
                  'first:pr-3 last:pl-3 px-2 py-2': isCondensed,
                  'flex-1 w-9/12': index === 1,
                  'min-w-[50%]': index === 2,
                  'sticky bg-base-50': col.isSticky,
                  'right-0 ': col.isSticky && col.stickyPosition === 'right',
                  'left-10 ': col.isSticky && col.stickyPosition === 'left'
                })}
                textTransform="uppercase"
              >
                {col.name}
                {index === 0 &&
                (selectedTestCaseIDs.length || isAllSelected) &&
                !isMini ? (
                  <div className="bg-base-50 border-base-300 absolute top-0 flex h-full items-center gap-3 border-b">
                    <TMButton
                      colors="white"
                      size="extra-small"
                      onClick={initBulkMove}
                    >
                      Move
                    </TMButton>
                    {(selectedTestCaseIDs.length > 1 || isAllSelected) && (
                      <>
                        <TMButton
                          colors="white"
                          size="extra-small"
                          onClick={initBulkEdit}
                        >
                          Bulk Edit
                        </TMButton>
                        <TMButton
                          colors="white"
                          size="extra-small"
                          onClick={initBulkDelete}
                        >
                          Bulk Delete
                        </TMButton>
                      </>
                    )}
                  </div>
                ) : (
                  ''
                )}
              </TMTableCell>
            ))}
          </TMTableRow>
        </TMTableHead>
        <TMTableBody>
          {!isLoading ? (
            <>
              {rows?.map((row, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <TMTableRow isSelected key={row.id || index}>
                  <TMTableCell
                    variant="body"
                    wrapperClassName={classNames(
                      'border-l-2 test-base-500 flex items-center w-5 px-0 py-2.5 sm:first:pl-0',
                      !deSelectedTestCaseIDs.includes(row.id) &&
                        (isAllSelected || selectedTestCaseIDs.includes(row.id))
                        ? 'border-l-brand-600'
                        : 'border-l-white'
                    )}
                    textTransform="uppercase"
                  >
                    <TMCheckBox
                      border={false}
                      wrapperClassName="pt-0"
                      checked={
                        !deSelectedTestCaseIDs.includes(row.id) &&
                        (isAllSelected || selectedTestCaseIDs.includes(row.id))
                      }
                      onChange={(e) => updateSelection(e, row)}
                    />
                  </TMTableCell>
                  {datatableColumns?.map((column) => {
                    const value = row[column.key];
                    return (
                      <TMTableCell
                        key={column.id}
                        wrapperClassName={classNames(column?.maxWidth, {
                          'first:pr-3 last:pl-3 px-2 py-2': isCondensed,
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
      {isLoading ? (
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
      <FolderExplorerModal
        show={showMoveModal}
        heading="Move Test Cases"
        subHeading="Choose desired folder where you want to move the test cases:"
        alertText="The selected test cases will be moved from the current location to the above selected folder."
        onOK={moveTestCasesHandler}
        onClose={hideFolderModal}
      />
    </>
  );
};

TestCasesTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  containerWrapperClass: PropTypes.string,
  isCondensed: PropTypes.bool,
  onPaginationClick: PropTypes.func,
  onItemSelectionCb: PropTypes.func,
  isLoading: PropTypes.bool,
  isMini: PropTypes.bool,
  isSearchFilterView: PropTypes.bool,
  metaPage: PropTypes.objectOf({
    page: PropTypes.number,
    next: PropTypes.number,
    prev: PropTypes.number,
    count: PropTypes.number
  }),
  selectedTestCases: PropTypes.arrayOf(PropTypes.number)
};

TestCasesTable.defaultProps = {
  containerWrapperClass: '',
  isCondensed: false,
  isSearchFilterView: false,
  isMini: false,
  isLoading: false,
  onPaginationClick: null,
  onItemSelectionCb: () => {},
  metaPage: {},
  selectedTestCases: []
};

export default TestCasesTable;
