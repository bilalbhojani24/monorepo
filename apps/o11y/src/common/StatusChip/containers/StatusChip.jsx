import React from 'react';
import { O11yBadge } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import { STATUS_MODIFIERS } from '../constants';

const StatusChip = ({ status, wrapperClassName, onClick, showDot }) => (
  <O11yBadge
    text={status}
    wrapperClassName={wrapperClassName}
    modifier={STATUS_MODIFIERS[status]}
    onClick={onClick}
    hasDot={showDot}
  />
);

StatusChip.propTypes = {
  status: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string,
  onClick: PropTypes.func,
  showDot: PropTypes.bool
};

StatusChip.defaultProps = {
  wrapperClassName: '',
  onClick: () => {},
  showDot: false
};

export default StatusChip;
