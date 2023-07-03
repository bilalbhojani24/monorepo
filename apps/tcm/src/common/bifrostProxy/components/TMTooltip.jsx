/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Tooltip } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const TMTooltip = (props) => {
  const { isForcedHidden, children } = props;
  if (isForcedHidden) return children;

  return <Tooltip {...props} />;
};

TMTooltip.propTypes = {
  isForcedHidden: PropTypes.bool,
  children: PropTypes.node
};

TMTooltip.defaultProps = {
  isForcedHidden: false,
  children: null
};

export default TMTooltip;
