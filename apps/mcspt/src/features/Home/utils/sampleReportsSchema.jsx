import React from 'react';
import { Hyperlink } from '@browserstack/bifrost';

export const sampleReportColumns = [
  {
    name: 'Application',
    key: 'application',
    cell: (row) => (
      <>
        <div className="flex flex-col">
          <div className="text-base-900 text-sm font-medium leading-5">
            {row?.package?.name}
          </div>
          <div className="text-base-500 text-sm font-normal leading-5">
            {`${row?.package?.bundleId}∙ v${row?.package?.version}`}
          </div>
        </div>
      </>
    ),
    classOverrides: 'text-base-900 first:pl-0 sm:first:pl-0 py-2'
  },
  {
    name: 'Device',
    key: 'device',
    cell: (row) => (
      <>
        <div className="text-base-900 text-sm font-medium leading-5">
          {row?.device?.name}
        </div>
        <div className="text-base-500 text-sm font-normal capitalize leading-5">
          {`${row?.device?.os} ${row?.device?.osVersion}`}
        </div>
      </>
    ),
    classOverrides: 'py-2'
  },
  {
    name: 'View Button',
    key: 'viewButton',
    cell: (row, reportNavigationCallback) => (
      <Hyperlink
        wrapperClassName="text-sm leading-5 font-normal"
        onClick={() => {
          reportNavigationCallback(row);
        }}
      >
        View Sample Report
      </Hyperlink>
    ),
    classOverrides: 'last:pr-0 sm:last:pr-0 flex justify-end'
  }
];
