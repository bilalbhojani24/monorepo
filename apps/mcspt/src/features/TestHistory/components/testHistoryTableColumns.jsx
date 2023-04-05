import React from 'react';
import { formatReportTime } from 'utils/dateUtils';

export const testHistoryTableColumns = [
  {
    name: 'TEST SESSION NAME',
    key: 'testSessionName',
    isSortable: true,
    cell: (row) => (
      <>
        <div className="whitespace-normal text-sm font-medium leading-5">
          {row.name}
        </div>
      </>
    )
  },

  {
    name: 'TEST CONDUCTED',
    key: 'testStartDate',
    cell: (row) => (
      <div className="flex flex-col">
        <div className="text-base-900 text-sm font-medium leading-5">
          {formatReportTime(row?.startTime, 'dddd, MMMM, D, YYYY')}
        </div>
        <div className="text-base-500 text-sm font-normal leading-5">
          {formatReportTime(row?.startTime, 'h:mma')}
        </div>
      </div>
    )
  },
  {
    name: 'APPLICATION',
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
    )
  },
  {
    name: 'DEVICE',
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
    )
  }
];
