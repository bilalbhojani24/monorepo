import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import useSlowFramesRealtimeGraph from '../hooks/useSlowFramesRealtimeGraph';
import { formatCurrentRealtimeValue } from '../utils/realtimeGraphUtils';

const SlowFramesRealtimeGraph = () => {
  const { slowFramesTimeSeriesData, realtimeSlowFramesChartOptions } =
    useSlowFramesRealtimeGraph();

  return (
    <div className="mb-8 flex flex-col rounded-lg bg-white p-4 shadow ">
      <div className="flex">
        <div className="text-base-500 text-sm font-medium leading-5">
          Slow Frames / Second
        </div>
      </div>

      {slowFramesTimeSeriesData?.length > 0 && (
        <div className="text-base-900 flex text-3xl font-semibold">
          {formatCurrentRealtimeValue(slowFramesTimeSeriesData)}
        </div>
      )}

      <div className="mt-3">
        <div className="relative h-[182px] flex-1">
          <div className="absolute left-0 top-0 w-full">
            {realtimeSlowFramesChartOptions && (
              <HighchartsReact
                highcharts={Highcharts}
                options={realtimeSlowFramesChartOptions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SlowFramesRealtimeGraph;
