import React from 'react';
import { AVG_CPU_TT, MAX_CPU_TT } from 'constants/reportTooltipText';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { decideIfCriteriaBreached, sanitizeValue } from 'utils/baseUtils';

import MetricStat from './MetricStat';
import ReportTooltip from './ReportTooltip';
import useCpuDetails from './useCpuDetails';

const CpuDetails = () => {
  const { sessionData, cpuChartOptions } = useCpuDetails();

  return (
    <div className="mb-8 flex flex-col rounded-lg bg-white shadow ">
      <div className="flex">
        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Avg CPU Used"
          metricText={`${sanitizeValue(
            sessionData?.aggregated?.cpuUsagePercentageAvg?.value
          )} %`}
          MetricIcon={<ReportTooltip cardToolTipData={AVG_CPU_TT} />}
          criteriaForBreach={decideIfCriteriaBreached(
            sessionData?.aggregated?.cpuUsagePercentageAvg?.value,
            sessionData?.threshold?.cpuUsagePercentageAvg
          )}
          triangleDirection={
            sessionData?.threshold?.cpuUsagePercentageAvg?.operator
          }
        />

        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Max CPU Used"
          metricText={`${sanitizeValue(
            sessionData?.aggregated?.cpuUsagePercentageMax?.value
          )} %`}
          MetricIcon={<ReportTooltip cardToolTipData={MAX_CPU_TT} />}
          criteriaForBreach={decideIfCriteriaBreached(
            sessionData?.aggregated?.cpuUsagePercentageMax?.value,
            sessionData?.threshold?.cpuUsagePercentageMax
          )}
          triangleDirection={
            sessionData?.threshold?.cpuUsagePercentageMax?.operator
          }
        />
      </div>

      <div className="p-4">
        <div className="relative h-[182px] flex-1">
          <div className="absolute left-0 top-0 w-full">
            {cpuChartOptions && (
              <HighchartsReact
                highcharts={Highcharts}
                options={cpuChartOptions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CpuDetails;
