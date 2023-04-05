import React from 'react';
import {
  NETWORK_DOWNLOAD_TT,
  NETWORK_UPLOAD_TT
} from 'constants/reportTooltipText';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { decideIfCriteriaBreached, sanitizeValue } from 'utils/baseUtils';

import MetricStat from './MetricStat';
import ReportTooltip from './ReportTooltip';
import useNetworkIODetails from './useNetworkIODetails';

const NetworkIODetails = () => {
  const { sessionData, networkIOChartOptions } = useNetworkIODetails();

  return (
    <>
      <div className="flex">
        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Total Data Uploaded"
          metricText={`${sanitizeValue(
            sessionData?.aggregated?.networkReadKbTotal?.value
          )} Kb`}
          MetricIcon={<ReportTooltip cardToolTipData={NETWORK_UPLOAD_TT} />}
          criteriaForBreach={decideIfCriteriaBreached(
            sessionData?.aggregated?.networkReadKbTotal?.value,
            sessionData?.threshold?.networkReadKbTotal
          )}
          triangleDirection={
            sessionData?.threshold?.networkReadKbTotal?.operator
          }
        />

        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Total Data Downloaded"
          metricText={`${sanitizeValue(
            sessionData?.aggregated?.networkWriteKbTotal?.value
          )} Kb`}
          MetricIcon={<ReportTooltip cardToolTipData={NETWORK_DOWNLOAD_TT} />}
          criteriaForBreach={decideIfCriteriaBreached(
            sessionData?.aggregated?.networkWriteKbTotal?.value,
            sessionData?.threshold?.networkWriteKbTotal
          )}
          triangleDirection={
            sessionData?.threshold?.networkWriteKbTotal?.operator
          }
        />
      </div>

      <div className="relative h-[182px]">
        <div className="absolute left-0 top-0 w-full">
          {networkIOChartOptions && (
            <HighchartsReact
              highcharts={Highcharts}
              options={networkIOChartOptions}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default NetworkIODetails;
