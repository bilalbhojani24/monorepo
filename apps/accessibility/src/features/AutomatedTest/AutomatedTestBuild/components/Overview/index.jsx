import React from 'react';
import CategoryCard from 'common/CategoryCard';
import SummaryChart from 'common/SummaryChart';

import useOverview from './useOverView';

export default function Overview() {
  const { actionType, buildMetaData, eventName, issueSummary, onRowClick } =
    useOverview();
  console.log('buildMetaData1: ', buildMetaData);

  return (
    <div className="grid grid-cols-1 gap-4 px-6 py-4 lg:grid-cols-2">
      <div>
        <SummaryChart
          actionType={actionType}
          eventName={eventName}
          issueSummary={issueSummary}
          onRowClick={onRowClick}
        />
        <SummaryChart
          actionType={actionType}
          eventName={eventName}
          issueSummary={issueSummary}
          onRowClick={onRowClick}
        />
      </div>
      <div>
        <CategoryCard
          eventName="test-name"
          issueCountByCategory={buildMetaData.chartData.issueCountByCategory}
        />
      </div>
    </div>
  );
}
