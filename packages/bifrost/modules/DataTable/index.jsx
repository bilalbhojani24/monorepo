import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { columns, rows } from './const/dataTableConstants';
import Row from './components/Row';
import Cell from './components/Cell';
import Header from './components/Header';

import './styles.scss';
import useDataTable from './useDataTable';

const DataTable = (props) => {
  const {
    columns,
    isFullWhite,
    isHeaderCapitalize,
    isHeaderSticky,
    isSelectable,
    isStriped,
    onAllRowSelect,
    onRowSelect,
    onSort,
    rowClass,
    rows,
    selectedRowClass,
    tableClass,
    tableContainerClass
  } = props;
  const { tableData, tableRef, selectedRow, handleRowChange, handleToggleAll, sort, handleSort } = useDataTable({
    rows,
    onSort,
    onRowSelect,
    onAllRowSelect
  });

  return (
    <div
      className={classNames(
        'shadow-sm ring-1 ring-black ring-opacity-5',
        {
          'overflow-hidden': !isHeaderSticky
        },
        tableContainerClass
      )}
    >
      <table ref={tableRef} className={classNames('min-w-full divide-y divide-gray-300', tableClass)}>
        <Header
          columns={columns}
          isHeaderCapitalize={isHeaderCapitalize}
          isHeaderSticky={isHeaderSticky}
          onSort={onSort}
          isSelectable={isSelectable}
          toggleAll={handleToggleAll}
          checked={tableData.length === selectedRow.length}
          sort={sort}
          handleSort={handleSort}
          isFullWhite={isFullWhite}
        />
        <tbody>
          {tableData.map((row, rowIdx) => {
            return (
              <Row
                key={row.id}
                index={rowIdx}
                className={classNames(
                  {
                    'bg-gray-50': rowIdx % 2 !== 0 && isStriped,
                    'bg-white-50': isFullWhite
                  },
                  rowClass,
                  {
                    [selectedRowClass]: selectedRow.includes(row)
                  }
                )}
              >
                {isSelectable && (
                  <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                    {selectedRow.includes(row) && (
                      <div className={classNames('absolute inset-y-0 left-0 w-0.5 bg-indigo-600')} />
                    )}
                    <input
                      type="checkbox"
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 sm:left-6"
                      checked={selectedRow.includes(row)}
                      onChange={(e) => handleRowChange(e, row)}
                    />
                  </td>
                )}
                {columns.map((colVal, colIdx) => {
                  const value = row[colVal.key];
                  return (
                    <>
                      <Cell
                        key={colVal.key}
                        className={classNames('whitespace-nowrap py-4 px-3 text-sm', {
                          'bg-white-50': isFullWhite
                        })}
                        index={colIdx}
                      >
                        {colVal.cell ? colVal.cell(row) : value}
                      </Cell>
                    </>
                  );
                })}
              </Row>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      key: PropTypes.string,
      cell: PropTypes.elementType,
      style: PropTypes.object,
      isSortable: PropTypes.bool
    })
  ),
  isFullWhite: PropTypes.bool,
  isHeaderCapitalize: PropTypes.bool,
  isHeaderSticky: PropTypes.bool,
  isSelectable: PropTypes.bool,
  isStriped: PropTypes.bool,
  onAllRowSelect: PropTypes.func,
  onRowSelect: PropTypes.func,
  onSort: PropTypes.func,
  rowClass: PropTypes.string,
  rows: PropTypes.array,
  selectedRowClass: PropTypes.string,
  tableClass: PropTypes.string,
  tableContainerClass: PropTypes.string
};

DataTable.defaultProps = {
  columns: columns,
  isFullWhite: false,
  isHeaderCapitalize: false,
  isHeaderSticky: false,
  isSelectable: false,
  isStriped: false,
  onAllRowSelect: () => {},
  onRowSelect: () => {},
  onSort: () => {},
  rowClass: '',
  rows: rows,
  selectedRowClass: '',
  tableClass: '',
  tableContainerClass: ''
};

export default DataTable;
