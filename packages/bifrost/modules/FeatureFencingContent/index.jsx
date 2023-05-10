import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { FEATURE_FENCING_SIZES } from '../FeatureFencing/const';
import { useFeatureFencingContext } from '../FeatureFencing/context';

const CONTENT_PADDING = {
  [FEATURE_FENCING_SIZES.SM]: 'px-5 pt-9 pb-7',
  [FEATURE_FENCING_SIZES.BASE]: 'px-9 py-12',
  [FEATURE_FENCING_SIZES.XL]: 'px-15 py-20'
};

const FeatureFencingContent = ({ children, header, description }) => {
  const { size } = useFeatureFencingContext();

  return (
    <div className={twClassNames('flex-1', CONTENT_PADDING[size], {})}>
      <p className="">{header}</p>
      <p className="">{description}</p>
      <div className="">{children}</div>
    </div>
  );
};

FeatureFencingContent.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default FeatureFencingContent;
