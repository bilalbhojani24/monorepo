import React from 'react';
import { MdInfoOutline } from '@browserstack/bifrost';

import MetricStat from './MetricStat';
import useUIRenderingCard from './useUIRenderingCard';

const UIRenderingCard = () => {
  const { sessionData } = useUIRenderingCard();

  return (
    <div className="mb-8 flex flex-col rounded-lg bg-white shadow">
      <div className="flex">
        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Avg FPS"
          metricText={`${sessionData?.aggregated?.fpsAvg?.value}`}
          MetricIcon={<MdInfoOutline />}
        />

        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Slow Frame Rate"
          metricText={`${sessionData?.aggregated?.slowFramePercent?.value} %`}
          MetricIcon={<MdInfoOutline />}
        />
      </div>

      <div className="flex">
        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Frozen Frame Rate"
          metricText={`${sessionData?.aggregated?.frozenFramePercent?.value} %`}
          MetricIcon={<MdInfoOutline />}
        />

        <MetricStat
          wrapperClassName="p-4"
          metricTitle="ANRs Detected"
          metricText={`${sessionData?.aggregated?.anrCount?.value}`}
          MetricIcon={<MdInfoOutline />}
        />
      </div>
    </div>
  );
};
export default UIRenderingCard;
