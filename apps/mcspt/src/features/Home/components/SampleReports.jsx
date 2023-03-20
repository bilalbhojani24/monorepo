import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@browserstack/bifrost';

import {
  sampleReportColumns,
  sampleReportRows
} from '../utils/sampleReportsSchema';

const SampleReportsTable = () => (
  <>
    <div className="text-xl font-semibold leading-7">
      Explore sample reports of popular apps
    </div>

    <Table containerWrapperClass="w-full bg-transparent ring-0 shadow-none rounded-none border-0">
      <TableBody>
        {sampleReportRows.map((row) => (
          <TableRow key={row.application}>
            {sampleReportColumns.map((column) => (
              <TableCell wrapperClassName="p-2" key={column.key}>
                {column.cell(row)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
);

export default SampleReportsTable;
