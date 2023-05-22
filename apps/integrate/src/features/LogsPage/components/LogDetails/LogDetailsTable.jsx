import React from 'react';
import { useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';

import { logDetailsSelector } from '../../../../globalSlice';
import StatusBadge from '../StatusBadge';

const LogDetailsTable = () => {
  const logDetails = useSelector(logDetailsSelector) || {};
  // console.log(logDetails);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell key="tool" variant="header" textTransform="uppercase">
            Tool
          </TableCell>
          <TableCell key="date" variant="header" textTransform="uppercase">
            Date
          </TableCell>
          <TableCell key="status" variant="header" textTransform="uppercase">
            Status
          </TableCell>
          <TableCell
            key="configuration"
            variant="header"
            textTransform="uppercase"
          >
            Configuration Id
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell key="tool">
            <div>
              <div>
                <p className="text-base-900">{logDetails.tool?.label}</p>
                <p>{logDetails.category?.label}</p>
              </div>
            </div>
          </TableCell>
          <TableCell key="date">
            <p>{logDetails.date}</p>
          </TableCell>
          <TableCell key="status">
            <StatusBadge statusCode={logDetails.status} />
          </TableCell>
          <TableCell key="configuration">
            <p>{logDetails.configuration?.name}</p>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default LogDetailsTable;
