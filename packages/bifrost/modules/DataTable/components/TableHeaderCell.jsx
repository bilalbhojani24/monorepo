import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ChevronDownIcon, ChevronUpIcon } from '../../Icon';

const TableHeaderCell = ({ col, isHeaderSticky, sortType, handleSort }) => {
  const handleSortClick = (selectedColumnKey) => {
    const type = !sortType || sortType === 'asc' ? 'desc' : 'asc';
    handleSort(selectedColumnKey, type);
  };

  const handleKeyPress = (e, selectedColumnKey) => {
    e.preventDefault();
    if (e.key === ' ' || e.key === 'Spacebar' || e.key === 'Enter') {
      handleSortClick(selectedColumnKey);
    }
  };

  return (
    <th
      key={col.key}
      scope="col"
      className={classNames('py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 bg-white-600', {
        'sticky top-0 z-10 border-b border-gray-300 bg-opacity-75': isHeaderSticky
      })}
      {...(col.isSortable && {
        role: 'button',
        onClick: () => handleSortClick(col.key),
        onKeyPress: (e) => handleKeyPress(e, col.key),
        tabIndex: 0,
        'aria-sort': sortType ? `${sortType}ending` : ''
      })}
      style={col.style}
    >
      <div
        className={classNames({
          'group inline-flex items-center': col.isSortable
        })}
      >
        {col.name}
        <div className="flex ml-2 flex-col">
          <span
            className={classNames('rounded text-gray-400', {
              hidden: !col.isSortable
            })}
          >
            <ChevronUpIcon
              className={classNames('h-4 w-4 cursor-pointer', {
                'text-indigo-600': sortType && sortType === 'desc'
              })}
              aria-hidden="true"
            />
          </span>
          <span
            className={classNames('rounded text-gray-400', {
              hidden: !col.isSortable
            })}
          >
            <ChevronDownIcon
              className={classNames('h-4 w-4 cursor-pointer', {
                'text-indigo-600': sortType && sortType === 'asc'
              })}
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </th>
  );
};

TableHeaderCell.propTypes = {
  col: PropTypes.shape({
    name: PropTypes.string,
    key: PropTypes.string,
    style: PropTypes.object,
    isSortable: PropTypes.bool,
    cell: PropTypes.elementType
  }),
  isHeaderSticky: PropTypes.bool,
  sortType: PropTypes.string,
  handleSort: PropTypes.func
};

export default TableHeaderCell;
