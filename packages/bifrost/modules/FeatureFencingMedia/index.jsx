import React, { useEffect } from 'react';

import { FEATURE_FENCING_SIZES } from '../FeatureFencing/const';
import { useFeatureFencingContext } from '../FeatureFencing/context';

const FeatureFencingMedia = () => {
  const { setHasMediaNode, size } = useFeatureFencingContext();
  useEffect(() => {
    if (size !== FEATURE_FENCING_SIZES.SM) {
      setHasMediaNode(true);
    }
  }, [setHasMediaNode, size]);

  if (size === FEATURE_FENCING_SIZES.SM) {
    return null;
  }
  return <div className="flex-1">FeatureFencingMedia</div>;
};

FeatureFencingMedia.propTypes = {};

export default FeatureFencingMedia;
