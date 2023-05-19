import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import {
  openUsageSummarySlideover,
  setUsageDetails
} from '../../../globalSlice';

const UsageSummaryTable = ({ usageSummaryData }) => {
  const dispatch = useDispatch();
  const handleUsageDetail = (key, label, usageDetails) => {
    dispatch(setUsageDetails({ key, label, ...usageDetails }));
    dispatch(openUsageSummarySlideover());
  };
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell
            key="integrations"
            variant="header"
            textTransform="uppercase"
          >
            INTEGRATIONS
          </TableCell>
          <TableCell key="usage" variant="header" textTransform="uppercase">
            USAGE
          </TableCell>
          <TableCell
            key="details-link-header"
            variant="header"
            textTransform="uppercase"
          />
        </TableRow>
      </TableHead>
      <TableBody>
        {usageSummaryData?.map((item) => (
          <TableRow>
            <TableCell key={`${item.key}-integration`}>
              <div>
                <div>
                  <p className="text-base-900">{item.label}</p>
                  <p>{item.category}</p>
                </div>
              </div>
            </TableCell>
            <TableCell key={`${item.key}-usage`}>
              <div>
                <p className="text-base-900">{item.usage.details}</p>
                <p>{item.usage.metric}</p>
              </div>
            </TableCell>
            <TableCell key={`${item.key}-details-btn`}>
              <Button
                wrapperClassName="text-brand-600 hover:bg-inherit border-0 shadow-none bg-inherit focus:ring-0 focus:ring-offset-0 px-0 cursor-pointer"
                colors="white"
                onClick={() =>
                  handleUsageDetail(item.key, item.label, item.usage_details)
                }
              >
                Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
UsageSummaryTable.propTypes = {
  usageSummaryData: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      category_key: PropTypes.string.isRequired,
      usage: PropTypes.shape({
        metrics: PropTypes.string,
        details: PropTypes.string
      })
    })
  ).isRequired
};
export default UsageSummaryTable;
