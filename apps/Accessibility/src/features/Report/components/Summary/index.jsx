import React from 'react';
import { useSelector } from 'react-redux';
import {
  ChevronDownIcon,
  DataVisualization,
  Dropdown,
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
import { getSidebarCollapsedStatus } from 'features/Dashboard/slices/selectors';
import cloneDeep from 'lodash/cloneDeep';
import { formatComponentIdString } from 'utils/helper';

import useSummary from './useSummary';

export default function Summary() {
  const {
    reportMetaData,
    chartOption,
    categoryList,
    map,
    maxCategoryIssue,
    onMenuChange,
    onRowClick,
    onHiddenIssueClick,
    getHiddenIssuesCount
  } = useSummary();
  const { issueSummary, chartData } = reportMetaData;
  const { hiddenIssues, needsReviewIssues } = getHiddenIssuesCount();
  const { issueCountByComponent, issueCountByURL } = chartData;
  const componentList = cloneDeep(issueCountByComponent).sort(
    (a, b) => b.count - a.count
  );
  const urlList = cloneDeep(issueCountByURL).sort((a, b) => b.count - a.count);
  const impactList = ['critical', 'serious', 'moderate', 'minor'];
  const isSidebarCollapsed = useSelector(getSidebarCollapsedStatus);

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
    critical: 'bg-danger-500',
    serious: 'bg-danger-500',
    moderate: 'bg-attention-500',
    minor: 'bg-base-500'
  };

  const componentColumns = [
    {
      id: 'index',
      name: '#',
      key: 'index'
    },
    {
      id: 'affectedComponents',
      name: 'Top Affected Components',
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
      name: 'Top Affected URLs',
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
    <div className="bg-base-50 relative" style={{ top: '182px' }}>
      <div className="flex items-start">
        <div className="mx-4 w-6/12 bg-white">
          <DataVisualization
            title="Issue Summary"
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
            title="Affected Components"
            headerInfo={null}
            size="fit-content"
            analytics={
              <div>
                <p className="text-base-500 mr-1 mb-1 text-sm">Total</p>
                <p className="text-base-900 mb-4 text-3xl font-semibold">
                  {componentList.length}
                </p>
                <Table>
                  <TableHead>
                    <TableRow>
                      {componentColumns.map((col, index) => (
                        <TableCell
                          key={col.key}
                          variant="header"
                          textTransform="uppercase"
                          wrapperClassName={`text-xs text-base-500 ${
                            index === 0 ? 'w-14' : ''
                          } ${index === 2 ? 'w-32' : ''}`}
                        >
                          {col.name}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {componentList
                      .slice(0, 6)
                      .map(({ componentId, count }, index) => (
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
                              {colIndex === 1
                                ? formatComponentIdString(componentId)
                                : ''}
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
                  {componentList.length}
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
              <Dropdown
                trigger={
                  <div className="border-base-300 text-base-700 hover:bg-base-50 focus:ring-brand-500 focus:ring-offset-base-100 inline-flex w-full justify-center rounded-md border bg-white px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                }
                onClick={onMenuChange}
                options={[
                  {
                    id: 'char-sort',
                    value: 'char-sort',
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
                ]}
              />
            }
          />
        </div>
        {/* <Dropdown
          icon={<SortIcon />}
          triggerAriaLabel="Sort Issue category by options"
          menuOptions={[
            {
              label: 'A to Z',
              value: 'char-sort',
              icon: <SortByAlphaIcon />
            },
            {
              label: 'Descending',
              value: 'desc',
              icon: <ArrowDownwardIcon />
            },
            {
              label: 'Ascending',
              value: 'asc',
              icon: <ArrowUpwardIcon />
            }
          ]}
          style={{
            maxMenuHeight: 200,
            menuAlignment: 'auto',
            menuPlacement: 'auto',
            minMenuHeight: 50,
            minWidth: 100
          }}
          title="Action"
          variant="icon-button"
          type="outline-button"
          chevronRequired={false}
          onChange={onMenuChange}
        /> */}
        <div className="mr-4 w-6/12 ">
          <div className="bg-white">
            <DataVisualization
              title="Affected Pages"
              headerInfo={null}
              size="fit-content"
              analytics={
                <div>
                  <p className="text-base-500 mr-1 text-sm">Total</p>
                  <p className="text-base-900 mb-4 text-3xl font-semibold">
                    {urlList.length}
                  </p>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {urlColumns.map((col, index) => (
                          <TableCell
                            key={col.key}
                            variant="header"
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
                      {urlList.slice(0, 6).map(({ url, count }, index) => (
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
                              } ${colIndex === 2 ? 'w-36' : ''}`}
                            >
                              {colIndex === 0 ? index + 1 : ''}
                              {colIndex === 1 && (
                                <div className="w-64 overflow-hidden truncate">
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
          {/* <Card height={3} width={3}>
            <p className="summary-card__title">Affected Pages</p>
            <p className="summary-card__count">{urlList.length}</p>
            <div className="summary-card__table">
              <div className="summary-card__table-header">
                <p className="summary-card__table-header-number">#</p>
                <p className="summary-card__table-header-name">Affected URL</p>
                <p className="summary-card__table-header-count">Issues Count</p>
              </div>
              <div className="summary-card__table-rows">
                {urlList.map(({ url, count }, index) => (
                  <div
                    className="summary-card__table-row"
                    role="presentation"
                    onClick={() => onRowClick('page', url)}
                  >
                    <p className="summary-card__table-row-number">
                      {index + 1}
                    </p>
                    <p className="summary-card__table-row-name" title={url}>
                      {url}
                    </p>
                    <p className="summary-card__table-row-count">{count}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card> */}
          <div className="mt-4 flex">
            {options.map(({ name, id, stat }) => (
              <div className="mr-4 w-2/4">
                <Stats option={{ name, id, stat }} />
              </div>
            ))}
            {/* <Card height={1} width={1} className="m-20">
              <div
                tabIndex={0}
                role="button"
                onClick={() => onRowClick('showNeedsReviewIssues', true, true)}
                aria-label={`${needsReviewIssues} Needs Review Issues`}
              >
                <div className="summary-card__header-row">
                  <p className="summary-card__title">Needs Review</p>
                  <ErrorIcon />
                </div>
                <span className="summary-card__hidden-review-count">
                  {' '}
                  {needsReviewIssues}{' '}
                </span>
              </div>
            </Card>
            <Card height={1} width={1} className="mt-20">
              <div
                tabIndex={0}
                role="button"
                onClick={onHiddenIssueClick}
                aria-label={`${hiddenIssues} Hidden Issues`}
              >
                <div className="summary-card__header-row">
                  <p className="summary-card__title-fade">Hidden Issues</p>
                  <HideSource />
                </div>
                <span className="summary-card__needs-review-count">
                  {' '}
                  {hiddenIssues}{' '}
                </span>
              </div>
            </Card> */}
          </div>
        </div>
      </div>
    </div>
  );
}
