import React from 'react';
import CategoryCard from 'common/CategoryCard';
import SummaryChart from 'common/SummaryChart';
import TableCard from 'common/TableCard';
import { formatComponentIdString } from 'utils/helper';

import useOverview from './useOverView';

export default function Overview() {
  const {
    actionType,
    buildMetaData,
    eventName,
    urlColumns,
    componentColumns,
    categoryColumns,
    onRowClick
  } = useOverview();

  const componentCountList = buildMetaData.chartData.issueCountByComponent.map(
    ({ componentId, count }) => ({
      label: formatComponentIdString(componentId),
      value: componentId,
      count
    })
  );

  const urlCountList = buildMetaData.chartData.issueCountByPage.map(
    ({ url, count }) => ({
      label: url,
      value: url,
      count
    })
  );

  return (
    <div className="grid grid-cols-1 gap-4 px-6 py-4 lg:grid-cols-2">
      <div>
        <SummaryChart
          actionType={actionType}
          eventName={eventName}
          issueSummary={buildMetaData.issueSummary}
          onRowClick={onRowClick}
          wrapperClassName="mt-4"
        />
        <SummaryChart
          actionType={actionType}
          eventName={eventName}
          issueSummary={buildMetaData.issueSummary}
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
          issueCountByCategory={buildMetaData.chartData.issueCountByCategory}
          wrapperClassName="mt-4"
        />
      </div>
    </div>
  );
}
