import React from 'react';

import CPURealtimeGraph from './CPURealtimeGraph';
import DiskReadRealtimeGraph from './DiskReadRealtimeGraph';
import DiskWriteRealtimeGraph from './DiskWriteRealtimeGraph';
import FPSRealtimeGraph from './FPSRealtimeGraph';
import MemoryRealtimeGraph from './MemoryRealtimeGraph';
import NetworkDownloadRealtimeGraph from './NetworkDownloadRealtimeGraph';
import NetworkUploadRealtimeGraph from './NetworkUploadRealtimeGraph';
import SlowFramesRealtimeGraph from './SlowFramesRealtimeGraph';

const RealtimeMetricGraphs = () => (
  <div>
    <CPURealtimeGraph />

    <MemoryRealtimeGraph />

    <FPSRealtimeGraph />

    <SlowFramesRealtimeGraph />

    <DiskReadRealtimeGraph />

    <DiskWriteRealtimeGraph />

    <NetworkUploadRealtimeGraph />

    <NetworkDownloadRealtimeGraph />
  </div>
);

export default RealtimeMetricGraphs;
