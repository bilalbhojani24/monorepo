import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@browserstack/bifrost';
import { HistoricalReportLoadingModal } from 'features/TestHistory';

import { sampleReportColumns } from '../utils/sampleReportsSchema';

import useSampleReports from './useSampleReports';

const SampleReportsTable = () => {
  const { sampleReports, sampleReportSelected } = useSampleReports();

  return (
    <>
      <div className="text-xl font-semibold leading-7">
        Explore sample reports of popular apps
      </div>

      <Table containerWrapperClass="w-full bg-transparent ring-0 shadow-none md:rounded-none border-b border-base-200">
        <TableBody>
          {sampleReports.map((row) => (
            <TableRow key={row.uuid}>
              {sampleReportColumns.map((column) => (
                <TableCell
                  key={column.key}
                  wrapperClassName={column.classOverrides}
                >
                  {column.cell(row, sampleReportSelected)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <HistoricalReportLoadingModal />
    </>
  );
};

export default SampleReportsTable;
