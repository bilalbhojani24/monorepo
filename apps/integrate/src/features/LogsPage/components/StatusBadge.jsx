import React from 'react';
import { Badge } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
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
        mod = 'base';
    }
    return mod;
  };
  const classnameMapForBadge = {
    503: 'text-pink-800 bg-pink-100'
  };

  return (
    <Badge
      wrapperClassName={twClassNames({
        [classnameMapForBadge[statusCode]]: [statusCode]
      })}
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
