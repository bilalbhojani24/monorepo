import React from 'react';
import { Button, MdFolderOpen, MdInfoOutline } from '@browserstack/bifrost';

import { decideIfCriteriaBreached, sanitizeValue } from '../../../utils';

import BatteryChart from './BatteryDetails';
import CpuDetails from './CpuDetails';
import DiskIODetails from './DiskIODetails';
import MemoryDetails from './MemoryDetails';
import MetricStat from './MetricStat';
import NetworkIODetails from './NetworkIODetails';
import ScreenLoadTime from './ScreenLoadTime';
import UIRenderingCard from './UIRenderingCard';
import useReportContent from './useReportContent';

const ReportContent = () => {
  const { sessionData, openDiagnosticFolder } = useReportContent();

  return (
    <div id="reportContent" className="bg-base-50 px-4 py-6">
      <div className="flex flex-col">
        <div className="mb-4 text-lg font-medium leading-6">Startup Time</div>

        <div className="mb-8 flex w-1/2 flex-col rounded-lg bg-white shadow">
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

      <div className="w-full">
        <div className="mb-4 text-lg font-medium leading-6">UI Rendering</div>

        <UIRenderingCard />
      </div>

      <div className="flex flex-wrap">
        <div className="w-full pr-0 lg:w-1/2 lg:pr-1">
          <div className="mb-4 text-lg font-medium leading-6">Memory</div>

          <MemoryDetails />
        </div>

        <div className="w-full pl-0 lg:w-1/2 lg:pl-1">
          <div className="mb-4 text-lg font-medium leading-6">CPU</div>

          <CpuDetails />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="mb-4 text-lg font-medium leading-6">
          Screen Load Time
        </div>

        <div className="mb-8 flex flex-col rounded-lg bg-white shadow">
          <ScreenLoadTime />
        </div>
      </div>

      {sessionData?.device?.os === 'android' && (
        <div className="flex flex-col">
          <div className="mb-4 text-lg font-medium leading-6">Battery</div>

          <div className="mb-8 flex flex-col rounded-lg bg-white p-4 shadow">
            <BatteryChart />
          </div>
        </div>
      )}

      <div id="diskAndNetworkIO" className="flex flex-wrap">
        <div className="w-full pr-0 md:w-1/2 md:pr-1">
          <div className="mb-4 text-lg font-medium leading-6">Disk I/O</div>

          <div className="mb-8 flex flex-col rounded-lg bg-white p-4 shadow">
            <DiskIODetails />
          </div>
        </div>

        <div className="w-full pl-0 md:w-1/2 md:pl-1">
          <div className="mb-4 text-lg font-medium leading-6">Network I/O</div>

          <div className="mb-8 flex flex-col rounded-lg bg-white p-4 shadow">
            <NetworkIODetails />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="mb-4 text-lg font-medium leading-6">
          Diagnostic Logs
        </div>
        <div className="mb-8 flex flex-col rounded-lg bg-white p-6 shadow">
          <div className="text-base-700 mb-5 text-base font-normal leading-6">
            View logs for: Power usage, test logs, test idjson, test
            instrumentation, test instrumentation time, indicators summary,
            storage, application PID log , threads process information
          </div>

          <div>
            <Button
              size="large"
              colors="white"
              variant="primary"
              fullWidth={false}
              icon={
                <span className="text-base-400 text-xl">
                  <MdFolderOpen />
                </span>
              }
              onClick={openDiagnosticFolder}
            >
              Open the Diagnostic Logs folder
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReportContent;
