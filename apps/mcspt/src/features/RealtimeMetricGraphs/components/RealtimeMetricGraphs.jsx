import React from 'react';
import { ExclamationCircleIcon, Loader } from '@browserstack/bifrost';

import useRealtimeMetricGraphs from '../hooks/useRealtimeMetricGraphs';

import BatteryRealtimeGraph from './BatteryRealtimeGraph';
import CPURealtimeGraph from './CPURealtimeGraph';
import DiskRealtimeGraph from './DiskRealtimeGraph';
import FPSRealtimeGraph from './FPSRealtimeGraph';
import MemoryRealtimeGraph from './MemoryRealtimeGraph';
import NetworkRealtimeGraph from './NetworkRealtimeGraph';

const RealtimeMetricGraphs = () => {
  const {
    isSocketConnectionLoading,
    isSocketConnectionFailed,
    sessionDetails
  } = useRealtimeMetricGraphs();

  return (
    <div id="realtimeMetricsContainer" className="flex flex-1 flex-col">
      {isSocketConnectionLoading && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <Loader
            height="h-9"
            width="w-9"
            wrapperClassName="text-base-300 fill-base-400 mb-4"
          />

          <div className="text-base-600 text-lg font-medium leading-7">
            Loading real-time metrics
          </div>
        </div>
      )}

      {isSocketConnectionFailed && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <ExclamationCircleIcon className="text-base-500 w-11" />

          <div className="text-base-800 mb-2 mt-3 text-base font-semibold leading-5">
            There was an error loading real-time metrics
          </div>

          <div className="text-base-500 w-80 text-center font-normal leading-6">
            Performance data is still being captured and will be available in
            the report
          </div>
        </div>
      )}

      {!isSocketConnectionLoading && !isSocketConnectionFailed && (
        <>
          <CPURealtimeGraph />
          <MemoryRealtimeGraph />
          <FPSRealtimeGraph />

          {sessionDetails?.device?.os === 'android' && <BatteryRealtimeGraph />}

          <DiskRealtimeGraph />
          <NetworkRealtimeGraph />
        </>
      )}
    </div>
  );
};

export default RealtimeMetricGraphs;
