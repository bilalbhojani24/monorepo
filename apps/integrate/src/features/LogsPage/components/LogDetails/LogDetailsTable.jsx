import React from 'react';
import {
  INTGTable,
  INTGTableBody,
  INTGTableCell,
  INTGTableHead,
  INTGTableRow
} from 'common/bifrostProxy';
import { Logo } from 'common/index';
import PropTypes from 'prop-types';

import StatusBadge from '../StatusBadge';

const LogDetailsTable = ({ logDetails }) => (
  <INTGTable wrapperClassName="drop-shadow-none">
    <INTGTableHead>
      <INTGTableRow>
        <INTGTableCell key="tool" variant="header" textTransform="uppercase">
          Tool
        </INTGTableCell>
        <INTGTableCell key="date" variant="header" textTransform="uppercase">
          Date
        </INTGTableCell>
        <INTGTableCell key="status" variant="header" textTransform="uppercase">
          Status
        </INTGTableCell>
        <INTGTableCell
          key="configuration"
          variant="header"
          textTransform="uppercase"
        >
          Configuration Id
        </INTGTableCell>
      </INTGTableRow>
    </INTGTableHead>
    <INTGTableBody>
      <INTGTableRow>
        <INTGTableCell key="tool">
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
        </INTGTableCell>
        <INTGTableCell key="date">
          <p>{logDetails.date}</p>
        </INTGTableCell>
        <INTGTableCell key="status">
          <StatusBadge statusCode={logDetails.status} />
        </INTGTableCell>
        <INTGTableCell key="configuration">
          <p>{logDetails.configuration?.name}</p>
        </INTGTableCell>
      </INTGTableRow>
    </INTGTableBody>
  </INTGTable>
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
