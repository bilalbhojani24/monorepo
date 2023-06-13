import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import useDiskReadRealtimeGraph from '../hooks/useDiskReadRealtimeGraph';
import { formatCurrentRealtimeValue } from '../utils/realtimeGraphUtils';

const DiskReadRealtimeGraph = () => {
  const { diskReadTimeSeriesData, realtimeDiskReadChartOptions } =
    useDiskReadRealtimeGraph();

  return (
    <div className="mb-8 flex flex-col rounded-lg bg-white p-4 shadow ">
      <div className="flex">
        <div className="text-base-500 text-sm font-medium leading-5">
          Disk Read
        </div>
      </div>

      {diskReadTimeSeriesData?.length > 0 && (
        <div className="text-base-900 flex text-3xl font-semibold">
          {formatCurrentRealtimeValue(diskReadTimeSeriesData, { unit: 'Kbps' })}
        </div>
      )}

      <div className="mt-3">
        <div className="relative h-[182px] flex-1">
          <div className="absolute left-0 top-0 w-full">
            {realtimeDiskReadChartOptions && (
              <HighchartsReact
                highcharts={Highcharts}
                options={realtimeDiskReadChartOptions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DiskReadRealtimeGraph;
