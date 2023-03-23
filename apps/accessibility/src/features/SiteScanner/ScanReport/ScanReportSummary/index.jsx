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
  Stats,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import Chart from 'common/Chart';
import { severityOptions } from 'constants';
import cloneDeep from 'lodash/cloneDeep';
import { formatComponentIdString } from 'utils/helper';

import useScanReportSummary from './useScanReportSummary';

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
export default function ScanReportSummary() {
  const {
    reportOverviewMetaData,
    chartOption,
    categoryList,
    map,
    maxCategoryIssue,
    onMenuChange,
    onRowClick,
    onHiddenIssueClick,
    getHiddenIssuesCount
  } = useScanReportSummary();
  const { issueSummary, chartData } = reportOverviewMetaData;
  const { hiddenIssues, needsReviewIssues } = getHiddenIssuesCount();
  const { issueCountByComponent, issueCountByURL } = chartData;
  const componentList = cloneDeep(issueCountByComponent).sort(
    (a, b) => b.count - a.count
  );
  const urlList = cloneDeep(issueCountByURL).sort((a, b) => b.count - a.count);
  const impactList = ['critical', 'serious', 'moderate', 'minor'];

  const options = [
    {
      id: 1,
      name: 'Needs review issues',
      stat: needsReviewIssues,
      onClick: () => onRowClick('showNeedsReviewIssues', true, true)
    },
    {
      id: 2,
      name: 'Hidden issues',
      stat: hiddenIssues,
      onClick: onHiddenIssueClick
    }
  ];

  const impactColorMap = {
    critical: 'bg-[#F95D6A]',
    serious: 'bg-[#F472B6]',
    moderate: 'bg-[#E3C500]',
    minor: 'bg-[#C5D1D8]'
  };

  const componentColumns = [
    {
      id: 'index',
      name: '#',
      key: 'index'
    },
    {
      id: 'affectedComponents',
      name: 'Affected Components',
      key: 'affectedComponents'
    },
    {
      id: 'issueCount',
      name: 'Issue Count',
      key: 'issueCount'
    }
  ];

  const urlColumns = [
    {
      id: 'index',
      name: '#',
      key: 'index'
    },
    {
      id: 'affectedUrls',
      name: 'Affected URLs',
      key: 'affectedUrls'
    },
    {
      id: 'issueCount',
      name: 'Issue Count',
      key: 'issueCount'
    }
  ];

  const categoryColumns = [
    {
      id: 'index',
      name: '#',
      key: 'index'
    },
    {
      id: 'category',
      name: 'Category',
      key: 'category'
    },
    {
      id: 'issueCount',
      name: 'Issue Count',
      key: 'issueCount'
    }
  ];
  return (
    <div className="bg-base-50 relative mt-4">
      <div className="flex items-start">
        <div className="mx-4 w-6/12 bg-white">
          <DataVisualization
            title="Issue summary"
            headerInfo={null}
            size="fit-content"
            analytics={
              <div className="flex items-center justify-between">
                <div className="w-80">
                  <Chart options={chartOption} />
                </div>
                <div>
                  {impactList.map((impact) => (
                    <div
                      className="mb-4 flex h-6 w-40 items-center justify-between"
                      onClick={() =>
                        onRowClick(
                          'impact',
                          severityOptions.find(({ value }) => value === impact)
                        )
                      }
                      role="presentation"
                    >
                      <div className="text-base-800 flex items-center text-sm">
                        <div
                          className={`mr-1.5 h-2 w-2 rounded-full ${impactColorMap[impact]}`}
                        />
                        {impact.charAt(0).toUpperCase()}
                        {impact.slice(1, impact.length)}
                      </div>
                      <p className="text-base-800 flex">
                        {issueSummary[impact]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            }
          />
        </div>
        <div className="mr-4 w-6/12 bg-white">
          <DataVisualization
            title="Affected components"
            headerInfo={null}
            size="fit-content"
            analytics={
              <div>
                <p className="text-base-500 mr-1 mb-1 text-sm">Total</p>
                <p className="text-base-900 mb-4 text-3xl font-semibold">
                  {componentList.length}
                </p>
                <Table containerWrapperClass="overflow-auto overflow-x-visible max-h-[266px]">
                  <TableHead>
                    <TableRow>
                      {componentColumns.map((col, index) => (
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
                    {componentList.map(({ componentId, count }, index) => (
                      <TableRow
                        wrapperClassName="cursor-pointer"
                        onRowClick={() =>
                          onRowClick('component', {
                            label: formatComponentIdString(componentId),
                            value: componentId
                          })
                        }
                      >
                        {componentColumns.map((column, colIndex) => (
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
        </div>
      </div>
      <div className="mt-4 flex items-start pb-5">
        <div className="mx-4 w-6/12 bg-white">
          <DataVisualization
            title="Issues by category"
            headerInfo={null}
            size="fit-content"
            analytics={
              <div>
                <p className="text-base-500 mr-1 text-sm">Total</p>
                <p className="text-base-900 mb-4 text-3xl font-semibold">
                  {categoryList.length}
                </p>
                <Table>
                  <TableHead>
                    <TableRow>
                      {categoryColumns.map((col, index) => (
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
                    {categoryList.map(({ category, count }, index) => (
                      <TableRow
                        wrapperClassName="cursor-pointer"
                        onRowClick={() =>
                          onRowClick('category', {
                            label: category.split('cat.')[1],
                            value: category.split('cat.')[1]
                          })
                        }
                      >
                        {categoryColumns.map((column, colIndex) => {
                          const cellUI = () => {
                            if (colIndex === 0) return index + 1;
                            if (colIndex === 1)
                              return map[category.split('cat.')[1]];
                            if (count === 0) {
                              return (
                                <div className="flex items-center">
                                  <div
                                    className="mr-2 h-3 rounded-r-full"
                                    style={{
                                      width: '1px',
                                      backgroundColor:
                                        'rgba(134, 92, 193, 0.3)',
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
                                    width: `${
                                      (count / maxCategoryIssue) * 100
                                    }%`,
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
        </div>
        <div className="mr-4 w-6/12 ">
          <div className="bg-white">
            <DataVisualization
              title="Affected pages"
              headerInfo={null}
              size="fit-content"
              analytics={
                <div>
                  <p className="text-base-500 mr-1 text-sm">Total</p>
                  <p className="text-base-900 mb-4 text-3xl font-semibold">
                    {urlList.length}
                  </p>
                  <Table containerWrapperClass="overflow-auto overflow-x-visible max-h-[266px]">
                    <TableHead>
                      <TableRow>
                        {urlColumns.map((col, index) => (
                          <TableCell
                            key={col.key}
                            variant="header"
                            isSticky
                            textTransform="uppercase"
                          >
                            <div
                              className={`text-base-500 text-xs ${
                                index === 1 ? 'w-64' : ''
                              } ${index === 2 ? 'w-36' : ''}`}
                            >
                              {col.name}
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {urlList.map(({ url, count }, index) => (
                        <TableRow
                          wrapperClassName="cursor-pointer"
                          onRowClick={() =>
                            onRowClick('page', {
                              label: url,
                              value: url
                            })
                          }
                        >
                          {urlColumns.map((column, colIndex) => (
                            <TableCell
                              key={column.id}
                              wrapperClassName={`px-3 py-2 text-ellipsis overflow-hidden ${
                                colIndex === 0 ? 'w-14' : ''
                              } ${colIndex === 2 ? 'w-32' : ''}`}
                            >
                              {colIndex === 0 ? index + 1 : ''}
                              {colIndex === 1 && (
                                <div className="w-80 overflow-hidden truncate">
                                  {url || ''}
                                </div>
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
          </div>
          <div className="mt-4 flex">
            {options.map((option) => (
              <div className="mr-4 w-2/4">
                <Stats option={option} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
