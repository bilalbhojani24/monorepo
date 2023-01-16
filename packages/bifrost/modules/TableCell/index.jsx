import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { ChevronDownIcon, ChevronUpIcon } from '../Icon';

import {
  CELL_ALIGNMENT,
  CELL_DIRECTION,
  CELL_TEXT_TRANSFORM,
  CELL_VARIANT,
} from './const/tableCellConstants';

import './styles.scss';

const TableCell = ({
  align,
  children,
  className,
  colspan,
  onSort,
  sortable,
  sortDirection,
  textTransform,
  variant,
}) => {
  const [sortDir, setSortDir] = useState(sortDirection);
  return (
    <td
      className={`${classNames({
        'text-base-500 whitespace-nowrap px-3 py-4 text-sm':
          variant === CELL_VARIANT[0],
        'px-3 py-3.5 text-left text-sm font-semibold text-base-900':
          variant === CELL_VARIANT[1],
        [`text-${align}`]: align,
        [textTransform]: textTransform,
      })} ${className}`}
      colSpan={colspan}
    >
      <div className="inline-flex">
        {children}
        {sortable ? (
          <button
            type="button"
            className="bg-base-200 text-base-900 hover:bg-base-300 ml-2 inline-flex flex-none self-center rounded"
            onClick={() => {
              if (onSort) {
                const direction =
                  sortDir === CELL_DIRECTION[1]
                    ? CELL_DIRECTION[0]
                    : CELL_DIRECTION[1];
                onSort(direction);
                setSortDir(direction);
              }
            }}
          >
            {sortDir === CELL_DIRECTION[0] ? (
              <ChevronUpIcon
                className={classNames('h-5 w-5 cursor-pointer')}
                aria-hidden="true"
              />
            ) : (
              <ChevronDownIcon
                className={classNames('h-5 w-5 cursor-pointer')}
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
  className: PropTypes.node,
  colspan: PropTypes.number,
  onSort: PropTypes.func,
  sortDirection: PropTypes.string,
  sortable: PropTypes.bool,
  textTransform: PropTypes.oneOf(CELL_TEXT_TRANSFORM),
  variant: PropTypes.oneOf(CELL_VARIANT),
};

TableCell.defaultProps = {
  align: CELL_ALIGNMENT[0],
  children: null,
  className: '',
  colspan: 0,
  onSort: () => {},
  sortable: false,
  sortDirection: CELL_DIRECTION[0],
  textTransform: CELL_TEXT_TRANSFORM[0],
  variant: CELL_VARIANT[0],
};

export default TableCell;
