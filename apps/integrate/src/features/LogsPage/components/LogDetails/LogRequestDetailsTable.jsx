import React from 'react';
// import { useSelector } from 'react-redux';
import {
  Table,
  // TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
// import { format, getUnixTime } from 'date-fns';

// import { logDetailsSelector } from '../../../../globalSlice';
// import StatusBadge from '../StatusBadge';

const LogRequestDetailsTable = () => (
  // const logDetails = useSelector(logDetailsSelector);
  // const getTimeFromUnixtime = (time) => {
  //   const date = getUnixTime(time);
  //   return format(date, 'HH:mm:ss');
  // };
  // const getDateFromUnixtime = (time) => {
  //   const date = getUnixTime(time);
  //   return format(date, 'dd/MM/yyyy');
  // };
  <Table>
    <TableHead>
      <TableRow>
        <TableCell key="name" variant="header" textTransform="uppercase">
          Name
        </TableCell>
        <TableCell key="details" variant="header" textTransform="uppercase">
          Details
        </TableCell>
      </TableRow>
    </TableHead>
    {/* <TableBody>
        <TableRow>
          <TableCell key="tool">
            <div>
              <div>
                <p className="text-base-900">{logDetails.tool.lab}</p>
                <p>{logDetails.category.label}</p>
              </div>
            </div>
          </TableCell>
          <TableCell key="date">
            <div>
              <p className="text-base-900">
                {getTimeFromUnixtime(logDetails.date)}
              </p>
              <p>{getDateFromUnixtime(logDetails.date)}</p>
            </div>
          </TableCell>
          <TableCell key="status">
            <StatusBadge statusCode={logDetails.status} />
          </TableCell>
          <TableCell key="configuration">
            <p>{logDetails.configuration.name}</p>
          </TableCell>
        </TableRow>
      </TableBody> */}
  </Table>
);
export default LogRequestDetailsTable;
