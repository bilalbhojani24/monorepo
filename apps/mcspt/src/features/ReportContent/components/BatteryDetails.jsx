import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import useBatteryDetails from './useBatteryDetails';

const BatteryChart = () => {
  const { batteryChartOptions } = useBatteryDetails();

  return (
    <div className="flex">
      <div className="flex w-[275px] shrink-0 grow-0" />

      <div className="relative h-[140px] flex-1">
        <div className="absolute top-0 left-0 w-full">
          {batteryChartOptions && (
            <HighchartsReact
              highcharts={Highcharts}
              options={batteryChartOptions}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default BatteryChart;
