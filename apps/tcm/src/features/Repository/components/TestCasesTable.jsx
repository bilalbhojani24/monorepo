import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
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
  TMPagination
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import { dropDownOptions, perPageCount } from '../const/testCaseConst';

import FolderExplorerModal from './FolderExplorerModal';
import useTestCasesTable from './useTestCasesTable';

const TestCasesTable = ({
  rows,
  containerWrapperClass,
  isCondensed,
  isLoading
}) => {
  const {
    metaPage,
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
    rows
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

  const datatableColumns = [
    {
      name: 'ID',
      key: 'id',
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
          {rowData.name}
        </div>
      )
    },
    {
      name: 'PRIORITY',
      key: 'priority',
      cell: (rowData) => (
        <span className="capitalize">
          {formatPriority(rowData.priority)}
          {rowData.priority}
        </span>
      )
    },
    {
      name: 'OWNER',
      key: 'owner',
      cell: (rowData) => (
        <span>{rowData.assignee ? rowData.assignee.full_name : '--'}</span>
      )
    },
    {
      name: 'Tags',
      key: 'tags',
      cell: (rowData) => (
        <span>
          {rowData.tags.length > 0 ? (
            <div className="mt-1 flex gap-1">
              {rowData.tags.map((item) => (
                <TMBadge text={item} size="large" isRounded />
              ))}
            </div>
          ) : (
            '--'
          )}
        </span>
      )
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
      )
    }
  ];

  return (
    <>
      <Table
        containerWrapperClass={classNames(
          containerWrapperClass,
          'max-w-[calc(100vw-40rem)]'
        )}
      >
        <TableHead wrapperClass="w-full rounded-xs">
          <TableRow wrapperClass="relative">
            <TableCell
              variant="body"
              wrapperClass="border-l-2 border-base-50 w-12 test-base-500 flex items-center px-0 py-2.5 sm:first:pl-0"
              textTransform="uppercase"
            >
              <TMCheckBox
                border={false}
                wrapperClass="pt-0"
                checked={
                  (isAllSelected && !deSelectedTestCaseIDs.length) ||
                  selectedTestCaseIDs.length === rows.length
                }
                indeterminate={
                  (isAllSelected && deSelectedTestCaseIDs.length) ||
                  (selectedTestCaseIDs.length &&
                    selectedTestCaseIDs.length !== rows.length)
                }
                onChange={selectAll}
              />
            </TableCell>
            {datatableColumns?.map((col, index) => (
              <TableCell
                key={col.key}
                variant="body"
                wrapperClass={classNames('test-base-500', {
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
                (selectedTestCaseIDs.length || isAllSelected) ? (
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
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            'Loading..'
          ) : (
            <>
              {rows?.map((row) => (
                // eslint-disable-next-line react/no-array-index-key
                <TableRow isSelected key={row.id}>
                  <TableCell
                    variant="body"
                    wrapperClass={classNames(
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
                      wrapperClass="pt-0"
                      checked={
                        !deSelectedTestCaseIDs.includes(row.id) &&
                        (isAllSelected || selectedTestCaseIDs.includes(row.id))
                      }
                      onChange={(e) => updateSelection(e, row)}
                    />
                  </TableCell>
                  {datatableColumns?.map((column) => {
                    const value = row[column.key];
                    return (
                      <TableCell
                        key={column.id}
                        wrapperClass={classNames({
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
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </>
          )}
        </TableBody>
      </Table>
      {metaPage?.count > perPageCount && (
        <TMPagination
          pageNumber={metaPage?.page || 1}
          count={metaPage?.count || 0}
          pageSize={perPageCount}
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
  isLoading: PropTypes.bool
};

TestCasesTable.defaultProps = {
  containerWrapperClass: '',
  isCondensed: false,
  isLoading: false
};

export default TestCasesTable;
