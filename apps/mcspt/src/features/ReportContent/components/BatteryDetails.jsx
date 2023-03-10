import React from 'react';
import { MdInfoOutline } from '@browserstack/bifrost';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { decideIfCriteriaBreached, sanitizeValue } from 'utils/baseUtils';

import MetricStat from './MetricStat';
import useBatteryDetails from './useBatteryDetails';

const BatteryChart = () => {
  const { sessionData, batteryChartOptions } = useBatteryDetails();

  return (
    <div className="flex">
      <div className="flex w-[275px] shrink-0 grow-0 flex-col">
        <MetricStat
          metricTitle=" Total Battery Consumed"
          metricText={`${sanitizeValue(
            sessionData?.aggregated?.totalBatteryConsumedPercent?.value
          )} %`}
          MetricIcon={<MdInfoOutline />}
          criteriaForBreach={decideIfCriteriaBreached(
            sessionData?.aggregated?.totalBatteryConsumedPercent?.value,
            sessionData?.threshold?.totalBatteryConsumedPercent
          )}
          triangleDirection={
            sessionData?.threshold?.totalBatteryConsumedPercent?.operator
          }
        />
      </div>

      <div className="relative h-[182px] flex-1">
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
