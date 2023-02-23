import React from 'react';
import { MdInfoOutline } from '@browserstack/bifrost';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { decideIfCriteriaBreached, sanitizeValue } from '../../../utils';

import MetricStat from './MetricStat';
import useCpuMemoryCard from './useCpuMemoryCard';

const CpuMemoryCard = () => {
  const { sessionData, cpuChartOptions, memoryChartOptions } =
    useCpuMemoryCard();

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full pr-0 lg:w-1/2 lg:pr-1">
          <div className="mb-4 text-lg font-medium leading-6">Memory</div>

          <div className="mb-8 flex flex-col rounded-lg bg-white shadow">
            <div className="flex">
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
                triangleDirection={
                  sessionData?.threshold?.memoryUsageMbAvg?.operator
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
                triangleDirection={
                  sessionData?.threshold?.memoryUsageMbMax?.operator
                }
              />
            </div>

            <div className="p-4">
              <div className="relative h-[182px] flex-1">
                <div className="absolute top-0 left-0 w-full">
                  {memoryChartOptions && (
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={memoryChartOptions}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full pl-0 lg:w-1/2 lg:pl-1">
          <div className="mb-4 text-lg font-medium leading-6">CPU</div>

          <div className="mb-8 flex flex-col rounded-lg bg-white shadow ">
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
            </div>

            <div className="p-4">
              <div className="relative h-[182px] flex-1">
                <div className="absolute top-0 left-0 w-full">
                  {cpuChartOptions && (
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={cpuChartOptions}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CpuMemoryCard;
