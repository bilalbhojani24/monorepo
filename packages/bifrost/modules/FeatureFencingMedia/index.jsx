import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { FEATURE_FENCING_SIZES } from '../FeatureFencing/const';
import { useFeatureFencingContext } from '../FeatureFencing/context';

const FeatureFencingMedia = ({ children }) => {
  const { setHasMediaNode, size } = useFeatureFencingContext();
  useEffect(() => {
    if (size !== FEATURE_FENCING_SIZES.SM) {
      setHasMediaNode(true);
    }
  }, [setHasMediaNode, size]);

  if (size === FEATURE_FENCING_SIZES.SM) {
    return null;
  }
  return <div className="flex-1">{children}</div>;
};

FeatureFencingMedia.propTypes = {
  children: PropTypes.node.isRequired
};

export default FeatureFencingMedia;
