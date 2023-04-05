import React from 'react';
import { DISK_READ_TT, DISK_WRITE_TT } from 'constants/reportTooltipText';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { decideIfCriteriaBreached, sanitizeValue } from 'utils/baseUtils';

import MetricStat from './MetricStat';
import ReportTooltip from './ReportTooltip';
import useDiskIODetails from './useDiskIODetails';

const DiskIODetails = () => {
  const { sessionData, diskIOChartOptions } = useDiskIODetails();

  return (
    <>
      <div className="flex">
        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Total Disk Read"
          metricText={`${sanitizeValue(
            sessionData?.aggregated?.diskReadMbTotal?.value
          )} MB`}
          MetricIcon={<ReportTooltip cardToolTipData={DISK_READ_TT} />}
          criteriaForBreach={decideIfCriteriaBreached(
            sessionData?.aggregated?.diskReadMbTotal?.value,
            sessionData?.threshold?.diskReadMbTotal
          )}
          triangleDirection={sessionData?.threshold?.diskReadMbTotal?.operator}
        />

        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Total Disk Write"
          metricText={`${sanitizeValue(
            sessionData?.aggregated?.diskWriteMbTotal?.value
          )} MB`}
          MetricIcon={<ReportTooltip cardToolTipData={DISK_WRITE_TT} />}
          criteriaForBreach={decideIfCriteriaBreached(
            sessionData?.aggregated?.diskWriteMbTotal?.value,
            sessionData?.threshold?.diskWriteMbTotal
          )}
          triangleDirection={sessionData?.threshold?.diskWriteMbTotal?.operator}
        />
      </div>

      <div className="relative h-[182px]">
        <div className="absolute left-0 top-0 w-full">
          {diskIOChartOptions && (
            <HighchartsReact
              highcharts={Highcharts}
              options={diskIOChartOptions}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default DiskIODetails;
