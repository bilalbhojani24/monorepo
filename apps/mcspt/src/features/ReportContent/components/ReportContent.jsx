import React from 'react';
import { Button, MdAccessTime, MdFolderOpen } from '@browserstack/bifrost';
import { formatReportTime } from 'utils/dateUtils';

import BatteryChart from './BatteryDetails';
import CpuDetails from './CpuDetails';
import DiskIODetails from './DiskIODetails';
import IssuesAudits from './IssuesAudits';
import MemoryDetails from './MemoryDetails';
import NetworkIODetails from './NetworkIODetails';
import ScreenLoadTime from './ScreenLoadTime';
import StartupAndSize from './StartupAndSize';
import UIRenderingCard from './UIRenderingCard';
import useReportContent from './useReportContent';

const ReportContent = () => {
  const { sessionData, openDiagnosticFolder, generateSessionNameString } =
    useReportContent();

  return (
    <div id="reportContent" className="bg-base-50 px-4 py-6">
      <div className="mb-6 flex flex-col">
        <div className="mb-2 text-2xl font-bold leading-7">
          {generateSessionNameString(sessionData)}
        </div>

        <div className="flex items-center">
          <div className="text-base-500 mr-1 text-base">
            <MdAccessTime />
          </div>

          <div className="text-base-500 text-sm font-medium leading-5">
            {formatReportTime(sessionData?.startTime)}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <IssuesAudits />
      </div>

      <StartupAndSize />

      <div className="w-full">
        <div className="mb-4 text-lg font-medium leading-6">
          UI Rendering Performance
        </div>

        <UIRenderingCard />
      </div>

      <div className="flex flex-wrap">
        <div className="w-full pr-0 lg:w-1/2 lg:pr-1">
          <div className="mb-4 text-lg font-medium leading-6">Memory Usage</div>

          <MemoryDetails />
        </div>

        <div className="w-full pl-0 lg:w-1/2 lg:pl-1">
          <div className="mb-4 text-lg font-medium leading-6">CPU Usage</div>

          <CpuDetails />
        </div>
      </div>

      {sessionData?.device?.os === 'android' && (
        <>
          <div className="flex flex-col">
            <div className="mb-4 text-lg font-medium leading-6">
              Activity Load Time
            </div>

            <div className="mb-8 flex flex-col rounded-lg bg-white shadow">
              <ScreenLoadTime />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="mb-4 text-lg font-medium leading-6">
              Battery & Power Usage
            </div>

            <div className="mb-8 flex flex-col rounded-lg bg-white p-4 shadow">
              <BatteryChart />
            </div>
          </div>
        </>
      )}

      <div id="diskAndNetworkIO" className="flex flex-wrap">
        <div className="w-full pr-0 lg:w-1/2 lg:pr-1">
          <div className="mb-4 text-lg font-medium leading-6">Disk Usage</div>

          <div className="mb-8 flex flex-col rounded-lg bg-white p-4 shadow">
            <DiskIODetails />
          </div>
        </div>

        <div className="w-full pl-0 lg:w-1/2 lg:pl-1">
          <div className="mb-4 text-lg font-medium leading-6">
            Network Data Usage
          </div>

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
            AppBench helps in troubleshooting performance issues by recording
            session data such as Logcat, Crash, and ANR logs. It also provides
            performance and resource usage data in easy-to-analyze .csv files.
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
              View Diagnostic Logs
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReportContent;
