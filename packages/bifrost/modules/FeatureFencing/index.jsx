import React, { useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../Button';
import { MdClose } from '../Icon';

import {
  CLOSE_BUTTON_SIZES,
  FEATURE_FENCING_SIZES,
  WIDTH_STYLES
} from './const';
import { FEATURE_FENCING_CONTEXT } from './context';

const FeatureFencing = (props) => {
  const { children, isDismissable, size, onClose } = props;

  const [hasMediaNode, setHasMediaNode] = useState(false);

  return (
    <FEATURE_FENCING_CONTEXT.Provider
      value={{
        size,
        setHasMediaNode
      }}
    >
      <div
        className={twClassNames(
          'relative flex shadow overflow-hidden',
          WIDTH_STYLES[size],
          {
            'rounded-lg':
              size === FEATURE_FENCING_SIZES.SM ||
              size === FEATURE_FENCING_SIZES.BASE,
            'rounded-xl': size === FEATURE_FENCING_SIZES.XL
          }
        )}
      >
        {children}
        {isDismissable && (
          <Button
            wrapperClassName={twClassNames('absolute top-0 right-0', {
              'border-0 shadow-none':
                !hasMediaNode || size === FEATURE_FENCING_SIZES.SM,
              'top-2 right-4': size === FEATURE_FENCING_SIZES.SM,
              'top-3 right-4': size === FEATURE_FENCING_SIZES.BASE,
              'top-5 right-6': size === FEATURE_FENCING_SIZES.XL
            })}
            isIconOnlyButton
            size={CLOSE_BUTTON_SIZES[size]}
            icon={<MdClose className="h-full w-full" />}
            colors="white"
            onClick={onClose}
          />
        )}
      </div>
    </FEATURE_FENCING_CONTEXT.Provider>
  );
};

FeatureFencing.propTypes = {
  isDismissable: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(FEATURE_FENCING_SIZES)),
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func
};
FeatureFencing.defaultProps = {
  isDismissable: true,
  size: FEATURE_FENCING_SIZES.SM,
  onClose: () => {}
};

export default FeatureFencing;
