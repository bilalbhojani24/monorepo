import React from 'react';
import { useSelector } from 'react-redux';
// import Card from 'app/bsA11y/widgets/Card';
import Chart from 'common/Chart';
import { getSidebarCollapsedStatus } from 'features/Dashboard/slices/selectors';
import cloneDeep from 'lodash/cloneDeep';
import {
  ASDataVisualization,
  ASStats,
  ASTable,
  ASTableBody,
  ASTableCell,
  ASTableHead,
  ASTableRow
} from 'middleware/bifrost';
// eslint-disable-next-line import/no-unresolved
// import Dropdown from 'trike/Dropdown';
import { formatComponentIdString } from 'utils/helper';

// import {
//   ArrowDownwardIcon,
//   ArrowUpwardIcon,
//   ErrorIcon,
//   HideSource,
//   SortByAlphaIcon,
//   SortIcon
// } from 'trike/Icons';
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
      stat: '100'
    },
    {
      id: 2,
      name: 'Hidden issues',
      stat: '20'
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
    <div>
      <div className="mt-4 flex items-start">
        <div className="w-6/12 bg-white px-4">
          <ASDataVisualization
            title="Issue Summary"
            headerInfo={null}
            size="fit-content"
            analytics={
              <div className="flex">
                <div className="flex items-center justify-between">
                  <div className="w-72">
                    <Chart options={chartOption} />
                  </div>
                  <div>
                    {impactList.map((impact) => (
                      <div
                        className="mb-4 flex h-6 w-40 items-center justify-between"
                        onClick={() => onRowClick('impact', impact)}
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
              </div>
            }
          />
        </div>
        <div className="w-6/12 bg-white pr-4">
          <ASDataVisualization
            title="Affected Components"
            headerInfo={null}
            size="fit-content"
            analytics={
              <div>
                <p className="text-base-500 mr-1 text-sm">Total</p>
                <p className="text-base-900 mb-4 text-3xl font-semibold">
                  {componentList.length}
                </p>
                <ASTable>
                  <ASTableHead>
                    <ASTableRow>
                      {componentColumns.map((col, index) => (
                        <ASTableCell
                          key={col.key}
                          variant="header"
                          textTransform="uppercase"
                          wrapperClass={`text-xs text-base-500 ${
                            index === 0 ? 'w-14' : ''
                          } ${index === 2 ? 'w-32' : ''}`}
                        >
                          {col.name}
                        </ASTableCell>
                      ))}
                    </ASTableRow>
                  </ASTableHead>
                  <ASTableBody>
                    {componentList
                      .slice(0, 6)
                      .map(({ componentId, count }, index) => (
                        <ASTableRow
                          wrapperClass="cursor-pointer"
                          onRowClick={() =>
                            onRowClick('component', componentId)
                          }
                        >
                          {componentColumns.map((column, colIndex) => (
                            <ASTableCell
                              key={column.id}
                              wrapperClass={`px-3 py-2 ${
                                colIndex === 0 ? 'w-14' : ''
                              }`}
                            >
                              {colIndex === 0 ? index + 1 : ''}
                              {colIndex === 1
                                ? formatComponentIdString(componentId)
                                : ''}
                              {colIndex === 2 ? count : ''}
                            </ASTableCell>
                          ))}
                        </ASTableRow>
                      ))}
                  </ASTableBody>
                </ASTable>
              </div>
            }
          />
        </div>
      </div>
      <div className="mt-4 flex items-start">
        <div className="w-6/12 bg-white px-4">
          <ASDataVisualization
            title="Issues by category"
            headerInfo={null}
            size="fit-content"
            analytics={
              <div>
                <p className="text-base-500 mr-1 text-sm">Total</p>
                <p className="text-base-900 mb-4 text-3xl font-semibold">
                  {componentList.length}
                </p>
                <ASTable>
                  <ASTableHead>
                    <ASTableRow>
                      {categoryColumns.map((col, index) => (
                        <ASTableCell
                          key={col.key}
                          variant="header"
                          textTransform="uppercase"
                          wrapperClass={`text-xs text-base-500 ${
                            index === 0 ? 'w-16' : ''
                          } ${index === 1 ? 'w-40' : ''}`}
                        >
                          {col.name}
                        </ASTableCell>
                      ))}
                    </ASTableRow>
                  </ASTableHead>
                  <ASTableBody>
                    {categoryList.map(({ category, count }, index) => (
                      <ASTableRow wrapperClass="cursor-pointer">
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
                            <ASTableCell
                              key={column.id}
                              wrapperClass={`px-3 py-2 ${
                                colIndex === 0 ? 'w-16' : ''
                              } ${colIndex === 1 ? 'w-40' : ''}`}
                            >
                              {cellUI()}
                            </ASTableCell>
                          );
                        })}
                      </ASTableRow>
                    ))}
                  </ASTableBody>
                </ASTable>
              </div>
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
        <div className="w-6/12 bg-white pr-4">
          <ASDataVisualization
            title="Affected Pages"
            headerInfo={null}
            size="fit-content"
            analytics={
              <div>
                <p className="text-base-500 mr-1 text-sm">Total</p>
                <p className="text-base-900 mb-4 text-3xl font-semibold">
                  {urlList.length}
                </p>
                <ASTable>
                  <ASTableHead>
                    <ASTableRow>
                      {urlColumns.map((col, index) => (
                        <ASTableCell
                          key={col.key}
                          variant="header"
                          textTransform="uppercase"
                          wrapperClass={`text-xs text-base-500 ${
                            index === 0 ? 'w-14' : ''
                          } ${index === 2 ? 'w-32' : ''}`}
                        >
                          {col.name}
                        </ASTableCell>
                      ))}
                    </ASTableRow>
                  </ASTableHead>
                  <ASTableBody>
                    {urlList.slice(0, 6).map(({ url, count }, index) => (
                      <ASTableRow
                        wrapperClass="cursor-pointer"
                        onRowClick={() => onRowClick('component', url)}
                      >
                        {urlColumns.map((column, colIndex) => (
                          <ASTableCell
                            key={column.id}
                            wrapperClass={`px-3 py-2 text-ellipsis overflow-hidden ${
                              colIndex === 0 ? 'w-14' : ''
                            }`}
                          >
                            {colIndex === 0 ? index + 1 : ''}
                            {colIndex === 1 ? url : ''}
                            {colIndex === 2 ? count : ''}
                          </ASTableCell>
                        ))}
                      </ASTableRow>
                    ))}
                  </ASTableBody>
                </ASTable>
              </div>
            }
          />
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
          <div className="summary__row">
            <ASStats options={options} />
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
