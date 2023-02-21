import React from 'react';
import { MdInfoOutline } from '@browserstack/bifrost';

import { decideIfCriteriaBreached, sanitizeValue } from '../../../utils';

import MetricStat from './MetricStat';
import useCpuMemoryCard from './useCpuMemoryCard';

const CpuMemoryCard = () => {
  const { sessionData } = useCpuMemoryCard();

  return (
    <div className="mb-8 flex flex-col rounded-lg bg-white shadow">
      <div className="flex">
        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Avg CPU Used"
          metricText={`${sanitizeValue(
            sessionData?.aggregated?.cpuUsagePercentageAvg?.value
          )} %`}
          MetricIcon={<MdInfoOutline />}
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
          metricTitle="Avg Memory Used"
          metricText={`${sanitizeValue(
            sessionData?.aggregated?.memoryUsageMbAvg?.value
          )} MB`}
          MetricIcon={<MdInfoOutline />}
          criteriaForBreach={decideIfCriteriaBreached(
            sessionData?.aggregated?.memoryUsageMbAvg?.value,
            sessionData?.threshold?.memoryUsageMbAvg
          )}
          triangleDirection={sessionData?.threshold?.memoryUsageMbAvg?.operator}
        />
      </div>

      <div className="flex">
        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Max CPU Used"
          metricText={`${sanitizeValue(
            sessionData?.aggregated?.cpuUsagePercentageMax?.value
          )} %`}
          MetricIcon={<MdInfoOutline />}
          criteriaForBreach={decideIfCriteriaBreached(
            sessionData?.aggregated?.cpuUsagePercentageMax?.value,
            sessionData?.threshold?.cpuUsagePercentageMax
          )}
          triangleDirection={
            sessionData?.threshold?.cpuUsagePercentageMax?.operator
          }
        />

        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Max Memory Used"
          metricText={`${sanitizeValue(
            sessionData?.aggregated?.memoryUsageMbMax?.value
          )} MB`}
          MetricIcon={<MdInfoOutline />}
          criteriaForBreach={decideIfCriteriaBreached(
            sessionData?.aggregated?.memoryUsageMbMax?.value,
            sessionData?.threshold?.memoryUsageMbMax
          )}
          triangleDirection={sessionData?.threshold?.memoryUsageMbMax?.operator}
        />
      </div>
    </div>
  );
};
export default CpuMemoryCard;
