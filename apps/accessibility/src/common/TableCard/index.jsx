import React from 'react';
import {
  DataVisualization,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';
import { formatComponentIdString } from 'utils/helper';

export default function TableCard({ title, list, columns, onRowClick }) {
  return (
    <DataVisualization
      title={title}
      headerInfo={null}
      wrapperClassName="h-[440px]"
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
                    wrapperClassName={`text-xs text-base-500 ${
                      index === 0 ? 'w-14' : ''
                    } ${index === 1 ? 'w-80' : ''} ${
                      index === 2 ? 'w-32' : ''
                    }`}
                  >
                    {col.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map(({ componentId, count }, index) => (
                <TableRow
                  wrapperClassName="cursor-pointer"
                  onRowClick={() =>
                    onRowClick('component', {
                      label: formatComponentIdString(componentId),
                      value: componentId
                    })
                  }
                >
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={column.id}
                      wrapperClassName={`px-3 py-2 ${
                        colIndex === 0 ? 'w-14' : ''
                      }`}
                    >
                      {colIndex === 0 ? index + 1 : ''}
                      {colIndex === 1 ? (
                        <div className="w-80 overflow-hidden truncate">
                          {formatComponentIdString(componentId)}
                        </div>
                      ) : (
                        ''
                      )}
                      {colIndex === 2 ? count : ''}
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
  onRowClick: PropTypes.func
};

TableCard.defaultProps = {
  onRowClick: () => {}
};
