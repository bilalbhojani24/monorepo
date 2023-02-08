/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const TMDataTable = ({
  columns,
  rows,
  containerWrapperClass,
  isCondensed,
  isLoading
}) => (
  <Table containerWrapperClass={containerWrapperClass}>
    <TableHead wrapperClass="w-full rounded-xs">
      <TableRow>
        {columns?.map((col) => (
          <TableCell
            key={col.key}
            variant="body"
            wrapperClass="test-base-500"
            textTransform="uppercase"
          >
            {col.name}
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
            <TableRow key={idx}>
              {columns?.map((column) => {
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

TMDataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  containerWrapperClass: PropTypes.string,
  isCondensed: PropTypes.bool,
  isLoading: PropTypes.bool
};

TMDataTable.defaultProps = {
  containerWrapperClass: '',
  isCondensed: false,
  isLoading: false
};

export default TMDataTable;
