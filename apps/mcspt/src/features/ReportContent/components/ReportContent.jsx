import React from 'react';
import { Button, MdFolderOpen, MdInfoOutline } from '@browserstack/bifrost';

import BatteryChart from './BatteryDetails';
import DiskIODetails from './DiskIODetails';
import NetworkIODetails from './NetworkIODetails';

const ReportContent = () => (
  <div id="reportContent" className="bg-base-50 px-4 py-6">
    <div className="flex flex-col">
      <div className="mb-4 text-lg font-medium leading-6">Startup Time</div>
      <div className="mb-8 flex flex-col rounded-lg bg-white p-6 shadow">
        <div className="flex items-center">
          <div className="text-base-500 mr-2 text-sm font-medium leading-5">
            Cold Startup Time
          </div>

          <MdInfoOutline />
        </div>

        <div className="text-3xl font-semibold leading-9">153 ms</div>
      </div>
    </div>

    <div id="uiRenderingCPUMemory" className="flex flex-wrap">
      <div className="w-full pr-0 md:w-1/2 md:pr-1">
        <div className="mb-4 text-lg font-medium leading-6">UI Rendering</div>

        <div className="mb-8 flex flex-col rounded-lg bg-white p-6 shadow" />
      </div>

      <div className="w-full pl-0 md:w-1/2 md:pl-1">
        <div className="mb-4 text-lg font-medium leading-6">CPU & Memory</div>

        <div className="mb-8 flex flex-col rounded-lg bg-white p-6 shadow" />
      </div>
    </div>

    <div className="flex flex-col">
      <div className="mb-4 text-lg font-medium leading-6">Screen Load Time</div>
      <div className="mb-8 flex flex-col rounded-lg bg-white p-6 shadow" />
    </div>

    <div className="flex flex-col">
      <div className="mb-4 text-lg font-medium leading-6">Battery</div>

      <div className="mb-8 flex flex-col rounded-lg bg-white p-6 shadow">
        <BatteryChart />
      </div>
    </div>

    <div id="diskAndNetworkIO" className="flex flex-wrap">
      <div className="w-full pr-0 md:w-1/2 md:pr-1">
        <div className="mb-4 text-lg font-medium leading-6">Disk I/O</div>

        <div className="mb-8 flex flex-col rounded-lg bg-white p-6 shadow">
          <DiskIODetails />
        </div>
      </div>

      <div className="w-full pl-0 md:w-1/2 md:pl-1">
        <div className="mb-4 text-lg font-medium leading-6">Network I/O</div>

        <div className="mb-8 flex flex-col rounded-lg bg-white p-6 shadow">
          <NetworkIODetails />
        </div>
      </div>
    </div>

    <div className="flex flex-col">
      <div className="mb-4 text-lg font-medium leading-6">Diagnostic Logs</div>
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
          >
            Open the Diagnostic Logs folder
          </Button>
        </div>
      </div>
    </div>
  </div>
);
export default ReportContent;
