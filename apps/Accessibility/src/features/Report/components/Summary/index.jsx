import React from 'react';
import { useSelector } from 'react-redux';
// import Card from 'app/bsA11y/widgets/Card';
// import Chart from 'app/bsA11y/widgets/Chart';
import { getSidebarCollapsedStatus } from 'features/Dashboard/slices/selectors';
import cloneDeep from 'lodash/cloneDeep';
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

  return (
    <div className="summary">
      <div className="summary__row">
        <Card height={3} width={isSidebarCollapsed ? 3 : 2} className="m-20">
          <div className="summary-chart-card__header">
            <p className="summary-chart-card__title">Issue Summary</p>
          </div>
          <div className="summary-chart-card__chart">
            <div className="summary-chart-card__chart-view">
              <Chart options={chartOption} />
            </div>
            <div className="summary-chart-card__chart-labels">
              {impactList.map((impact) => (
                <div
                  className={classNames(
                    'summary-chart-card__label',
                    `summary-chart-card__label-${impact}`
                  )}
                  onClick={() => onRowClick('impact', impact)}
                  role="presentation"
                >
                  <div className="summary-chart-card__label-title">
                    <div className="circle" /> {impact.charAt(0).toUpperCase()}
                    {impact.slice(1, impact.length)}
                  </div>
                  <p className="summary-chart-card__label-count">
                    {issueSummary[impact]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card height={3} width={isSidebarCollapsed ? 3 : 2}>
          <p className="summary-card__title">Affected Components</p>
          <p className="summary-card__count">{componentList.length}</p>
          <div className="summary-card__table">
            <div className="summary-card__table-header">
              <p className="summary-card__table-header-number">#</p>
              <p className="summary-card__table-header-name">
                Affected component
              </p>
              <p className="summary-card__table-header-count">Issues Count</p>
            </div>
            <div className="summary-card__table-rows">
              {componentList.map(({ componentId, count }, index) => {
                const name = formatComponentIdString(componentId);
                return (
                  <div
                    className="summary-card__table-row"
                    onClick={() => onRowClick('component', componentId)}
                    role="presentation"
                  >
                    <p className="summary-card__table-row-number">
                      {index + 1}
                    </p>
                    <p className="summary-card__table-row-name" title={name}>
                      {name}
                    </p>
                    <p className="summary-card__table-row-count">{count}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </div>
      <div className="summary__row">
        <Card height={5} width={3} className="m-20">
          <div className="summary-chart-card__header">
            <p className="summary-chart-card__title">Issues by category</p>
            <div className="summary-chart-card__header-sort">
              <Dropdown
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
              />
            </div>
          </div>
          <div className="summary-card__category-card">
            <div className="summary-card__category-table-header">
              <p className="summary-card__category-table-header-number">#</p>
              <p className="summary-card__category-table-header-name">
                Category
              </p>
              <p className="summary-card__category-table-header-count">
                Issues
              </p>
            </div>
            <div className="summary-card__table-wrapper">
              <div className="summary-card__category-table">
                {categoryList.map(({ category, count }, index) => (
                  <div
                    className={classNames('summary-card__category-table-row', {
                      'summary-card__category-table-row--zero': count === 0
                    })}
                    onClick={() =>
                      onRowClick('category', category.split('cat.')[1])
                    }
                    role="presentation"
                  >
                    <div className="summary-card__category-table-row-index">
                      {index + 1}
                    </div>
                    <div className="summary-card__category-table-row-name">
                      {map[category.split('cat.')[1]]}
                    </div>
                    {count === 0 ? (
                      <div
                        className="summary-card__category-table-row-chart"
                        style={{
                          width: '5px',
                          backgroundColor: 'rgba(134, 92, 193, 0.3)',
                          borderRadius: 0
                        }}
                      />
                    ) : (
                      <div
                        className="summary-card__category-table-row-chart"
                        style={{
                          width: `${(count / maxCategoryIssue) * 100}%`,
                          backgroundColor: '#865CC1'
                        }}
                      />
                    )}
                    <div className="summary-card__category-table-row-count">
                      {count}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
        <div className="summary-card__column">
          <Card height={3} width={3}>
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
          </Card>
          <div className="summary__row">
            <Card height={1} width={1} className="m-20">
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
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
