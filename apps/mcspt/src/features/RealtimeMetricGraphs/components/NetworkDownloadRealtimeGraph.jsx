import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import useNetworkDownloadRealtimeGraph from '../hooks/useNetworkDownloadRealtimeGraph';
import { formatCurrentRealtimeValue } from '../utils/realtimeGraphUtils';

const NetworkDownloadRealtimeGraph = () => {
  const {
    networkDownloadTimeSeriesData,
    realtimeNetworkDownloadChartOptions,
    realtimeThresholds
  } = useNetworkDownloadRealtimeGraph();

  return (
    <div className="mb-8 flex flex-col rounded-lg bg-white p-4 shadow ">
      <div className="flex">
        <div className="text-base-500 text-sm font-medium leading-5">
          Network Download
        </div>
      </div>

      {networkDownloadTimeSeriesData?.length > 0 && (
        <div className="text-base-900 flex text-3xl font-semibold">
          {formatCurrentRealtimeValue(
            networkDownloadTimeSeriesData,
            realtimeThresholds?.networkWriteKbTotal
          )}
        </div>
      )}

      <div className="mt-3">
        <div className="relative h-[182px] flex-1">
          <div className="absolute left-0 top-0 w-full">
            {realtimeNetworkDownloadChartOptions && (
              <HighchartsReact
                highcharts={Highcharts}
                options={realtimeNetworkDownloadChartOptions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkDownloadRealtimeGraph;
