import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import TableHeaderCell from './TableHeaderCell';

const Header = ({
  checked,
  columns,
  handleSort,
  isFullWhite,
  isHeaderCapitalize,
  isHeaderSticky,
  isSelectable,
  onSort,
  sort,
  toggleAll,
}) => (
  <thead
    className={classNames({
      uppercase: isHeaderCapitalize,
      'bg-white-50': isFullWhite,
      'bg-base-50': !isFullWhite,
      'sticky top-0 z-10 bg-base-50 bg-opacity-75': isHeaderSticky,
    })}
  >
    <tr>
      {isSelectable && (
        <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
          <input
            type="checkbox"
            className="text-indigo-600 focus:ring-indigo-500 absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-base-300 sm:left-6"
            onChange={toggleAll}
            checked={checked}
          />
        </th>
      )}
      {columns.map((col) => (
        <TableHeaderCell
          key={col.key}
          col={col}
          isHeaderSticky={isHeaderSticky}
          onSort={onSort}
          handleSort={handleSort}
          sortType={sort[col.key]?.type}
        />
      ))}
    </tr>
  </thead>
);

Header.propTypes = {
  checked: PropTypes.bool,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      key: PropTypes.string,
      cell: PropTypes.elementType,
      style: PropTypes.object,
      isSortable: PropTypes.bool,
    }),
  ),
  handleSort: PropTypes.func,
  isFullWhite: PropTypes.bool,
  isHeaderCapitalize: PropTypes.bool,
  isHeaderSticky: PropTypes.bool,
  isSelectable: PropTypes.bool,
  onSort: PropTypes.func,
  sort: PropTypes.object,
  toggleAll: PropTypes.func,
};

export default Header;
