import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import NetworkTableHeader from '../Components/NetworkTable/NetworkTableHeader';
import NetworkTableRow from '../Components/NetworkTable/NetworkTableRow';
import NoResults from '../Components/NetworkTable/NoResults';
import { VIEWER_FIELDS } from '../constants';
import { useNetwork } from '../state/Context';

const NetworkTableContainer = ({
  onRequestSelect,
  showWaterfall,
  appAutomateFramework
}) => {
  const { state, actions } = useNetwork();
  const data = state.get('data');
  const totalNetworkTime = state.get('totalNetworkTime');
  const selectedReqIndex = state.get('selectedReqIndex');
  const showReqDetail = state.get('showReqDetail');
  const containerWidth = state.get('containerWidth');
  const isProcessing = state.get('isProcessing');

  const handleReqSelect = (payload) => {
    actions.selectRequest(payload);
    onRequestSelect(payload);
  };

  return (
    <section
      className={twClassNames('network-table-container', {
        'network-table-container--limited-cols': showReqDetail
      })}
      style={
        showReqDetail
          ? { maxWidth: `${VIEWER_FIELDS.file.columnWidth(containerWidth)}px` }
          : {}
      }
    >
      <table
        className={twClassNames('network-table-container__table', {
          'network-table-container__table--hidden': !containerWidth
        })}
      >
        <NetworkTableHeader showWaterfall={showWaterfall} />
        {data.size ? (
          <tbody className="network-table-container__table-content">
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
          </tbody>
        ) : (
          !isProcessing && (
            <tbody>
              <NoResults appAutomateFramework={appAutomateFramework} />
            </tbody>
          )
        )}
      </table>
    </section>
  );
};

NetworkTableContainer.propTypes = {
  onRequestSelect: PropTypes.func,
  showWaterfall: PropTypes.bool,
  appAutomateFramework: PropTypes.string
};

NetworkTableContainer.defaultProps = {
  onRequestSelect: () => {},
  showWaterfall: true,
  appAutomateFramework: ''
};

export default NetworkTableContainer;
