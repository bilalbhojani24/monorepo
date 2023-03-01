import React from 'react';
import { MediaPlayer } from '@browserstack/bifrost';

import useReportSidebar from './useReportSidebar';

const ReportSidebar = () => {
  const { sessionData, latestSeekTimeInSeconds, updateChartSeekerPosition } =
    useReportSidebar();

  return (
    <div className="bg-base-100 h-full w-full p-2">
      <MediaPlayer
        wrapperClassName="rounded-lg overflow-hidden sticky top-2 z-20"
        url={`securefileprotocol://${sessionData?.metadata?.video}`}
        controlPanelStickToBottom
        controlPanelClassName="fixed z-20 -ml-2"
        showRewindForwardControls={false}
        seekToTimeStamp={latestSeekTimeInSeconds}
        timeUpdateCallBack={updateChartSeekerPosition}
      />
    </div>
  );
};

export default ReportSidebar;
