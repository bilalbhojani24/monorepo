import React from 'react';
import { MdInfoOutline } from '@browserstack/bifrost';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { decideIfCriteriaBreached, sanitizeValue } from 'utils/baseUtils';

import MetricStat from './MetricStat';
import useUIRenderingCard from './useUIRenderingCard';

const UIRenderingCard = () => {
  const { sessionData, frameChartOptions } = useUIRenderingCard();

  return (
    <div className="mb-8 flex flex-col rounded-lg bg-white shadow">
      <div className="flex">
        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Avg FPS"
          metricText={`${sanitizeValue(
            sessionData?.aggregated?.fpsAvg?.value
          )}`}
          MetricIcon={<MdInfoOutline />}
          criteriaForBreach={decideIfCriteriaBreached(
            sessionData?.aggregated?.fpsAvg?.value,
            sessionData?.threshold?.fpsAvg
          )}
          triangleDirection={sessionData?.threshold?.fpsAvg?.operator}
        />

        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Slow Frame Rate"
          metricText={`${sanitizeValue(
            sessionData?.aggregated?.slowFramePercent?.value
          )} %`}
          MetricIcon={<MdInfoOutline />}
          criteriaForBreach={decideIfCriteriaBreached(
            sessionData?.aggregated?.slowFramePercent?.value,
            sessionData?.threshold?.slowFramePercent
          )}
          triangleDirection={sessionData?.threshold?.slowFramePercent?.operator}
        />
      </div>

      {sessionData?.device?.os === 'android' && (
        <div className="flex">
          <MetricStat
            wrapperClassName="p-4"
            metricTitle="Frozen Frame Rate"
            metricText={`${sanitizeValue(
              sessionData?.aggregated?.frozenFramePercent?.value
            )} %`}
            MetricIcon={<MdInfoOutline />}
            criteriaForBreach={decideIfCriteriaBreached(
              sessionData?.aggregated?.frozenFramePercent?.value,
              sessionData?.threshold?.frozenFramePercent
            )}
            triangleDirection={
              sessionData?.threshold?.frozenFramePercent?.operator
            }
          />

          <MetricStat
            wrapperClassName="p-4"
            metricTitle="ANRs Detected"
            metricText={`${sanitizeValue(
              sessionData?.aggregated?.anrCount?.value
            )}`}
            MetricIcon={<MdInfoOutline />}
            criteriaForBreach={decideIfCriteriaBreached(
              sessionData?.aggregated?.anrCount?.value,
              sessionData?.threshold?.anrCount
            )}
            triangleDirection={sessionData?.threshold?.anrCount?.operator}
          />
        </div>
      )}

      <div className="p-4">
        <div className="relative h-[182px]">
          <div className="absolute top-0 left-0 w-full">
            {frameChartOptions && (
              <HighchartsReact
                highcharts={Highcharts}
                options={frameChartOptions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UIRenderingCard;
