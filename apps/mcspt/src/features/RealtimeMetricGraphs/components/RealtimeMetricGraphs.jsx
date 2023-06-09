import React from 'react';

import useRealtimeMetricGraphs from '../hooks/useRealtimeMetricGraphs';

import BatteryRealtimeGraph from './BatteryRealtimeGraph';
import CPURealtimeGraph from './CPURealtimeGraph';
import DiskReadRealtimeGraph from './DiskReadRealtimeGraph';
import DiskWriteRealtimeGraph from './DiskWriteRealtimeGraph';
import FPSRealtimeGraph from './FPSRealtimeGraph';
import MemoryRealtimeGraph from './MemoryRealtimeGraph';
import NetworkDownloadRealtimeGraph from './NetworkDownloadRealtimeGraph';
import NetworkUploadRealtimeGraph from './NetworkUploadRealtimeGraph';
import SlowFramesRealtimeGraph from './SlowFramesRealtimeGraph';

const RealtimeMetricGraphs = () => {
  const { isSocketConnectionLoading, isSocketConnectionFailed } =
    useRealtimeMetricGraphs();

  return (
    <div id="realtimeMetricsContainer">
      {isSocketConnectionLoading && (
        <div className="">realtime Metrics Loading</div>
      )}

      {isSocketConnectionFailed && (
        <div className="">realtime Metrics Failed</div>
      )}

      {!isSocketConnectionLoading && !isSocketConnectionFailed && (
        <>
          <CPURealtimeGraph />
          <MemoryRealtimeGraph />
          <FPSRealtimeGraph />
          <SlowFramesRealtimeGraph />
          <BatteryRealtimeGraph />
          <DiskReadRealtimeGraph />
          <DiskWriteRealtimeGraph />
          <NetworkUploadRealtimeGraph />
          <NetworkDownloadRealtimeGraph />
        </>
      )}
    </div>
  );
};

export default RealtimeMetricGraphs;
