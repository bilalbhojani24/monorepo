import React from 'react';
import { O11yBadge } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import { STATUS_MODIFIERS } from '../constants';

const StatusChip = ({ status, wrapperClassName, onClick }) => (
  <O11yBadge
    text={status}
    wrapperClassName={wrapperClassName}
    modifier={STATUS_MODIFIERS[status]}
    onClick={onClick}
  />
);

StatusChip.propTypes = {
  status: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string,
  onClick: PropTypes.func
};

StatusChip.defaultProps = {
  wrapperClassName: '',
  onClick: () => {}
};

export default StatusChip;
