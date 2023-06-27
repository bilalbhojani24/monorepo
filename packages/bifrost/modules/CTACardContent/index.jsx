import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { FEATURE_FENCING_SIZES } from '../CTACard/const';
import { useCTACardContext } from '../CTACard/utils';

import { CONTENT_PADDING, DESCRIPTION_STYLES, HEADER_STYLES } from './const';

const CTACardContent = ({
  children,
  header,
  description,
  wrapperClassName
}) => {
  const { size } = useCTACardContext();

  return (
    <div
      className={twClassNames('flex-1', CONTENT_PADDING[size], {
        wrapperClassName
      })}
    >
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
            'mt-1.5': size === FEATURE_FENCING_SIZES.BASE
          }
        )}
      >
        {description}
      </p>
      <div
        className={twClassNames({
          'mt-6': size === FEATURE_FENCING_SIZES.BASE
        })}
      >
        {children}
      </div>
    </div>
  );
};

CTACardContent.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  wrapperClassName: PropTypes.string
};

CTACardContent.defaultProps = {
  wrapperClassName: ''
};

export default CTACardContent;
