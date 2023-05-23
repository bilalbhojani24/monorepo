import React from 'react';
import PropTypes from 'prop-types';

import { FEATURE_FENCING_SIZES } from '../CTACard/const';
import { useCTACardContext } from '../CTACard/utils';

const CTACardMedia = ({ children }) => {
  const { size } = useCTACardContext();

  if (size === FEATURE_FENCING_SIZES.SM) {
    return null;
  }
  return <div className="flex-1">{children}</div>;
};

CTACardMedia.propTypes = {
  children: PropTypes.node.isRequired
};

export default CTACardMedia;
