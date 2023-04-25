import React from 'react';
import { Tooltip, TooltipBody } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { formatSize, formatTime } from '../../utils';

const formatValue = (key, value, request = {}) => {
  switch (key) {
    case 'time':
      return value === 0 && !request.error ? 'Pending' : formatTime(value);
    case 'size':
      return formatSize(value);
    case 'status':
      if (request.error) {
        return '(failed)';
      }
      return value === 0 ? 'Pending' : value;
    default:
      return value;
  }
};

const NetworkCellValue = ({
  datakey,
  payload,
  renderComponent,
  showWaterfall
}) => {
  const formattedValue = formatValue(datakey, payload[datakey], payload);

  if (typeof renderComponent === 'function') {
    return renderComponent({ formattedValue, payload, showWaterfall });
  }

  if (datakey === 'status') {
    // spliting with 30 characters to avoid overflow
    // ading white-space pre to not break on small small words
    const tooltipDescription = payload.error
      ?.trim()
      .split(/(.{30})/)
      .filter(Boolean)
      .map((text) => (
        <div key="text" className="whitespace-pre">
          {text}
        </div>
      ));
    if (tooltipDescription) {
      return (
        <Tooltip
          content={<TooltipBody>{tooltipDescription}</TooltipBody>}
          theme="dark"
          placementSide="right"
        >
          <span className="truncate">{formattedValue}</span>
        </Tooltip>
      );
    }
  }

  return <span className="truncate">{formattedValue}</span>;
};

NetworkCellValue.propTypes = {
  datakey: PropTypes.string.isRequired,
  payload: PropTypes.objectOf(PropTypes.any),
  renderComponent: PropTypes.func,
  showWaterfall: PropTypes.bool
};

NetworkCellValue.defaultProps = {
  payload: {},
  renderComponent: null,
  showWaterfall: true
};

export default NetworkCellValue;
