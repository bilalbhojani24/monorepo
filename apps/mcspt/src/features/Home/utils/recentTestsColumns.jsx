import React from 'react';
import { Hyperlink } from '@browserstack/bifrost';
import { formatReportTime } from 'utils/dateUtils';

export const recentTestsColumns = [
  {
    name: 'Test Session Name',
    key: 'testSessionName',
    isSortable: true,
    cell: (row) => (
      <>
        <div className="w-52 overflow-hidden truncate text-sm font-medium leading-5">
          {row.name}
        </div>
      </>
    ),
    classOverrides: 'text-base-900 first:pl-0 sm:first:pl-0 py-2'
  },

  {
    name: 'Test Conducted',
    key: 'testStartDate',
    cell: (row) => (
      <div className="flex flex-col">
        <div className="text-base-900 text-sm font-medium leading-5">
          {formatReportTime(row?.startTime, 'dddd, MMMM D')}
        </div>
        <div className="text-base-500 text-sm font-normal leading-5">
          {formatReportTime(row?.startTime, 'h:mma')}
        </div>
      </div>
    ),
    classOverrides: 'py-2'
  },
  {
    name: 'Application',
    key: 'application',
    cell: (row) => (
      <div className="flex flex-col">
        <div className="text-base-900 text-sm font-medium leading-5">
          {row?.package?.name}
        </div>
        <div className="text-base-500 text-sm font-normal leading-5">
          {`${row?.package?.bundleId} ∙ v${row?.package?.version}`}
        </div>
      </div>
    ),
    classOverrides: 'py-2'
  },
  {
    name: 'Device',
    key: 'device',
    cell: (row) => (
      <>
        <div className="text-base-900 text-sm font-medium leading-5 ">
          {row?.device?.name}
        </div>
        <div className="text-base-500 text-sm font-normal leading-5 ">
          {`${row?.device?.os} ${row?.device?.osVersion}`}
        </div>
      </>
    ),
    classOverrides: 'py-2'
  },
  {
    name: 'View Button',
    key: 'viewButton',
    cell: (row, sessionSelected) => (
      <Hyperlink
        wrapperClassName="text-sm leading-5 font-normal text-info-600"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          sessionSelected(row);
        }}
      >
        View Report
      </Hyperlink>
    ),
    classOverrides: 'last:pr-0 sm:last:pr-0'
  }
];
