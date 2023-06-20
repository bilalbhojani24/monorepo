import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import useNetworkRealtimeGraph from '../hooks/useNetworkRealtimeGraph';
import { formatCurrentRealtimeValue } from '../utils/realtimeGraphUtils';

const NetworkRealtimeGraph = () => {
  const {
    networkUploadTimeSeriesData,
    networkDownloadTimeSeriesData,
    realtimeNetworkChartOptions
  } = useNetworkRealtimeGraph();

  return (
    <div className="mb-8 flex flex-col rounded-lg bg-white p-4 shadow ">
      <div className="flex">
        <div className="flex-1">
          <div className="flex">
            <div className="text-base-500 text-sm font-medium leading-5">
              App Data Upload
            </div>
          </div>

          {networkUploadTimeSeriesData?.length > 0 && (
            <div className="text-base-900 flex text-3xl font-semibold">
              {formatCurrentRealtimeValue(networkUploadTimeSeriesData, {
                unit: 'Kbps'
              })}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex">
            <div className="text-base-500 text-sm font-medium leading-5">
              App Data Download
            </div>
          </div>

          {networkDownloadTimeSeriesData?.length > 0 && (
            <div className="text-base-900 flex text-3xl font-semibold">
              {formatCurrentRealtimeValue(networkDownloadTimeSeriesData, {
                unit: 'Kbps'
              })}
            </div>
          )}
        </div>
      </div>

      <div className="mt-3">
        <div className="relative h-[182px] flex-1">
          <div className="absolute left-0 top-0 w-full">
            {realtimeNetworkChartOptions && (
              <HighchartsReact
                highcharts={Highcharts}
                options={realtimeNetworkChartOptions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkRealtimeGraph;
