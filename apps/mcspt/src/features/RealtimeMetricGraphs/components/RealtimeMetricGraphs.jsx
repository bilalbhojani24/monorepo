import React from 'react';

import CPURealtimeGraph from './CPURealtimeGraph';
import MemoryRealtimeGraph from './MemoryRealtimeGraph';

const RealtimeMetricGraphs = () => (
  <div>
    <CPURealtimeGraph />

    <MemoryRealtimeGraph />
  </div>
);

export default RealtimeMetricGraphs;
