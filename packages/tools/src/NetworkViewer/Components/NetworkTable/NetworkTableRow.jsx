import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { ROW_ID_PREFIX, VIEWER_FIELDS } from '../../constants';
import { getStatusClass } from '../../utils';

import NetworkCellValue from './NetworkCellValue';

const NetworkTableRow = ({
  payload,
  scrollHighlight,
  onSelect,
  showWaterfall
}) => {
  const handleSelectRequest = () => {
    onSelect(payload);
    // if (!['automate', 'app_automate'].includes(product)) {
    //   return;
    // }

    // const eventType =
    //   product === 'automate'
    //     ? window.EDS.automateWebEvent
    //     : window.EDS.appAutomateWebEvents;
    // const name = `${
    //   product === 'automate' ? 'Atm' : 'AppAtm'
    // }HARViewerRowClicked`;
    // const eventData = {
    //   team: product,
    //   product,
    //   requestType: payload.type
    // };
    // window.WebEventTracker?.logEvent?.([], eventType, name, eventData);
  };

  const rowProps = {
    className: twClassNames(
      'har-network-table-row',
      `har-network-table-row--${getStatusClass(payload)}`,
      {
        'har-network-table-row--highlight': scrollHighlight
      }
    ),
    id: ROW_ID_PREFIX + payload.index,
    onClick: handleSelectRequest
  };

  return (
    <tr {...rowProps}>
      {Object.entries(VIEWER_FIELDS).map(
        ([datakey, { key, renderComponent }]) => (
          <td className="har-network-table-row__cell" key={datakey}>
            <NetworkCellValue
              datakey={key}
              payload={payload}
              renderComponent={renderComponent}
              showWaterfall={showWaterfall}
            />
          </td>
        )
      )}
    </tr>
  );
};

NetworkTableRow.propTypes = {
  onSelect: PropTypes.func.isRequired,
  payload: PropTypes.object.isRequired,
  scrollHighlight: PropTypes.bool.isRequired,
  showWaterfall: PropTypes.bool
};
NetworkTableRow.defaultProps = {
  showWaterfall: true
};

export default NetworkTableRow;
