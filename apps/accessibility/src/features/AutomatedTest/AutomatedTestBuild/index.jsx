import React from 'react';
import SummaryChart from 'common/SummaryChart';

import useAutomatedTestBuild from './useAutomatedTestBuild';

export default function AutomatedTestBuild() {
  const { actionType, eventName, issueSummary, onRowClick } =
    useAutomatedTestBuild();
  return (
    <div>
      <div className="mx-4 w-6/12 bg-white">
        <SummaryChart
          actionType={actionType}
          eventName={eventName}
          issueSummary={issueSummary}
          onRowClick={onRowClick}
        />
      </div>
    </div>
  );
}
