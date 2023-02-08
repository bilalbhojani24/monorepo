import React from 'react';
import { twClassNames } from '@browserstack/utils';
// import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { ChevronDownIcon, ChevronUpIcon } from '../Icon';

import {
  CELL_ALIGNMENT,
  CELL_DIRECTION,
  CELL_TEXT_TRANSFORM,
  CELL_VARIANT
} from './const/tableCellConstants';

import './styles.scss';

const TableCell = ({
  align,
  children,
  colspan,
  isSticky,
  onSort,
  sortable,
  sortDirection,
  textTransform,
  variant,
  wrapperClass
}) => {
  const handleSort = () => {
    if (onSort) {
      const direction =
        sortDirection === CELL_DIRECTION[1]
          ? CELL_DIRECTION[0]
          : CELL_DIRECTION[1];
      onSort(direction);
    }
  };
  return (
    <td
      className={twClassNames(
        {
          'px-3 py-3.5 text-base-500 whitespace-nowrap py-4 text-sm':
            variant === CELL_VARIANT[0],
          'px-3 py-3.5 text-left text-sm font-semibold text-base-900':
            variant === CELL_VARIANT[1],
          [`text-${align}`]: align,
          [textTransform]: textTransform,
          'bg-base-50 border-base-300 sticky top-0 z-10 border-b': isSticky
        },
        wrapperClass,
        'first:pl-4 sm:first:pl-6 last:pr-4 sm:last:pr-6'
      )}
      colSpan={colspan}
    >
      <div
        className={twClassNames({
          'inline-flex': sortable
        })}
      >
        {children}

        {sortable ? (
          <button
            type="button"
            className="bg-base-200 text-base-900 hover:bg-base-300 ml-2 inline-flex flex-none self-center rounded"
            onClick={handleSort}
          >
            {sortDirection === CELL_DIRECTION[0] ? (
              <ChevronUpIcon
                className="h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
            ) : (
              <ChevronDownIcon
                className="h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
            )}
          </button>
        ) : null}
      </div>
    </td>
  );
};

TableCell.propTypes = {
  align: PropTypes.oneOf(CELL_ALIGNMENT),
  children: PropTypes.node,
  colspan: PropTypes.number,
  isSticky: PropTypes.bool,
  onSort: PropTypes.func,
  sortDirection: PropTypes.string,
  sortable: PropTypes.bool,
  textTransform: PropTypes.oneOf(CELL_TEXT_TRANSFORM),
  variant: PropTypes.oneOf(CELL_VARIANT),
  wrapperClass: PropTypes.node
};

TableCell.defaultProps = {
  align: CELL_ALIGNMENT[0],
  children: null,
  colspan: 0,
  isSticky: false,
  onSort: () => {},
  sortable: false,
  sortDirection: CELL_DIRECTION[0],
  textTransform: CELL_TEXT_TRANSFORM[0],
  variant: CELL_VARIANT[0],
  wrapperClass: ''
};

export default TableCell;
