import React from 'react';
import { BATTERY_CONSUMED_TT } from 'constants/reportTooltipText';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { decideIfCriteriaBreached } from 'utils/baseUtils';

import MetricStat from './MetricStat';
import ReportTooltip from './ReportTooltip';
import useBatteryDetails from './useBatteryDetails';

const BatteryChart = () => {
  const { sessionData, batteryChartOptions, roundTo3DecimalPlaces } =
    useBatteryDetails();

  return (
    <div className="flex">
      <div className="flex w-[275px] shrink-0 grow-0 flex-col">
        <MetricStat
          metricTitle="Total Power Drawn"
          metricText={`${roundTo3DecimalPlaces(
            sessionData?.aggregated?.batterymAhConsumedByAppPercent?.value
          )} %`}
          MetricIcon={<ReportTooltip cardToolTipData={BATTERY_CONSUMED_TT} />}
          criteriaForBreach={decideIfCriteriaBreached(
            sessionData?.aggregated?.batterymAhConsumedByAppPercent?.value,
            sessionData?.threshold?.batterymAhConsumedByAppPercent
          )}
          triangleDirection={
            sessionData?.threshold?.batterymAhConsumedByAppPercent?.operator
          }
        />
      </div>

      <div className="relative h-[182px] flex-1">
        <div className="absolute left-0 top-0 w-full">
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
