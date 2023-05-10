import React, { useEffect } from 'react';

import { useFeatureFencingContext } from '../FeatureFencing/context';

const FeatureFencingMedia = () => {
  const { setHasMediaNode } = useFeatureFencingContext();
  useEffect(() => {
    setHasMediaNode(true);
  }, [setHasMediaNode]);
  return <div>FeatureFencingMedia</div>;
};

FeatureFencingMedia.propTypes = {};

export default FeatureFencingMedia;
