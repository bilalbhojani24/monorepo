import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

export default function ComponentList({
  nodes,
  violationId,
  activeComponentId,
  isHalfView,
  onRowClick
}) {
  const componentMap = {};
  nodes.forEach((node) => {
    if (!componentMap[node.componentId]) {
      componentMap[node.componentId] = [];
    }
    componentMap[node.componentId].push(node);
  });

  let tableData = Object.keys(componentMap).map((key) => {
    const uniqUrls = [];
    componentMap[key].forEach(({ page: { url } }) => {
      if (!uniqUrls.includes(url)) {
        uniqUrls.push(url);
      }
    });
    return {
      id: key,
      isActive: key === activeComponentId,
      componentId: key,
      pagesAffected: `${uniqUrls.length} page${uniqUrls.length > 1 ? 's' : ''}`,
      issueCount: `${componentMap[key].length} issue${
        componentMap[key].length > 1 ? 's' : ''
      }`,
      count: componentMap[key].length
    };
  });

  tableData = tableData.sort((a, b) => b.count - a.count);

  const columns = [
    {
      id: 'componentId',
      name: 'Component',
      key: 'componentId'
    },
    {
      id: 'pagesAffected',
      name: 'Affected pages',
      key: 'pagesAffected'
    },
    {
      id: 'issueCount',
      name: 'Issue count',
      key: 'issueCount'
    }
  ];

  return (
    <div className="bg-white px-6 pb-4 pt-2">
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <TableCell
                key={col.key}
                variant="header"
                textTransform="uppercase"
              >
                <div
                  className={`text-base-500 text-xs ${
                    index === 1 ? 'w-28' : ''
                  } ${index === 2 ? 'w-24' : ''}`}
                >
                  {col.name} {index === 0 ? `(${tableData.length})` : ''}
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map(({ id, isActive, ...rest }) => (
            <TableRow
              wrapperClassName={twClassNames('cursor-pointer', {
                'bg-brand-50': !!activeComponentId
              })}
              onRowClick={() => onRowClick(id, violationId)}
            >
              {columns.map((column, index) => (
                <TableCell
                  key={column.id}
                  wrapperClassName={`px-6 py-2 ${index === 1 ? 'w-28' : ''} ${
                    index === 2 ? 'w-24' : ''
                  }`}
                >
                  {index === 0 ? (
                    <p
                      className={twClassNames('overflow-hidden truncate', {
                        'w-56': isHalfView
                      })}
                    >
                      <span className="text-brand-600">
                        {rest[column.key].split('#')[0].toLowerCase()}
                      </span>
                      <span>
                        {rest[column.key].split('#')[1]
                          ? `.${rest[column.key].split('#')[1]}`
                          : ''}
                      </span>
                    </p>
                  ) : (
                    <div>{rest[column.key]}</div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

ComponentList.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  violationId: PropTypes.string.isRequired,
  activeComponentId: PropTypes.string,
  isHalfView: PropTypes.bool,
  onRowClick: PropTypes.func.isRequired
};

ComponentList.defaultProps = {
  activeComponentId: '',
  isHalfView: false
};
