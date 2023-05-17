import React from 'react';
import { Stats } from '@browserstack/bifrost';
import CategoryCard from 'common/CategoryCard';
import SummaryChart from 'common/SummaryChart';
import TableCard from 'common/TableCard';
import { formatComponentIdString } from 'utils/helper';

import useOverview from './useOverView';

export default function Overview() {
  const {
    actionType,
    testMetaData,
    eventName,
    urlColumns,
    hiddenIssues,
    needsReviewIssues,
    issueSummaryData,
    componentColumns,
    categoryColumns,
    onHiddenIssueClick,
    onRowClick
  } = useOverview();

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

  const componentCountList = testMetaData.chartData.issueCountByComponent.map(
    ({ componentId, count }) => ({
      label: formatComponentIdString(componentId),
      value: componentId,
      count
    })
  );

  const urlCountList = testMetaData.chartData.issueCountByURL.map(
    ({ url, count }) => ({
      label: url,
      value: url,
      count
    })
  );

  const categoryList = testMetaData.chartData.issueCountByCategory.map(
    ({ category, count }) => ({
      label: category,
      value: category,
      count
    })
  );

  return (
    <div className="grid grid-cols-1 gap-4 px-6 pb-6 lg:grid-cols-2">
      <div>
        <SummaryChart
          title="Build issue summary"
          chartTitle="Issues"
          actionType={actionType}
          eventName={eventName}
          totalCount={testMetaData.issueSummary.issueCount}
          summary={issueSummaryData}
          onRowClick={onRowClick}
          wrapperClassName="mt-4"
        />
        <CategoryCard
          eventName="test-name"
          columns={categoryColumns}
          list={categoryList}
          wrapperClassName="mt-4"
        />
      </div>
      <div>
        <TableCard
          title="Affected Components"
          list={componentCountList}
          columns={componentColumns}
          onRowClick={onRowClick}
          wrapperClassName="mt-4"
        />
        <TableCard
          title="Affected Pages"
          list={urlCountList}
          columns={urlColumns}
          onRowClick={onRowClick}
          wrapperClassName="mt-4"
        />
        <div className="mt-4 flex">
          {options.map((option) => (
            <div className="mr-4 w-2/4">
              <Stats option={option} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
