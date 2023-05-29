import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { Logo } from '../../../../common';
import StatusBadge from '../StatusBadge';

const LogDetailsTable = ({ logDetails }) => (
  <Table wrapperClassName="drop-shadow-none">
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
          <div className="flex items-center">
            <Logo
              logo={logDetails.tool?.icon}
              wrapperClassName="mr-2"
              label={logDetails.tool?.label}
            />
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

LogDetailsTable.propTypes = {
  logDetails: PropTypes.shape({
    tool: PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.string
    }),
    category: PropTypes.shape({
      label: PropTypes.string
    }),
    date: PropTypes.string,
    status: PropTypes.string,
    configuration: PropTypes.shape({
      name: PropTypes.string
    })
  }).isRequired
};

export default LogDetailsTable;
