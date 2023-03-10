import React from 'react';
import { MdInfoOutline } from '@browserstack/bifrost';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { decideIfCriteriaBreached, sanitizeValue } from 'utils/baseUtils';

import MetricStat from './MetricStat';
import useNetworkIODetails from './useNetworkIODetails';

const NetworkIODetails = () => {
  const { sessionData, networkIOChartOptions } = useNetworkIODetails();

  return (
    <>
      <div className="flex">
        <MetricStat
          wrapperClassName="p-4"
          metricTitle="Total Upload"
          metricText={`${sanitizeValue(
            sessionData?.aggregated?.networkReadKbTotal?.value
          )} Kb`}
          MetricIcon={<MdInfoOutline />}
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
          metricTitle="Total Download"
          metricText={`${sanitizeValue(
            sessionData?.aggregated?.networkWriteKbTotal?.value
          )} Kb`}
          MetricIcon={<MdInfoOutline />}
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
        <div className="absolute top-0 left-0 w-full">
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
