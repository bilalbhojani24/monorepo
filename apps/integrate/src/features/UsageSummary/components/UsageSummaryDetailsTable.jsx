import React from 'react';
import { useSelector } from 'react-redux';

import {
  INTGTable,
  INTGTableBody,
  INTGTableCell,
  INTGTableHead,
  INTGTableRow
} from '../../../common/bifrostProxy';
import { usageDetailsSelector } from '../../../globalSlice';

const UsageSummaryDetailsTable = () => {
  const { headers, rows } = useSelector(usageDetailsSelector);
  return (
    <INTGTable>
      <INTGTableHead>
        <INTGTableRow>
          {headers?.map((header) => (
            <INTGTableCell
              key={header.key}
              variant="header"
              textTransform="uppercase"
            >
              {header.label}
            </INTGTableCell>
          ))}
        </INTGTableRow>
      </INTGTableHead>
      <INTGTableBody>
        {rows?.map((item) => (
          <INTGTableRow>
            <INTGTableCell key={item.metric}>{item.metric}</INTGTableCell>
            <INTGTableCell key={`${item.metric}-details`}>
              <p className="text-base-900">{item.details}</p>
            </INTGTableCell>
          </INTGTableRow>
        ))}
      </INTGTableBody>
    </INTGTable>
  );
};

export default UsageSummaryDetailsTable;
