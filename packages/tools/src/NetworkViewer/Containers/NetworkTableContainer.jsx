import React from 'react';
import { Table, TableBody } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import NetworkTableHeader from '../Components/NetworkTable/NetworkTableHeader';
import NetworkTableRow from '../Components/NetworkTable/NetworkTableRow';
import { useNetwork } from '../state/Context';

const NetworkTableContainer = ({ showWaterfall, tableHeaderClassName }) => {
  const { state, actions } = useNetwork();
  const data = state.get('data');
  const totalNetworkTime = state.get('totalNetworkTime');
  const selectedReqIndex = state.get('selectedReqIndex');
  const showReqDetail = state.get('showReqDetail');
  const containerWidth = state.get('containerWidth');

  const handleReqSelect = (payload) => {
    actions.selectRequest(payload);
  };

  const shouldShowLimitedCols = showReqDetail && containerWidth < 1024;

  return (
    <section className="h-full flex-1">
      <Table
        containerWrapperClass="overflow-visible overflow-x-visible divide-none shadow-none"
        tableWrapperClass="w-full table-fixed "
      >
        <NetworkTableHeader
          showWaterfall={showWaterfall}
          shouldShowLimitedCols={shouldShowLimitedCols}
          tableHeaderClassName={tableHeaderClassName}
        />
        <TableBody>
          {data.map((rowInfo) => (
            <NetworkTableRow
              key={rowInfo.index}
              maxTime={totalNetworkTime}
              onSelect={handleReqSelect}
              payload={rowInfo}
              scrollHighlight={selectedReqIndex === rowInfo.index}
              showWaterfall={showWaterfall}
              shouldShowLimitedCols={shouldShowLimitedCols}
            />
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

NetworkTableContainer.propTypes = {
  showWaterfall: PropTypes.bool,
  tableHeaderClassName: PropTypes.string.isRequired
};

NetworkTableContainer.defaultProps = {
  showWaterfall: true
};

export default NetworkTableContainer;
