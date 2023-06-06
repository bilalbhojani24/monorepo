import React from 'react';
import REPORT_LOADING_STATES from 'constants/reportLoadingStates';
import RealtimeMetricGraphs from 'features/RealtimeMetricGraphs';

import DeviceDescriptionList from './DeviceDescriptionList';
import TipMessages from './TipMessages';
import useReportLoadingContent from './useReportLoadingContent';

const ReportLoadingContent = () => {
  const { sessionState } = useReportLoadingContent();

  return (
    <div className="flex-1 px-4 py-2">
      {sessionState !== REPORT_LOADING_STATES.RECORDING && (
        <div className="mt-6">
          <DeviceDescriptionList />
        </div>
      )}

      {sessionState === REPORT_LOADING_STATES.RECORDING && (
        <div className="mt-6">
          <RealtimeMetricGraphs />
        </div>
      )}

      {(sessionState === REPORT_LOADING_STATES.STOPPING ||
        sessionState === REPORT_LOADING_STATES.COMPLETE) && <TipMessages />}
    </div>
  );
};

export default ReportLoadingContent;
