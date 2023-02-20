import React from 'react';
import { MdInfoOutline } from '@browserstack/bifrost';

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
          metricText={`${sessionData?.aggregated?.cpuUsagePercentageAvg?.value} %`}
          MetricIcon={<MdInfoOutline />}
        />

        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Avg Memory Used"
          metricText={`${sessionData?.aggregated?.memoryUsageMbAvg?.value} MB`}
          MetricIcon={<MdInfoOutline />}
        />
      </div>

      <div className="flex">
        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Max CPU Used"
          metricText={`${sessionData?.aggregated?.cpuUsagePercentageMax?.value} %`}
          MetricIcon={<MdInfoOutline />}
        />

        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Max Memory Used"
          metricText={`${sessionData?.aggregated?.memoryUsageMbMax?.value} MB`}
          MetricIcon={<MdInfoOutline />}
        />
      </div>
    </div>
  );
};
export default CpuMemoryCard;
