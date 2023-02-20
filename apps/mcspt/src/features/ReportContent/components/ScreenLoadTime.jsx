import React from 'react';
import {
  Accordion,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';

import { secondsToMinutes } from '../../../utils';

import useScreenLoadTime from './useScreenLoadTime';

const columns = [
  {
    name: 'START',
    key: 'slStart',
    cell: (row) => (
      <div className="text-base-500 font-normal ">
        {secondsToMinutes(Math.floor(row.startTime / 1000))}
      </div>
    )
  },
  {
    name: 'END',
    key: 'slEnd',
    cell: (row) => (
      <div className="text-base-500 font-normal">
        {secondsToMinutes(Math.floor(row.renderTime / 1000))}
      </div>
    )
  },
  {
    name: 'LOAD TIME',
    key: 'slLoadTime',
    cell: (row) => (
      <div className="text-base-900 font-medium">
        {secondsToMinutes(Math.floor((row.startTime + row.renderTime) / 1000))}
      </div>
    )
  }
];

const ScreenLoadTime = () => {
  const { sessionData } = useScreenLoadTime();

  return (
    <div>
      {sessionData?.report?.['Screen Load']?.metrics.map((metric) => (
        <div key={metric.activityName} className="border-base-200 border-b  ">
          <Accordion
            triggerClassName="py-3 px-6"
            triggerContentNode={
              <div className="flex flex-1 justify-between">
                <div className="text-sm font-medium leading-5">
                  {metric.activityName}
                </div>

                <div className="text-base-500 flex text-sm">
                  <div className="mr-6">{`Avg ${metric.avg} ms`}</div>
                  <div className="">{`Max ${metric.max} ms`}</div>
                </div>
              </div>
            }
            panelContentNode={
              <div className="p-4">
                <Table containerWrapperClass="w-full">
                  <TableHead>
                    <TableRow>
                      {columns.map((col) => (
                        <TableCell
                          key={col.key}
                          wrapperClassName="text-base-500 text-xs leading-4 font-medium tracking-wider uppercase"
                        >
                          {col.name}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {metric.timeData.map((row) => (
                      <TableRow key={row.startTime}>
                        {columns.map((column) => {
                          const value = row[column.key];
                          return (
                            <TableCell
                              key={column.key + column.id}
                              wrapperClassName="text-sm leading-5"
                            >
                              {column.cell ? column.cell(row) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            }
          />
        </div>
      ))}
    </div>
  );
};

export default ScreenLoadTime;
