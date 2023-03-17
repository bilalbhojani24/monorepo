import React from 'react';
import { MediaPlayer } from '@browserstack/bifrost';

import useReportSidebar from './useReportSidebar';

const ReportSidebar = () => {
  const { sessionData, updateChartSeekerPosition, deviceVideoRef } =
    useReportSidebar();

  return (
    <div className="bg-base-100 h-full w-full p-2">
      <MediaPlayer
        ref={deviceVideoRef}
        wrapperClassName="rounded-lg overflow-hidden sticky top-2 z-20"
        url={`securefileprotocol://${sessionData?.metadata?.video}`}
        controlPanelStickToBottom
        controlPanelClassName="fixed z-20 -ml-2 bottom-8"
        showRewindForwardControls={false}
        timeUpdateCallBack={updateChartSeekerPosition}
      />
    </div>
  );
};

export default ReportSidebar;
