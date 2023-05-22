import React from 'react';
import { Badge } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const StatusBadge = ({ statusCode }) => {
  const getBadgeModifierForStatus = (code) => {
    let mod = null;
    switch (code) {
      case '200':
      case '201': {
        mod = 'success';
        break;
      }
      case '400':
      case '401':
      case '500': {
        mod = 'error';
        break;
      }
      case '408': {
        mod = 'warn';
        break;
      }
      default:
        mod = 'info';
    }
    return mod;
  };

  return (
    <Badge
      hasDot={false}
      hasRemoveButton={false}
      text={statusCode}
      modifier={getBadgeModifierForStatus(statusCode)}
    />
  );
};

StatusBadge.propTypes = {
  statusCode: PropTypes.string.isRequired
};

export default StatusBadge;
