import React from 'react';
import { AVG_MEMORY_TT, MAX_MEMORY_TT } from 'constants/reportTooltipText';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { decideIfCriteriaBreached, sanitizeValue } from 'utils/baseUtils';

import MetricStat from './MetricStat';
import ReportTooltip from './ReportTooltip';
import useMemoryDetails from './useMemoryDetails';

const MemoryDetails = () => {
  const { sessionData, memoryChartOptions } = useMemoryDetails();

  return (
    <div className="mb-8 flex flex-col rounded-lg bg-white shadow">
      <div className="flex">
        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Avg Memory Used"
          metricText={`${sanitizeValue(
            sessionData?.aggregated?.memoryUsageMbAvg?.value
          )} MB`}
          MetricIcon={<ReportTooltip cardToolTipData={AVG_MEMORY_TT} />}
          criteriaForBreach={decideIfCriteriaBreached(
            sessionData?.aggregated?.memoryUsageMbAvg?.value,
            sessionData?.threshold?.memoryUsageMbAvg
          )}
          triangleDirection={sessionData?.threshold?.memoryUsageMbAvg?.operator}
        />

        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Max Memory Used"
          metricText={`${sanitizeValue(
            sessionData?.aggregated?.memoryUsageMbMax?.value
          )} MB`}
          MetricIcon={<ReportTooltip cardToolTipData={MAX_MEMORY_TT} />}
          criteriaForBreach={decideIfCriteriaBreached(
            sessionData?.aggregated?.memoryUsageMbMax?.value,
            sessionData?.threshold?.memoryUsageMbMax
          )}
          triangleDirection={sessionData?.threshold?.memoryUsageMbMax?.operator}
        />
      </div>

      <div className="p-4">
        <div className="relative h-[182px] flex-1">
          <div className="absolute left-0 top-0 w-full">
            {memoryChartOptions && (
              <HighchartsReact
                highcharts={Highcharts}
                options={memoryChartOptions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MemoryDetails;
