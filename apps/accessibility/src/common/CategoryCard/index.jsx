import React from 'react';
import {
  ChevronDownIcon,
  DataVisualization,
  Dropdown,
  DropdownOptionGroup,
  DropdownOptionItem,
  DropdownTrigger,
  MdArrowDownward,
  MdArrowUpward,
  MdSortByAlpha,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import useCategoryCard from './useCategoryCard';

export default function CategoryCard({
  eventName,
  list,
  columns,
  onRowClick,
  issueCount,
  wrapperClassName
}) {
  const { categoryList, maxCategoryIssue, map, onMenuChange } = useCategoryCard(
    {
      eventName,
      list
    }
  );

  const dropdownOptions = [
    {
      id: 'char-sort',
      body: (
        <div className="flex items-center">
          <MdSortByAlpha className="mr-2 text-xl" />{' '}
          <p className="text-sm">A to Z</p>
        </div>
      )
    },
    {
      id: 'desc',
      body: (
        <div className="flex items-center">
          <MdArrowDownward className="mr-2 text-xl" />{' '}
          <p className="text-sm">Descending</p>
        </div>
      )
    },
    {
      id: 'asc',
      body: (
        <div className="flex items-center">
          <MdArrowUpward className="mr-2 text-xl" />{' '}
          <p className="text-sm">Ascending</p>
        </div>
      )
    }
  ];
  return (
    <DataVisualization
      title="Issues by category"
      headerInfo={null}
      size="fit-content"
      wrapperClassName={twClassNames('bg-white', wrapperClassName)}
      analytics={
        <div>
          <p className="text-base-500 mr-1 text-sm">Total</p>
          <p className="text-base-900 mb-4 text-3xl font-semibold">
            {issueCount}
          </p>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((col, index) => (
                  <TableCell
                    key={col.key}
                    variant="header"
                    textTransform="uppercase"
                    wrapperClassName={`text-xs text-base-500 ${
                      index === 0 ? 'w-16' : ''
                    } ${index === 1 ? 'w-40' : ''}`}
                  >
                    {col.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryList.map(({ label, count }, index) => (
                <TableRow
                  wrapperClassName="cursor-pointer"
                  onRowClick={() =>
                    onRowClick('category', {
                      label: label.split('cat.')[1],
                      value: label.split('cat.')[1]
                    })
                  }
                >
                  {columns.map((column, colIndex) => {
                    const cellUI = () => {
                      if (colIndex === 0) return index + 1;
                      if (colIndex === 1) return map[label.split('cat.')[1]];
                      if (count === 0) {
                        return (
                          <div className="flex items-center">
                            <div
                              className="mr-2 h-3 rounded-r-full"
                              style={{
                                width: '1px',
                                backgroundColor: 'rgba(134, 92, 193, 0.3)',
                                borderRadius: 0
                              }}
                            />
                            <p>0</p>
                          </div>
                        );
                      }
                      return (
                        <div className="flex items-center">
                          <div
                            className="mr-2 h-3 rounded-r-full"
                            style={{
                              width: `${(count / maxCategoryIssue) * 100}%`,
                              backgroundColor: '#865CC1'
                            }}
                          />
                          <p>{count}</p>
                        </div>
                      );
                    };
                    return (
                      <TableCell
                        key={column.id}
                        wrapperClassName={`px-3 py-2 ${
                          colIndex === 0 ? 'w-16' : ''
                        } ${colIndex === 1 ? 'w-40' : ''}`}
                      >
                        {cellUI()}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      }
      otherOptions={
        <Dropdown onClick={onMenuChange}>
          <div className="flex">
            <DropdownTrigger>
              Sort
              <ChevronDownIcon
                className="-mr-1 ml-2 h-5 w-5"
                aria-hidden="true"
              />
            </DropdownTrigger>
          </div>
          <DropdownOptionGroup>
            {dropdownOptions.map((opt) => (
              <DropdownOptionItem key={opt.id} option={opt} />
            ))}
          </DropdownOptionGroup>
        </Dropdown>
      }
    />
  );
}

CategoryCard.propTypes = {
  eventName: PropTypes.string.isRequired,
  issueCount: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf({
    id: PropTypes.string,
    name: PropTypes.string,
    key: PropTypes.string
  }).isRequired,
  list: PropTypes.objectOf({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired
  }).isRequired,
  onRowClick: PropTypes.func,
  wrapperClassName: PropTypes.string
};

CategoryCard.defaultProps = {
  wrapperClassName: '',
  onRowClick: () => {}
};
