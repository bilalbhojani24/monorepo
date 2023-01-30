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
import { TMButton, TMCheckBox, TMDropdown } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import { dropDownOptions } from '../const/testCaseConst';

import useTestCases from './useTestCases';
import useTestCasesTable from './useTestCasesTable';

const TestCasesTable = ({
  rows,
  containerWrapperClass,
  isCondensed,
  isLoading
}) => {
  const { onDropDownChange, handleTestCaseViewClick } = useTestCases();
  const {
    selectedTestCaseIDs,
    isAllSelected,
    updateSelection,
    selectAll,
    initBulkMove,
    initBulkEdit,
    initBulkLink,
    initBulkDelete
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

      cell: (rowData) => `TC${rowData?.id}`
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
      name: '',
      key: 'action',
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
    <Table containerWrapperClass={containerWrapperClass}>
      <TableHead wrapperClass="w-full rounded-xs">
        <TableRow wrapperClass="relative">
          <TableCell
            variant="body"
            wrapperClass="test-base-500 flex items-center w-1 px-0 py-2.5 sm:first:pl-0"
            textTransform="uppercase"
          >
            <TMCheckBox
              border={false}
              wrapperClass="pt-0"
              checked={isAllSelected}
              indeterminate
              onChange={selectAll}
            />
          </TableCell>
          {datatableColumns?.map((col, index) => (
            <TableCell
              key={col.key}
              variant="body"
              wrapperClass={classNames('test-base-500', {
                'first:pr-3 last:pl-3 px-2 py-2': isCondensed
              })}
              textTransform="uppercase"
            >
              {col.name}

              {index === 0 && selectedTestCaseIDs.length ? (
                <div className="bg-base-50 border-base-300 absolute top-0 flex h-full items-center gap-3 border-b">
                  <TMButton
                    colors="white"
                    size="extra-small"
                    onClick={initBulkMove}
                  >
                    Move
                  </TMButton>
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
                    onClick={initBulkLink}
                  >
                    Link to JIRA
                  </TMButton>
                  <TMButton
                    colors="white"
                    size="extra-small"
                    onClick={initBulkDelete}
                  >
                    Bulk Delete
                  </TMButton>
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
            {rows?.map((row, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <TableRow key={idx} classNames="border-l border-base-500">
                <TableCell
                  variant="body"
                  wrapperClass="test-base-500 flex items-center w-1 px-0 py-2.5 sm:first:pl-0"
                  textTransform="uppercase"
                >
                  <TMCheckBox
                    border={false}
                    wrapperClass="pt-0"
                    checked={
                      isAllSelected || selectedTestCaseIDs.includes(row.id)
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
                        'first:pr-3 last:pl-3 px-2 py-2': isCondensed
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
