import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { Logo } from '../../../common';
import {
  INTGButton,
  INTGTable,
  INTGTableBody,
  INTGTableCell,
  INTGTableHead,
  INTGTableRow
} from '../../../common/bifrostProxy';
import {
  openUsageSummarySlideover,
  setUsageDetails
} from '../../../globalSlice';

const UsageSummaryTable = ({ usageSummaryData }) => {
  const dispatch = useDispatch();
  const handleUsageDetail = (key, icon, label, usageDetails) => {
    dispatch(setUsageDetails({ key, icon, label, ...usageDetails }));
    dispatch(openUsageSummarySlideover());
  };
  const emptySummaryFillers = new Array(2).fill('--');

  return (
    <INTGTable>
      <INTGTableHead>
        <INTGTableRow>
          <INTGTableCell
            key="integrations"
            variant="header"
            textTransform="uppercase"
          >
            INTEGRATIONS
          </INTGTableCell>
          <INTGTableCell key="usage" variant="header" textTransform="uppercase">
            USAGE
          </INTGTableCell>
          <INTGTableCell
            key="details-link-header"
            variant="header"
            textTransform="uppercase"
          />
        </INTGTableRow>
      </INTGTableHead>
      <INTGTableBody>
        {usageSummaryData?.length ? (
          usageSummaryData?.map((item) => (
            <INTGTableRow>
              <INTGTableCell key={`${item.key}-integration`}>
                <div className="flex items-center">
                  <Logo
                    logo={item.icon}
                    wrapperClassName="mr-2"
                    label={item.label}
                  />
                  <div>
                    <p className="text-base-900">{item.label}</p>
                    <p>{item.category}</p>
                  </div>
                </div>
              </INTGTableCell>
              <INTGTableCell key={`${item.key}-usage`}>
                <div>
                  <p className="text-base-900">{item.usage.details}</p>
                  <p>{item.usage.metric}</p>
                </div>
              </INTGTableCell>
              <INTGTableCell key={`${item.key}-details-btn`}>
                <INTGButton
                  wrapperClassName="text-brand-600 hover:bg-inherit border-0 shadow-none bg-inherit focus:ring-0 focus:ring-offset-0 px-0 cursor-pointer"
                  colors="white"
                  onClick={() =>
                    handleUsageDetail(
                      item.key,
                      item.icon,
                      item.label,
                      item.usage_details
                    )
                  }
                >
                  Details
                </INTGButton>
              </INTGTableCell>
            </INTGTableRow>
          ))
        ) : (
          <INTGTableRow>
            {emptySummaryFillers.map((emptyEntryString, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <INTGTableCell key={idx}>
                <p>{emptyEntryString}</p>
              </INTGTableCell>
            ))}
          </INTGTableRow>
        )}
      </INTGTableBody>
    </INTGTable>
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
