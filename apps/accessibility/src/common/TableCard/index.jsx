import React from 'react';
import {
  DataVisualization,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

export default function TableCard({
  title,
  list,
  columns,
  filterKey,
  onRowClick,
  wrapperClassName
}) {
  return (
    <DataVisualization
      title={title}
      headerInfo={null}
      wrapperClassName={twClassNames('h-[440px] bg-white', wrapperClassName)}
      size="fit-content"
      analytics={
        <div>
          <p className="text-base-500 mb-1 mr-1 text-sm">Total</p>
          <p className="text-base-900 mb-4 text-3xl font-semibold">
            {list.length}
          </p>
          <Table containerWrapperClass="overflow-auto overflow-x-visible max-h-[266px] relative z-0">
            <TableHead>
              <TableRow>
                {columns.map((col, index) => (
                  <TableCell
                    key={col.key}
                    variant="header"
                    isSticky
                    textTransform="uppercase"
                    wrapperClassName="text-xs text-base-500 py-3 px-6 font-medium tracking-wider"
                  >
                    {index === 0 ? (
                      <div className="w-2.5 text-center">{col.name}</div>
                    ) : (
                      ''
                    )}
                    {index === 1 ? <div>{col.name}</div> : ''}
                    {index === 2 ? (
                      <div className="w-24 text-center">{col.name}</div>
                    ) : (
                      ''
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map(({ label, value, count }, index) => (
                <TableRow
                  wrapperClassName="cursor-pointer"
                  onRowClick={() =>
                    onRowClick(filterKey, {
                      label,
                      value
                    })
                  }
                >
                  {columns.map((column, colIndex) => (
                    <TableCell key={column.id} wrapperClassName="py-2 px-6">
                      {colIndex === 0 ? (
                        <div className="w-2.5 text-center">{index + 1}</div>
                      ) : (
                        ''
                      )}
                      {colIndex === 1 ? (
                        <div className="w-64 overflow-hidden truncate">
                          {label}
                        </div>
                      ) : (
                        ''
                      )}
                      {colIndex === 2 ? (
                        <div className="w-24">{count}</div>
                      ) : (
                        ''
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      }
    />
  );
}

TableCard.propTypes = {
  title: PropTypes.string.isRequired,
  filterKey: PropTypes.string,
  list: PropTypes.arrayOf({
    label: PropTypes.string,
    value: PropTypes.string,
    count: PropTypes.number
  }).isRequired,
  columns: PropTypes.arrayOf({
    id: PropTypes.string,
    name: PropTypes.string,
    key: PropTypes.string
  }).isRequired,
  onRowClick: PropTypes.func,
  wrapperClassName: PropTypes.string
};

TableCard.defaultProps = {
  onRowClick: () => {},
  wrapperClassName: '',
  filterKey: ''
};
