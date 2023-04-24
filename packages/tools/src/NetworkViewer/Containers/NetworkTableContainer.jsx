import React from 'react';
import { Table, TableBody } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import NetworkTableHeader from '../Components/NetworkTable/NetworkTableHeader';
import NetworkTableRow from '../Components/NetworkTable/NetworkTableRow';
import { useNetwork } from '../state/Context';

const NetworkTableContainer = ({ showWaterfall }) => {
  const { state, actions } = useNetwork();
  const data = state.get('data');
  const totalNetworkTime = state.get('totalNetworkTime');
  const selectedReqIndex = state.get('selectedReqIndex');

  const handleReqSelect = (payload) => {
    actions.selectRequest(payload);
  };

  return (
    <section className="h-full flex-1 overflow-auto">
      <Table
        containerWrapperClass="overflow-visible overflow-x-visible divide-none shadow-none"
        tableWrapperClass="w-full table-fixed "
      >
        <NetworkTableHeader showWaterfall={showWaterfall} />
        <TableBody>
          {data.map((rowInfo) => (
            <NetworkTableRow
              key={rowInfo.index}
              maxTime={totalNetworkTime}
              onSelect={handleReqSelect}
              payload={rowInfo}
              scrollHighlight={selectedReqIndex === rowInfo.index}
              showWaterfall={showWaterfall}
            />
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

NetworkTableContainer.propTypes = {
  showWaterfall: PropTypes.bool
};

NetworkTableContainer.defaultProps = {
  showWaterfall: true
};

export default NetworkTableContainer;
