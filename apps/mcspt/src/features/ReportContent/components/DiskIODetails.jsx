import React from 'react';
import { MdInfoOutline } from '@browserstack/bifrost';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { decideIfCriteriaBreached, sanitizeValue } from '../../../utils';

import MetricStat from './MetricStat';
import useDiskIODetails from './useDiskIODetails';

const DiskIODetails = () => {
  const { sessionData, diskIOChartOptions } = useDiskIODetails();

  return (
    <>
      <div className="flex">
        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Total Read"
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

        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Total Write"
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

      <div className="relative h-[182px]">
        <div className="absolute top-0 left-0 w-full">
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
