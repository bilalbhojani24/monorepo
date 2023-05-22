import React from 'react';
import { useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';

import { usageDetailsSelector } from '../../../globalSlice';

const UsageSummaryDetailsTable = () => {
  const { headers, rows } = useSelector(usageDetailsSelector);
  return (
    <Table>
      <TableHead>
        <TableRow>
          {headers?.map((header) => (
            <TableCell
              key={header.key}
              variant="header"
              textTransform="uppercase"
            >
              {header.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows?.map((item) => (
          <TableRow>
            <TableCell key={item.metric}>{item.metric}</TableCell>
            <TableCell key={`${item.metric}-details`}>
              <p className="text-base-900">{item.details}</p>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsageSummaryDetailsTable;
