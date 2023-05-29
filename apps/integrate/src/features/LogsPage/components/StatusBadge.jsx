import React from 'react';
import PropTypes from 'prop-types';

import { INTGBadge } from '../../../common/bifrostProxy';

const StatusBadge = ({ statusCode }) => {
  function getBadgeModifierForStatus(httpStatusCode) {
    if (/^2\d{2}$/.test(httpStatusCode)) {
      return 'success'; // 2xx status code
    }
    if (/^4\d{2}$/.test(httpStatusCode)) {
      return 'warn'; // 4xx status code
    }
    if (/^5\d{2}$/.test(httpStatusCode)) {
      return 'error'; // 5xx status code
    }
    return 'base'; // Default modifier
  }

  return (
    <INTGBadge
      wrapperClassName="hover:bg-inherit cursor-default"
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
