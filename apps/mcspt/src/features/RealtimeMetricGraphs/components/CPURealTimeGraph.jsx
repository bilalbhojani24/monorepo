import React from 'react';
import { MdInfoOutline } from '@browserstack/bifrost';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import useCPURealtimeGraph from '../hooks/useCPURealtimeGraph';

const CPURealtimeGraph = () => {
  const { cpuTimeSeriesData, realtimeCpuChartOptions } = useCPURealtimeGraph();

  return (
    <div className="mb-8 flex flex-col rounded-lg bg-white p-4 shadow ">
      <div className="flex">
        <div className="text-sm font-medium leading-5 text-base-400">CPU</div>

        <div className="ml-1 flex items-center text-base-400">
          <MdInfoOutline className="cursor-pointer" />
        </div>
      </div>

      {cpuTimeSeriesData?.length > 0 && (
        <div className="flex text-3xl font-semibold text-base-900">
          {`${cpuTimeSeriesData[cpuTimeSeriesData.length - 1][1]} %`}
        </div>
      )}

      <div className="p-4">
        <div className="relative h-[182px] flex-1">
          <div className="absolute left-0 top-0 w-full">
            {realtimeCpuChartOptions && (
              <HighchartsReact
                highcharts={Highcharts}
                options={realtimeCpuChartOptions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CPURealtimeGraph;
