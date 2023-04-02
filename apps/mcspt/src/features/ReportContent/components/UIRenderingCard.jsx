import React from 'react';
import { REPORT_METRIC_LABELS } from 'constants/reportMetricLabels';
import {
  ANR_DETECTED_TT,
  FROZEN_FRAMES_TT,
  SLOW_FRAMES_TT
} from 'constants/reportTooltipText';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { decideIfCriteriaBreached, sanitizeValue } from 'utils/baseUtils';

import MetricStat from './MetricStat';
import ReportTooltip from './ReportTooltip';
import useUIRenderingCard from './useUIRenderingCard';

const UIRenderingCard = () => {
  const { sessionData, frameChartOptions, devicePlatform } =
    useUIRenderingCard();

  return (
    <div className="mb-8 flex flex-col rounded-lg bg-white shadow">
      <div className="flex">
        <MetricStat
          wrapperClassName="p-4"
          metricTitle={REPORT_METRIC_LABELS?.SLOW_FRAME_RATE?.[devicePlatform]}
          metricText={`${sanitizeValue(
            sessionData?.aggregated?.slowFramePercent?.value
          )} %`}
          MetricIcon={<ReportTooltip cardToolTipData={SLOW_FRAMES_TT} />}
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
            metricTitle="Frozen Frames"
            metricText={`${sanitizeValue(
              sessionData?.aggregated?.frozenFramePercent?.value
            )} %`}
            MetricIcon={<ReportTooltip cardToolTipData={FROZEN_FRAMES_TT} />}
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
            metricTitle="No. of ANRs detected"
            metricText={`${sanitizeValue(
              sessionData?.aggregated?.anrCount?.value
            )}`}
            MetricIcon={<ReportTooltip cardToolTipData={ANR_DETECTED_TT} />}
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
          <div className="absolute left-0 top-0 w-full">
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
