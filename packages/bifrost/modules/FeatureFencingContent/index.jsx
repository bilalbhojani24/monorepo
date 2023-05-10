import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { FEATURE_FENCING_SIZES } from '../FeatureFencing/const';
import { useFeatureFencingContext } from '../FeatureFencing/context';

import { CONTENT_PADDING, DESCRIPTION_STYLES, HEADER_STYLES } from './const';

const FeatureFencingContent = ({ children, header, description }) => {
  const { size } = useFeatureFencingContext();

  return (
    <div className={twClassNames('flex-1', CONTENT_PADDING[size], {})}>
      <p
        className={twClassNames(
          'text-base-900 font-semibold',
          HEADER_STYLES[size]
        )}
      >
        {header}
      </p>
      <p
        className={twClassNames(
          'text-base-500 font-normal',
          DESCRIPTION_STYLES[size],
          {
            'mt-1.5': FEATURE_FENCING_SIZES.SM || FEATURE_FENCING_SIZES.BASE,
            'mt-2': FEATURE_FENCING_SIZES.XL
          }
        )}
      >
        {description}
      </p>
      <div
        className={twClassNames({
          'mt-6': FEATURE_FENCING_SIZES.SM || FEATURE_FENCING_SIZES.BASE,
          'mt-9': FEATURE_FENCING_SIZES.XL
        })}
      >
        {children}
      </div>
    </div>
  );
};

FeatureFencingContent.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default FeatureFencingContent;
