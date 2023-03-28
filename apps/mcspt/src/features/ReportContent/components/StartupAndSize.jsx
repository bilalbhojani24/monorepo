import React from 'react';
import { MdInfoOutline } from '@browserstack/bifrost';
import { decideIfCriteriaBreached, sanitizeValue } from 'utils/baseUtils';

import MetricStat from './MetricStat';
import useStartupAndSize from './useStartupAndSize';

const StartupAndSize = () => {
  const { sessionData } = useStartupAndSize();

  return (
    <div className="flex flex-wrap">
      <div className="w-full pr-0 lg:w-1/2 lg:pr-1">
        <div className="mb-4 text-lg font-medium leading-6">Startup Time</div>

        <div className="mb-8 flex flex-col rounded-lg bg-white shadow">
          <MetricStat
            wrapperClassName="p-4"
            metricTitle="Cold Startup Time"
            metricText={`${sanitizeValue(
              sessionData?.aggregated?.appStartTotalTime?.value
            )} ms`}
            MetricIcon={<MdInfoOutline />}
            criteriaForBreach={decideIfCriteriaBreached(
              sessionData?.aggregated?.appStartTotalTime?.value,
              sessionData?.threshold?.appStartTotalTime
            )}
            triangleDirection={
              sessionData?.threshold?.appStartTotalTime?.operator
            }
          />
        </div>
      </div>

      {sessionData?.device?.os === 'android' && (
        <div className="w-full pl-0 lg:w-1/2 lg:pl-1">
          <div className="mb-4 text-lg font-medium leading-6">App Size</div>

          <div className="mb-8 flex flex-col rounded-lg bg-white shadow">
            <MetricStat
              wrapperClassName="p-4"
              metricTitle="Installed App Size"
              metricText={`${sanitizeValue(
                sessionData?.aggregated?.appSize?.value
              )} MB`}
              MetricIcon={<MdInfoOutline />}
              criteriaForBreach={decideIfCriteriaBreached(
                sessionData?.aggregated?.appSize?.value,
                sessionData?.threshold?.appSize
              )}
              triangleDirection={sessionData?.threshold?.appSize?.operator}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupAndSize;
