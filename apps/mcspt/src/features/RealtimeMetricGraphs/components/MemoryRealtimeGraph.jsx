import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import useMemoryRealtimeGraph from '../hooks/useMemoryRealtimeGraph';

const MemoryRealtimeGraph = () => {
  const { realtimeMemoryChartOptions } = useMemoryRealtimeGraph();

  return (
    <div className="mb-8 flex flex-col rounded-lg bg-white shadow ">
      <div className="flex">Memory</div>

      <div className="p-4">
        <div className="relative h-[182px] flex-1">
          <div className="absolute left-0 top-0 w-full">
            {realtimeMemoryChartOptions && (
              <HighchartsReact
                highcharts={Highcharts}
                options={realtimeMemoryChartOptions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MemoryRealtimeGraph;
