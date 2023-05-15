import React from 'react';
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
    componentColumns,
    categoryColumns,
    onRowClick
  } = useOverview();

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
          actionType={actionType}
          eventName={eventName}
          issueSummary={testMetaData.issueSummary}
          onRowClick={onRowClick}
          wrapperClassName="mt-4"
        />
        <SummaryChart
          actionType={actionType}
          eventName={eventName}
          issueSummary={testMetaData.issueSummary}
          onRowClick={onRowClick}
          wrapperClassName="mt-4"
        />
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
      </div>
      <div>
        <CategoryCard
          eventName="test-name"
          columns={categoryColumns}
          list={categoryList}
          wrapperClassName="mt-4"
        />
      </div>
    </div>
  );
}
